
import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, Map, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Browse = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();

  const filters = ['All', 'Digital Art', 'Workshops', 'Exhibitions', 'Gaming', 'Fantasy'];

  const events = [
    {
      id: 1,
      title: "Digital Art Showcase",
      date: "Dec 15, 2024",
      location: "Virtual Gallery",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      tags: ["Digital", "Showcase", "Virtual"],
      attendees: 142,
      category: "Digital Art"
    },
    {
      id: 2,
      title: "Character Design Workshop",
      date: "Dec 18, 2024", 
      location: "Creative Studio",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      tags: ["Workshop", "Character", "Design"],
      attendees: 89,
      category: "Workshops"
    },
    {
      id: 3,
      title: "Fantasy Art Convention",
      date: "Dec 20, 2024",
      location: "Convention Center", 
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      tags: ["Fantasy", "Convention", "Art"],
      attendees: 256,
      category: "Fantasy"
    },
    {
      id: 4,
      title: "Digital Gaming Art Exhibition",
      date: "Dec 22, 2024",
      location: "Gaming Hub",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
      tags: ["Gaming", "Digital", "Exhibition"],
      attendees: 178,
      category: "Gaming"
    },
    {
      id: 5,
      title: "Traditional Art Workshop",
      date: "Dec 25, 2024",
      location: "Art Center",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop",
      tags: ["Traditional", "Workshop", "Painting"],
      attendees: 67,
      category: "Workshops"
    },
    {
      id: 6,
      title: "VR Art Exhibition",
      date: "Dec 28, 2024",
      location: "Tech Gallery",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
      tags: ["Digital", "VR", "Exhibition"],
      attendees: 95,
      category: "Exhibitions"
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || event.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleEventClick = (eventId: number) => {
    navigate(`/event/${eventId}`);
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    console.log('Filter changed to:', filter);
  };

  return (
    <div className="px-4 py-6 max-w-full mx-auto">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search events, artists, or themes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-12 bg-background border-border text-foreground placeholder-muted-foreground h-12"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <Filter className="w-5 h-5" />
        </Button>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Discover Events</h2>
        <div className="flex bg-muted rounded-lg p-1">
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
        {filters.map((filter) => (
          <Badge
            key={filter}
            variant={filter === activeFilter ? 'default' : 'secondary'}
            className={`whitespace-nowrap cursor-pointer transition-colors ${
              filter === activeFilter 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </Badge>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map((event, index) => (
          <Card
            key={event.id}
            className="bg-card border-border hover:bg-muted/50 transition-all duration-300 cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handleEventClick(event.id)}
          >
            <CardContent className="p-0">
              <div className="flex">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-24 h-24 object-cover rounded-l-lg"
                />
                <div className="flex-1 p-4">
                  <h3 className="font-semibold text-card-foreground mb-1 line-clamp-1">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-muted-foreground text-sm mb-2">
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
                    <span className="text-xs text-muted-foreground">
                      {event.attendees} attending
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-foreground font-semibold mb-2">No events found</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Try adjusting your search or filters
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('All');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Browse;
