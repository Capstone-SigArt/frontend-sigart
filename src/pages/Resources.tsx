
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Video, 
  Download, 
  ExternalLink,
  Palette,
  Brush,
  Monitor,
  Users
} from 'lucide-react';

const tutorials = [
  {
    id: 1,
    title: 'Digital Art Fundamentals',
    type: 'video',
    duration: '45 min',
    level: 'Beginner',
    description: 'Learn the basics of digital art creation',
    author: 'Sarah Chen',
    url: '#'
  },
  {
    id: 2,
    title: 'Character Design Masterclass',
    type: 'guide',
    duration: '2 hour read',
    level: 'Intermediate',
    description: 'Complete guide to designing memorable characters',
    author: 'Mike Johnson',
    url: '#'
  },
  {
    id: 3,
    title: 'Color Theory in Digital Art',
    type: 'video',
    duration: '30 min',
    level: 'Beginner',
    description: 'Understanding color relationships and harmony',
    author: 'Emma Wilson',
    url: '#'
  }
];

const tools = [
  {
    id: 1,
    name: 'Photoshop',
    category: 'Software',
    type: 'Professional',
    description: 'Industry standard for digital art and photo editing',
    icon: Monitor
  },
  {
    id: 2,
    name: 'Procreate',
    category: 'Mobile App',
    type: 'Beginner-Friendly',
    description: 'Intuitive digital art app for iPad',
    icon: Palette
  },
  {
    id: 3,
    name: 'Wacom Tablet',
    category: 'Hardware',
    type: 'Essential',
    description: 'Professional drawing tablet for digital artists',
    icon: Brush
  }
];

const communities = [
  {
    id: 1,
    name: 'Digital Artists Hub',
    members: '12.5k',
    description: 'Share your work and get feedback from fellow artists',
    type: 'Discord Server'
  },
  {
    id: 2,
    name: 'Character Design Community',
    members: '8.3k',
    description: 'Focused on character creation and design techniques',
    type: 'Forum'
  },
  {
    id: 3,
    name: 'Weekly Art Challenges',
    members: '5.7k',
    description: 'Participate in weekly themed art challenges',
    type: 'Challenge Group'
  }
];

export default function Resources() {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Resources</h1>
        <p className="text-muted-foreground mt-2">
          Everything you need to improve your art and connect with the community
        </p>
      </div>

      {/* Tutorials Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Tutorials & Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <Card key={tutorial.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {tutorial.type === 'video' ? (
                      <Video className="w-5 h-5 text-blue-500" />
                    ) : (
                      <BookOpen className="w-5 h-5 text-green-500" />
                    )}
                    <span className="text-sm text-muted-foreground">{tutorial.duration}</span>
                  </div>
                  <Badge className={getLevelColor(tutorial.level)}>
                    {tutorial.level}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{tutorial.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{tutorial.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">by {tutorial.author}</span>
                  <Button size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tools Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Recommended Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Card key={tool.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <tool.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{tool.name}</h3>
                      <Badge variant="outline">{tool.category}</Badge>
                    </div>
                    <Badge className="bg-blue-500">{tool.type}</Badge>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                    <Button size="sm" variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Communities Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Join Communities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <Card key={community.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="font-semibold">{community.name}</span>
                    </div>
                    <Badge variant="secondary">{community.members}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{community.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{community.type}</span>
                    <Button size="sm">Join Community</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="justify-start">
                <Download className="w-4 h-4 mr-2" />
                Asset Library
              </Button>
              <Button variant="outline" className="justify-start">
                <Palette className="w-4 h-4 mr-2" />
                Color Palettes
              </Button>
              <Button variant="outline" className="justify-start">
                <BookOpen className="w-4 h-4 mr-2" />
                Art Challenges
              </Button>
              <Button variant="outline" className="justify-start">
                <Users className="w-4 h-4 mr-2" />
                Find Collaborators
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
