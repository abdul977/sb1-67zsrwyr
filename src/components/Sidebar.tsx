import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Calendar,
  Settings,
  PlusSquare,
  BarChart2,
  Activity,
  BookOpen,
} from 'lucide-react';
import { useTeamStore } from '../store/teamStore';
import { useAuthStore } from '../store/authStore';

export default function Sidebar() {
  const location = useLocation();
  const { teams, fetchTeams } = useTeamStore();
  const { isAdmin } = useAuthStore();

  React.useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'My Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Reports', href: '/reports', icon: BarChart2 },
    { name: 'Analytics', href: '/analytics', icon: Activity },
    { name: 'Documentation', href: '/docs', icon: BookOpen },
    ...(isAdmin ? [{ name: 'Settings', href: '/settings', icon: Settings }] : []),
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <span className="text-lg font-semibold">TaskMaster</span>
        </div>

        <div className="flex-1 px-3 py-4 overflow-y-auto">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive(item.href)
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8">
            <div className="px-3 mb-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Teams
              </h3>
            </div>
            <nav className="space-y-1">
              {teams.map((team) => (
                <Link
                  key={team.id}
                  to={`/team/${team.id}`}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive(`/team/${team.id}`)
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Users className="w-5 h-5 mr-3" />
                  {team.name}
                </Link>
              ))}
              <button
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
                onClick={() => {/* TODO: Open create team modal */}}
              >
                <PlusSquare className="w-5 h-5 mr-3" />
                Create Team
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}