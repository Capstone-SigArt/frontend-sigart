
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Settings, Users, Calendar, Star, Eye, Heart, MessageCircle } from 'lucide-react';
import ModernNavigation from '@/components/ModernNavigation';
import UploadArtModal from '@/components/UploadArtModal';
import ArtDetailsModal from '@/components/ArtDetailsModal';
import CharacterLinkModal from '@/components/CharacterLinkModal';

const Studio = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showArtModal, setShowArtModal] = useState(false);
  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);

  // Mock user data
  const userData = {
    username: "ArtisticSoul",
    joinDate: "January 2024",
    totalArtworks: 24,
    totalLikes: 156,
    followers: 89,
    following: 45
  };

  // Mock artwork data
  const artworks = [
    {
      id: 1,
      title: "Digital Portrait Study",
      likes: 23,
      views: 145,
      comments: 8,
      uploadDate: "2024-05-15",
      toolsUsed: "Procreate, iPad Pro",
      tags: ["#portrait", "#digital", "#study"],
      additionalNotes: "Practice piece focusing on lighting and shadows",
      taggedCharacters: ["Character A", "Character B"],
      imageUrl: "/placeholder.svg",
      artist: userData.username
    },
    {
      id: 2,
      title: "Fantasy Landscape",
      likes: 45,
      views: 278,
      comments: 12,
      uploadDate: "2024-05-10",
      toolsUsed: "Photoshop, Wacom Tablet",
      tags: ["#landscape", "#fantasy", "#digital"],
      additionalNotes: "Inspired by FFXIV environments",
      taggedCharacters: [],
      imageUrl: "/placeholder.svg",
      artist: userData.username
    },
    {
      id: 3,
      title: "Character Design",
      likes: 67,
      views: 423,
      comments: 19,
      uploadDate: "2024-05-05",
      toolsUsed: "Clip Studio Paint",
      tags: ["#character", "#design", "#original"],
      additionalNotes: "Original character design for a story project",
      taggedCharacters: ["Original Character"],
      imageUrl: "/placeholder.svg",
      artist: userData.username
    }
  ];

  const handleArtClick = (artwork) => {
    setSelectedArt(artwork);
    setShowArtModal(true);
  };

  const handleUpload = (artData) => {
    console.log('Uploading art:', artData);
    // Handle the upload logic here
  };

  const handleEditProfile = () => {
    setShowCharacterModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-green-100 dark:from-sky-900 dark:via-emerald-900 dark:to-green-900">
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
                <div className="w-24 h-24 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">AS</span>
                </div>
                <CardTitle className="text-xl bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                  {userData.username}
                </CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Member since {userData.joinDate}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-sky-50 dark:bg-sky-900/20 rounded-xl">
                    <div className="text-lg font-bold text-sky-600">{userData.totalArtworks}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300">Artworks</div>
                  </div>
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                    <div className="text-lg font-bold text-emerald-600">{userData.totalLikes}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300">Likes</div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <div className="text-lg font-bold text-green-600">{userData.followers}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300">Followers</div>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
                    <div className="text-lg font-bold text-slate-600">{userData.following}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300">Following</div>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowUploadModal(true)}
                  className="w-full bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white rounded-xl shadow-lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Upload New Art
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full rounded-xl border-sky-200 hover:bg-sky-50"
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
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300">4.8</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Average Rating</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300">12</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Parties Joined</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-sky-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300">3</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Upcoming Events</p>
                </CardContent>
              </Card>
            </div>

            {/* Artwork Gallery */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                  My Artwork Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {artworks.map((artwork) => (
                    <div
                      key={artwork.id}
                      className="group cursor-pointer"
                      onClick={() => handleArtClick(artwork)}
                    >
                      <Card className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm border-white/30 shadow-lg rounded-2xl hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-300 group-hover:scale-105">
                        <div className="aspect-square bg-gradient-to-br from-sky-100 to-emerald-100 dark:from-sky-900/30 dark:to-emerald-900/30 rounded-t-2xl flex items-center justify-center overflow-hidden">
                          <img 
                            src={artwork.imageUrl} 
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
                                <span>{artwork.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{artwork.views}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="w-4 h-4" />
                                <span>{artwork.comments}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {artwork.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                                {tag}
                              </Badge>
                            ))}
                            {artwork.tags.length > 2 && (
                              <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                +{artwork.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <UploadArtModal
        open={showUploadModal}
        onOpenChange={setShowUploadModal}
        onUpload={handleUpload}
      />
      
      <ArtDetailsModal
        open={showArtModal}
        onOpenChange={setShowArtModal}
        artData={selectedArt}
      />

      <CharacterLinkModal
        isOpen={showCharacterModal}
        onClose={() => setShowCharacterModal(false)}
      />
    </div>
  );
};

export default Studio;
