
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from '@/components/ProfileDropdown';

const Index = () => {
  const [activeTab, setActiveTab] = useState('Browse');
  const [searchFilters, setSearchFilters] = useState({
    title: '',
    tags: '',
    host: ''
  });
  const navigate = useNavigate();

  // Mock event data that matches the image layout
  const events = [
    {
      id: 1,
      title: "Event title",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=200&fit=crop",
      description: "Partial Flyer",
      tags: ["Grayscale", "Cyberpunk"]
    },
    {
      id: 2,
      title: "Event title", 
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=200&fit=crop",
      description: "Partial Flyer",
      tags: ["Grayscale", "Cyberpunk"]
    },
    {
      id: 3,
      title: "Test Party",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=300&h=200&fit=crop", 
      description: "Partial Flyer",
      tags: ["Grayscale", "Cyberpunk"]
    },
    {
      id: 4,
      title: "Event title",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=200&fit=crop",
      description: "Partial Flyer", 
      tags: ["Grayscale", "Cyberpunk"]
    },
    {
      id: 5,
      title: "Event title",
      image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=300&h=200&fit=crop",
      description: "Partial Flyer",
      tags: ["Grayscale", "Cyberpunk"]
    },
    {
      id: 6,
      title: "Event title",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=200&fit=crop",
      description: "Partial Flyer",
      tags: ["Grayscale", "Cyberpunk"] 
    }
  ];

  const navigationTabs = [
    'Browse', 'Schedule', 'Create', 'My Parties', 'Showcase', 'My Studio', 'Resources'
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'Schedule') {
      navigate('/schedule');
    } else if (tab === 'My Studio') {
      navigate('/studio');
    } else if (tab === 'Create') {
      navigate('/host-party');
    } else if (tab === 'My Parties') {
      navigate('/my-parties');
    } else if (tab === 'Showcase') {
      navigate('/community-art');
    } else if (tab === 'Resources') {
      navigate('/resources');
    }
  };

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

      {/* Search Filters */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <Input
              placeholder="Title"
              value={searchFilters.title}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, title: e.target.value }))}
              className="w-48 bg-background"
            />
            <Input
              placeholder="Tags"
              value={searchFilters.tags}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, tags: e.target.value }))}
              className="w-48 bg-background"
            />
            <Input
              placeholder="Host"
              value={searchFilters.host}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, host: e.target.value }))}
              className="w-48 bg-background"
            />
            <Button variant="outline" className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Filter</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Event Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card 
              key={event.id} 
              className="bg-card border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-lg" />
                  
                  {/* Event Title Overlay */}
                  <div className="absolute top-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg drop-shadow-lg">
                      {event.title}
                    </h3>
                  </div>
                  
                  {/* Tags Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {event.tags.map((tag, index) => (
                        <Badge 
                          key={index}
                          variant="secondary" 
                          className="bg-black/50 text-white border-white/20 backdrop-blur-sm"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-white/90 text-sm drop-shadow-lg font-medium">
                      {event.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
