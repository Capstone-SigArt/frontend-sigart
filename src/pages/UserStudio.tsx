import React, { useState,useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Heart, Eye, Calendar, MapPin, Edit, Loader2 } from 'lucide-react';
import ModernNavigation from '@/components/ModernNavigation';
import { useNavigate } from 'react-router-dom';
import EditProfileModal from '@/components/EditProfileModal';
import {
  useProfile,
  useUserStats,
  useUserArtworks,
  useUserEvents,
  useEnsureProfile,
  useProfileById, useUserStatsById, useUserArtworksById, useUserEventsById, useUserLikesById
} from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';
import { parseSpecialties, getDefaultSpecialties } from '@/lib/specialties';
import {useParams} from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL


const UserStudio = () => {
  const { user } = useAuth();
  const{userId} = useParams();
  const effectiveUserId = userId || user?.id;
  console.log('Route userId param:', userId);
  console.log('Effective userId used for profile fetch:', effectiveUserId);

  const { profile, isLoading: isLoadingProfile } = useProfileById(effectiveUserId);
  console.log('Profile data:', profile);
  const { artworkCount, isLoadingArtwork } = useUserStatsById(effectiveUserId);
  const { artworks, isLoading: isLoadingArtworks } = useUserArtworksById(effectiveUserId);
  const {likesCount, isLoadingLikes} = useUserLikesById(effectiveUserId)
  const { events, isLoading: isLoadingEvents } = useUserEventsById(effectiveUserId);
  const { isChecking } = useEnsureProfile();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isOwnProfile = effectiveUserId === user?.id;
  const [followers, setFollowers] = useState([]);
  const [isLoadingFollowers, setIsLoadingFollowers] = useState(true);
  const [followees, setFollowees] = useState([]);
  const [isLoadingFollowees, setIsLoadingFollowees] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!effectiveUserId) return;

    setIsLoadingFollowers(true);
    fetch(`${API_BASE_URL}/follows/followers/${effectiveUserId}`)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch followers');
          return response.json();
        })
        .then(data => {
          setFollowers(data);
        })
        .catch(error => {
          console.error('Failed to load followers:', error);
          setFollowers([]);
        })
        .finally(() => setIsLoadingFollowers(false));
  }, [effectiveUserId]);

  useEffect(() => {
    if (!effectiveUserId) return;

    setIsLoadingFollowees(true);
    fetch(`${API_BASE_URL}/follows/followees/${effectiveUserId}`)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch followees');
          return response.json();
        })
        .then(data => {
          setFollowees(data);
        })
        .catch(error => {
          console.error('Failed to load followees:', error);
          setFollowees([]);
        })
        .finally(() => setIsLoadingFollowees(false));
  }, [effectiveUserId]);

  useEffect(() => {
    if (!effectiveUserId || !user?.id || effectiveUserId === user.id) return;

    fetch(`${API_BASE_URL}/follows/isFollowing?follower_id=${user.id}&followee_id=${effectiveUserId}`)
        .then(res => res.json())
        .then(data => {
          setIsFollowing(data.isFollowing);
        })
        .catch(err => {
          console.error('Failed to check following status:', err);
        });
  }, [effectiveUserId, user?.id]);
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

  const handleFollowClick = () => {
    if (isFollowLoading) return;
    setIsFollowLoading(true);

    if (isFollowing) {
      // Unfollow: DELETE /follows/unfollow?follower_id=...&followee_id=...
      fetch(`${API_BASE_URL}/follows/unfollow?follower_id=${user.id}&followee_id=${effectiveUserId}`, {
        method: 'DELETE',
      })
          .then(res => {
            if (!res.ok) throw new Error('Unfollow request failed');
            return res.json();
          })
          .then(() => setIsFollowing(false))
          .catch(err => {
            console.error(err);
            alert('Failed to unfollow user');
          })
          .finally(() => setIsFollowLoading(false));
    } else {
      // Follow: POST /follows/follow with JSON body { follower_id, followee_id }
      fetch(`${API_BASE_URL}/follows/follow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          follower_id: user.id,
          followee_id: effectiveUserId,
        }),
      })
          .then(res => {
            if (!res.ok) throw new Error('Follow request failed');
            return res.json();
          })
          .then(() => setIsFollowing(true))
          .catch(err => {
            console.error(err);
            alert('Failed to follow user');
          })
          .finally(() => setIsFollowLoading(false));
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-blue-100 dark:from-blue-900 dark:via-blue-900 dark:to-blue-10 noise-overlay">
      <ModernNavigation 
        title="Artist Studio" 
        subtitle="Showcase your creative journey"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Picture and Basic Info */}
              <div className="flex-shrink-0 text-center lg:text-left">
                <Avatar className="w-32 h-32 mx-auto lg:mx-0 bg-gradient-to-r from-sky-500 to-blue-500 mb-4">
                  {profileData.avatarUrl ? (
                    <AvatarImage src={profileData.avatarUrl} alt={profileData.characterName} />
                  ) : (
                  <AvatarFallback className="bg-gradient-to-r from-sky-500 to-blue-500 text-white text-3xl">
                    <User className="h-16 w-16" />
                  </AvatarFallback>
                  )}
                </Avatar>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {profileData.characterName}
                </h2>
                <p className="text-sky-600 dark:text-sky-400 font-medium mb-2">
                  @{profileData.username}
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Joined {profileData.joinDate}
                </p>
                {isOwnProfile && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 border-sky-300 text-sky-600 hover:bg-sky-50 dark:border-sky-600 dark:text-sky-400 dark:hover:bg-sky-900/30"
                        onClick={() => setIsEditModalOpen(true)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                )}

                {!isOwnProfile && (
                    <Button
                        variant={isFollowing ? "default" : "outline"}
                        size="sm"
                        className={`mt-4 border-sky-300 text-sky-600 hover:bg-sky-50 dark:border-sky-600 dark:text-sky-400 dark:hover:bg-sky-900/30 ${isFollowLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleFollowClick}
                        disabled={isFollowLoading}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {isFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                )}
              </div>

              {/* Profile Details */}
              <div className="flex-1 space-y-6">
                {/* Bio */}
                <div>
                  <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">About</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {profileData.bio}
                  </p>
                </div>

                {/* Specialties */}
                <div>
                  <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((specialty, index) => (
                      <Badge key={index} className="bg-gradient-to-r from-sky-500 to-blue-500 text-white">
                        #{specialty}
                      </Badge>
                    ))}
                    {!profile?.specialties && isOwnProfile && (
                      <Badge 
                        variant="outline" 
                        className="border-sky-300 text-sky-600 hover:bg-sky-50 dark:border-sky-600 dark:text-sky-400 dark:hover:bg-sky-900/30 cursor-pointer"
                        onClick={() => setIsEditModalOpen(true)}
                      >
                        Click to customize
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div>
                  <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">Stats</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-white/40 dark:bg-slate-700/40 rounded-xl">
                      <div className="text-2xl font-bold text-sky-600">
                        {isLoadingArtwork ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : artworkCount}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Artworks</div>
                    </div>
                    <div className="text-center p-3 bg-white/40 dark:bg-slate-700/40 rounded-xl">

                      <div className="text-2xl font-bold text-blue-600">
                        {isLoadingLikes ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : likesCount}
                      </div>

                      <div className="text-sm text-slate-500 dark:text-slate-400">Likes</div>
                    </div>
                    <div className="text-center p-3 bg-white/40 dark:bg-slate-700/40 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">
                        {isLoadingFollowers ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : followers.length}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Followers</div>
                    </div>
                    <div className="text-center p-3 bg-white/40 dark:bg-slate-700/40 rounded-xl">
                      <div className="text-2xl font-bold text-pink-600">
                        {isLoadingFollowees ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : followees.length}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Following</div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">Connect</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile?.facebook && (
                      <Badge 
                        variant="outline" 
                        className="border-sky-300 text-sky-600 hover:bg-sky-50 dark:border-sky-600 dark:text-sky-400 dark:hover:bg-sky-900/30 cursor-pointer"
                        onClick={() => window.open(profile.facebook, '_blank')}
                      >
                        Facebook
                      </Badge>
                    )}
                    {profile?.twitter && (
                      <Badge 
                        variant="outline" 
                        className="border-sky-300 text-sky-600 hover:bg-sky-50 dark:border-sky-600 dark:text-sky-400 dark:hover:bg-sky-900/30 cursor-pointer"
                        onClick={() => window.open(profile.twitter, '_blank')}
                      >
                        Twitter/X
                      </Badge>
                    )}
                    {profile?.instagram && (
                      <Badge 
                        variant="outline" 
                        className="border-sky-300 text-sky-600 hover:bg-sky-50 dark:border-sky-600 dark:text-sky-400 dark:hover:bg-sky-900/30 cursor-pointer"
                        onClick={() => window.open(profile.instagram, '_blank')}
                      >
                        Instagram
                      </Badge>
                    )}
                    {isOwnProfile && !profile?.facebook && !profile?.twitter && !profile?.instagram && (
                      <Badge variant="outline" className="border-sky-300 text-sky-600 hover:bg-sky-50 dark:border-sky-600 dark:text-sky-400 dark:hover:bg-sky-900/30">
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
          {/* Wrap Artwork + Followers/Following together */}
          <div className="lg:col-span-2 space-y-8">
            {/* Artwork Gallery */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-6">
                  My Recent Artwork
                </h3>

                {isLoadingArtworks ? (
                    <div className="flex items-center justify-center h-48">
                      <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
                    </div>
                ) : artworks.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-slate-500 dark:text-slate-400 mb-4">
                        No artworks uploaded yet
                      </p>
                      <Button className="bg-gradient-to-r from-sky-500 to-blue-500 text-white">
                        Upload Your First Artwork
                      </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {artworks.map((artwork) => (
                          <div
                              key={artwork.id}
                              className="group relative overflow-hidden rounded-xl bg-white/40 dark:bg-slate-700/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
                          >
                            <img
                                src={artwork.image_url}
                                alt={artwork.title}
                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <h4 className="font-semibold mb-2">{artwork.title}</h4>
                              {artwork.description && (
                                  <p className="text-sm text-gray-200 mb-2">{artwork.description}</p>
                              )}
                              <div className="flex items-center space-x-4 text-sm">
                                <div className="flex items-center space-x-1">
                                  <Heart className="w-4 h-4" />
                                  <span>{artwork.likes_count ?? 0}</span>
                                </div>
                                {/* Commented out view tracking for now */}
                                {/* <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>0</span>
                    </div> */}
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                )}
              </CardContent>
            </Card>

            {/* Followers and Followees side-by-side */}
            <div className="grid grid-cols-2 gap-6">
              {/* Followers */}
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-6">
                    Followers
                  </h3>
                  {isLoadingFollowers ? (
                      <div className="flex items-center justify-center h-48">
                        <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
                      </div>
                  ) : followers.length === 0 ? (
                      <p className="text-center text-slate-500 dark:text-slate-400 py-12">
                        No followers yet.
                      </p>
                  ) : (
                      <div className="space-y-4 max-h-64 overflow-y-auto">
                        {followers.map((follower) => (
                            <div
                                key={follower.id}
                                className="flex items-center gap-4 cursor-pointer hover:bg-sky-100 dark:hover:bg-slate-700 rounded-lg p-2"
                                onClick={() => navigate(`/user-studio/${follower.id}`)}
                            >
                              <Avatar className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-500 flex-shrink-0">
                                {follower.avatar_url ? (
                                    <AvatarImage src={follower.avatar_url} alt={follower.full_name} />
                                ) : (
                                    <AvatarFallback className="bg-gradient-to-r from-sky-500 to-blue-500 text-white text-xl">
                                      <User className="w-6 h-6" />
                                    </AvatarFallback>
                                )}
                              </Avatar>
                              <div>
                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                                  {follower.full_name || follower.username}
                                </h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  @{follower.username}
                                </p>
                              </div>
                            </div>
                        ))}
                      </div>
                  )}
                </CardContent>
              </Card>

              {/* Followees */}
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-6">
                    Following
                  </h3>
                  {isLoadingFollowees ? (
                      <div className="flex items-center justify-center h-48">
                        <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
                      </div>
                  ) : followees.length === 0 ? (
                      <p className="text-center text-slate-500 dark:text-slate-400 py-12">
                        Not following anyone yet.
                      </p>
                  ) : (
                      <div className="space-y-4 max-h-64 overflow-y-auto">
                        {followees.map((followee) => (
                            <div
                                key={followee.id}
                                className="flex items-center gap-4 cursor-pointer hover:bg-sky-100 dark:hover:bg-slate-700 rounded-lg p-2"
                                onClick={() => navigate(`/user-studio/${followee.id}`)}
                            >
                              <Avatar className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-500 flex-shrink-0">
                                {followee.avatar_url ? (
                                    <AvatarImage src={followee.avatar_url} alt={followee.full_name} />
                                ) : (
                                    <AvatarFallback className="bg-gradient-to-r from-sky-500 to-blue-500 text-white text-xl">
                                      <User className="w-6 h-6" />
                                    </AvatarFallback>
                                )}
                              </Avatar>
                              <div>
                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                                  {followee.full_name || followee.username}
                                </h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  @{followee.username}
                                </p>
                              </div>
                            </div>
                        ))}
                      </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  Recent Events
                </h3>

                {isLoadingEvents ? (
                    <div className="flex items-center justify-center h-24">
                      <Loader2 className="w-6 h-6 animate-spin text-sky-600" />
                    </div>
                ) : events.length === 0 ? (
                    <p className="text-slate-500 dark:text-slate-400 text-center py-8">
                      No recent events
                    </p>
                ) : (
                    <div className="space-y-4">
                      {events.map((event) => (
                          <div
                              key={event.id}
                              className="p-4 bg-white/40 dark:bg-slate-700/40 rounded-xl"
                          >
                            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">
                              {event.title}
                            </h4>
                            <div className="space-y-1 text-sm text-slate-500 dark:text-slate-400">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>
                      {event.scheduled_at
                          ? new Date(event.scheduled_at).toLocaleDateString()
                          : 'Date TBD'}
                    </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3" />
                                <span>{event.address || 'Location TBD'}</span>
                              </div>
                            </div>
                            <Badge
                                className={`mt-2 ${
                                    event.type === 'Hosted'
                                        ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white'
                                        : 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                                }`}
                            >
                              {event.type}
                            </Badge>
                          </div>
                      ))}
                    </div>
                )}
              </CardContent>
            </Card>

            {/* Profile Status */}
            {isOwnProfile && (
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-3">
                      Profile Status
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Profile Complete
              </span>
                        <span className="text-sm font-medium text-sky-600">
                {profile?.about && profile?.full_name ? '85%' : '45%'}
              </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-sky-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: profile?.about && profile?.full_name ? '85%' : '45%',
                            }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                      Complete your profile to attract more viewers and collaborators.
                    </p>
                  </CardContent>
                </Card>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        profile={profile}
      />
    </div>
  );
};

export default UserStudio;
