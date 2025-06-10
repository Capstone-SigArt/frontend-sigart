
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useParams } from 'react-router-dom';
import ProfileDropdown from '@/components/ProfileDropdown';

const EventDetails = () => {
  const [activeTab, setActiveTab] = useState('Schedule');
  const navigate = useNavigate();
  const { eventId } = useParams();

  const navigationTabs = [
    'Browse', 'Schedule', 'Create', 'My Parties', 'Showcase', 'My Studio', 'Resources'
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'Browse') {
      navigate('/');
    } else if (tab === 'My Studio') {
      navigate('/studio');
    } else if (tab === 'Schedule') {
      navigate('/schedule');
    }
  };

  // Mock event data
  const eventData = {
    title: "Test Party at [game server][location]",
    hostName: "Host Name",
    dateTime: "Date/Time",
    description: "Description",
    theme: "Theme",
    tags: ["Tag 1", "Tag 2", "Tag 3"]
  };

  // Mock attendees data
  const attendees = [
    { id: 1, name: "Artist", info: "Art Title 1 2 hrs ago", avatar: "" },
    { id: 2, name: "Artist", info: "Art Title 1 2 hrs ago", avatar: "" },
    { id: 3, name: "Artist", info: "Art Title 1 2 hrs ago", avatar: "" },
    { id: 4, name: "Artist", info: "Art Title 1 2 hrs ago", avatar: "" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center border-2 border-border">
                <span className="text-sm font-medium text-muted-foreground">Logo</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground">SigArt</h1>
            </div>
            
            {/* Profile Dropdown */}
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
                variant={activeTab === tab ? "default" : "ghost"}
                className={`whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab 
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

      {/* Event Details Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            {/* Event Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">{eventData.title}</h2>
              
              {/* Banner/Flyer Image Placeholder */}
              <div className="w-full h-32 bg-muted/50 border-2 border-dashed border-border rounded-lg flex items-center justify-center mb-6">
                <span className="text-muted-foreground italic">Banner/Flyer Image for party</span>
              </div>

              {/* Event Details Form */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <Label htmlFor="hostName" className="text-sm font-medium text-foreground">Host Name</Label>
                  <Input 
                    id="hostName" 
                    value={eventData.hostName} 
                    readOnly 
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="dateTime" className="text-sm font-medium text-foreground">Date/Time</Label>
                  <Input 
                    id="dateTime" 
                    value={eventData.dateTime} 
                    readOnly 
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-foreground">Description</Label>
                  <Input 
                    id="description" 
                    value={eventData.description} 
                    readOnly 
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="theme" className="text-sm font-medium text-foreground">Theme</Label>
                  <Input 
                    id="theme" 
                    value={eventData.theme} 
                    readOnly 
                    className="bg-background border-border"
                  />
                </div>
              </div>

              {/* Tags and Action Buttons */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  {eventData.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Join/Leave
                  </Button>
                </div>
              </div>
            </div>

            {/* Event Gallery Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-foreground">Event Gallery</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Upload your masterpiece!</span>
                  <Button size="sm" variant="outline">
                    Upload Art
                  </Button>
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Top Row - Attendees with avatars */}
                {attendees.map((attendee) => (
                  <Card key={attendee.id} className="bg-background border-border">
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center space-y-2">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={attendee.avatar} />
                          <AvatarFallback className="bg-blue-500 text-white">
                            <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                          <p className="text-sm font-medium text-foreground">{attendee.name}</p>
                          <p className="text-xs text-muted-foreground">{attendee.info}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Bottom Row - Empty slots */}
                {[1, 2, 3, 4].map((slot) => (
                  <Card key={`empty-${slot}`} className="bg-background border-border">
                    <CardContent className="p-4">
                      <div className="h-24 bg-muted/30 rounded border-2 border-dashed border-border flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">Empty slot</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventDetails;
