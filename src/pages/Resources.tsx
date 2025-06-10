
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from '@/components/ProfileDropdown';

const Resources = () => {
  const navigate = useNavigate();

  const navigationTabs = [
    'Browse', 'Schedule', 'Create', 'My Parties', 'Showcase', 'My Studio', 'Resources'
  ];

  const handleTabClick = (tab: string) => {
    if (tab === 'Browse') {
      navigate('/');
    } else if (tab === 'Schedule') {
      navigate('/schedule');
    } else if (tab === 'My Studio') {
      navigate('/studio');
    } else if (tab === 'Create') {
      navigate('/host-party');
    } else if (tab === 'My Parties') {
      navigate('/my-parties');
    } else if (tab === 'Showcase') {
      navigate('/community-art');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center border-2 border-border">
                <span className="text-sm font-medium text-muted-foreground">Logo</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground">SigArt</h1>
            </div>
            <ProfileDropdown />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {navigationTabs.map((tab) => (
              <Button
                key={tab}
                variant={tab === 'Resources' ? "default" : "ghost"}
                className={`whitespace-nowrap transition-all duration-200 ${
                  tab === 'Resources'
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Side Note */}
          <div className="w-64">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">
                  This page will be entirely dedicated to resources for the aspiring artists that learn all they need to know about participating in parties and events, as well as art and drawing in general, frequently utilized art sites, brush packs and other things. This will be the main place in which users can go to find resources, this page itself just has a bunch of info for resources will continue to grow as more information presents itself.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* About the site */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">About the site</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                  dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>

                <h3 className="text-lg font-semibold text-foreground mb-3">What is an Art Party</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                  dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>

                <h4 className="font-medium text-foreground mb-2">Links for further explanation</h4>
                <ul className="list-disc list-inside text-sm text-blue-600 space-y-1">
                  <li><a href="#" className="hover:underline">Link</a></li>
                  <li><a href="#" className="hover:underline">Link</a></li>
                  <li><a href="#" className="hover:underline">Link</a></li>
                </ul>
              </CardContent>
            </Card>

            {/* Drawing tools */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Drawing tools</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                  dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>

                <h4 className="font-medium text-foreground mb-2">Links for further explanation</h4>
                <ul className="list-disc list-inside text-sm text-blue-600 space-y-1">
                  <li><a href="#" className="hover:underline">Link</a></li>
                  <li><a href="#" className="hover:underline">Link</a></li>
                  <li><a href="#" className="hover:underline">Link</a></li>
                </ul>
              </CardContent>
            </Card>

            {/* Drawing Tutorials */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Drawing Tutorials</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                  dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>

                <h4 className="font-medium text-foreground mb-2">Links for further explanation</h4>
                <ul className="list-disc list-inside text-sm text-blue-600 space-y-1">
                  <li><a href="#" className="hover:underline">Link</a></li>
                  <li><a href="#" className="hover:underline">Link</a></li>
                  <li><a href="#" className="hover:underline">Link</a></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
