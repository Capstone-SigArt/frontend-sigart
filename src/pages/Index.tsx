
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState('signin');
  const [linkCharacter, setLinkCharacter] = useState(false);
  const [characterData, setCharacterData] = useState({
    name: '',
    server: ''
  });

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
              onClick={() => navigate('/dashboard')}
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
              onClick={() => navigate('/dashboard')}
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

  const screens = {
    signin: <SignInScreen />,
    signup: <SignUpScreen />
  };

  return screens[currentScreen];
};

export default Index;
