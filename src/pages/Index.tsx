import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, MapPin, Users, Heart, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ModernNavigation from '@/components/ModernNavigation';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const Index = () => {
  const [searchFilters, setSearchFilters] = useState({
    title: '',
    tags: '',
    host: ''
  });
  const [events, setEvents] = useState<any[]>([]);
  const [allEvents, setAllEvents] = useState<any[]>([]); // Store all fetched events
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParties = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/parties`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const dataWithAttendees = await Promise.all(
            data.map(async (event) => {
              try {
                const countRes = await fetch(`${API_BASE_URL}/myParties/count/${event.id}`);
                const { count } = await countRes.json();
                return { ...event, attendees: count };
              } catch {
                return { ...event, attendees: 0 };
              }
            })
        );

        setAllEvents(dataWithAttendees); // Save all events
        setEvents(dataWithAttendees); // Initially show all
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load events');
        setEvents([]);
        setAllEvents([]);
      }
      setLoading(false);
    };
    fetchParties();
  }, []);

  // Filtering logic
  const filterEvents = () => {
    const { title, tags, host } = searchFilters;
    const filtered = allEvents.filter(event => {
      const matchesTitle = title.trim() === '' || (event.title && event.title.toLowerCase().includes(title.toLowerCase()));
      const matchesTags = tags.trim() === '' || (event.tags && event.tags.join(' ').toLowerCase().includes(tags.toLowerCase()));
      const matchesHost = host.trim() === '' || (event.host && event.host.toLowerCase().includes(host.toLowerCase()));
      return matchesTitle && matchesTags && matchesHost;
    });
    setEvents(filtered);
  };

  // Filter on input change
  useEffect(() => {
    filterEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilters, allEvents]);
  

  const toggleLike = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Like functionality would be implemented here
    console.log(`Toggled like for event ${eventId}`);
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-green-100 dark:from-sky-900 dark:via-emerald-900 dark:to-green-900">
      <ModernNavigation 
        title="SigArt" 
        subtitle="Discover Amazing Art Events"
      />

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
            <Button className="bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white rounded-xl px-6 shadow-lg"
              onClick={filterEvents}
              type="button"
            >
              Filter
            </Button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Event Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 min-h-[400px]">
        {error && (
          <div className="text-center text-red-500 font-medium mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="text-slate-500 dark:text-slate-300 text-lg">Loading events...</span>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center text-slate-600 dark:text-slate-300 py-20">
            No events found.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <Card 
                  key={event.id} 
                  className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 cursor-pointer rounded-2xl overflow-hidden hover:-translate-y-2"
                  onClick={() => handleEventClick(event.id)}
                >
                  <CardContent className="p-0">
                    {
                  <div className="relative overflow-hidden">
                  <img 
                    src={event.cover_image || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop"} 
                    alt={event.title}
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none transition-colors duration-300 group-hover:bg-gray-700 group-hover:bg-opacity-90"
                  />
                  
                  {/* Event Actions */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className={`w-8 h-8 rounded-full backdrop-blur-sm ${
                        false // event.liked (not implemented)
                          ? 'bg-red-500/80 text-white' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                      onClick={(e) => toggleLike(event.id, e)}
                    >
                      <Heart className="w-4 h-4" fill={false ? 'currentColor' : 'none'} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Sharing event ${event.id}`);
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
                          <span>{event.date ? new Date(event.date).toLocaleDateString() : event.scheduled_at ? new Date(event.scheduled_at).toLocaleDateString() : ''}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.address || 'TBA'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees || 0}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {(event.tags || []).map((tag: string, index: number) => (
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
}
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
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
