
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Edit, 
  Share2, 
  Settings, 
  Plus,
  Calendar,
  Users,
  Heart,
  Eye
} from 'lucide-react';

const artworks = [
  {
    id: 1,
    title: 'Cyberpunk Portrait',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop',
    likes: 89,
    views: 342,
    createdAt: '2 days ago'
  },
  {
    id: 2,
    title: 'Fantasy Landscape',
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=300&fit=crop',
    likes: 156,
    views: 567,
    createdAt: '1 week ago'
  },
  {
    id: 3,
    title: 'Character Design',
    image: 'https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=300&h=300&fit=crop',
    likes: 203,
    views: 789,
    createdAt: '2 weeks ago'
  }
];

const characters = [
  {
    id: 1,
    name: 'Zara Nightfall',
    server: 'Crystal Server',
    avatar: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=100&h=100&fit=crop&crop=face',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Kai Storm',
    server: 'Phoenix Realm',
    avatar: null,
    status: 'Active'
  }
];

const events = [
  {
    id: 1,
    title: 'Digital Art Showcase',
    date: 'Dec 15, 2024',
    status: 'hosting'
  },
  {
    id: 2,
    title: 'Character Workshop',
    date: 'Dec 18, 2024',
    status: 'attending'
  }
];

export default function Studio() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('gallery');

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face" />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Jordan Davis</h1>
                  <p className="text-muted-foreground">@jordanart</p>
                </div>
                <div className="flex space-x-2 mt-4 sm:mt-0">
                  <Button variant="outline" onClick={() => navigate('/app/settings')}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
              
              <p className="mt-4 text-muted-foreground">
                Digital artist & character designer passionate about bringing imagination to life. 
                Creating worlds one pixel at a time ✨
              </p>
              
              <div className="flex space-x-6 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-sm text-muted-foreground">Artworks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">1.2k</div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">834</div>
                  <div className="text-sm text-muted-foreground">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-muted-foreground">Events</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gallery">My Gallery</TabsTrigger>
          <TabsTrigger value="characters">Linked Characters</TabsTrigger>
          <TabsTrigger value="events">My Events</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Gallery</h2>
            <Button onClick={() => navigate('/app/create/artwork')}>
              <Plus className="w-4 h-4 mr-2" />
              Upload Art
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((artwork) => (
              <Card key={artwork.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center">
                      <Button variant="secondary">View Details</Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{artwork.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {artwork.likes}
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {artwork.views}
                        </div>
                      </div>
                      <span>{artwork.createdAt}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="characters" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Linked Characters</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Link New Character
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {characters.map((character) => (
              <Card key={character.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={character.avatar} />
                      <AvatarFallback>
                        {character.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium">{character.name}</h3>
                      <p className="text-sm text-muted-foreground">{character.server}</p>
                    </div>
                    <Badge className="bg-green-500">{character.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Events</h2>
            <Button onClick={() => navigate('/app/create/event')}>
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </div>
          
          <div className="space-y-3">
            {events.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={event.status === 'hosting' ? 'default' : 'secondary'}>
                        {event.status}
                      </Badge>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
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
