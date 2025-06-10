
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from '@/components/ProfileDropdown';

const CommunityArt = () => {
  const [filters, setFilters] = useState({
    searchBy: '',
    sortBy: 'Newest'
  });
  const navigate = useNavigate();

  // Mock community art data
  const artworks = [
    {
      id: 1,
      artist: "Artist",
      uploadTime: "Art Title 1 2 hrs ago",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      artist: "Artist",
      uploadTime: "Art Title 1 2 hrs ago",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      artist: "Artist",
      uploadTime: "Art Title 1 2 hrs ago",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      artist: "Artist",
      uploadTime: "Art Title 1 2 hrs ago",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      artist: "Artist",
      uploadTime: "Art Title 1 2 hrs ago",
      image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=300&h=200&fit=crop"
    }
  ];

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
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center border-2 border-border">
                <span className="text-sm font-medium text-muted-foreground">Logo</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground">Community Art</h1>
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
                variant={tab === 'Showcase' ? "default" : "ghost"}
                className={`whitespace-nowrap transition-all duration-200 ${
                  tab === 'Showcase'
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

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-64">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <h3 className="font-medium text-foreground mb-4">Filters ▼</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Search by</label>
                    <Input
                      value={filters.searchBy}
                      onChange={(e) => setFilters(prev => ({ ...prev, searchBy: e.target.value }))}
                      className="bg-background border-border"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Sort by</label>
                    <select 
                      value={filters.sortBy}
                      onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                    >
                      <option value="Newest">Newest</option>
                      <option value="Oldest">Oldest</option>
                      <option value="Popular">Popular</option>
                    </select>
                  </div>
                  
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Art Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artworks.map((artwork) => (
                <Card key={artwork.id} className="bg-card border-border hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={artwork.image} 
                        alt="Community Art"
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      
                      {/* Artist Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-blue-500 text-white">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-white">
                            <div className="text-sm font-medium">{artwork.artist}</div>
                            <div className="text-xs text-white/80">{artwork.uploadTime}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityArt;
