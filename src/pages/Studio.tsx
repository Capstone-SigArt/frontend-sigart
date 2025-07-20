import React, { useState,useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Settings, Users, Calendar, Star, Eye, Heart, MessageCircle, User, Loader2 } from 'lucide-react';
import ModernNavigation from '@/components/ModernNavigation';
import UploadArtModal from '@/components/UploadArtModal';
import ArtDetailsModal from '@/components/ArtDetailsModal';
import EditProfileModal from '@/components/EditProfileModal';
import { useProfile, useUserStats, useUserArtworks, useUserEvents,useUserLikesById, useEnsureProfile } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';
import { parseSpecialties, getDefaultSpecialties } from '@/lib/specialties';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL

const Studio = () => {
  const { user } = useAuth();
  const { profile, isLoading: isLoadingProfile } = useProfile();
  const { artworkCount, isLoadingArtwork } = useUserStats();
  const { artworks, isLoading: isLoadingArtworks } = useUserArtworks();
  const { likesCount: totalLikes, isLoadingLikes } = useUserLikesById(user?.id);
  const { events, isLoading: isLoadingEvents } = useUserEvents();
  const { isChecking } = useEnsureProfile();
  
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showArtModal, setShowArtModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isLoadingFollowCounts, setIsLoadingFollowCounts] = useState(true);

  useEffect(() => {
    async function fetchFollowCounts() {
      if (!profile?.id) return;
      setIsLoadingFollowCounts(true);
      try {
        const res = await fetch(`${API_BASE_URL}/follows/counts/${profile.id}`);
        if (!res.ok) throw new Error('Failed to fetch follow counts');
        const data = await res.json();
        setFollowerCount(data.followerCount ?? 0);
        setFollowingCount(data.followingCount ?? 0);
      } catch (error) {
        console.error('Error fetching follow counts:', error);
        setFollowerCount(0);
        setFollowingCount(0);
      } finally {
        setIsLoadingFollowCounts(false);
      }
    }
    fetchFollowCounts();
  }, [profile?.id]);
  // Loading state
  if (isLoadingProfile || isChecking) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-blue-100 dark:from-blue-900 dark:via-blue-900 dark:to-blue-10 noise-overlay">
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
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-blue-100 dark:from-blue-900 dark:via-blue-900 dark:to-blue-10 noise-overlay">
      <ModernNavigation 
        title="My Studio" 
        subtitle="Showcase your artistic journey"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl sticky top-8">
              <CardHeader className="text-center pb-4">
                <Avatar className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-sky-500 to-blue-500">
                  {profileData.avatarUrl ? (
                    <AvatarImage src={profileData.avatarUrl} alt={profileData.characterName} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-r from-sky-500 to-blue-500 text-white text-2xl">
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <CardTitle className="text-xl bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  {profileData.characterName}
                </CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  @{profileData.username}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Member since {profileData.joinDate}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-sky-50 dark:bg-sky-900/20 rounded-xl">
                    <div className="text-lg font-bold text-sky-600">
                      {isLoadingArtwork ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : artworkCount}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300">Artworks</div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <div className="text-lg font-bold text-blue-600"> {isLoadingArtworks ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : totalLikes}</div>

                    <div className="text-xs text-slate-600 dark:text-slate-300">Likes</div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <div className="text-lg font-bold text-green-600">
                      {isLoadingFollowCounts ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : followerCount}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300">Followers</div>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
                    <div className="text-lg font-bold text-slate-600">
                      {isLoadingFollowCounts ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : followingCount}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300">Following</div>
                  </div>
                </div>
                {/*<Button
                  onClick={() => setShowUploadModal(true)}
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white rounded-xl shadow-lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Upload New Art
                </Button>*/}
                <Button 
                  variant="outline" 
                  className="w-full rounded-xl border-sky-200 hover:bg-sky-50 dark:border-sky-600 dark:text-sky-400 dark:hover:bg-sky-900/30"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/*<Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300">4.8</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Average Rating</p>
                </CardContent>
              </Card>*/}
              
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300">
                    {isLoadingEvents ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : events.length}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Parties Joined</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300">
                    {specialties.length}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Specialties</p>
                </CardContent>
              </Card>
            </div>

            {/* Artwork Gallery */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  My Recent Artwork Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingArtworks ? (
                  <div className="flex items-center justify-center h-48">
                    <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
                  </div>
                ) : artworks.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-500 dark:text-slate-400 mb-4">
                      No artworks uploaded yet
                    </p>
                    <Button 
                      onClick={() => setShowUploadModal(true)}
                      className="bg-gradient-to-r from-sky-500 to-blue-500 text-white"
                    >
                      Upload Your First Artwork
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {artworks.map((artwork) => (
                      <div
                        key={artwork.id}
                        className="group cursor-pointer"
                        //TODO decide if we want these artworks to be clickable, if so fix their clicking, doesn't open properly
                        /*onClick={() => handleArtClick(artwork)}*/
                      >
                        <Card className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm border-white/30 shadow-lg rounded-2xl hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-300 group-hover:scale-105">
                          <div className="aspect-square bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30 rounded-t-2xl flex items-center justify-center overflow-hidden">
                            <img 
                              src={artwork.image_url} 
                              alt={artwork.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2 truncate">
                              {artwork.title}
                            </h4>
                            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-1">
                                  <Heart className="w-4 h-4" />
                                  <span>{artwork.likes_count??0}</span>
                                </div>
                                {/*no viewing or commenting functionality thus commented out */}
                                {/*<div className="flex items-center space-x-1">
                                  <Eye className="w-4 h-4" />
                                  <span>0</span>
                                </div>*/}
                                {/*<div className="flex items-center space-x-1">
                                  <MessageCircle className="w-4 h-4" />
                                  <span>0</span>
                                </div>*/}
                              </div>
                            </div>
                            {artwork.notes && (
                              <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                                {artwork.notes}
                              </p>
                            )}
                          </CardContent>
                        </Card>
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
      {/*<UploadArtModal
        open={showUploadModal}
        onOpenChange={setShowUploadModal}
        onUpload={handleUpload}
      />*/}
      
      <ArtDetailsModal
        open={showArtModal}
        onOpenChange={setShowArtModal}
        artData={selectedArt}
      />

      <EditProfileModal 
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        profile={profile}
      />
    </div>
  );
};

export default Studio;