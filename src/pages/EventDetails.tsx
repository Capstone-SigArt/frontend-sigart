
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useParams } from 'react-router-dom';
import ModernNavigation from '@/components/ModernNavigation';
import UploadArtModal from '@/components/UploadArtModal';
import ArtDetailsModal from '@/components/ArtDetailsModal';

const EventDetails = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [artDetailsModalOpen, setArtDetailsModalOpen] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);
  const navigate = useNavigate();
  const { eventId } = useParams();

  // Mock event data
  const eventData = {
    title: "Test Party at [game server][location]",
    hostName: "Host Name",
    dateTime: "Date/Time",
    description: "Description",
    theme: "Theme",
    tags: ["Tag 1", "Tag 2", "Tag 3"]
  };

  // Mock attendees data
  const attendees = [
    { id: 1, name: "Artist", info: "Art Title 1 2 hrs ago", avatar: "" },
    { id: 2, name: "Artist", info: "Art Title 1 2 hrs ago", avatar: "" },
    { id: 3, name: "Artist", info: "Art Title 1 2 hrs ago", avatar: "" },
    { id: 4, name: "Artist", info: "Art Title 1 2 hrs ago", avatar: "" }
  ];

  const handleUploadArt = (artData: any) => {
    console.log('Art uploaded:', artData);
    // Handle art upload logic here
  };

  const handleArtClick = (attendee: any) => {
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
  };

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
              <div className="w-full h-48 bg-gradient-to-br from-sky-100 to-emerald-100 dark:from-sky-900/30 dark:to-emerald-900/30 border-2 border-dashed border-sky-300 dark:border-sky-600 rounded-2xl flex items-center justify-center mb-8">
                <div className="text-center">
                  <div className="text-xl font-medium text-sky-600 dark:text-sky-400 mb-2">
                    Banner/Flyer Image for party
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Event promotional image will appear here
                  </div>
                </div>
              </div>

              {/* Event Details Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="space-y-2">
                  <Label htmlFor="hostName" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Host Name</Label>
                  <Input 
                    id="hostName" 
                    value={eventData.hostName} 
                    readOnly 
                    className="bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateTime" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Date/Time</Label>
                  <Input 
                    id="dateTime" 
                    value={eventData.dateTime} 
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
                  {eventData.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-sky-100 to-emerald-100 dark:from-sky-900/30 dark:to-emerald-900/30 text-sky-700 dark:text-sky-300 rounded-full text-sm font-medium border border-sky-200 dark:border-sky-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button 
                  className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl shadow-lg px-6"
                >
                  Join/Leave
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
                {attendees.map((attendee) => (
                  <Card 
                    key={attendee.id} 
                    className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm border-white/30 shadow-lg rounded-2xl cursor-pointer hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-300 hover:scale-105"
                    onClick={() => handleArtClick(attendee)}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center space-y-4">
                        <Avatar className="w-20 h-20 border-4 border-sky-200 dark:border-sky-600">
                          <AvatarImage src={attendee.avatar} />
                          <AvatarFallback className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-lg font-bold">
                            {attendee.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                          <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            {attendee.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {attendee.info}
                          </p>
                        </div>
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
