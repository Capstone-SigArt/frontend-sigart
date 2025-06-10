
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Calendar, Users, Loader2 } from 'lucide-react';
import { useEvents, useJoinEvent } from '@/hooks/useEvents';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

const eventCategories = [
  'All',
  'Digital Art',
  'Workshop',
  'Exhibition',
  'Gaming',
  'Fantasy'
];

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data: events = [], isLoading } = useEvents();
  const joinEventMutation = useJoinEvent();

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleJoinEvent = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    joinEventMutation.mutate({ eventId });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Discover Events</h1>
        <Button onClick={() => navigate('/app/create/event')}>
          Create Event
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {eventCategories.map((category) => (
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

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card 
            key={event.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/app/events/${event.id}`)}
          >
            <CardContent className="p-0">
              <div className="relative">
                {event.cover_image ? (
                  <img
                    src={event.cover_image}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-blue-100 rounded-t-lg flex items-center justify-center">
                    <span className="text-muted-foreground">No image</span>
                  </div>
                )}
                <Badge className="absolute top-2 right-2">
                  {event.category}
                </Badge>
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {format(new Date(event.date), 'MMM dd, yyyy')} at {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {event.attendee_count} attending
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">{event.event_type}</Badge>
                  <Button 
                    size="sm" 
                    onClick={(e) => handleJoinEvent(event.id, e)}
                    disabled={joinEventMutation.isPending}
                  >
                    {joinEventMutation.isPending ? 'Joining...' : 'Join Event'}
                  </Button>
                </div>
                {event.organizer && (
                  <p className="text-xs text-muted-foreground">
                    By {event.organizer.display_name || event.organizer.username}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-muted-foreground">No events found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
