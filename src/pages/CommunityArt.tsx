
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Heart, Share2, Eye, Download, Filter } from 'lucide-react';
import ModernNavigation from '@/components/ModernNavigation';

const CommunityArt = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Digital', 'Traditional', 'Photography', 'Mixed Media', 'Sculptures'];

  const artworks = [
    {
      id: 1,
      title: "Cyber Dreams",
      artist: "Alex Chen",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=500&fit=crop",
      category: "Digital",
      likes: 234,
      views: 1567,
      description: "A futuristic digital landscape exploring the intersection of technology and dreams",
      tags: ["Cyberpunk", "Digital", "Futuristic"],
      liked: false
    },
    {
      id: 2,
      title: "Ocean Serenity",
      artist: "Maria Rodriguez",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=500&fit=crop",
      category: "Traditional",
      likes: 189,
      views: 892,
      description: "Watercolor painting capturing the peaceful essence of ocean waves",
      tags: ["Watercolor", "Nature", "Peaceful"],
      liked: true
    },
    {
      id: 3,
      title: "Urban Pulse",
      artist: "David Kim",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=500&fit=crop",
      category: "Photography",
      likes: 156,
      views: 2341,
      description: "Street photography capturing the vibrant energy of city life",
      tags: ["Street", "Urban", "Photography"],
      liked: false
    },
    {
      id: 4,
      title: "Portrait Study",
      artist: "Emma Thompson",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=500&fit=crop",
      category: "Traditional",
      likes: 298,
      views: 1789,
      description: "Classical portrait study in charcoal and graphite",
      tags: ["Portrait", "Charcoal", "Study"],
      liked: true
    },
    {
      id: 5,
      title: "Nature's Harmony",
      artist: "James Wilson",
      image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=400&h=500&fit=crop",
      category: "Photography",
      likes: 421,
      views: 3245,
      description: "Landscape photography showcasing the beauty of natural formations",
      tags: ["Landscape", "Nature", "Photography"],
      liked: false
    },
    {
      id: 6,
      title: "Abstract Motion",
      artist: "Sarah Davis",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=500&fit=crop",
      category: "Mixed Media",
      likes: 167,
      views: 987,
      description: "Mixed media piece exploring movement and color dynamics",
      tags: ["Abstract", "Motion", "Experimental"],
      liked: true
    }
  ];

  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artwork.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || artwork.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleLike = (artworkId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Toggled like for artwork ${artworkId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-green-100 dark:from-sky-900 dark:via-emerald-900 dark:to-green-900">
      <ModernNavigation 
        title="Community Showcase" 
        subtitle="Discover amazing artwork from our community"
      />

      {/* Search and Filter Section */}
      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search artworks or artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 dark:bg-slate-700/80 border-white/30 rounded-xl shadow-sm focus:shadow-md transition-shadow"
              />
            </div>
            <Button className="bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white rounded-xl px-6 shadow-lg">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-lg'
                    : 'bg-white/40 border-white/30 hover:bg-white/60'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Artwork Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtworks.map((artwork) => (
            <Card 
              key={artwork.id} 
              className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 cursor-pointer rounded-2xl overflow-hidden hover:-translate-y-2"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={artwork.image} 
                    alt={artwork.title}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      variant="ghost"
                      className={`w-8 h-8 rounded-full backdrop-blur-sm ${
                        artwork.liked 
                          ? 'bg-red-500/80 text-white' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                      onClick={(e) => toggleLike(artwork.id, e)}
                    >
                      <Heart className="w-4 h-4" fill={artwork.liked ? 'currentColor' : 'none'} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Sharing artwork ${artwork.id}`);
                      }}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Downloading artwork ${artwork.id}`);
                      }}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white backdrop-blur-sm">
                      {artwork.category}
                    </Badge>
                  </div>

                  {/* Hover Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white/90 text-sm mb-2 drop-shadow-lg">
                      {artwork.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {artwork.tags.map((tag, index) => (
                        <Badge 
                          key={index}
                          className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Artwork Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{artwork.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                    by {artwork.artist}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center space-x-4">
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
            Load More Artworks
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityArt;
