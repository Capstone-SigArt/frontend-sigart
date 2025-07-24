import React, {useEffect, useState} from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Bookmark, Calendar, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ModernNavigation from '@/components/ModernNavigation';
import {supabase} from "@/lib/supabase.ts";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL
const MyParties = () => {
  const navigate = useNavigate();
  const [hostedParties, setHostedParties] = useState([]);
  const [memberParties,setMemberParties] = useState([]);
  const [attendees,setAttendees] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'host' | 'member'>('all');

  useEffect(() => {
    const loadUserAndFetchParties = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const userId = user?.id;
        if (!userId) return;

        const [hostRes, memberRes] = await Promise.all([
          fetch(`${API_BASE_URL}/myParties/${userId}?role=host`),
          fetch(`${API_BASE_URL}/myParties/${userId}?role=member`)
        ]);

        const [hosted, member] = await Promise.all([
          hostRes.json(),
          memberRes.json()
        ]);

        const fetchTagsForParty = async (partyId) => {
          const res = await fetch(`${API_BASE_URL}/tags/partyTags?party_id=${partyId}`);
          const tags = await res.json();
          return tags.map(t => t.name);
        };

        const hostedWithDetails = await Promise.all(
            hosted.map(async (p) => {
              const [tagsRes, countRes] = await Promise.all([
                fetchTagsForParty(p.id),
                fetch(`${API_BASE_URL}/myParties/count/${p.id}`)
              ]);
              const tags = tagsRes;
              const { count } = await countRes.json();
              return { ...p, isHosted: true, tags, attendees: count };
            })
        );


        const memberWithDetails = await Promise.all(
            member.map(async (p) => {
              const [tagsRes, countRes] = await Promise.all([
                fetchTagsForParty(p.id),
                fetch(`${API_BASE_URL}/myParties/count/${p.id}`)
              ]);
              const tags = tagsRes;
              const { count } = await countRes.json();
              return { ...p, isHosted: false, tags, attendees: count };
            })
        );


        setHostedParties(hostedWithDetails);
        setMemberParties(memberWithDetails);
      } catch (err) {
        console.error("Failed to load parties:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUserAndFetchParties();
  }, []);

  const allParties = [...hostedParties, ...memberParties];

  const filteredParties = filter === 'all'
      ? allParties
      : filter === 'host'
          ? hostedParties
          : memberParties;

  return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-blue-100 dark:from-blue-900 dark:via-blue-900 dark:to-blue-10 noise-overlay">
        <ModernNavigation
            title="My Parties"
            subtitle="Manage your art events"
        />

        {/* Filter Buttons */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 lg:gap-8">
            <button
                className={`flex items-center gap-2 px-3 py-2 sm:px-4 rounded-2xl border text-sm sm:text-base transition-all duration-200 ${
                    filter === 'host' ? 'bg-sky-600 text-white border-sky-600' : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-white/30 hover:bg-white/90 dark:hover:bg-slate-700/90'
                }`}
                onClick={() => setFilter('host')}
            >
              <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 ${filter === 'host' ? 'text-white' : 'text-sky-600'}`} />
              <span className="hidden sm:inline">Hosted by me</span>
              <span className="sm:hidden">Hosted</span>
            </button>
            <button
                className={`flex items-center gap-2 px-3 py-2 sm:px-4 rounded-2xl border text-sm sm:text-base transition-all duration-200 ${
                    filter === 'member' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-white/30 hover:bg-white/90 dark:hover:bg-slate-700/90'
                }`}
                onClick={() => setFilter('member')}
            >
              <Edit className={`w-4 h-4 sm:w-5 sm:h-5 ${filter === 'member' ? 'text-white' : 'text-blue-600'}`} />
              <span className="hidden sm:inline">Participating</span>
              <span className="sm:hidden">Joined</span>
            </button>
            <button
                className={`flex items-center gap-2 px-3 py-2 sm:px-4 rounded-2xl border text-sm sm:text-base transition-all duration-200 ${
                    filter === 'all' ? 'bg-gray-600 text-white border-gray-600' : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-white/30 hover:bg-white/90 dark:hover:bg-slate-700/90'
                }`}
                onClick={() => setFilter('all')}
            >
              <span className="hidden sm:inline">All Parties</span>
              <span className="sm:hidden">All</span>
            </button>
          </div>
        </div>

        {/* Parties Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto mb-4"></div>
                <span className="text-slate-500 dark:text-slate-300 text-lg">Loading your parties...</span>
              </div>
            </div>
          ) : filteredParties.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-slate-400 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-slate-600 dark:text-slate-300 text-lg font-medium mb-2">
                {filter === 'host' ? 'No hosted parties yet' : 
                 filter === 'member' ? 'No joined parties yet' : 
                 'No parties found'}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {filter === 'host' ? 'Start hosting your first art event!' : 
                 filter === 'member' ? 'Join some exciting art events!' : 
                 'Start hosting or join art events to see them here.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredParties.map((party) => (
                <Card
                    key={party.id}
                    className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 cursor-pointer rounded-2xl overflow-hidden hover:-translate-y-2 relative"
                    onClick={() => navigate(`/event/${party.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                          src={party.cover_image || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop"}
                          alt={party.title}
                          className="w-full h-40 sm:h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none transition-colors duration-300 group-hover:bg-gray-700 group-hover:bg-opacity-90"
                      />

                      <div className="absolute top-4 left-4">
                        {/* Upcoming/Completed badge placeholder */}
                      </div>
                      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
                        {party.isHosted ? (
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-sky-500 rounded-full flex items-center justify-center shadow-lg">
                              <Bookmark className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            </div>
                        ) : (
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                              <Edit className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            </div>
                        )}
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-12">
                        <h3 className="text-white font-bold text-base sm:text-lg mb-1 sm:mb-2 drop-shadow-lg line-clamp-2">
                          {party.title}
                        </h3>
                        <p className="line-clamp-2 sm:line-clamp-3 text-white/90 text-xs sm:text-sm mb-2 sm:mb-3 drop-shadow">
                          {party.description}
                        </p>

                        {/* Tags and Attendees - Stack on mobile, row on larger screens */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3 gap-1 sm:gap-0">
                          <div className="flex flex-wrap gap-1 sm:max-w-[70%]">
                            {party.tags?.slice(0, 2).map((tag, idx) => (
                                <Badge key={idx} className="bg-white/10 text-white text-xs font-normal px-1.5 py-0.5 sm:px-2 backdrop-blur-sm">
                                  {tag}
                                </Badge>
                            ))}
                            {party.tags?.length > 2 && (
                                <Badge className="bg-white/10 text-white text-xs font-normal px-1.5 py-0.5 sm:px-2 backdrop-blur-sm">
                                  +{party.tags.length - 2}
                                </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-1 text-white/80 text-xs">
                            <Users className="w-3 h-3" />
                            <span className="hidden sm:inline">{party.attendees} attendees</span>
                            <span className="sm:hidden">{party.attendees}</span>
                          </div>
                        </div>

                        {/* Date and Location - Stack on mobile */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-white/80 text-xs gap-1 sm:gap-0">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{party.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{party.address}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Load More Button - only show when there are parties */}
          {!loading && filteredParties.length > 0 && (
            <div className="text-center mt-8 sm:mt-12">
              <div className="text-slate-400">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

export default MyParties;
