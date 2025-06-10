
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Heart, Eye, MessageSquare, Share2 } from 'lucide-react';

const communityArt = [
  {
    id: 1,
    title: 'Neon Cityscape',
    artist: 'Sarah Chen',
    artistAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop',
    likes: 234,
    views: 1200,
    comments: 23,
    tags: ['Digital', 'Cyberpunk', 'Urban']
  },
  {
    id: 2,
    title: 'Fantasy Dragon',
    artist: 'Mike Johnson',
    artistAvatar: null,
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop',
    likes: 456,
    views: 2100,
    comments: 67,
    tags: ['Fantasy', 'Dragon', 'Magic']
  },
  {
    id: 3,
    title: 'Character Portrait',
    artist: 'Emma Wilson',
    artistAvatar: null,
    image: 'https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=400&h=400&fit=crop',
    likes: 189,
    views: 890,
    comments: 34,
    tags: ['Portrait', 'Character', 'Digital']
  },
  {
    id: 4,
    title: 'Abstract Geometry',
    artist: 'Alex Kim',
    artistAvatar: null,
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=400&fit=crop',
    likes: 123,
    views: 567,
    comments: 12,
    tags: ['Abstract', 'Geometry', 'Modern']
  }
];

const categories = ['All', 'Digital', 'Fantasy', 'Portrait', 'Abstract', 'Cyberpunk'];

export default function Community() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArt = communityArt.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
                           art.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Community Art</h1>
        <p className="text-muted-foreground mt-2">
          Discover amazing artwork from our creative community
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search artwork or artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Art Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredArt.map((art) => (
          <Card key={art.id} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center space-x-2">
                  <Button size="icon" variant="secondary">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="secondary">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="secondary">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                <h3 className="font-semibold">{art.title}</h3>
                
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={art.artistAvatar} />
                    <AvatarFallback className="text-xs">
                      {art.artist.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">{art.artist}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {art.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {art.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{art.tags.length - 2}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {art.likes}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {art.views}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {art.comments}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArt.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No artwork found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
