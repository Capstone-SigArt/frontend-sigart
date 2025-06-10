
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from 'react-router-dom';
import ProfileDropdown from '@/components/ProfileDropdown';

interface ModernNavigationProps {
  title: string;
  subtitle?: string;
  gradientFrom: string;
  gradientTo: string;
}

const ModernNavigation = ({ title, subtitle, gradientFrom, gradientTo }: ModernNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationTabs = [
    { name: 'Browse', path: '/' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Create', path: '/host-party' },
    { name: 'My Parties', path: '/my-parties' },
    { name: 'Showcase', path: '/community-art' },
    { name: 'My Studio', path: '/studio' },
    { name: 'Resources', path: '/resources' }
  ];

  const getActiveTab = () => {
    const currentPath = location.pathname;
    const activeTab = navigationTabs.find(tab => tab.path === currentPath);
    return activeTab?.name || 'Browse';
  };

  const handleTabClick = (tab: { name: string; path: string }) => {
    navigate(tab.path);
  };

  return (
    <>
      {/* Modern Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-14 h-14 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-2xl flex items-center justify-center shadow-lg`}>
                <span className="text-xl font-bold text-white">S</span>
              </div>
              <div>
                <h1 className={`text-3xl font-bold bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}>
                  {title}
                </h1>
                {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
              </div>
            </div>
            <ProfileDropdown />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-[88px] z-40 backdrop-blur-lg bg-white/70 dark:bg-slate-800/70 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-3 scrollbar-hide">
            {navigationTabs.map((tab) => (
              <Button
                key={tab.name}
                variant={getActiveTab() === tab.name ? "default" : "ghost"}
                className={`whitespace-nowrap transition-all duration-300 rounded-full px-6 py-2 ${
                  getActiveTab() === tab.name
                    ? `bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white shadow-lg transform scale-105` 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700/50'
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModernNavigation;
