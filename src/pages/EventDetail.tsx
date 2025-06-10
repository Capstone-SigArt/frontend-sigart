
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Share2, 
  Heart,
  MessageSquare
} from 'lucide-react';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAttending, setIsAttending] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Mock event data - in real app, fetch by ID
  const event = {
    id: 1,
    title: 'Digital Art Showcase',
    date: 'Dec 15, 2024',
    time: '7:00 PM',
    location: 'Virtual Gallery',
    category: 'Digital Art',
    type: 'Showcase',
    attending: 142,
    likes: 89,
    description: 'Join us for an incredible showcase of digital art from artists around the world. Experience stunning visuals and innovative techniques in this virtual gallery setting.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
    organizer: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face'
    },
    attendees: [
      { name: 'Alex', avatar: null },
      { name: 'Jordan', avatar: null },
      { name: 'Sam', avatar: null }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate('/events')}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Events
      </Button>

      {/* Event Image */}
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg"
        />
        <Badge className="absolute top-4 left-4 text-lg px-3 py-1">
          {event.category}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
            <Badge variant="secondary" className="mb-4">{event.type}</Badge>
          </div>

          {/* Event Details */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-muted-foreground" />
                <span>{event.date} at {event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-muted-foreground" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-3 text-muted-foreground" />
                <span>{event.attending} people attending</span>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About this event</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </CardContent>
          </Card>

          {/* Organizer */}
          <Card>
            <CardHeader>
              <CardTitle>Organizer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={event.organizer.avatar} />
                  <AvatarFallback>{event.organizer.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{event.organizer.name}</p>
                  <p className="text-sm text-muted-foreground">Event Organizer</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Buttons */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <Button
                className="w-full"
                onClick={() => setIsAttending(!isAttending)}
                variant={isAttending ? 'outline' : 'default'}
              >
                {isAttending ? 'Cancel RSVP' : 'RSVP'}
              </Button>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? 'text-red-500' : ''}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Attendees */}
          <Card>
            <CardHeader>
              <CardTitle>Attendees ({event.attending})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {event.attendees.map((attendee, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={attendee.avatar} />
                      <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{attendee.name}</span>
                  </div>
                ))}
                <Button variant="link" className="text-sm p-0">
                  View all attendees
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
