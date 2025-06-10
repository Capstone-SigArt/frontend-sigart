
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Heart, Eye, Calendar, MapPin } from 'lucide-react';
import ModernNavigation from '@/components/ModernNavigation';

const UserStudio = () => {
  // Mock user data
  const userData = {
    username: "ArtisticSoul",
    characterName: "Emma Chen",
    bio: "Grayscale artist specializing in cyberpunk and steam aesthetics. Always exploring the intersection of technology and humanity through art. Commissions open!",
    tags: ["#Grayscale", "#Cyberpunk", "#Digital", "#Commissions"],
    stats: {
      uploads: 42,
      likes: 1847,
      followers: 256,
      following: 89
    },
    socials: ["Instagram", "Twitter", "Ko-Fi", "Discord"],
    joinDate: "March 2023"
  };

  // Mock user artworks with better variety
  const userArtworks = [
    {
      id: 1,
      title: "Neon Dreams",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop",
      likes: 234,
      views: 1205
    },
    {
      id: 2,
      title: "Digital Warrior",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=300&fit=crop",
      likes: 189,
      views: 892
    },
    {
      id: 3,
      title: "Steam & Steel",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=300&h=300&fit=crop",
      likes: 456,
      views: 2341
    },
    {
      id: 4,
      title: "Future City",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=300&fit=crop",
      likes: 198,
      views: 1078
    },
    {
      id: 5,
      title: "Cyber Portrait",
      image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=300&h=300&fit=crop",
      likes: 312,
      views: 1654
    },
    {
      id: 6,
      title: "Tech Noir",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=300&fit=crop",
      likes: 278,
      views: 1432
    }
  ];

  const recentEvents = [
    {
      id: 1,
      title: "Digital Art Workshop",
      date: "Feb 15, 2024",
      location: "Online",
      type: "Hosted"
    },
    {
      id: 2,
      title: "Cyberpunk Art Jam",
      date: "Feb 20, 2024",
      location: "Art Center",
      type: "Participated"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-green-100 dark:from-sky-900 dark:via-emerald-900 dark:to-green-900">
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
                <Avatar className="w-32 h-32 mx-auto lg:mx-0 bg-gradient-to-r from-sky-500 to-emerald-500 mb-4">
                  <AvatarFallback className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-3xl">
                    <User className="h-16 w-16" />
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {userData.characterName}
                </h2>
                <p className="text-sky-600 dark:text-sky-400 font-medium mb-2">
                  @{userData.username}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Joined {userData.joinDate}
                </p>
              </div>

              {/* Profile Details */}
              <div className="flex-1 space-y-6">
                {/* Bio */}
                <div>
                  <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">About</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {userData.bio}
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {userData.tags.map((tag, index) => (
                      <Badge key={index} className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div>
                  <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">Stats</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-white/40 dark:bg-slate-700/40 rounded-xl">
                      <div className="text-2xl font-bold text-sky-600">{userData.stats.uploads}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Artworks</div>
                    </div>
                    <div className="text-center p-3 bg-white/40 dark:bg-slate-700/40 rounded-xl">
                      <div className="text-2xl font-bold text-emerald-600">{userData.stats.likes}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Likes</div>
                    </div>
                    <div className="text-center p-3 bg-white/40 dark:bg-slate-700/40 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">{userData.stats.followers}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Followers</div>
                    </div>
                    <div className="text-center p-3 bg-white/40 dark:bg-slate-700/40 rounded-xl">
                      <div className="text-2xl font-bold text-pink-600">{userData.stats.following}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Following</div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">Connect</h3>
                  <div className="flex flex-wrap gap-2">
                    {userData.socials.map((social, index) => (
                      <Badge key={index} variant="outline" className="border-sky-300 text-sky-600 hover:bg-sky-50">
                        {social}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Artwork Gallery */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent mb-6">
                  My Artwork
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {userArtworks.map((artwork) => (
                    <div key={artwork.id} className="group relative overflow-hidden rounded-xl bg-white/40 dark:bg-slate-700/40 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <img 
                        src={artwork.image} 
                        alt={artwork.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h4 className="font-semibold mb-2">{artwork.title}</h4>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{artwork.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{artwork.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                  Recent Events
                </h3>
                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="p-4 bg-white/40 dark:bg-slate-700/40 rounded-xl">
                      <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        {event.title}
                      </h4>
                      <div className="space-y-1 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <Badge 
                        className={`mt-2 ${
                          event.type === 'Hosted' 
                            ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white' 
                            : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
                        }`}
                      >
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-3">
                  Studio Customization
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Customize your studio appearance and manage your profile through the dropdown menu.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Advanced portfolio features and artwork uploads will be available based on storage solutions and pricing models.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStudio;
