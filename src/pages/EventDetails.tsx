
import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Users, Heart, Share, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

const EventDetails = () => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isRSVPed, setIsRSVPed] = useState(false);

  const event = {
    id: 1,
    title: "Digital Art Showcase: Future Visions",
    description: "Join us for an immersive digital art experience featuring cutting-edge works from emerging and established artists. Explore virtual galleries, interactive installations, and live digital painting demonstrations.",
    date: "December 15, 2024",
    time: "7:00 PM - 11:00 PM",
    location: "Virtual Gallery Space",
    address: "Online Event",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=400&fit=crop",
    host: {
      name: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      role: "Gallery Curator"
    },
    tags: ["Digital Art", "Virtual", "Interactive", "Showcase"],
    attendees: 142,
    maxAttendees: 200
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">
      {/* Header */}
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsLiked(!isLiked)}
            className="text-white hover:bg-white/20"
          >
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <Share className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 max-w-md mx-auto">
        {/* Event Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-3">{event.title}</h1>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center text-gray-300">
              <Calendar className="w-5 h-5 mr-3 text-teal-400" />
              <div>
                <div>{event.date}</div>
                <div className="text-sm text-gray-400">{event.time}</div>
              </div>
            </div>
            
            <div className="flex items-center text-gray-300">
              <MapPin className="w-5 h-5 mr-3 text-teal-400" />
              <div>
                <div>{event.location}</div>
                <div className="text-sm text-gray-400">{event.address}</div>
              </div>
            </div>
            
            <div className="flex items-center text-gray-300">
              <Users className="w-5 h-5 mr-3 text-teal-400" />
              <span>{event.attendees} / {event.maxAttendees} attending</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {event.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-gray-700 text-gray-300">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Host Info */}
        <Card className="bg-gray-800/50 border-gray-700 mb-6">
          <CardContent className="p-4">
            <h3 className="text-white font-semibold mb-3">Hosted by</h3>
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={event.host.avatar} />
                <AvatarFallback className="bg-teal-500 text-white">
                  {event.host.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white font-medium">{event.host.name}</p>
                <p className="text-gray-400 text-sm">{event.host.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="bg-gray-800/50 border-gray-700 mb-6">
          <CardContent className="p-4">
            <h3 className="text-white font-semibold mb-3">About this event</h3>
            <p className="text-gray-300 leading-relaxed">{event.description}</p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <Button
            onClick={() => setIsRSVPed(!isRSVPed)}
            className={`w-full h-12 font-medium transition-all duration-200 ${
              isRSVPed
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white'
            }`}
          >
            {isRSVPed ? 'RSVP Confirmed ✓' : 'RSVP to Event'}
          </Button>
          
          <Button
            variant="outline"
            className="w-full h-12 border-gray-600 text-gray-300 hover:bg-gray-700/50"
          >
            <Link className="w-5 h-5 mr-2" />
            Link Character
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
