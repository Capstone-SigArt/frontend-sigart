
import React, { useState,useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useParams } from 'react-router-dom';
import ModernNavigation from '@/components/ModernNavigation';
import UploadArtModal from '@/components/UploadArtModal';
import ArtDetailsModal from '@/components/ArtDetailsModal';
import { Textarea } from "@/components/ui/textarea";
import dayjs from 'dayjs';
import {supabase} from "@/lib/supabase.ts";
import { Calendar, Clock, Users, MapPin, Share2, MessageCircle, Heart, MapPinIcon } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL

const EventDetails = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [artDetailsModalOpen, setArtDetailsModalOpen] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [hostData, setHostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error , setError] = useState(null);
  const [hasJoined, setHasJoined] = useState(false);
  const [artworks, setArtworks] = useState([]);
  const [availableCharacters, setAvailableCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [attendeeCount, setAttendeeCount] = useState<number>(0);
  const [partyTags, setPartyTags] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/artwork?party_id=${eventId}`);
        if (!response.ok) throw new Error("Failed to fetch artworks");
        const data = await response.json();

        const enriched = await Promise.all(
            data.map(async (art) => {
              try {
                const res = await fetch(`${API_BASE_URL}/artworkCharacters/${art.id}`);
                const characters = res.ok ? await res.json() : [];
                return { ...art, characters };
              } catch {
                return { ...art, characters: [] };
              }
            })
        );
        setArtworks(enriched);
      } catch (err) {
        console.error("Error fetching artworks:", err);
      }
    };

    if (eventId) fetchArtworks();
  }, [eventId]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/partyCharacters/${eventId}`);
        if (!res.ok) throw new Error("Failed to fetch characters");
        const data = await res.json();

        const uniqueCharacters = Array.from(
            data.reduce((map, char) => {
              const id = String(char.id);
              if (!map.has(id)) {
                map.set(id, char);
              }
              return map;
            }, new Map()).values()
        );

        setAvailableCharacters(uniqueCharacters);
      } catch (err) {
        console.error("Error fetching characters:", err);
      }
    };

    if (eventId) fetchCharacters();
  }, [eventId]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/partyDetails/${eventId}`);
        if(!response.ok) throw new Error('failed to fetch party');
        const data = await response.json();
        setEventData(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load event');
      } finally {
        setLoading(false);
      }
    };
    if(eventId) fetchEvent();
  }, [eventId])

  useEffect(() => {
    const fetchHost = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/profile/${eventData.host_id}`);
        if(!response.ok) throw new Error('failed to fetch host data');
        const data = await response.json();
        setHostData(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load Host data');
      } finally {
        setLoading(false);
      }
    };
    if (eventData?.host_id) fetchHost();
  }, [eventData]);

  // console.log(hostData);
  // console.log(hostData.username)

  useEffect(() => {
    const checkMembership = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const userId = user?.id;
        if (!userId || !eventId) return;

        const response = await fetch(
            `${API_BASE_URL}/partyMember/${userId}/${eventId}`
        );

        if (response.ok) {
          const data = await response.json();
          setHasJoined(!!data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkMembership(); // no need to check userId outside
  }, [eventId]);

  const fetchAttendeeCount = async () => {
    if (!eventId) return;
    try {
      const res = await fetch(`${API_BASE_URL}/myParties/count/${eventId}`);
      if (!res.ok) throw new Error('Failed to fetch attendee count');
      const { count } = await res.json();
      setAttendeeCount(count);
    } catch (err) {
      console.error('Error fetching attendee count:', err);
      setAttendeeCount(0);
    }
  };
  useEffect(() => {


    if (eventId) fetchAttendeeCount();
  }, [eventId]);

  useEffect(() => {
    const fetchPartyTags = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/partyTags?party_id=${eventId}`);
        if (!response.ok) throw new Error('Failed to fetch party tags');
        const data = await response.json();
        console.log("Fetched tags for event", eventId, data); // <--
        setPartyTags(data);
      } catch (err) {
        console.error('Error fetching party tags:', err);
      }
    };

    if (eventId) fetchPartyTags();
  }, [eventId]);


  console.log("Event ID from URL:", eventId);
  console.log(eventData);
  /*  Mock event data
    const eventData = {
      title: "Test Party at [game server][location]",
      hostName: "Host Name",
      dateTime: "Date/Time",
      description: "Description",
      theme: "Theme",
      tags: ["Tag 1", "Tag 2", "Tag 3"]
    };*/

  // Mock attendees data
  const attendees = [
    { id: 1, name: "Artist", info: "Art Title 1 2 hrs ago", avatar: "" },
    { id: 2, name: "Artist", info: "Art Title 1 2 hrs ago", avatar: "" },
    { id: 3, name: "Artist", info: "Art Title 1 2 hrs ago", avatar: "" },
    { id: 4, name: "Artist", info: "Art Title 1 2 hrs ago", avatar: "" }
  ];

  const handleUploadArt = (artData: any) => {
    console.log('Art uploaded:', artData);

    setUploadModalOpen(false);
    window.location.reload();
    // Handle art upload logic here
  };

  const fetchUsernameById = async (userId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/profile/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch profile');
      const data = await res.json();
      return data.username || userId;
    } catch (err) {
      console.error('Error fetching username:', err);
      return userId; // fallback
    }
  };

  /*const handleArtClick = (attendee: any) => {
    // Mock art data for the details modal
    const mockArtData = {
      title: "Art Title",
      artist: attendee.name,
      uploadDate: "1/1/25",
      toolsUsed: "Procreate",
      tags: ["#pixelart", "#doodle"],
      additionalNotes: "5 minute sketch",
      likes: 23,
      taggedCharacters: ["Character 1", "Character 2", "Character 3"],
      imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262",
      referenceImageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262"
    };
    setSelectedArt(mockArtData);
    setArtDetailsModalOpen(true);
  };*/

  const handleJoinLeave = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const userId = user.id;
      if (!userId || !eventId) return;

      if (!hasJoined) {
        const response = await fetch(`${API_BASE_URL}/partyMember`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: userId,
            party_id: eventId,
            role: 'member',
            joined_at: new Date().toISOString(),
          }),
        });
        if (!response.ok) throw new Error('Failed to join event');
        setHasJoined(true);
      } else {
        const response = await fetch(`${API_BASE_URL}/partyMember`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: userId,
            party_id: eventId,
          }),
        });
        if (!response.ok) throw new Error('Failed to leave event');
        setHasJoined(false);
      }

      // Refresh attendee count after join/leave action
      await fetchAttendeeCount();
    } catch (error) {
      console.error(error);
      alert(`Could not ${hasJoined ? 'leave' : 'join'} the event`);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading event...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!eventData) return null; // just in case
  if(!hostData) return null;

  const bannerUrl = eventData.cover_image?.trim()
      ? eventData.cover_image.trim()
      : "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop";
  return (

      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-blue-100 dark:from-blue-900 dark:via-blue-900 dark:to-blue-10 noise-overlay">
        <ModernNavigation
            title="Event Details"
            subtitle="Join the creative gathering"
        />

        {/* Event Details Content */}
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl mb-0">

            <div className="relative h-64 rounded-t-2xl overflow-hidden">
              <img
                  src={eventData.cover_image}
                  alt={eventData.title}
                  className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-4 right-4 flex gap-2">
                {/* Share, Message, etc. */}

              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                  {eventData.title}
                </h1>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border-2 border-white/30">
                    <AvatarImage src={hostData.avatar_url || ""} />
                    <AvatarFallback className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white">
                      {hostData.username?.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-medium drop-shadow">Hosted by {hostData.username}</p>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-8">
              {/* Event Header */}
              <div className="mb-6">
                {/* Event Details Form */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-sky-50 to-emerald-50 dark:from-sky-900/20 dark:to-emerald-900/20 rounded-xl">
                    <Calendar className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Date</p>
                      <p className="font-semibold">{dayjs(eventData.date).format("dddd, MMM D, YYYY")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-sky-50 to-emerald-50 dark:from-sky-900/20 dark:to-emerald-900/20 rounded-xl">
                    <Clock className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Time</p>
                      <p className="font-semibold">
                        {eventData.start_time
                            ? dayjs(`1970-01-01T${eventData.start_time}`).format("h:mm A")
                            : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-sky-50 to-emerald-50 dark:from-sky-900/20 dark:to-emerald-900/20 rounded-xl">
                    <Users className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Attendees</p>
                      <p className="font-semibold">{attendeeCount}</p>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    <h3 className="font-semibold text-lg">Location</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 bg-white/60 dark:bg-slate-700/60 p-3 rounded-xl">
                    {eventData.address}
                  </p>
                </div>
                {/* Description */}
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">About this Event</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {eventData.description}
                  </p>
                </div>


                {/* Tags and Action Buttons */}
                <div className="mb-8">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Theme: </span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">{eventData.theme}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(partyTags) && partyTags.map((tag, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className="bg-gradient-to-r from-sky-100 to-emerald-100 dark:from-sky-900/30 dark:to-emerald-900/30 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-600"
                        >
                          {tag.name}
                        </Badge>
                    ))}
                  </div>
                </div>

                {/* Join Button */}
                <div className="flex justify-center mb-8">
                  <Button
                      onClick={handleJoinLeave}
                      className={`px-8 py-3 rounded-xl shadow-lg transition-all duration-300 ${
                          hasJoined
                              ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white'
                              : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white'
                      }`}
                  >
                    {hasJoined ? 'Leave Event' : 'Join Event'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-5xl mx-auto px-4 pt-2 pb-2">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl">
            <CardContent className="p-8">
              {/* Event Gallery Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  Event Gallery
                </h3>
                <div className="flex items-center gap-3">

                  <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                    Upload your masterpiece!
                  </span>

                  <Button
                      onClick={() => setUploadModalOpen(true)}
                     className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white rounded-xl shadow-lg px-6"
                  >
                    Upload Art
                  </Button>
                </div>
              </div>
              {/*Character filter mapping*/}
              {availableCharacters.length > 0 && (
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Filter by Character:</span>
                    <select
                        value={selectedCharacter || ""}
                        onChange={(e) => setSelectedCharacter(e.target.value || null)}
                        className="bg-white dark:bg-slate-700 text-slate-700 dark:text-white border rounded-md px-3 py-1"
                    >
                      <option value="">All</option>
                      {availableCharacters.map((char) => (
                          <option key={char.id} value={char.id}>
                            {char.name}
                          </option>
                      ))}
                    </select>

                  </div>
              )}
              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Top Row - Attendees with avatars */}
                {artworks
                    .filter((art) => {
                      if (!selectedCharacter) return true;
                      return art.characters?.some((char) => String(char.id) === selectedCharacter);
                    })
                    .map((art) => (
                        <Card
                            key={art.id}
                            className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm border-white/30 shadow-lg rounded-2xl cursor-pointer hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-300 hover:scale-105"
                            onClick={async () => {
                              const username = await fetchUsernameById(art.uploader_id)
                              setSelectedArt({
                                id:art.id,
                                title: art.title || 'Untitled',
                                artist: username,
                                uploader_id: art.uploader_id,
                                uploadDate: dayjs(art.created_at).format('MMM D, YYYY'),
                                toolsUsed: art.tools_used,
                                tags: [],
                                additionalNotes: art.notes,
                                likes: 0,
                                taggedCharacters: [],
                                imageUrl: art.image_url,
                                referenceImageUrl: art.reference_url
                              });
                              setArtDetailsModalOpen(true);
                            }}
                        >
                      <CardContent className="p-0">
                        <img
                            src={art.image_url}
                            alt="Uploaded artwork"
                            className="w-full h-48 object-cover rounded-t-2xl"
                        />
                        <div className="p-4">
                          <h4 className="text-md font-semibold text-slate-700 dark:text-slate-200 truncate">
                            {art.notes || "Untitled"}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Uploaded on {dayjs(art.created_at).format("MMM D, YYYY")}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                ))}

                {/* Bottom Row - Empty slots */}
                {[1, 2, 3, 4].map((slot) => (
                      
                    <Card key={`empty-${slot}`} className="bg-white/40 dark:bg-slate-700/40 backdrop-blur-sm border-white/30 shadow-lg rounded-2xl">
                      <CardContent className="p-6">
                        <div className="h-32 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900/20 dark:to-blue-900/20 rounded-xl border-2 border-dashed border-sky-300 dark:border-sky-600 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mb-1">
                              Empty slot
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              Waiting for artist
                            </div>
                            
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>


        {/* Modals */}
        <UploadArtModal
            open={uploadModalOpen}
            onOpenChange={setUploadModalOpen}
            onUpload={handleUploadArt}
            eventId={eventId}
        />

        <ArtDetailsModal
            open={artDetailsModalOpen}
            onOpenChange={setArtDetailsModalOpen}
            artData={selectedArt}
        />
      </div>
  );
};

export default EventDetails;