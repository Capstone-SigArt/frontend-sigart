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
  const [availableTags,setAvailableTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['All', 'Digital', 'Traditional', 'Photography', 'Mixed Media', 'Sculptures'];

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        // const response = await fetch(`${API_BASE_URL}/artwork/allArt`);
        const response = await fetch(`${API_BASE_URL}/artwork/allWithLikes`);

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
    const fetchTags = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/tags/artworkTags/allArtworkTags`);
        if (!res.ok) throw new Error('Failed to fetch tags');
        const data = await res.json();
        setAvailableTags(data);
      } catch (err) {
        console.error('Error fetching tags:', err);
      }
    };

    fetchArtworks();
    fetchTags();
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
    const notes = artwork.notes || "";
    const title = artwork.title || "";
    const artist = artwork.username || "";

    const matchesSearch =
        notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag
        ? artwork.tags.some((tag) => tag.id === selectedTag.id)
        : true;

    return matchesSearch && matchesTag;
  });

  const toggleLike = (artworkId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Toggled like for artwork ${artworkId}`);
  };

  const handleArtworkClick = (art) => {
    setSelectedArtwork({
      id: art.id,
      title: art.title || 'Untitled',
      artist: art.username,
      uploader_id: art.uploader_id,
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
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-blue-100 dark:from-blue-900 dark:via-blue-900 dark:to-blue-10 noise-overlay">
      <ModernNavigation 
        title="Community Showcase" 
        subtitle="Discover amazing artwork from our community"
      />

      {/* Search and Filter Section */}
      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search artworks or artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 dark:bg-slate-700/80 border-white/30 rounded-xl shadow-sm focus:shadow-md transition-shadow"
              />
            </div>
            <Button className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white rounded-xl px-6 shadow-lg">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Category Filter */}

          <div className="flex gap-2 overflow-x-auto no-scrollbar mt-4 whitespace-nowrap pb-4">
            {availableTags.map((tag) => (
                <Button
                    key={tag.id}
                    variant={selectedTag?.id === tag.id ? "default" : "outline"}
                    onClick={() => setSelectedTag(selectedTag?.id === tag.id ? null : tag)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 transition-all duration-300 ${
                        selectedTag?.id === tag.id
                            ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg'
                    : 'bg-white/40 border-white/30 hover:bg-white/60'
                    }`}
                >
                  {tag.name}
                </Button>
            ))}
          </div>

        </div>
      </div>

      {/* Artwork Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtworks.map((artwork) => (
            <Card 
              key={artwork.id} 
              className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 cursor-pointer rounded-2xl overflow-hidden hover:-translate-y-2"
              onClick={() => handleArtworkClick(artwork)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={artwork.image_url}
                    alt={artwork.notes}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      variant="ghost"
                      className={`w-8 h-8 rounded-full backdrop-blur-sm ${
                        artwork.liked 
                          ? 'bg-red-500/80 text-white' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                      onClick={(e) => toggleLike(artwork.id, e)}
                    >
                      <Heart className="w-4 h-4" fill={artwork.liked ? 'currentColor' : 'none'} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Sharing artwork ${artwork.id}`);
                      }}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Downloading artwork ${artwork.id}`);
                      }}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    {/*<Badge className="bg-gradient-to-r from-sky-500 to-blue-500 text-white backdrop-blur-sm">
                      {artwork.category}

                    </Badge>*/}
                  </div>

                  {/* Hover Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white/90 text-sm mb-2 drop-shadow-lg">
                      {artwork.notes}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {artwork.tags.map((tag, index) => (
                        <Badge 
                          key={index}
                          className="bg-gradient-to-r from-sky-500 to-blue-500 text-white backdrop-blur-sm"
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Artwork Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{artwork.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                    by {artwork.username || artwork.uploader_id}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{artwork.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{artwork.views}</span>
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
          <Button 
            variant="outline"
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 rounded-xl px-8 py-3 hover:shadow-lg transition-all duration-300"
          >
            Load More Artworks
          </Button>
        </div>
      </div>
      <ArtDetailsModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          artData={selectedArtwork}
      />
    </div>
  );
};

export default CommunityArt;
