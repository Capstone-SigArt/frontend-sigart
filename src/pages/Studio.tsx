import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Settings, Users, Calendar, Star, Eye, Heart, MessageCircle, User, Loader2 } from 'lucide-react';
import ModernNavigation from '@/components/ModernNavigation';
import UploadArtModal from '@/components/UploadArtModal';
import ArtDetailsModal from '@/components/ArtDetailsModal';
import EditProfileModal from '@/components/EditProfileModal';
import { useProfile, useUserStats, useUserArtworks, useUserEvents, useEnsureProfile } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';
import { parseSpecialties, getDefaultSpecialties } from '@/lib/specialties';

const Studio = () => {
  const { user } = useAuth();
  const { profile, isLoading: isLoadingProfile } = useProfile();
  const { artworkCount, isLoadingArtwork } = useUserStats();
  const { artworks, isLoading: isLoadingArtworks } = useUserArtworks();
  const { events, isLoading: isLoadingEvents } = useUserEvents();
  const { isChecking } = useEnsureProfile();
  
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showArtModal, setShowArtModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);

  // Loading state
  if (isLoadingProfile || isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-green-100 dark:from-sky-900 dark:via-emerald-900 dark:to-green-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-sky-600" />
          <p className="text-slate-600 dark:text-slate-300">Loading your studio...</p>
        </div>
      </div>
    );
  }

  // Profile data with fallbacks
  const profileData = {
    username: profile?.username || user?.email?.split('@')[0] || 'Unknown User',
    characterName: profile?.full_name || profile?.username || 'Artist Name',
    bio: profile?.about || 'Welcome to my art studio! I love creating digital artwork and sharing my creative journey.',
    avatarUrl: profile?.avatar_url,
    joinDate: profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    }) : 'Recently'
  };

  // Parse specialties from profile with fallback
  const specialties = profile?.specialties 
    ? parseSpecialties(profile.specialties)
    : getDefaultSpecialties();

  const handleArtClick = (artwork) => {
    setSelectedArt(artwork);
    setShowArtModal(true);
  };

  const handleUpload = (artData) => {
    console.log('Uploading art:', artData);
    // Handle the upload logic here
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-slate-300">
      <ModernNavigation 
        title="My Studio" 
        subtitle="Showcase your artistic journey"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/80 backdrop-blur-sm border border-blue-500/30 shadow-xl shadow-blue-500/10 rounded-2xl sticky top-8">
              <CardHeader className="text-center pb-4">
                <Avatar className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] ring-2 ring-blue-500/30 ring-offset-2 ring-offset-slate-800">
                  {profileData.avatarUrl ? (
                    <AvatarImage src={profileData.avatarUrl} alt={profileData.characterName} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] text-white text-2xl">
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <CardTitle className="text-xl bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] bg-clip-text text-transparent">
                  {profileData.characterName}
                </CardTitle>
                <p className="text-sm text-slate-300">
                  @{profileData.username}
                </p>
                <p className="text-sm text-slate-400">
                  Member since {profileData.joinDate}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-slate-900/50 border border-blue-500/30 rounded-xl">
                    <div className="text-lg font-bold text-[#38bdf8]">
                      {isLoadingArtwork ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : artworkCount}
                    </div>
                    <div className="text-xs text-slate-300">Artworks</div>
                  </div>
                  <div className="p-3 bg-slate-900/50 border border-blue-500/30 rounded-xl">
                    <div className="text-lg font-bold text-[#f59e0b]">0</div>
                    <div className="text-xs text-slate-300">Likes</div>
                  </div>
                  <div className="p-3 bg-slate-900/50 border border-blue-500/30 rounded-xl">
                    <div className="text-lg font-bold text-[#38bdf8]">0</div>
                    <div className="text-xs text-slate-300">Followers</div>
                  </div>
                  <div className="p-3 bg-slate-900/50 border border-blue-500/30 rounded-xl">
                    <div className="text-lg font-bold text-[#f59e0b]">0</div>
                    <div className="text-xs text-slate-300">Following</div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full rounded-xl border-blue-500/30 bg-slate-900/50 text-[#38bdf8] hover:bg-slate-800 hover:text-[#f59e0b] transition-all duration-300"
                  onClick={handleEditProfile}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-slate-800/80 backdrop-blur-sm border border-blue-500/30 shadow-xl shadow-blue-500/10 rounded-2xl hover:shadow-2xl hover:shadow-[#38bdf8]/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-300">4.8</h3>
                  <p className="text-sm text-slate-400">Average Rating</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/80 backdrop-blur-sm border border-blue-500/30 shadow-xl shadow-blue-500/10 rounded-2xl hover:shadow-2xl hover:shadow-[#38bdf8]/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-300">
                    {isLoadingEvents ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : events.length}
                  </h3>
                  <p className="text-sm text-slate-400">Parties Joined</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/80 backdrop-blur-sm border border-blue-500/30 shadow-xl shadow-blue-500/10 rounded-2xl hover:shadow-2xl hover:shadow-[#38bdf8]/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-300">
                    {specialties.length}
                  </h3>
                  <p className="text-sm text-slate-400">Specialties</p>
                </CardContent>
              </Card>
            </div>

            {/* Artwork Gallery */}
            <Card className="bg-slate-800/80 backdrop-blur-sm border border-blue-500/30 shadow-xl shadow-blue-500/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] bg-clip-text text-transparent">
                  My Artwork Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingArtworks ? (
                  <div className="flex items-center justify-center h-48">
                    <Loader2 className="w-8 h-8 animate-spin text-[#38bdf8]" />
                  </div>
                ) : artworks.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-400 mb-4">
                      No artworks uploaded yet
                    </p>
                    <Button 
                      onClick={() => setShowUploadModal(true)}
                      className="bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] hover:opacity-90 text-white rounded-xl py-3 shadow-lg shadow-blue-500/20 transition-all duration-300"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Upload Your First Artwork
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {artworks.map((artwork, index) => (
                      <div 
                        key={index}
                        className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-blue-500/30 hover:border-[#38bdf8] transition-all duration-300"
                        onClick={() => handleArtClick(artwork)}
                      >
                        <img 
                          src={artwork.image_url} 
                          alt={artwork.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h4 className="text-white font-semibold mb-2">{artwork.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-slate-300">
                              <div className="flex items-center">
                                <Heart className="w-4 h-4 mr-1" />
                                <span>0</span>
                              </div>
                              <div className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                <span>0</span>
                              </div>
                              <div className="flex items-center">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                <span>0</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showUploadModal && (
        <UploadArtModal
          open={showUploadModal}
          onOpenChange={(open) => setShowUploadModal(open)}
          onUpload={handleUpload}
          eventId=""
        />
      )}
      {showArtModal && selectedArt && (
        <ArtDetailsModal
          open={showArtModal}
          onOpenChange={(open) => setShowArtModal(open)}
          artData={selectedArt}
        />
      )}
      {isEditModalOpen && (
        <EditProfileModal
          open={isEditModalOpen}
          onOpenChange={(open) => setIsEditModalOpen(open)}
          profile={profile}
        />
      )}
    </div>
  );
};

export default Studio;