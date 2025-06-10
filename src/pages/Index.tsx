
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          SigArt
        </h1>
        <div className="space-x-4">
          {user ? (
            <Button onClick={() => navigate('/app/events')}>
              Go to App
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
              <Button onClick={() => navigate('/auth')}>
                Get Started
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Connect. Create. Celebrate.
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join the ultimate community for digital artists, gamers, and creators. 
          Discover events, showcase your work, and connect with like-minded artists.
        </p>
        <div className="space-x-4">
          <Button size="lg" onClick={() => navigate('/auth')}>
            Join the Community
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/app/events')}>
            Explore Events
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Why Choose SigArt?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Discover Events</CardTitle>
              <CardDescription>
                Find workshops, showcases, and conventions happening in your area or online
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                From digital art tutorials to fantasy conventions, discover events that match your interests.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Showcase Your Art</CardTitle>
              <CardDescription>
                Share your creations with a supportive community of artists and enthusiasts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Upload your artwork, get feedback, and build your portfolio in a dedicated creative space.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connect & Collaborate</CardTitle>
              <CardDescription>
                Meet fellow artists, form partnerships, and grow your creative network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Join discussions, find collaborators, and be part of a thriving artistic community.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">Ready to Get Started?</CardTitle>
            <CardDescription className="text-lg">
              Join thousands of artists and creators in the SigArt community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" onClick={() => navigate('/auth')}>
              Create Your Account
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
