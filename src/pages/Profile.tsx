
import React from 'react';
import { Settings, Edit, Share, Calendar, Image, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const user = {
    name: "Jordan Davis",
    username: "@jordanart",
    bio: "Digital artist & character designer passionate about bringing imagination to life. Creating worlds one pixel at a time ✨",
    avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=200&h=200&fit=crop&crop=face",
    stats: {
      artworks: 24,
      followers: 1.2,
      following: 834,
      events: 12
    },
    characters: [
      {
        name: "Zara Nightfall",
        server: "Crystal Server",
        avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=100&h=100&fit=crop&crop=face"
      },
      {
        name: "Kai Storm",
        server: "Phoenix Realm",
        avatar: null
      }
    ]
  };

  const stats = [
    { label: 'Artworks', value: user.stats.artworks, icon: Image },
    { label: 'Followers', value: `${user.stats.followers}k`, icon: Users },
    { label: 'Following', value: user.stats.following, icon: Heart },
    { label: 'Events', value: user.stats.events, icon: Calendar },
  ];

  return (
    <div className="px-4 py-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
          <Settings className="w-6 h-6" />
        </Button>
      </div>

      {/* Profile Info */}
      <Card className="bg-gray-800/50 border-gray-700 mb-6">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
            <p className="text-gray-400 text-sm mb-3">{user.username}</p>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">{user.bio}</p>
            
            <div className="flex gap-2 justify-center">
              <Button
                size="sm"
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-5 h-5 text-teal-400" />
                </div>
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Linked Characters */}
      <Card className="bg-gray-800/50 border-gray-700 mb-6">
        <CardContent className="p-4">
          <h3 className="text-white font-semibold mb-4">Linked Characters</h3>
          <div className="space-y-3">
            {user.characters.map((character, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  {character.avatar ? (
                    <AvatarImage src={character.avatar} />
                  ) : null}
                  <AvatarFallback className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white text-sm">
                    {character.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{character.name}</p>
                  <p className="text-gray-400 text-xs">{character.server}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  Active
                </Badge>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-4 border-gray-600 text-gray-300 hover:bg-gray-700/50"
          >
            Link New Character
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="h-16 border-gray-600 text-gray-300 hover:bg-gray-700/50 flex-col"
        >
          <Image className="w-5 h-5 mb-1" />
          <span className="text-xs">My Gallery</span>
        </Button>
        <Button
          variant="outline"
          className="h-16 border-gray-600 text-gray-300 hover:bg-gray-700/50 flex-col"
        >
          <Calendar className="w-5 h-5 mb-1" />
          <span className="text-xs">My Events</span>
        </Button>
      </div>
    </div>
  );
};

export default Profile;
