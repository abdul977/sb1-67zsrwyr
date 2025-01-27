import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Team {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
}

interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: 'admin' | 'member';
  joined_at: string;
}

interface TeamState {
  teams: Team[];
  members: TeamMember[];
  loading: boolean;
  error: string | null;
  createTeam: (name: string) => Promise<void>;
  fetchTeams: () => Promise<void>;
  fetchTeamMembers: (teamId: string) => Promise<void>;
  addTeamMember: (teamId: string, email: string, role: 'admin' | 'member') => Promise<void>;
  removeTeamMember: (teamId: string, userId: string) => Promise<void>;
  updateMemberRole: (teamId: string, userId: string, role: 'admin' | 'member') => Promise<void>;
}

export const useTeamStore = create<TeamState>((set, get) => ({
  teams: [],
  members: [],
  loading: false,
  error: null,

  createTeam: async (name) => {
    try {
      set({ loading: true, error: null });
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('teams')
        .insert([{ name, owner_id: userData.user.id }])
        .select()
        .single();

      if (error) throw error;

      // Add creator as admin
      const { error: memberError } = await supabase
        .from('team_members')
        .insert([{
          team_id: data.id,
          user_id: userData.user.id,
          role: 'admin'
        }]);

      if (memberError) throw memberError;

      set((state) => ({
        teams: [...state.teams, data],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchTeams: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ teams: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchTeamMembers: async (teamId) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('team_id', teamId);

      if (error) throw error;

      set({ members: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addTeamMember: async (teamId, email, role) => {
    try {
      set({ loading: true, error: null });
      
      // First, get the user ID from the email
      const { data: userData, error: userError } = await supabase
        .from('auth.users')
        .select('id')
        .eq('email', email)
        .single();

      if (userError) throw userError;

      const { error } = await supabase
        .from('team_members')
        .insert([{
          team_id: teamId,
          user_id: userData.id,
          role
        }]);

      if (error) throw error;

      await get().fetchTeamMembers(teamId);
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  removeTeamMember: async (teamId, userId) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('team_id', teamId)
        .eq('user_id', userId);

      if (error) throw error;

      set((state) => ({
        members: state.members.filter(
          (member) => !(member.team_id === teamId && member.user_id === userId)
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateMemberRole: async (teamId, userId, role) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('team_members')
        .update({ role })
        .eq('team_id', teamId)
        .eq('user_id', userId);

      if (error) throw error;

      set((state) => ({
        members: state.members.map((member) =>
          member.team_id === teamId && member.user_id === userId
            ? { ...member, role }
            : member
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));