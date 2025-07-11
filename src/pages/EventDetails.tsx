
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

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/artwork?party_id=${eventId}`);
        if (!response.ok) throw new Error("Failed to fetch artworks");
        const data = await response.json();
        setArtworks(data);
      } catch (err) {
        console.error("Error fetching artworks:", err);
      }
    };

    if (eventId) fetchArtworks();
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

  const handleJoinLeave = async() => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const userId = user.id
      if(!userId || !eventId) return;

      if (!hasJoined) {
        const response = await fetch(`${API_BASE_URL}/partyMember`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: userId,
            party_id: eventId,
            role: 'member',
            joined_at: new Date().toISOString()
          })
        });
        if (!response.ok) throw new Error('Failed to join event');
        setHasJoined(true);
      } else {
        const response = await fetch(`${API_BASE_URL}/partyMember`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: userId,
            party_id: eventId
          })
        });
        if (!response.ok) throw new Error('Failed to leave event');
        setHasJoined(false);
      }
    } catch (error) {
      console.error(error);
      alert(`Could not ${hasJoined ? 'leave' : 'join'} the event`);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading event...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!eventData) return null; // just in case
  if(!hostData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-green-100 dark:from-sky-900 dark:via-emerald-900 dark:to-green-900">
      <ModernNavigation 
        title="Event Details" 
        subtitle="Join the creative gathering"
      />

      {/* Event Details Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl">
          <CardContent className="p-8">
            {/* Event Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent mb-6">
                {eventData.title}
              </h2>
              
              {/* Banner/Flyer Image Placeholder */}
              {/* Actual Banner Image */}
              <div className="w-full h-48 mb-8 overflow-hidden rounded-2xl border-2 border-sky-300 dark:border-sky-600">
                <img
                    src={eventData.cover_image}
                    alt="Event Banner"
                    className="w-full h-full object-cover"
                />
              </div>


              {/* Event Details Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="space-y-2">
                  <Label htmlFor="hostName" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Host Name</Label>
                  <Input
                    id="hostName"
                    value={hostData.username}
                    readOnly
                    className="bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateTime" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Date/Time</Label>
                  <Input 
                    id="dateTime"
                    value={`${eventData.date} at ${eventData.start_time}`}
                    readOnly 
                    className="bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Description</Label>
                  <Input
                      id="description"
                      value={eventData.description}
                      readOnly
                      className="bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Theme</Label>
                  <Input 
                    id="theme" 
                    value={eventData.theme} 
                    readOnly 
                    className="bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Tags and Action Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="flex flex-wrap gap-3">
                  {/*{eventData.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-sky-100 to-emerald-100 dark:from-sky-900/30 dark:to-emerald-900/30 text-sky-700 dark:text-sky-300 rounded-full text-sm font-medium border border-sky-200 dark:border-sky-600"
                    >
                      {tag}
                    </span>
                  ))}*/}
                </div>
                <Button
                    onClick={handleJoinLeave}
                    className={`${
                        hasJoined
                            ? 'bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600'
                            : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600'
                    } text-white rounded-xl shadow-lg px-6`}
                >
                  {hasJoined ? 'Leave Event' : 'Join Event'}
                </Button>
              </div>
            </div>

            {/* Event Gallery Section */}
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                  Event Gallery
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                    Upload your masterpiece!
                  </span>
                  <Button 
                    onClick={() => setUploadModalOpen(true)}
                    className="bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white rounded-xl shadow-lg px-6"
                  >
                    Upload Art
                  </Button>
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Top Row - Attendees with avatars */}
                {artworks.map((art) => (
                    <Card
                        key={art.id}
                        className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm border-white/30 shadow-lg rounded-2xl cursor-pointer hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-300 hover:scale-105"
                        onClick={async () => {
                          const username = await fetchUsernameById(art.uploader_id)
                          setSelectedArt({
                            id:art.id,
                            title: art.notes || 'Untitled',
                            artist: username,
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
                      <div className="h-32 bg-gradient-to-br from-sky-100 to-emerald-100 dark:from-sky-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-dashed border-sky-300 dark:border-sky-600 flex items-center justify-center">
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
