
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, MapPin, Users, Heart, Share2 } from 'lucide-react';
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

  // Enhanced event data
  const events = [
    {
      id: 1,
      title: "Digital Art Showcase",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
      description: "Explore cutting-edge digital artwork",
      tags: ["Digital", "Modern"],
      date: "Jan 15, 2024",
      location: "Online",
      attendees: 24,
      liked: false
    },
    {
      id: 2,
      title: "Abstract Expression Night",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop",
      description: "Contemporary abstract art exhibition",
      tags: ["Abstract", "Contemporary"],
      date: "Jan 18, 2024",
      location: "Studio A",
      attendees: 32,
      liked: true
    },
    {
      id: 3,
      title: "Test Party",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop",
      description: "Experimental art gathering",
      tags: ["Experimental", "Mixed Media"],
      date: "Jan 20, 2024",
      location: "Gallery Space",
      attendees: 18,
      liked: false
    },
    {
      id: 4,
      title: "Portrait Mastery Workshop",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=300&fit=crop",
      description: "Learn advanced portrait techniques",
      tags: ["Portrait", "Workshop"],
      date: "Jan 22, 2024",
      location: "Art Center",
      attendees: 15,
      liked: false
    },
    {
      id: 5,
      title: "Nature & Landscape",
      image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=400&h=300&fit=crop",
      description: "Outdoor painting expedition",
      tags: ["Nature", "Landscape"],
      date: "Jan 25, 2024",
      location: "Riverside Park",
      attendees: 28,
      liked: true
    },
    {
      id: 6,
      title: "Street Art Festival",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop",
      description: "Urban art celebration",
      tags: ["Street Art", "Urban"],
      date: "Jan 28, 2024",
      location: "Downtown",
      attendees: 45,
      liked: false
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

  const handleEventClick = (eventId: number) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Modern Header with Glassmorphism */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-white">S</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SigArt
                </h1>
                <p className="text-sm text-muted-foreground">Discover Amazing Art Events</p>
              </div>
            </div>
            <ProfileDropdown />
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Tabs */}
      <div className="sticky top-[88px] z-40 backdrop-blur-lg bg-white/70 dark:bg-slate-800/70 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-3 scrollbar-hide">
            {navigationTabs.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                className={`whitespace-nowrap transition-all duration-300 rounded-full px-6 py-2 ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700/50'
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Search Section */}
      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search events..."
                value={searchFilters.title}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, title: e.target.value }))}
                className="pl-10 bg-white/80 dark:bg-slate-700/80 border-white/30 rounded-xl shadow-sm focus:shadow-md transition-shadow"
              />
            </div>
            <Input
              placeholder="Tags"
              value={searchFilters.tags}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, tags: e.target.value }))}
              className="w-40 bg-white/80 dark:bg-slate-700/80 border-white/30 rounded-xl"
            />
            <Input
              placeholder="Host"
              value={searchFilters.host}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, host: e.target.value }))}
              className="w-40 bg-white/80 dark:bg-slate-700/80 border-white/30 rounded-xl"
            />
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-6 shadow-lg">
              Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Event Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card 
              key={event.id} 
              className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 cursor-pointer rounded-2xl overflow-hidden hover:-translate-y-2"
              onClick={() => handleEventClick(event.id)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Event Actions */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className={`w-8 h-8 rounded-full backdrop-blur-sm ${
                        event.liked 
                          ? 'bg-red-500/80 text-white' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle like logic
                      }}
                    >
                      <Heart className="w-4 h-4" fill={event.liked ? 'currentColor' : 'none'} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle share logic
                      }}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Event Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl mb-2 drop-shadow-lg">
                      {event.title}
                    </h3>
                    <p className="text-white/90 text-sm mb-3 drop-shadow">
                      {event.description}
                    </p>
                    
                    {/* Event Meta */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4 text-white/80 text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, index) => (
                        <Badge 
                          key={index}
                          className="bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline"
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 rounded-xl px-8 py-3 hover:shadow-lg transition-all duration-300"
          >
            Load More Events
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
