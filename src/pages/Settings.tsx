
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Bell, 
  Shield, 
  Palette,
  Camera,
  Save
} from 'lucide-react';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    eventReminders: true,
    newMessages: true,
    artComments: false,
    weeklyDigest: true
  });

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showOnlineStatus: false,
    allowMessages: true
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face" />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    Change Avatar
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG or GIF. Max size 5MB.
                  </p>
                </div>
              </div>

              {/* Profile Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input id="displayName" defaultValue="Jordan Davis" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="jordanart" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="jordan@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Your location" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tell us about yourself..."
                  defaultValue="Digital artist & character designer passionate about bringing imagination to life. Creating worlds one pixel at a time ✨"
                  className="min-h-[100px]"
                />
              </div>

              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="eventReminders">Event Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminded about upcoming events you're attending
                  </p>
                </div>
                <Switch 
                  id="eventReminders"
                  checked={notifications.eventReminders}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, eventReminders: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newMessages">New Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications for new direct messages
                  </p>
                </div>
                <Switch 
                  id="newMessages"
                  checked={notifications.newMessages}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, newMessages: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="artComments">Art Comments</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when someone comments on your artwork
                  </p>
                </div>
                <Switch 
                  id="artComments"
                  checked={notifications.artComments}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, artComments: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a weekly summary of community activity
                  </p>
                </div>
                <Switch 
                  id="weeklyDigest"
                  checked={notifications.weeklyDigest}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, weeklyDigest: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="publicProfile">Public Profile</Label>
                  <p className="text-sm text-muted-foreground">
                    Make your profile visible to everyone
                  </p>
                </div>
                <Switch 
                  id="publicProfile"
                  checked={privacy.publicProfile}
                  onCheckedChange={(checked) => 
                    setPrivacy(prev => ({ ...prev, publicProfile: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showOnlineStatus">Show Online Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Let others see when you're online
                  </p>
                </div>
                <Switch 
                  id="showOnlineStatus"
                  checked={privacy.showOnlineStatus}
                  onCheckedChange={(checked) => 
                    setPrivacy(prev => ({ ...prev, showOnlineStatus: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allowMessages">Allow Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow other users to send you direct messages
                  </p>
                </div>
                <Switch 
                  id="allowMessages"
                  checked={privacy.allowMessages}
                  onCheckedChange={(checked) => 
                    setPrivacy(prev => ({ ...prev, allowMessages: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Theme Preference</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Choose your preferred color scheme
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-300 mb-2"></div>
                    Light
                  </Button>
                  <Button variant="default" className="h-20 flex-col">
                    <div className="w-6 h-6 rounded-full bg-gray-800 mb-2"></div>
                    Dark
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 mb-2"></div>
                    Auto
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
