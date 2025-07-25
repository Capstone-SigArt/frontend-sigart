import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Calendar, MapPin, Users, Heart, Share2, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ModernNavigation from '@/components/ModernNavigation';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const Index = () => {
  const [searchFilters, setSearchFilters] = useState({
    title: '',
    tags: '',
    host: '',
    eventStatus: 'all' // 'all', 'upcoming_active', 'past'
  });
  const [events, setEvents] = useState<any[]>([]);
  const [allEvents, setAllEvents] = useState<any[]>([]); // Store all fetched events
  const [displayedEvents, setDisplayedEvents] = useState<any[]>([]); // Events currently being displayed
  const [eventsToShow, setEventsToShow] = useState(15); // Number of events to display
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch events from backend with status filter
  useEffect(() => {
    const fetchParties = async () => {
      setLoading(true);
      try {
        const statusParam = searchFilters.eventStatus !== 'all' ? `?status=${searchFilters.eventStatus}` : '';
        const response = await fetch(`${API_BASE_URL}/parties${statusParam}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        // Fetch additional data for each event
        const dataWithDetails = await Promise.all(
            data.map(async (event) => {
              try {
              // Fetch attendee count
                const countRes = await fetch(`${API_BASE_URL}/myParties/count/${event.id}`);
                const { count } = await countRes.json();
              
              // Fetch tags for this party
              const tagsRes = await fetch(`${API_BASE_URL}/tags/partyTags?party_id=${event.id}`);
              const tags = await tagsRes.json();
              
              // Return enhanced event with attendees and tags
              return { 
                ...event, 
                attendees: count,
                tags: tags.map((t) => t.name) 
              };
            } catch (err) {
              console.error(`Error fetching details for event ${event.id}:`, err);
              return { ...event, attendees: 0, tags: [] };
              }
            })
        );

        setAllEvents(dataWithDetails);
        setEvents(dataWithDetails);
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
  }, [searchFilters.eventStatus]);

  // Apply client-side filters (title, tags, host)
  useEffect(() => {
    const { title, tags, host } = searchFilters;
    
    // Only filter if we have any filter criteria
    if (title.trim() || tags.trim() || host.trim()) {
    const filtered = allEvents.filter(event => {
        // Title filter
        const matchesTitle = !title.trim() || 
          (event.title && event.title.toLowerCase().includes(title.toLowerCase()));
        
        // Tags filter (check if any tag includes the search text)
        const matchesTags = !tags.trim() || 
          (event.tags && Array.isArray(event.tags) && 
           event.tags.some(tag => tag.toLowerCase().includes(tags.toLowerCase())));
        
        // Host filter - check hostProfile.full_name or hostProfile.username
        const matchesHost = !host.trim() || 
          (event.hostProfile && event.hostProfile.full_name && 
           event.hostProfile.full_name.toLowerCase().includes(host.toLowerCase())) ||
          (event.hostProfile && event.hostProfile.username && 
           event.hostProfile.username.toLowerCase().includes(host.toLowerCase()));
        
      return matchesTitle && matchesTags && matchesHost;
    });
    setEvents(filtered);
    } else {
      // If no filters, show all events
      setEvents(allEvents);
    }
    
    // Reset pagination when filters change
    setEventsToShow(15);
  }, [searchFilters.title, searchFilters.tags, searchFilters.host, allEvents]);

  // Update displayed events when events or eventsToShow changes
  useEffect(() => {
    setDisplayedEvents(events.slice(0, eventsToShow));
  }, [events, eventsToShow]);

  // Load more events handler
  const handleLoadMore = () => {
    setEventsToShow(prev => prev + 15);
  };

  const toggleLike = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Like functionality would be implemented here
    console.log(`Toggled like for event ${eventId}`);
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-blue-100 dark:from-blue-900 dark:via-blue-900 dark:to-blue-10 noise-overlay">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-white/80 dark:bg-slate-700/80 border-white/30 text-slate-700 dark:text-slate-300 rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-white/90 dark:hover:bg-slate-600/90 min-w-48"
                >
                  <Calendar className="w-4 h-4" />
                  {searchFilters.eventStatus === 'all' ? 'All Events' : searchFilters.eventStatus === 'upcoming_active' ? 'Upcoming & Active' : 'Past Events'}
                  <ChevronDown className="w-4 h-4" />
            </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-white/30 rounded-xl">
                <DropdownMenuItem 
                  onClick={() => setSearchFilters(prev => ({ ...prev, eventStatus: 'all' }))}
                  className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  All Events
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSearchFilters(prev => ({ ...prev, eventStatus: 'upcoming_active' }))}
                  className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Upcoming & Active
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSearchFilters(prev => ({ ...prev, eventStatus: 'past' }))}
                  className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Past Events
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Remove the Filter button since filtering happens automatically on input change */}
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
              {displayedEvents.map((event) => (
                <Card 
                  key={event.id} 
                  className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 cursor-pointer rounded-2xl overflow-hidden hover:-translate-y-2"
                  onClick={() => handleEventClick(event.id)}
                >
                  <CardContent className="p-0">
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
                    {/*<Button
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
                    </Button>*/}
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
                        
                        {/* Host Info */}
                        {event.hostProfile && (
                          <div className="flex items-center mb-3">
                            <div className="w-5 h-5 rounded-full overflow-hidden bg-slate-300 mr-2">
                              {event.hostProfile.avatar_url ? (
                                <img 
                                  src={event.hostProfile.avatar_url} 
                                  alt={event.hostProfile.username || "Host"}
                                  className="w-full h-full object-cover"
                                />
                              ) : null}
                            </div>
                            <span className="text-white/90 text-sm">
                              Hosted by {event.hostProfile.username || "Unknown"}
                            </span>
                          </div>
                        )}
                    
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
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            {eventsToShow < events.length && (
              <div className="text-center mt-12">
                <Button 
                  variant="outline"
                  onClick={handleLoadMore}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 rounded-xl px-8 py-3 hover:shadow-lg transition-all duration-300"
                >
                  Load More Events
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
