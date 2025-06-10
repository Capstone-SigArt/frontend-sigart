
import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, Tag, Map, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Browse = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  const events = [
    {
      id: 1,
      title: "Digital Art Showcase",
      date: "Dec 15, 2024",
      location: "Virtual Gallery",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      tags: ["Digital", "Showcase", "Virtual"],
      attendees: 142
    },
    {
      id: 2,
      title: "Character Design Workshop",
      date: "Dec 18, 2024",
      location: "Creative Studio",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      tags: ["Workshop", "Character", "Design"],
      attendees: 89
    },
    {
      id: 3,
      title: "Fantasy Art Convention",
      date: "Dec 20, 2024",
      location: "Convention Center",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      tags: ["Fantasy", "Convention", "Art"],
      attendees: 256
    }
  ];

  return (
    <div className="px-4 py-6 max-w-md mx-auto">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search events, artists, or themes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-12 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 h-12"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
        >
          <Filter className="w-5 h-5" />
        </Button>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Discover Events</h2>
        <div className="flex bg-gray-800/50 rounded-lg p-1">
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="px-3"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'map' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('map')}
            className="px-3"
          >
            <Map className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['All', 'Digital Art', 'Workshops', 'Exhibitions', 'Gaming', 'Fantasy'].map((tag) => (
          <Badge
            key={tag}
            variant={tag === 'All' ? 'default' : 'secondary'}
            className="whitespace-nowrap cursor-pointer hover:bg-teal-600"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event, index) => (
          <Card
            key={event.id}
            className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-0">
              <div className="flex">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-24 h-24 object-cover rounded-l-lg"
                />
                <div className="flex-1 p-4">
                  <h3 className="font-semibold text-white mb-1 line-clamp-1">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-gray-400 text-sm mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="mr-3">{event.date}</span>
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {event.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">
                      {event.attendees} attending
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Browse;
