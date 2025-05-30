
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, User, Settings, LogOut, Edit, Link, Globe } from 'lucide-react';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('signin');
  const [isLightMode, setIsLightMode] = useState(false);
  const [linkCharacter, setLinkCharacter] = useState(false);
  const [characterData, setCharacterData] = useState({
    name: '',
    server: ''
  });

  // Mock data for event flyers
  const eventFlyers = [
    {
      id: 1,
      title: "Neon Nights Dance Party",
      theme: "Cyberpunk",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
      description: "Partial Flyer Image"
    },
    {
      id: 2,
      title: "Monochrome Art Exhibition",
      theme: "Grayscale",
      image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=400&h=300&fit=crop",
      description: "Partial Flyer Image"
    },
    {
      id: 3,
      title: "Cosmic Adventure Night",
      theme: "Space",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=300&fit=crop",
      description: "Partial Flyer Image"
    }
  ];

  // Mock character data
  const characters = [
    {
      id: 1,
      name: "Zara Nightfall",
      server: "Crystal Server",
      avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Kai Storm",
      server: "Phoenix Realm",
      avatar: null
    },
    {
      id: 3,
      name: "Luna Eclipse",
      server: "Mystic World",
      avatar: null
    }
  ];

  const SignInScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">SA</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">SigArt</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Connect with fellow artists and discover amazing events. Share your creative journey and link your favorite characters.
          </p>
        </div>

        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-6 space-y-4">
            <Input
              type="email"
              placeholder="Email Address"
              className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 h-12"
            />
            <Button 
              className="w-full h-12 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium transition-all duration-200 hover:scale-105"
              onClick={() => setCurrentScreen('dashboard')}
            >
              Continue
            </Button>
            <Button 
              variant="outline" 
              className="w-full h-12 border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-all duration-200"
            >
              <Globe className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>
            <p className="text-center text-sm">
              <span className="text-gray-400">New User? </span>
              <button 
                onClick={() => setCurrentScreen('signup')}
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                Create an Account
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const SignUpScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 animate-fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join the SigArt community</p>
        </div>

        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-6 space-y-4">
            <Input
              type="email"
              placeholder="Email Address"
              className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 h-12"
            />
            <Input
              type="password"
              placeholder="Password"
              className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 h-12"
            />
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="link-character" 
                checked={linkCharacter}
                onCheckedChange={(checked) => setLinkCharacter(checked === true)}
                className="border-gray-600 data-[state=checked]:bg-teal-500"
              />
              <label htmlFor="link-character" className="text-white text-sm font-medium">
                Link Character?
              </label>
            </div>

            {linkCharacter && (
              <div className="space-y-4 animate-fade-in">
                <Input
                  placeholder="Character Name"
                  value={characterData.name}
                  onChange={(e) => setCharacterData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 h-12"
                />
                <div className="flex space-x-2">
                  <Input
                    placeholder="Server"
                    value={characterData.server}
                    onChange={(e) => setCharacterData(prev => ({ ...prev, server: e.target.value }))}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 h-12 flex-1"
                  />
                  <Button className="h-12 px-4 bg-gray-700 hover:bg-gray-600 border border-gray-600">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
                
                {characterData.name && (
                  <Card className="bg-gray-700/30 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-teal-500 text-white">
                            {characterData.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-medium">{characterData.name}</p>
                          <p className="text-gray-400 text-sm">{characterData.server}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            <Button 
              className="w-full h-12 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium transition-all duration-200 hover:scale-105"
              onClick={() => setCurrentScreen('dashboard')}
            >
              Create Account
            </Button>
            
            <p className="text-center text-sm">
              <span className="text-gray-400">Already have an account? </span>
              <button 
                onClick={() => setCurrentScreen('signin')}
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                Sign In
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-white">SA</span>
              </div>
              <h1 className="text-2xl font-bold text-white">SigArt</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=100&h=100&fit=crop&crop=face" />
                <AvatarFallback className="bg-teal-500 text-white">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-800/30 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {[
              { icon: User, label: 'Profile' },
              { icon: Search, label: 'Browse' },
              { icon: Link, label: 'Link Character' },
              { icon: Edit, label: 'Edit Studio' },
              { icon: Settings, label: 'Settings' },
              { icon: LogOut, label: 'Logout', onClick: () => setCurrentScreen('signin') }
            ].map((item, index) => (
              <Button 
                key={index}
                variant="ghost" 
                className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200 whitespace-nowrap"
                onClick={item.onClick}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:block">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Flyers */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Event Flyers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eventFlyers.map((flyer, index) => (
                <Card 
                  key={flyer.id} 
                  className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={flyer.image} 
                        alt={flyer.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-gray-900/80 text-white">
                          {flyer.theme}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white mb-2">{flyer.title}</h3>
                      <p className="text-gray-400 text-sm">{flyer.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Character Previews */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Characters</h2>
            <div className="space-y-4">
              {characters.map((character, index) => (
                <Card 
                  key={character.id} 
                  className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        {character.avatar ? (
                          <AvatarImage src={character.avatar} />
                        ) : null}
                        <AvatarFallback className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white">
                          {character.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-white font-medium">{character.name}</p>
                        <p className="text-gray-400 text-sm">{character.server}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const screens = {
    signin: <SignInScreen />,
    signup: <SignUpScreen />,
    dashboard: <Dashboard />
  };

  return (
    <div className={isLightMode ? 'light' : 'dark'}>
      {screens[currentScreen]}
    </div>
  );
};

export default Index;
