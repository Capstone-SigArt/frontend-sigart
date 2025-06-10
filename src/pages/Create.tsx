
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  GraduationCap, 
  Image, 
  FolderOpen,
  Users,
  Palette,
  Camera,
  Clock
} from 'lucide-react';

const createOptions = [
  {
    icon: Calendar,
    title: 'Create Event',
    description: 'Organize art exhibitions, workshops, or community gatherings',
    action: 'Start Event Creation',
    path: '/create/event',
    color: 'bg-blue-500'
  },
  {
    icon: GraduationCap,
    title: 'Host Workshop',
    description: 'Share your skills and teach others in your community',
    action: 'Create Workshop',
    path: '/create/workshop',
    color: 'bg-green-500'
  },
  {
    icon: Image,
    title: 'Upload Artwork',
    description: 'Share your digital creations with the community',
    action: 'Upload Art',
    path: '/create/artwork',
    color: 'bg-purple-500'
  },
  {
    icon: FolderOpen,
    title: 'Create Gallery',
    description: 'Curate a collection of your best works',
    action: 'Create Gallery',
    path: '/create/gallery',
    color: 'bg-orange-500'
  }
];

const quickActions = [
  {
    icon: Clock,
    title: 'Schedule',
    description: 'Quick calendar access',
    path: '/schedule'
  },
  {
    icon: Camera,
    title: 'Quick Photo',
    description: 'Instant artwork capture',
    path: '/create/quick-photo'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Browse community art',
    path: '/community'
  }
];

export default function Create() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Create Something Amazing</h1>
        <p className="text-xl text-muted-foreground">
          Choose what you'd like to create or share with the community
        </p>
      </div>

      {/* Main Creation Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {createOptions.map((option, index) => (
          <Card 
            key={index} 
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => navigate(option.path)}
          >
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${option.color} text-white group-hover:scale-110 transition-transform`}>
                  <option.icon className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{option.description}</p>
              <Button className="w-full group-hover:bg-primary/90">
                {option.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Card 
              key={index}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(action.path)}
            >
              <CardContent className="p-6 text-center space-y-3">
                <action.icon className="w-8 h-8 mx-auto text-primary" />
                <h3 className="font-semibold">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Digital Art Showcase - Published</span>
              </div>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Character Design Workshop - Draft</span>
              </div>
              <span className="text-xs text-muted-foreground">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
