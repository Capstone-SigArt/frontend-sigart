
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Users, Plus, Edit, Trash2 } from 'lucide-react';

const myEvents = [
  {
    id: 1,
    title: 'Digital Art Showcase',
    date: 'Dec 15, 2024',
    time: '7:00 PM',
    location: 'Virtual Gallery',
    status: 'published',
    attending: 142,
    type: 'created'
  },
  {
    id: 2,
    title: 'Character Design Workshop',
    date: 'Dec 18, 2024',
    time: '3:00 PM',
    location: 'Creative Studio',
    status: 'draft',
    attending: 0,
    type: 'created'
  }
];

const attendingEvents = [
  {
    id: 3,
    title: 'Fantasy Art Convention',
    date: 'Dec 20, 2024',
    time: '10:00 AM',
    location: 'Convention Center',
    status: 'attending',
    organizer: 'Sarah Chen'
  },
  {
    id: 4,
    title: 'Pixel Art Workshop',
    date: 'Dec 22, 2024',
    time: '2:00 PM',
    location: 'Online',
    status: 'attending',
    organizer: 'Mike Johnson'
  }
];

export default function MyParties() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('created');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'attending': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Parties</h1>
        <Button onClick={() => navigate('/app/create/event')}>
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="created">Events I Created</TabsTrigger>
          <TabsTrigger value="attending">Events I'm Attending</TabsTrigger>
        </TabsList>

        <TabsContent value="created" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <div className="flex items-center mt-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(event.status)} mr-2`} />
                        <span className="text-sm text-muted-foreground capitalize">{event.status}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {event.attending} attending
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Details
                    </Button>
                    {event.status === 'published' && (
                      <Button size="sm" className="flex-1">
                        Manage
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="attending" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {attendingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Organized by {event.organizer}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                  </div>
                  <Badge className="bg-blue-500">Attending</Badge>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" variant="destructive" className="flex-1">
                      Cancel RSVP
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
