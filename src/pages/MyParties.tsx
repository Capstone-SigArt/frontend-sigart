
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from '@/components/ProfileDropdown';

const MyParties = () => {
  const [activeTab, setActiveTab] = useState('My Parties');
  const navigate = useNavigate();

  const navigationTabs = [
    'Browse', 'Schedule', 'Create', 'My Parties', 'Showcase', 'My Studio', 'Resources'
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'Browse') {
      navigate('/');
    } else if (tab === 'Schedule') {
      navigate('/schedule');
    } else if (tab === 'Create') {
      navigate('/host-party');
    } else if (tab === 'My Studio') {
      navigate('/studio');
    }
  };

  // Mock data for parties
  const hostedParties = [
    {
      id: 1,
      title: "Event title",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=200&fit=crop",
      description: "Partial Flyer",
      tags: ["Grayscale", "Cyberpunk"],
      isHosted: true
    },
    {
      id: 2,
      title: "Event title",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=200&fit=crop",
      description: "Partial Flyer",
      tags: ["Grayscale", "Cyberpunk"],
      isHosted: true
    },
    {
      id: 3,
      title: "Event title",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=300&h=200&fit=crop",
      description: "Partial Flyer",
      tags: ["Grayscale", "Cyberpunk"],
      isHosted: true
    },
    {
      id: 4,
      title: "Event title",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=200&fit=crop",
      description: "Partial Flyer",
      tags: ["Grayscale", "Cyberpunk"],
      isHosted: true
    },
    {
      id: 5,
      title: "Event title",
      image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=300&h=200&fit=crop",
      description: "Partial Flyer",
      tags: ["Grayscale", "Cyberpunk"],
      isHosted: true
    },
    {
      id: 6,
      title: "Event title",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=200&fit=crop",
      description: "Partial Flyer",
      tags: ["Grayscale", "Cyberpunk"],
      isHosted: true
    }
  ];

  const participatedParties = [
    // These would be parties the user is participating in but not hosting
  ];

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
              <h1 className="text-3xl font-bold text-foreground">My Parties</h1>
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

      {/* Legend */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            <span className="text-sm text-muted-foreground">
              Party is Being participated in my user NOT owned
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5" />
            <span className="text-sm text-muted-foreground">
              Party is hosted by user
            </span>
          </div>
        </div>
      </div>

      {/* Parties Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostedParties.map((party) => (
            <Card 
              key={party.id} 
              className="bg-card border-border hover:shadow-lg transition-all duration-300 cursor-pointer relative"
              onClick={() => navigate(`/event/${party.id}`)}
            >
              {/* Status Icon */}
              <div className="absolute top-2 right-2 z-10">
                {party.isHosted ? (
                  <Bookmark className="w-6 h-6 text-primary fill-primary" />
                ) : (
                  <Edit className="w-6 h-6 text-muted-foreground" />
                )}
              </div>

              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={party.image} 
                    alt={party.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-lg" />
                  
                  {/* Event Title Overlay */}
                  <div className="absolute top-4 left-4 right-12">
                    <h3 className="text-white font-semibold text-lg drop-shadow-lg">
                      {party.title}
                    </h3>
                  </div>
                  
                  {/* Tags Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {party.tags.map((tag, index) => (
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
                      {party.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Load More Arrow */}
        <div className="flex justify-center mt-8">
          <div className="text-muted-foreground">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyParties;
