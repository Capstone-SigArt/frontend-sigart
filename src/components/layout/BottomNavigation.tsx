
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Plus, MessageSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Search, label: 'Browse', path: '/browse' },
    { icon: Plus, label: 'Create', path: '/create' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800/95 backdrop-blur-sm border-t border-gray-700 z-50">
      <div className="flex items-center justify-around h-16 max-w-[80%] mx-auto px-4">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center flex-1 py-2 transition-colors",
                isActive
                  ? "text-teal-400"
                  : "text-gray-400 hover:text-gray-300"
              )
            }
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
