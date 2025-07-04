import React, {useEffect, useState} from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Bookmark, Calendar, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ModernNavigation from '@/components/ModernNavigation';
import {supabase} from "@/lib/supabase.ts";

const MyParties = () => {
  const navigate = useNavigate();
  const [hostedParties, setHostedParties] = useState([]);
  const [memberParties,setMemberParties] = useState([]);
  const [attendees,setAttendees] = useState(0)
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
          fetch(`http://localhost:3000/myParties/${userId}?role=host`),
          fetch(`http://localhost:3000/myParties/${userId}?role=member`)
        ]);

        const [hosted, member] = await Promise.all([
          hostRes.json(),
          memberRes.json()
        ]);

        const fetchTagsForParty = async (partyId) => {
          const res = await fetch(`http://localhost:3000/tags/partyTags?party_id=${partyId}`);
          const tags = await res.json();
          return tags.map(t => t.name);
        };

        const hostedWithDetails = await Promise.all(
            hosted.map(async (p) => {
              const [tagsRes, countRes] = await Promise.all([
                fetchTagsForParty(p.id),
                fetch(`http://localhost:3000/myParties/count/${p.id}`)
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
                fetch(`http://localhost:3000/myParties/count/${p.id}`)
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
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-green-100 dark:from-sky-900 dark:via-emerald-900 dark:to-green-900">
        <ModernNavigation
            title="My Parties"
            subtitle="Manage your art events"
        />

        {/* Filter Buttons */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-8">
            <button
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl border ${
                    filter === 'host' ? 'bg-sky-600 text-white' : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300'
                }`}
                onClick={() => setFilter('host')}
            >
              <Bookmark className={`w-5 h-5 ${filter === 'host' ? 'text-white' : 'text-sky-600'}`} />
              Hosted by me
            </button>
            <button
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl border ${
                    filter === 'member' ? 'bg-emerald-600 text-white' : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300'
                }`}
                onClick={() => setFilter('member')}
            >
              <Edit className={`w-5 h-5 ${filter === 'member' ? 'text-white' : 'text-emerald-600'}`} />
              Participating
            </button>
            <button
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl border ${
                    filter === 'all' ? 'bg-gray-600 text-white' : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300'
                }`}
                onClick={() => setFilter('all')}
            >
              All Parties
            </button>
          </div>
        </div>

        {/* Parties Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParties.map((party) => (
                <Card
                    key={party.id}
                    className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 cursor-pointer rounded-2xl overflow-hidden hover:-translate-y-2 relative"
                    onClick={() => navigate(`/event/${party.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                          src={party.cover_image || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop"}
                          alt={party.title}
                          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none transition-colors duration-300 group-hover:bg-gray-700 group-hover:bg-opacity-90"
                      />

                      <div className="absolute top-4 left-4">
                        {/* Upcoming/Completed badge placeholder */}
                      </div>
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
                      <div className="absolute bottom-4 left-4 right-12">
                        <h3 className="text-white font-bold text-lg mb-2 drop-shadow-lg">
                          {party.title}
                        </h3>
                        <p className="line-clamp-3 text-white/90 text-sm mb-3 drop-shadow">
                          {party.description}
                        </p>

                        {/* Tags and Attendees in one row */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex flex-wrap gap-1 max-w-[70%]">
                            {party.tags?.map((tag, idx) => (
                                <Badge key={idx} className="bg-white/10 text-white text-xs font-normal px-2 py-0.5 backdrop-blur-sm">
                                  {tag}
                                </Badge>
                            ))}
                          </div>
                          <div className="flex items-center space-x-1 text-white/80 text-xs">
                            <Users className="w-3 h-3" />
                            <span>{party.attendees} attendees</span>
                          </div>
                        </div>

                        {/* Date and Location below */}
                        <div className="flex items-center space-x-4 text-white/80 text-xs">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{party.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{party.address}</span>
                          </div>
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
