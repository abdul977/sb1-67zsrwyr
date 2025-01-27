import React from 'react';
import { Bell, Settings } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Header() {
  const { user, signOut } = useAuthStore();

  return (
    <header className="bg-white shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Bell className="w-6 h-6" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Settings className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700">{user?.email}</span>
            <button
              onClick={() => signOut()}
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}