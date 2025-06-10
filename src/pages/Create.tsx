
import React, { useState } from 'react';
import { Camera, Calendar, Upload, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [activeTab, setActiveTab] = useState<'event' | 'art'>('event');
  const navigate = useNavigate();

  const createOptions = {
    event: [
      {
        icon: Calendar,
        title: "Create Event",
        description: "Organize art exhibitions, workshops, or community gatherings",
        action: "Start Event Creation",
        onClick: () => navigate('/create-event')
      },
      {
        icon: Users,
        title: "Host Workshop",
        description: "Share your skills and teach others in your community",
        action: "Create Workshop",
        onClick: () => navigate('/create-event')
      }
    ],
    art: [
      {
        icon: Upload,
        title: "Upload Artwork",
        description: "Share your digital creations with the community",
        action: "Upload Art",
        onClick: () => navigate('/upload-art')
      },
      {
        icon: Camera,
        title: "Create Gallery",
        description: "Curate a collection of your best works",
        action: "Create Gallery",
        onClick: () => navigate('/gallery')
      }
    ]
  };

  return (
    <div className="px-4 py-6 max-w-full mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Create Something Amazing</h1>
        <p className="text-muted-foreground">Share your creativity with the SigArt community</p>
      </div>

      {/* Tab Selector */}
      <div className="flex bg-muted rounded-lg p-1 mb-6">
        <Button
          variant={activeTab === 'event' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('event')}
          className={`flex-1 ${activeTab === 'event' ? 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600' : 'hover:bg-muted/80'}`}
        >
          Events
        </Button>
        <Button
          variant={activeTab === 'art' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('art')}
          className={`flex-1 ${activeTab === 'art' ? 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600' : 'hover:bg-muted/80'}`}
        >
          Artwork
        </Button>
      </div>

      {/* Create Options */}
      <div className="space-y-4">
        {createOptions[activeTab].map((option, index) => (
          <Card
            key={index}
            className="bg-card border-border hover:bg-muted/50 transition-all duration-300 cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={option.onClick}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
                  <option.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    {option.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {option.description}
                  </p>
                  <Button
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      option.onClick();
                    }}
                  >
                    {option.action}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-16 border-border text-muted-foreground hover:bg-muted flex-col"
            onClick={() => navigate('/calendar')}
          >
            <Calendar className="w-5 h-5 mb-1" />
            <span className="text-xs">Schedule</span>
          </Button>
          <Button
            variant="outline"
            className="h-16 border-border text-muted-foreground hover:bg-muted flex-col"
            onClick={() => navigate('/upload-art')}
          >
            <Camera className="w-5 h-5 mb-1" />
            <span className="text-xs">Quick Photo</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Create;
