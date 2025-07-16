import React, {useEffect, useState} from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Heart, Share2, Eye, Download, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ModernNavigation from '@/components/ModernNavigation';
import ArtDetailsModal from '@/components/ArtDetailsModal';
import dayjs from "dayjs";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL

const CommunityArt = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['All', 'Digital', 'Traditional', 'Photography', 'Mixed Media', 'Sculptures'];

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/artwork/allArt`);
        if (!response.ok) throw new Error('Failed to fetch artworks');

        const data = await response.json();

        const artworksWithExtras = await Promise.all(
            data.map(async (artwork) => {
              const tags = await fetchArtworkLinkedTags(artwork.id);
              const username = await fetchUsernameById(artwork.uploader_id);
              return {
                ...artwork,
                tags,
                username,
              };
            })
        );

        setArtworks(artworksWithExtras);
      } catch (err) {
        console.error(err);
        setError('Could not load artworks');
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const fetchArtworkLinkedTags = async(artworkId: string) => {
    try{
      const res = await fetch(`${API_BASE_URL}/tags/artworkTags/${artworkId}`);
      if(!res.ok) {
        console.error('Failed to fetch linked tags');
        return []
      }
      const data = await res.json();
      return data; //array of tags
    } catch (err) {
      console.error("Error fetching linked tags:", err);
      return [];
    }
  }

  const fetchUsernameById = async (userId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/profile/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch profile');
      const data = await res.json();
      return data.username || userId;
    } catch (err) {
      console.error('Error fetching username:', err);
      return userId; // fallback
    }
  };

  /*const artworks = [
    {
      id: 1,
      title: "Cyber Dreams",
      artist: "Alex Chen",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=500&fit=crop",
      category: "Digital",
      likes: 234,
      views: 1567,
      description: "A futuristic digital landscape exploring the intersection of technology and dreams",
      tags: ["Cyberpunk", "Digital", "Futuristic"],
      liked: false
    },
    {
      id: 2,
      title: "Ocean Serenity",
      artist: "Maria Rodriguez",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=500&fit=crop",
      category: "Traditional",
      likes: 189,
      views: 892,
      description: "Watercolor painting capturing the peaceful essence of ocean waves",
      tags: ["Watercolor", "Nature", "Peaceful"],
      liked: true
    },
    {
      id: 3,
      title: "Urban Pulse",
      artist: "David Kim",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=500&fit=crop",
      category: "Photography",
      likes: 156,
      views: 2341,
      description: "Street photography capturing the vibrant energy of city life",
      tags: ["Street", "Urban", "Photography"],
      liked: false
    },
    {
      id: 4,
      title: "Portrait Study",
      artist: "Emma Thompson",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=500&fit=crop",
      category: "Traditional",
      likes: 298,
      views: 1789,
      description: "Classical portrait study in charcoal and graphite",
      tags: ["Portrait", "Charcoal", "Study"],
      liked: true
    },
    {
      id: 5,
      title: "Nature's Harmony",
      artist: "James Wilson",
      image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=400&h=500&fit=crop",
      category: "Photography",
      likes: 421,
      views: 3245,
      description: "Landscape photography showcasing the beauty of natural formations",
      tags: ["Landscape", "Nature", "Photography"],
      liked: false
    },
    {
      id: 6,
      title: "Abstract Motion",
      artist: "Sarah Davis",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=500&fit=crop",
      category: "Mixed Media",
      likes: 167,
      views: 987,
      description: "Mixed media piece exploring movement and color dynamics",
      tags: ["Abstract", "Motion", "Experimental"],
      liked: true
    }
  ];*/

  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artwork.uploader_id.toLowerCase().includes(searchQuery.toLowerCase());
    /*const matchesCategory = selectedCategory === 'All' || artwork.category === selectedCategory;*/
    return matchesSearch /*&& matchesCategory;*/
  });

  const toggleLike = (artworkId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Toggled like for artwork ${artworkId}`);
  };

  const handleArtworkClick = (art) => {
    setSelectedArtwork({
      id: art.id,
      title: art.notes || 'Untitled',
      artist: art.username || art.uploader_id,
      uploadDate: dayjs(art.created_at).format('MMM D, YYYY'),
      toolsUsed: art.tools_used || '',
      tags: [],
      additionalNotes: art.notes || '',
      likes: art.likes || 0,
      taggedCharacters: [], // populate if you have this data
      imageUrl: art.image_url && (art.image_url.startsWith('http') ? art.image_url : `${API_BASE_URL}${art.image_url}`),
      referenceImageUrl: art.reference_url
          ? (art.reference_url.startsWith('http') ? art.reference_url : `${API_BASE_URL}${art.reference_url}`)
          : undefined,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-slate-300">
      <ModernNavigation 
        title="Community Showcase" 
        subtitle="Discover amazing artwork from our community"
      />

      {/* Search and Filter Section */}
      <div className="bg-slate-800/80 backdrop-blur-sm border-b border-blue-500/30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                placeholder="Search artworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-900/50 border border-blue-500/30 text-slate-300 placeholder-slate-500 rounded-xl focus:border-[#38bdf8] focus:ring-[#38bdf8]"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] text-white hover:opacity-90"
                    : "border-blue-500/30 bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:text-[#38bdf8]"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-[#38bdf8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400">Loading amazing artworks...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtworks.map((artwork) => (
              <Card 
                key={artwork.id}
                className="group bg-slate-800/80 backdrop-blur-sm border border-blue-500/30 shadow-xl shadow-blue-500/10 rounded-2xl hover:shadow-2xl hover:shadow-[#38bdf8]/20 transition-all duration-300 overflow-hidden"
                onClick={() => handleArtworkClick(artwork)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={artwork.image_url && (artwork.image_url.startsWith('http') ? artwork.image_url : `${API_BASE_URL}${artwork.image_url}`)}
                    alt={artwork.notes || 'Artwork'}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-300 truncate">
                      {artwork.notes || 'Untitled'}
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-[#38bdf8]"
                      onClick={(e) => toggleLike(artwork.id, e)}
                    >
                      <Heart className="w-5 h-5" />
                    </Button>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">
                    by {artwork.username || artwork.uploader_id}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {artwork.tags && artwork.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        className="bg-[#38bdf8]/20 text-[#38bdf8] border-[#38bdf8]/30"
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm text-slate-400">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>0</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4" />
                      <span>0</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Share2 className="w-4 h-4" />
                      <span>0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Art Details Modal */}
      {selectedArtwork && (
        <ArtDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          artwork={selectedArtwork}
        />
      )}
    </div>
  );
};

export default CommunityArt;
