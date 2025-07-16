import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Palette } from 'lucide-react';
import CharacterLinkModal from '@/components/CharacterLinkModal';
import { supabase } from '@/lib/supabase';
import { Route, Navigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [linkCharacter, setLinkCharacter] = useState(false);
  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const { login, register, loginWithGoogle, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      let success = false;
      if (isLogin) {
        success = await login(email, password);
        if (!success) {
          setError('Invalid email or password');
        }
      } else {
        success = await register(email, password, username);
        if (!success) {
          setError('User already exists');
        } else if (linkCharacter) {
          // Show character linking modal after successful signup
          setShowCharacterModal(true);
        }
      }

      if (success && !(!isLogin && linkCharacter)) {
        navigate('/');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      await loginWithGoogle();
    } catch (error) {
      setError('Failed to login with Google. Please try again.');
      console.error('Google login error:', error);
    }
  };

  const handleCharacterModalClose = () => {
    setShowCharacterModal(false);
    navigate('/');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-green-100 dark:from-sky-900 dark:via-emerald-900 dark:to-green-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Palette className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
              SigArt
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Discover Amazing Art Events
            </p>
          </div>

          {/* Auth Card */}
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <Input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="bg-white/60 dark:bg-slate-700/60 border-white/30 rounded-xl"
                    />
                  </div>
                )}
                
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/60 dark:bg-slate-700/60 border-white/30 rounded-xl"
                  />
                </div>
                
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/60 dark:bg-slate-700/60 border-white/30 rounded-xl pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>

                {!isLogin && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="linkCharacter"
                      checked={linkCharacter}
                      onCheckedChange={(checked) => setLinkCharacter(checked as boolean)}
                    />
                    <label
                      htmlFor="linkCharacter"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 dark:text-slate-300"
                    >
                      Link FFXIV Character after signup
                    </label>
                  </div>
                )}

                {error && (
                  <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white rounded-xl py-3 shadow-lg"
                >
                  {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
                </Button>

                {/* Google Login Button */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200 dark:border-slate-600" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-slate-800 px-2 text-slate-500">Or</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleLogin}
                  className="w-full border-white/30 bg-white/60 dark:bg-slate-700/60 hover:bg-white/80 dark:hover:bg-slate-700/80 rounded-xl py-3 shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sky-600 hover:text-emerald-600 font-medium transition-colors"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl">
                <h4 className="text-sm font-medium text-sky-800 dark:text-sky-200 mb-2">Demo Credentials:</h4>
                <div className="text-xs text-sky-700 dark:text-sky-300 space-y-1">
                  <div>Email: demo@example.com | Password: demo123</div>
                  <div>Email: artist@example.com | Password: artist123</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <CharacterLinkModal
        isOpen={showCharacterModal}
        onClose={handleCharacterModalClose}
      />
    </>
  );
};

export default Auth;
