
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Heart, Share2, MessageCircle } from 'lucide-react';
import ModernNavigation from '@/components/ModernNavigation';
import UploadArtModal from '@/components/UploadArtModal';
import ArtDetailsModal from '@/components/ArtDetailsModal';

const CommunityPartyDetails = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [artDetailsModalOpen, setArtDetailsModalOpen] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  const { partyId } = useParams();

  // Mock party data
  const partyData = {
    title: "Midnight Art Jam - Crystal DC",
    hostName: "ArtistMaster",
    hostAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    date: "December 15, 2024",
    time: "11:00 PM EST",
    location: "Crystal - Balmung - Mist Ward 12, Plot 30",
    description: "Join us for a late-night creative session! Bring your inspiration and let's create some amazing art together under the stars.",
    category: "Digital Art",
    theme: "Starlight Dreams",
    maxAttendees: 20,
    currentAttendees: 12,
    tags: ["Digital Art", "Fantasy", "Community", "Beginner Friendly"],
    likes: 145,
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=400&fit=crop"
  };

  // Mock attendees data
  const attendees = [
    { id: 1, name: "PixelPainter", info: "Cosmic Warrior 3 hrs ago", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" },
    { id: 2, name: "DreamWeaver", info: "Starlight Mage 5 hrs ago", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    { id: 3, name: "ColorMage", info: "Crystal Guardian 1 hr ago", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
    { id: 4, name: "ArtNinja", info: "Shadow Dancer 2 hrs ago", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" }
  ];

  const handleUploadArt = (artData: any) => {
    console.log('Art uploaded:', artData);
  };

  const handleArtClick = (attendee: any) => {
    const mockArtData = {
      title: attendee.info.split(' ')[0] + " " + attendee.info.split(' ')[1],
      artist: attendee.name,
      uploadDate: "12/15/24",
      toolsUsed: "Procreate, Photoshop",
      tags: ["#fantasy", "#starlight", "#community"],
      additionalNotes: "Inspired by the party theme",
      likes: Math.floor(Math.random() * 50) + 10,
      taggedCharacters: ["Character 1", "Character 2"],
      imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262",
      referenceImageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262"
    };
    setSelectedArt(mockArtData);
    setArtDetailsModalOpen(true);
  };

  const toggleJoin = () => {
    setIsJoined(!isJoined);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-green-100 dark:from-sky-900 dark:via-emerald-900 dark:to-green-900">
      <ModernNavigation 
        title="Community Party" 
        subtitle="Join the creative gathering"
      />

      {/* Party Details Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Main Party Card */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl mb-8">
          <CardContent className="p-0">
            {/* Cover Image */}
            <div className="relative h-64 rounded-t-2xl overflow-hidden">
              <img 
                src={partyData.coverImage} 
                alt={partyData.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Action Buttons Overlay */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className={`w-10 h-10 rounded-full backdrop-blur-sm ${
                    isLiked 
                      ? 'bg-red-500/80 text-white' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  onClick={toggleLike}
                >
                  <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white">
                  {partyData.category}
                </Badge>
              </div>

              {/* Title and Host Info */}
              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                  {partyData.title}
                </h1>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border-2 border-white/30">
                    <AvatarImage src={partyData.hostAvatar} />
                    <AvatarFallback className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white">
                      {partyData.hostName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-medium drop-shadow">Hosted by {partyData.hostName}</p>
                    <p className="text-white/80 text-sm drop-shadow">{partyData.likes} likes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Party Info */}
            <div className="p-8">
              {/* Date, Time, Location Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-sky-50 to-emerald-50 dark:from-sky-900/20 dark:to-emerald-900/20 rounded-xl">
                  <Calendar className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Date</p>
                    <p className="font-semibold">{partyData.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-sky-50 to-emerald-50 dark:from-sky-900/20 dark:to-emerald-900/20 rounded-xl">
                  <Clock className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Time</p>
                    <p className="font-semibold">{partyData.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-sky-50 to-emerald-50 dark:from-sky-900/20 dark:to-emerald-900/20 rounded-xl">
                  <Users className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Attendees</p>
                    <p className="font-semibold">{partyData.currentAttendees}/{partyData.maxAttendees}</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  <h3 className="font-semibold text-lg">Location</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 bg-white/60 dark:bg-slate-700/60 p-3 rounded-xl">
                  {partyData.location}
                </p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">About this Party</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {partyData.description}
                </p>
              </div>

              {/* Theme and Tags */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Theme: </span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{partyData.theme}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {partyData.tags.map((tag, index) => (
                    <Badge 
                      key={index}
                      variant="secondary"
                      className="bg-gradient-to-r from-sky-100 to-emerald-100 dark:from-sky-900/30 dark:to-emerald-900/30 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-600"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Join Button */}
              <div className="flex justify-center">
                <Button 
                  onClick={toggleJoin}
                  className={`px-8 py-3 rounded-xl shadow-lg transition-all duration-300 ${
                    isJoined
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white'
                      : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white'
                  }`}
                >
                  {isJoined ? 'Leave Party' : 'Join Party'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Party Gallery Section */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl">
          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                Party Gallery
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                  Share your art!
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

              {/* Empty slots */}
              {Array.from({ length: Math.max(0, 8 - attendees.length) }).map((_, index) => (
                <Card key={`empty-${index}`} className="bg-white/40 dark:bg-slate-700/40 backdrop-blur-sm border-white/30 shadow-lg rounded-2xl">
                  <CardContent className="p-6">
                    <div className="h-32 bg-gradient-to-br from-sky-100 to-emerald-100 dark:from-sky-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-dashed border-sky-300 dark:border-sky-600 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mb-1">
                          Open Slot
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Join to claim
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
      />
      
      <ArtDetailsModal
        open={artDetailsModalOpen}
        onOpenChange={setArtDetailsModalOpen}
        artData={selectedArt}
      />
    </div>
  );
};

export default CommunityPartyDetails;
