
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Bookmark, Calendar, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ModernNavigation from '@/components/ModernNavigation';

const MyParties = () => {
  const navigate = useNavigate();

  // Mock data for user's parties
  const hostedParties = [
    {
      id: 1,
      title: "Digital Art Workshop",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=200&fit=crop",
      description: "Interactive digital art creation session",
      tags: ["Digital", "Workshop"],
      date: "Feb 15, 2024",
      location: "Art Studio",
      attendees: 24,
      isHosted: true,
      status: "upcoming"
    },
    {
      id: 2,
      title: "Abstract Painting Evening",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=200&fit=crop",
      description: "Explore abstract techniques and styles",
      tags: ["Abstract", "Painting"],
      date: "Feb 20, 2024",
      location: "Gallery Space",
      attendees: 18,
      isHosted: true,
      status: "upcoming"
    },
    {
      id: 3,
      title: "Community Art Fair",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=300&h=200&fit=crop",
      description: "Showcase local artists and their work",
      tags: ["Community", "Exhibition"],
      date: "Jan 28, 2024",
      location: "Central Park",
      attendees: 156,
      isHosted: true,
      status: "completed"
    },
    {
      id: 4,
      title: "Portrait Drawing Class",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=200&fit=crop",
      description: "Learn portrait drawing fundamentals",
      tags: ["Portrait", "Drawing"],
      date: "Feb 25, 2024",
      location: "Art Academy",
      attendees: 12,
      isHosted: true,
      status: "upcoming"
    }
  ];

  const participatedParties = [
    {
      id: 5,
      title: "Watercolor Masterclass",
      image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=300&h=200&fit=crop",
      description: "Advanced watercolor techniques",
      tags: ["Watercolor", "Advanced"],
      date: "Feb 18, 2024",
      location: "Art Center",
      attendees: 35,
      isHosted: false,
      status: "upcoming"
    },
    {
      id: 6,
      title: "Street Art Tour",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=200&fit=crop",
      description: "Guided tour of urban street art",
      tags: ["Street Art", "Tour"],
      date: "Feb 22, 2024",
      location: "Downtown",
      attendees: 28,
      isHosted: false,
      status: "upcoming"
    }
  ];

  const allParties = [...hostedParties, ...participatedParties];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-green-100 dark:from-sky-900 dark:via-emerald-900 dark:to-green-900">
      <ModernNavigation 
        title="My Parties" 
        subtitle="Manage your art events"
      />

      {/* Legend */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-sky-600" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  Hosted by me
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-emerald-600" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  Participating
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Parties Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allParties.map((party) => (
            <Card 
              key={party.id} 
              className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 cursor-pointer rounded-2xl overflow-hidden hover:-translate-y-2 relative"
              onClick={() => navigate(`/event/${party.id}`)}
            >
              {/* Status Icon */}
              <div className="absolute top-4 right-4 z-10">
                {party.isHosted ? (
                  <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center shadow-lg">
                    <Bookmark className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <Edit className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={party.image} 
                    alt={party.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge 
                      className={`${
                        party.status === 'completed' 
                          ? 'bg-green-500/80 text-white' 
                          : 'bg-sky-500/80 text-white'
                      } backdrop-blur-sm`}
                    >
                      {party.status === 'completed' ? 'Completed' : 'Upcoming'}
                    </Badge>
                  </div>
                  
                  {/* Event Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-12">
                    <h3 className="text-white font-bold text-lg mb-2 drop-shadow-lg">
                      {party.title}
                    </h3>
                    <p className="text-white/90 text-sm mb-3 drop-shadow">
                      {party.description}
                    </p>
                    
                    {/* Event Meta */}
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center space-x-4 text-white/80 text-xs">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{party.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{party.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-white/80 text-xs">
                        <Users className="w-3 h-3" />
                        <span>{party.attendees} attendees</span>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {party.tags.map((tag, index) => (
                        <Badge 
                          key={index}
                          className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="text-center mt-12">
          <div className="text-slate-400">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyParties;
