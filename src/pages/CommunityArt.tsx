
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Heart, Share2, Download, Eye, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from '@/components/ProfileDropdown';

const CommunityArt = () => {
  const [filters, setFilters] = useState({
    searchBy: '',
    sortBy: 'Newest'
  });
  const navigate = useNavigate();

  // Enhanced artwork data
  const artworks = [
    {
      id: 1,
      artist: "Alexandra Chen",
      title: "Digital Dreams",
      uploadTime: "2 hrs ago",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
      likes: 24,
      views: 156,
      tags: ["Digital", "Abstract"],
      liked: false
    },
    {
      id: 2,
      artist: "Marcus Rodriguez",
      title: "Urban Symphony",
      uploadTime: "4 hrs ago",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop",
      likes: 31,
      views: 203,
      tags: ["Urban", "Photography"],
      liked: true
    },
    {
      id: 3,
      artist: "Sarah Kim",
      title: "Nature's Palette",
      uploadTime: "6 hrs ago",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop",
      likes: 18,
      views: 89,
      tags: ["Nature", "Painting"],
      liked: false
    },
    {
      id: 4,
      artist: "David Wilson",
      title: "Portrait Study",
      uploadTime: "8 hrs ago",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=300&fit=crop",
      likes: 42,
      views: 267,
      tags: ["Portrait", "Traditional"],
      liked: true
    },
    {
      id: 5,
      artist: "Emma Thompson",
      title: "Landscape Dreams",
      uploadTime: "12 hrs ago",
      image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=400&h=300&fit=crop",
      likes: 35,
      views: 178,
      tags: ["Landscape", "Oil"],
      liked: false
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-100 dark:from-slate-900 dark:via-purple-900 dark:to-rose-900">
      {/* Modern Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-white">S</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Community Art
                </h1>
                <p className="text-sm text-muted-foreground">Discover Amazing Artwork</p>
              </div>
            </div>
            <ProfileDropdown />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-[88px] z-40 backdrop-blur-lg bg-white/70 dark:bg-slate-800/70 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-3">
            {navigationTabs.map((tab) => (
              <Button
                key={tab}
                variant={tab === 'Showcase' ? "default" : "ghost"}
                className={`whitespace-nowrap transition-all duration-300 rounded-full px-6 py-2 ${
                  tab === 'Showcase'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
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
          {/* Enhanced Filters Sidebar */}
          <div className="w-72">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Filter className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-lg text-foreground">Filters</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Search Artwork</label>
                    <Input
                      value={filters.searchBy}
                      onChange={(e) => setFilters(prev => ({ ...prev, searchBy: e.target.value }))}
                      className="bg-white/60 dark:bg-slate-700/60 border-white/30 rounded-xl"
                      placeholder="Title, artist, tags..."
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Sort by</label>
                    <select 
                      value={filters.sortBy}
                      onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                      className="w-full px-3 py-2 bg-white/60 dark:bg-slate-700/60 border border-white/30 rounded-xl text-foreground focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Newest">Newest</option>
                      <option value="Oldest">Oldest</option>
                      <option value="Popular">Most Popular</option>
                      <option value="Most Liked">Most Liked</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Categories</label>
                    <div className="space-y-2">
                      {['Digital', 'Traditional', 'Photography', 'Abstract', 'Portrait', 'Landscape'].map((category) => (
                        <label key={category} className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded border-white/30" />
                          <span className="text-sm">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-lg">
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Art Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {artworks.map((artwork) => (
                <Card 
                  key={artwork.id} 
                  className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 cursor-pointer rounded-2xl overflow-hidden hover:-translate-y-2"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img 
                        src={artwork.image} 
                        alt={artwork.title}
                        className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex space-x-3">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                          >
                            <Eye className="w-5 h-5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                          >
                            <Share2 className="w-5 h-5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                          >
                            <Download className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>

                      {/* Like Button */}
                      <Button
                        size="icon"
                        variant="ghost"
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-sm transition-all duration-300 ${
                          artwork.liked 
                            ? 'bg-red-500/80 text-white' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Heart className="w-4 h-4" fill={artwork.liked ? 'currentColor' : 'none'} />
                      </Button>
                    </div>

                    {/* Artwork Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{artwork.title}</h3>
                      
                      {/* Artist Info */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs">
                              {artwork.artist.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{artwork.artist}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{artwork.uploadTime}</span>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{artwork.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{artwork.views}</span>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {artwork.tags.map((tag, index) => (
                          <Badge 
                            key={index}
                            variant="secondary"
                            className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-200"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Load More */}
            <div className="text-center mt-8">
              <Button 
                variant="outline"
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 rounded-xl px-8 py-3"
              >
                Load More Artwork
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityArt;
