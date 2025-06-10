import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Upload, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from '@/components/ProfileDropdown';

const Studio = () => {
  const [activeTab, setActiveTab] = useState('My Studio');
  const [isEditMode, setIsEditMode] = useState(true);
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    username: 'SampleUserName',
    characterName: 'FirstName LastName',
    bio: 'Grayscale artist, specializing in steam or cyberpunk aesthetics. Commissions open!',
    tags: '#Grayscale #Cyberpunk',
    studioColor: '#000000',
    stats: {
      uploads: 12,
      likes: 45
    },
    socials: '[G] [X] [Ko-Fi][Discord]'
  });

  const navigationTabs = [
    'Browse', 'Schedule', 'Create', 'My Parties', 'Showcase', 'My Studio', 'Resources'
  ];

  const mockArtwork = [
    { id: 1, image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&h=200&fit=crop" },
    { id: 2, image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=200&h=200&fit=crop" },
    { id: 3, image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=200&h=200&fit=crop" },
    { id: 4, image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=200&h=200&fit=crop" }
  ];

  const handleSaveChanges = () => {
    console.log('Saving profile changes:', profile);
    setIsEditMode(false);
  };

  const handleEditStudio = () => {
    setIsEditMode(true);
  };

  const handleFileUpload = () => {
    console.log('Upload profile picture');
  };

  const parseTags = (tagsString) => {
    return tagsString.split(' ').filter(tag => tag.startsWith('#'));
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'Browse') {
      navigate('/');
    } else if (tab === 'Schedule') {
      navigate('/schedule');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center border-2 border-border">
                <span className="text-sm font-medium text-muted-foreground">Logo</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground">User's Studio</h1>
            </div>
            
            {/* Profile Dropdown */}
            <ProfileDropdown />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {navigationTabs.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                className={`whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Studio Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {isEditMode ? (
          // Edit Mode
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Section */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="bg-muted border-2 border-border">
                        <User className="h-12 w-12 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Upload profile picture</p>
                      <Button variant="outline" size="sm" onClick={handleFileUpload}>
                        <Upload className="w-4 h-4 mr-2" />
                        choose file
                      </Button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Username:</label>
                      <Input
                        value={profile.username}
                        onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Character Name:</label>
                      <div className="text-sm text-muted-foreground mb-2">{profile.characterName}</div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Tags:</label>
                      <Input
                        value={profile.tags}
                        onChange={(e) => setProfile(prev => ({ ...prev, tags: e.target.value }))}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Studio color/theme:</label>
                      <select className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md">
                        <option>Default</option>
                        <option>Blue</option>
                        <option>Green</option>
                        <option>Purple</option>
                      </select>
                    </div>
                  </div>

                  <Button onClick={handleSaveChanges} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bio and Social Section */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Bio:</label>
                    <Textarea
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full h-32 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Choose and link socials below:</label>
                    <div className="flex space-x-2">
                      <select className="flex-1 h-10 px-3 py-2 border border-input bg-background rounded-md">
                        <option>Social Media</option>
                        <option>Twitter</option>
                        <option>Instagram</option>
                        <option>Discord</option>
                      </select>
                      <Input
                        placeholder="Link"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // View Mode
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile View */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-lg font-semibold">Profile</h2>
                  <Button variant="outline" size="sm" onClick={handleEditStudio}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
                
                <div className="flex items-start space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="bg-muted border-2 border-border">
                      <User className="h-12 w-12 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Username:</label>
                      <p className="text-foreground">{profile.username}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Character Name:</label>
                      <p className="text-foreground">{profile.characterName}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Tags:</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {parseTags(profile.tags).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Stats:</label>
                      <p className="text-foreground">{profile.stats.uploads} uploads · {profile.stats.likes} likes</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bio and Socials View */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Bio:</label>
                    <p className="text-foreground leading-relaxed">{profile.bio}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Socials:</label>
                    <p className="text-foreground">{profile.socials}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* User's Art Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">User's Art</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockArtwork.map((art) => (
              <Card key={art.id} className="bg-card border-border hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-2">
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={art.image} 
                      alt={`Artwork ${art.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studio;
