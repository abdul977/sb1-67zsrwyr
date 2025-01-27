import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { supabase } from './lib/supabase';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  const { setUser } = useAuthStore();

  React.useEffect(() => {
    // Set up auth listener
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, [setUser]);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            
            {/* Protected routes that require authentication */}
            <Route path="/tasks" element={<Dashboard />} />
            <Route path="/calendar" element={<Dashboard />} />
            
            {/* Admin-only routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin/*" element={<Dashboard />} />
              <Route path="/settings" element={<Dashboard />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;