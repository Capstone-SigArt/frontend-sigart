
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from '@/components/ProfileDropdown';

const UserStudio = () => {
  const navigate = useNavigate();

  // Mock user data
  const userData = {
    username: "SampleUserName",
    characterName: "FirstName LastName",
    bio: "Grayscale artist, specializing in steam or cyberpunk aesthetics. Commissions open!",
    tags: ["#Grayscale", "#Cyberpunk"],
    stats: {
      uploads: 12,
      likes: 45
    },
    socials: "[IG] [X] [Ko-Fi][Discord]"
  };

  // Mock user artworks
  const userArtworks = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&h=200&fit=crop"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=200&h=200&fit=crop"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=200&h=200&fit=crop"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=200&h=200&fit=crop"
    }
  ];

  const navigationTabs = [
    'Browse', 'Schedule', 'Create', 'My Parties', 'Showcase', 'My Studio', 'Resources'
  ];

  const handleTabClick = (tab: string) => {
    if (tab === 'Browse') {
      navigate('/');
    } else if (tab === 'Schedule') {
      navigate('/schedule');
    } else if (tab === 'Create') {
      navigate('/host-party');
    } else if (tab === 'My Parties') {
      navigate('/my-parties');
    } else if (tab === 'Resources') {
      navigate('/resources');
    } else if (tab === 'Showcase') {
      navigate('/community-art');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center border-2 border-border">
                <span className="text-sm font-medium text-muted-foreground">Logo</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground">User's Studio</h1>
            </div>
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
                variant={tab === 'My Studio' ? "default" : "ghost"}
                className={`whitespace-nowrap transition-all duration-200 ${
                  tab === 'My Studio'
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

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* User Profile Section */}
        <Card className="bg-card border-border mb-6">
          <CardContent className="p-6">
            <div className="flex gap-6">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <Avatar className="w-32 h-32">
                  <AvatarFallback className="bg-muted text-muted-foreground text-2xl">
                    <User className="h-16 w-16" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-center mt-2 text-sm text-muted-foreground">Profile</div>
              </div>

              {/* User Info Grid */}
              <div className="flex-1 grid grid-cols-3 gap-6">
                <div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-foreground">Username:</span>
                      <span className="ml-2 text-sm text-muted-foreground">{userData.username}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground">Character Name:</span>
                      <span className="ml-2 text-sm text-muted-foreground">{userData.characterName}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground">Tags:</span>
                      <div className="ml-2 text-sm text-muted-foreground">
                        {userData.tags.join(' ')}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground">Stats:</span>
                      <span className="ml-2 text-sm text-muted-foreground">
                        {userData.stats.uploads} uploads • {userData.stats.likes} likes
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div>
                    <span className="text-sm font-medium text-foreground">Bio:</span>
                    <p className="text-sm text-muted-foreground mt-1">{userData.bio}</p>
                  </div>
                </div>

                <div>
                  <div>
                    <span className="text-sm font-medium text-foreground">Socials:</span>
                    <p className="text-sm text-muted-foreground mt-1">{userData.socials}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User's Art Section */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 text-center">User's Art</h2>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="grid grid-cols-4 gap-4">
                {userArtworks.map((artwork) => (
                  <div key={artwork.id} className="border-2 border-border rounded-lg p-2 bg-muted/50">
                    <img 
                      src={artwork.image} 
                      alt="User Art"
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Side Notes */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 w-64 space-y-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">
              Customization options for the studio will be supported and managed through the edit studio button in the drop down menu tied to clicking the account photo
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">
              The ability to display User's art early on is contingent on our solution to image storage and the pricing options that are available, if the cost/storage is too high for the early stages of the project, this is something that might need to be adopted later on, or strategies to reduce size will need to be implemented such as limited uploads/ only retaining uploads for a short term before deleting them.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserStudio;
