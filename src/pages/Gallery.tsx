
import React, { useState } from 'react';
import { Grid, List, Plus, Filter, Heart, MessageSquare, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Digital Art', 'Character Design', 'Fantasy', 'Concept Art'];

  const artworks = [
    {
      id: 1,
      title: "Neon Samurai",
      artist: "Jordan Davis",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop",
      likes: 234,
      comments: 45,
      category: "Digital Art"
    },
    {
      id: 2,
      title: "Crystal Forest",
      artist: "Jordan Davis",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      likes: 189,
      comments: 32,
      category: "Fantasy"
    },
    {
      id: 3,
      title: "Cyber Dragon",
      artist: "Jordan Davis",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
      likes: 312,
      comments: 67,
      category: "Character Design"
    },
    {
      id: 4,
      title: "Space Station",
      artist: "Jordan Davis",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop",
      likes: 156,
      comments: 28,
      category: "Concept Art"
    }
  ];

  const filteredArtworks = filter === 'All' ? artworks : artworks.filter(art => art.category === filter);

  return (
    <div className="px-4 py-6 max-w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">My Gallery</h1>
        <div className="flex gap-2">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
          <Button
            onClick={() => navigate('/upload-art')}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {filters.map((filterOption) => (
          <Badge
            key={filterOption}
            variant={filter === filterOption ? 'default' : 'secondary'}
            className={`whitespace-nowrap cursor-pointer transition-colors ${
              filter === filterOption 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            onClick={() => setFilter(filterOption)}
          >
            {filterOption}
          </Badge>
        ))}
      </div>

      {/* Gallery Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 gap-4">
          {filteredArtworks.map((artwork) => (
            <Card key={artwork.id} className="bg-card border-border group cursor-pointer">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-card-foreground mb-1">{artwork.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{artwork.likes} likes</span>
                    <span>{artwork.comments} comments</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredArtworks.map((artwork) => (
            <Card key={artwork.id} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground mb-1">{artwork.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{artwork.category}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {artwork.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        {artwork.comments}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button size="sm" variant="ghost">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
