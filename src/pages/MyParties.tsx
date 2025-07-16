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
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-slate-300">
      <ModernNavigation
        title="My Parties"
        subtitle="Manage your art events"
      />

      {/* Filter Buttons */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center gap-4">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
              filter === 'host' 
                ? 'bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] text-white border-transparent' 
                : 'bg-slate-900/50 border-blue-500/30 text-slate-300 hover:bg-slate-800 hover:text-[#38bdf8]'
            }`}
            onClick={() => setFilter('host')}
          >
            <Bookmark className="w-5 h-5" />
            Hosted by me
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
              filter === 'member' 
                ? 'bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] text-white border-transparent' 
                : 'bg-slate-900/50 border-blue-500/30 text-slate-300 hover:bg-slate-800 hover:text-[#38bdf8]'
            }`}
            onClick={() => setFilter('member')}
          >
            <Edit className="w-5 h-5" />
            Participating
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
              filter === 'all' 
                ? 'bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] text-white border-transparent' 
                : 'bg-slate-900/50 border-blue-500/30 text-slate-300 hover:bg-slate-800 hover:text-[#38bdf8]'
            }`}
            onClick={() => setFilter('all')}
          >
            All Parties
          </button>
        </div>
      </div>

      {/* Parties Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-[#38bdf8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400">Loading your parties...</p>
          </div>
        ) : filteredParties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 mb-4">No parties found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParties.map((party) => (
              <Card
                key={party.id}
                className="group bg-slate-800/80 backdrop-blur-sm border border-blue-500/30 shadow-xl shadow-blue-500/10 rounded-2xl hover:shadow-2xl hover:shadow-[#38bdf8]/20 transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/event/${party.id}`)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={party.cover_image || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop"}
                      alt={party.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                    />

                    <div className="absolute top-4 right-4 z-10">
                      {party.isHosted ? (
                        <div className="w-8 h-8 bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] rounded-full flex items-center justify-center shadow-lg">
                          <Bookmark className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] rounded-full flex items-center justify-center shadow-lg">
                          <Edit className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-4 right-12">
                      <h3 className="text-white font-bold text-lg mb-2 drop-shadow-lg">
                        {party.title}
                      </h3>
                      <p className="line-clamp-3 text-slate-300 text-sm mb-3 drop-shadow">
                        {party.description}
                      </p>

                      {/* Tags and Attendees in one row */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex flex-wrap gap-1 max-w-[70%]">
                          {party.tags?.map((tag, idx) => (
                            <Badge 
                              key={idx} 
                              className="bg-[#38bdf8]/20 text-[#38bdf8] border-[#38bdf8]/30"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center space-x-1 text-slate-300 text-xs">
                          <Users className="w-3 h-3" />
                          <span>{party.attendees} attendees</span>
                        </div>
                      </div>

                      {/* Date and Location below */}
                      <div className="flex items-center space-x-4 text-slate-300 text-xs">
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
        )}
      </div>
    </div>
  );
};

export default MyParties;
