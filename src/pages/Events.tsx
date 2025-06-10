
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

const eventCategories = [
  'All',
  'Digital Art',
  'Workshops',
  'Exhibitions',
  'Gaming',
  'Fantasy'
];

const events = [
  {
    id: 1,
    title: 'Digital Art Showcase',
    date: 'Dec 15, 2024',
    time: '7:00 PM',
    location: 'Virtual Gallery',
    category: 'Digital Art',
    type: 'Showcase',
    attending: 142,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    title: 'Character Design Workshop',
    date: 'Dec 18, 2024',
    time: '3:00 PM',
    location: 'Creative Studio',
    category: 'Workshop',
    type: 'Character',
    attending: 89,
    image: 'https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    title: 'Fantasy Art Convention',
    date: 'Dec 20, 2024',
    time: '10:00 AM',
    location: 'Convention Center',
    category: 'Fantasy',
    type: 'Convention',
    attending: 256,
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=300&fit=crop'
  }
];

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Discover Events</h1>
        <Button onClick={() => navigate('/create/event')}>
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
            onClick={() => navigate(`/events/${event.id}`)}
          >
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 right-2">
                  {event.category}
                </Badge>
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date} at {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {event.attending} attending
                  </div>
                </div>
                <Badge variant="secondary">{event.type}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
