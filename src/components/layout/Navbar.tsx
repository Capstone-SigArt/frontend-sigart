
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Search, 
  Calendar, 
  Plus, 
  Users, 
  MessageSquare, 
  Palette, 
  User,
  BookOpen
} from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Events', path: '/events' },
  { icon: Calendar, label: 'Schedule', path: '/schedule' },
  { icon: Plus, label: 'Create', path: '/create' },
  { icon: Users, label: 'My Parties', path: '/my-parties' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: Palette, label: 'My Studio', path: '/studio' },
  { icon: BookOpen, label: 'Resources', path: '/resources' },
];

export const Navbar = () => {
  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              <span className="hidden sm:block">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
