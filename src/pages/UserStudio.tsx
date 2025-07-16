import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Heart, Eye, Calendar, MapPin, Edit, Loader2 } from 'lucide-react';
import ModernNavigation from '@/components/ModernNavigation';
import EditProfileModal from '@/components/EditProfileModal';
import { useProfile, useUserStats, useUserArtworks, useUserEvents, useEnsureProfile } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';
import { parseSpecialties, getDefaultSpecialties } from '@/lib/specialties';
import { useNavigate } from 'react-router-dom';

const UserStudio = () => {
  const { user } = useAuth();
  const { profile, isLoading: isLoadingProfile } = useProfile();
  const { artworkCount, isLoadingArtwork } = useUserStats();
  const { artworks, isLoading: isLoadingArtworks } = useUserArtworks();
  const { events, isLoading: isLoadingEvents } = useUserEvents();
  const { isChecking } = useEnsureProfile();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-slate-300">
      <ModernNavigation 
        title="Artist Studio" 
        subtitle="Showcase your creative journey"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="bg-slate-800/80 backdrop-blur-sm border border-blue-500/30 shadow-xl shadow-blue-500/10 rounded-2xl mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Picture and Basic Info */}
              <div className="flex-shrink-0 text-center lg:text-left">
                <Avatar className="w-32 h-32 mx-auto lg:mx-0 bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] ring-2 ring-blue-500/30 ring-offset-2 ring-offset-slate-800 mb-4">
                  {profileData.avatarUrl ? (
                    <AvatarImage src={profileData.avatarUrl} alt={profileData.characterName} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] text-white text-3xl">
                      <User className="h-16 w-16" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <h2 className="text-2xl font-bold text-slate-300 mb-1">
                  {profileData.characterName}
                </h2>
                <p className="text-[#38bdf8] font-medium mb-2">
                  @{profileData.username}
                </p>

                <p className="text-sm text-slate-400">
                  Joined {profileData.joinDate}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4 border-blue-500/30 bg-slate-900/50 text-[#38bdf8] hover:bg-slate-800 hover:text-[#f59e0b] transition-all duration-300"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              {/* Profile Details */}
              <div className="flex-1 space-y-6">
                {/* Bio */}
                <div>
                  <h3 className="font-semibold text-slate-300 mb-2">About</h3>
                  <p className="text-slate-300 leading-relaxed">
                    {profileData.bio}
                  </p>
                </div>

                {/* Specialties */}
                <div>
                  <h3 className="font-semibold text-slate-300 mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((specialty, index) => (
                      <Badge key={index} className="bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] text-white">
                        #{specialty}
                      </Badge>
                    ))}
                    {!profile?.specialties && (
                      <Badge 
                        variant="outline" 
                        className="border-blue-500/30 bg-slate-900/50 text-[#38bdf8] hover:bg-slate-800 hover:text-[#f59e0b] cursor-pointer transition-all duration-300"
                        onClick={() => setIsEditModalOpen(true)}
                      >
                        Click to customize
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div>
                  <h3 className="font-semibold text-slate-300 mb-3">Stats</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-slate-900/50 border border-blue-500/30 rounded-xl">
                      <div className="text-2xl font-bold text-[#38bdf8]">
                        {isLoadingArtwork ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : artworkCount}
                      </div>
                      <div className="text-sm text-slate-400">Artworks</div>
                    </div>
                    <div className="text-center p-3 bg-slate-900/50 border border-blue-500/30 rounded-xl">
                      <div className="text-2xl font-bold text-[#f59e0b]">0</div>
                      <div className="text-sm text-slate-400">Likes</div>
                    </div>
                    <div className="text-center p-3 bg-slate-900/50 border border-blue-500/30 rounded-xl">
                      <div className="text-2xl font-bold text-[#38bdf8]">0</div>
                      <div className="text-sm text-slate-400">Followers</div>
                    </div>
                    <div className="text-center p-3 bg-slate-900/50 border border-blue-500/30 rounded-xl">
                      <div className="text-2xl font-bold text-[#f59e0b]">0</div>
                      <div className="text-sm text-slate-400">Following</div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="font-semibold text-slate-300 mb-3">Connect</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile?.facebook && (
                      <Badge 
                        variant="outline" 
                        className="border-blue-500/30 bg-slate-900/50 text-[#38bdf8] hover:bg-slate-800 hover:text-[#f59e0b] cursor-pointer transition-all duration-300"
                        onClick={() => window.open(profile.facebook, '_blank')}
                      >
                        Facebook
                      </Badge>
                    )}
                    {profile?.twitter && (
                      <Badge 
                        variant="outline" 
                        className="border-blue-500/30 bg-slate-900/50 text-[#38bdf8] hover:bg-slate-800 hover:text-[#f59e0b] cursor-pointer transition-all duration-300"
                        onClick={() => window.open(profile.twitter, '_blank')}
                      >
                        Twitter/X
                      </Badge>
                    )}
                    {profile?.instagram && (
                      <Badge 
                        variant="outline" 
                        className="border-blue-500/30 bg-slate-900/50 text-[#38bdf8] hover:bg-slate-800 hover:text-[#f59e0b] cursor-pointer transition-all duration-300"
                        onClick={() => window.open(profile.instagram, '_blank')}
                      >
                        Instagram
                      </Badge>
                    )}
                    {!profile?.facebook && !profile?.twitter && !profile?.instagram && (
                      <Badge 
                        variant="outline" 
                        className="border-blue-500/30 bg-slate-900/50 text-[#38bdf8] hover:bg-slate-800 hover:text-[#f59e0b] cursor-pointer transition-all duration-300"
                      >
                        Add Social Links
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Artwork Gallery */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/80 backdrop-blur-sm border border-blue-500/30 shadow-xl shadow-blue-500/10 rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] bg-clip-text text-transparent mb-6">
                  My Artwork
                </h3>

                {isLoadingArtworks ? (
                  <div className="flex items-center justify-center h-48">
                    <Loader2 className="w-8 h-8 animate-spin text-[#38bdf8]" />
                  </div>
                ) : artworks.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-400 mb-4">No artworks uploaded yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {artworks.map((artwork) => (
                      <div 
                        key={artwork.id}
                        className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-blue-500/30 hover:border-[#38bdf8] transition-all duration-300"
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

          {/* Recent Events */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/80 backdrop-blur-sm border border-blue-500/30 shadow-xl shadow-blue-500/10 rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] bg-clip-text text-transparent mb-6">
                  Recent Events
                </h3>

                {isLoadingEvents ? (
                  <div className="flex items-center justify-center h-48">
                    <Loader2 className="w-8 h-8 animate-spin text-[#38bdf8]" />
                  </div>
                ) : events.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-400 mb-4">No events joined yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div 
                        key={event.id}
                        className="p-4 bg-slate-900/50 border border-blue-500/30 rounded-xl hover:bg-slate-800 transition-all duration-300 cursor-pointer"
                        onClick={() => navigate(`/event/${event.id}`)}
                      >
                        <h4 className="font-semibold text-slate-300 mb-2">{event.title}</h4>
                        <div className="flex items-center text-sm text-slate-400 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{event.address}</span>
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

      {/* Edit Profile Modal */}
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

export default UserStudio;
