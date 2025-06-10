
import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import Header from './Header';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20 pt-16">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default AppLayout;
