
import React from 'react';
import { Calendar, Plus, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Dashboard = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Digital Art Showcase",
      date: "Dec 15",
      time: "7:00 PM",
      attending: true
    },
    {
      id: 2,
      title: "Character Design Workshop",
      date: "Dec 18",
      time: "3:00 PM",
      attending: false
    }
  ];

  const trendingArt = [
    {
      id: 1,
      title: "Neon Samurai",
      artist: "Alex Chen",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop",
      likes: 234
    },
    {
      id: 2,
      title: "Crystal Forest",
      artist: "Maya Rodriguez",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      likes: 189
    }
  ];

  const recentActivity = [
    {
      id: 1,
      user: "Sarah Kim",
      action: "liked your artwork",
      time: "2h ago",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b8b5?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      user: "Jordan Smith",
      action: "RSVP'd to your event",
      time: "4h ago",
      avatar: null
    }
  ];

  return (
    <div className="px-4 py-6 max-w-md mx-auto">
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome back, Jordan!</h1>
        <p className="text-gray-400">Discover amazing art and connect with fellow creators</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 text-teal-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">24</div>
            <div className="text-xs text-gray-400">Artworks</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">1.2k</div>
            <div className="text-xs text-gray-400">Followers</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <Calendar className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">5</div>
            <div className="text-xs text-gray-400">Events</div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="bg-gray-800/50 border-gray-700 mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg">Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium text-sm">{event.title}</p>
                <p className="text-gray-400 text-xs">{event.date} at {event.time}</p>
              </div>
              <Badge variant={event.attending ? "default" : "outline"} className="text-xs">
                {event.attending ? "Attending" : "RSVP"}
              </Badge>
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-teal-400 hover:text-teal-300 hover:bg-gray-700/50"
          >
            View All Events
          </Button>
        </CardContent>
      </Card>

      {/* Trending Art */}
      <Card className="bg-gray-800/50 border-gray-700 mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg">Trending Art</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {trendingArt.map((art) => (
              <div key={art.id} className="relative group cursor-pointer">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white font-medium text-sm">{art.title}</p>
                    <p className="text-gray-300 text-xs">{art.likes} likes</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-gray-800/50 border-gray-700 mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                {activity.avatar ? (
                  <AvatarImage src={activity.avatar} />
                ) : null}
                <AvatarFallback className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white text-xs">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-white text-sm">
                  <span className="font-medium">{activity.user}</span>{' '}
                  <span className="text-gray-400">{activity.action}</span>
                </p>
                <p className="text-gray-400 text-xs">{activity.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button className="h-16 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 flex-col">
          <Plus className="w-5 h-5 mb-1" />
          <span className="text-xs">Create Event</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-16 border-gray-600 text-gray-300 hover:bg-gray-700/50 flex-col"
        >
          <TrendingUp className="w-5 h-5 mb-1" />
          <span className="text-xs">Upload Art</span>
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
