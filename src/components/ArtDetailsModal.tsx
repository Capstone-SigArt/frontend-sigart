
import React, { useState,useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Edit, Bookmark, Heart } from 'lucide-react';
import {useNavigate} from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL

interface ArtDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  artData?: {
    id: string;
    title: string;
    artist: string;
    uploader_id: string;
    uploadDate: string;
    toolsUsed: string;
    tags: string[];
    additionalNotes: string;
    likes: number;
    taggedCharacters: string[];
    imageUrl: string;
    referenceImageUrl?: string;
  };
}

const ImageZoomModal = ({ imageUrl, onClose }: { imageUrl: string; onClose: () => void }) => {
  return (
      <Dialog open={!!imageUrl} onOpenChange={() => onClose()}>
        <DialogContent
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[90vh] p-0 bg-black/90 rounded-xl flex items-center justify-center cursor-zoom-out z-[10000]"
        >
          <img
              src={imageUrl}
              alt="Zoomed"
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
              /*onClick={onClose} */
          />
        </DialogContent>
      </Dialog>
  );
};

const ArtDetailsModal = ({ open, onOpenChange, artData }: ArtDetailsModalProps) => {
  const navigate = useNavigate();
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [linkedCharacters,setLinkedCharacters] = useState([]);
  const [linkedTags,setLinkedTags] = useState([]);
  const [uploaderProfile, setUploaderProfile] = useState<any | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState<number>(artData?.likes || 0);
  const [zoomImageUrl, setZoomImageUrl] = useState<string | null>(null);
  const openZoom = (url: string) => setZoomImageUrl(url);
  const closeZoom = () => setZoomImageUrl(null);



  useEffect(() => {
    const fetchAll = async () => {
      if (!open || !artData?.id) return;

      // Fetch current user
      const {
        data: { user }
      } = await import("@/lib/supabase").then(m => m.supabase.auth.getUser());
      if (!user) return;

      const [charactersRes, tags, likesRes, likedStatusRes,profileRes] = await Promise.all([
        fetch(`${API_BASE_URL}/artworkCharacters/${artData.id}`).then(res => res.json()),
        fetchArtworkLinkedTags(artData.id),
        fetchArtworkLikes(artData.id),
        fetch(`${API_BASE_URL}/likes/userLiked?user_id=${user.id}&artwork_id=${artData.id}`).then(res => res.json()),
        fetch(`${API_BASE_URL}/profile/${artData.uploader_id}`).then((res) => res.json()),
      ]);

      setLinkedCharacters(charactersRes);
      setLinkedTags(tags);
      setLikesCount(likesRes.count ?? 0);
      setIsLiked(likedStatusRes.liked ?? false);
      setUploaderProfile(profileRes);
    };

    fetchAll();
  }, [open, artData?.id]);

  if (!artData) return null;

  const handleLike = async () => {
    if (!artData?.id) return;

    try {
      const {
        data: { user }
      } = await import("@/lib/supabase").then(m => m.supabase.auth.getUser());
      if (!isLiked) {
        // Send POST request to create a like
        const response = await fetch(`${API_BASE_URL}/likes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: user.id,
            artwork_id: artData.id,
            created_at: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to like artwork');
        }

        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
      } else {
        const response = await fetch(`${API_BASE_URL}/likes`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: user.id,
            artwork_id: artData.id,
          }),
        });

        if (!response.ok) throw new Error('Failed to unlike artwork');

        setIsLiked(false);
        setLikesCount((prev) => Math.max(prev - 1, 0));
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    }
  };

  const fetchArtworkLinkedCharacters = async (artworkId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/artworkCharacters/${artworkId}`);
      if (!res.ok) {
        console.error("Failed to fetch linked characters");
        return [];
      }
      const data = await res.json();
      return data; // array of characters
    } catch (err) {
      console.error("Error fetching linked characters:", err);
      return [];
    }
  };

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

  const fetchArtworkLikes = async(artworkId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/likes?artwork_id=${artworkId}`)
      if(!res.ok) {
        console.error('Failed to fetch likes');
        return 0;
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error fetching likes:", err);
      return 0;
    }
  }

  return (
      <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-white/30 shadow-2xl rounded-2xl z-[9999]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
            {artData.title}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground text-center">
            View artwork details and interact with the community.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Image Display */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-sky-200 dark:border-sky-600 rounded-2xl p-3 bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-sky-900/20 dark:to-emerald-900/20" onClick = {()=>openZoom(artData.imageUrl)}>
              <img 
                src={artData.imageUrl} 
                alt={artData.title}
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
            {artData.referenceImageUrl && (
              <div className="border border-sky-200 dark:border-sky-600 rounded-2xl p-3 bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-sky-900/20 dark:to-emerald-900/20"  onClick = {()=>openZoom(artData.referenceImageUrl)}>
                <img 
                  src={artData.referenceImageUrl} 
                  alt="Reference"
                  className="w-full h-48 object-cover rounded-xl"
                />
                <div className="text-center text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium">
                  Reference Image
                </div>
              </div>
            )}
          </div>

          {/* Artist Info */}
          <div
              onClick={() => navigate(`/user-studio/${artData.uploader_id}`)}
              className="flex items-center justify-center gap-4 p-4 bg-gradient-to-r from-sky-50 to-emerald-50 dark:from-sky-900/20 dark:to-emerald-900/20 rounded-2xl cursor-pointer hover:brightness-95 transition"
              role="button"
              tabIndex={0}
          >
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-sky-300">
                {uploaderProfile?.avatar_url ? (
                    <AvatarImage src={uploaderProfile.avatar_url} alt={artData.artist} />
                ) : (
                    <AvatarFallback className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-bold">
                      {artData.artist.charAt(0).toUpperCase()}
                    </AvatarFallback>
                )}
              </Avatar>
              <div className="text-center">
                <div className="text-sm text-slate-600 dark:text-slate-400">Artist</div>
                <div className="text-sm text-slate-500 dark:text-slate-500">profile</div>
              </div>
            </div>
            <div className="text-slate-700 dark:text-slate-300 font-semibold text-lg">{artData.artist}</div>
          </div>

          {/* Additional Info Toggle */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
              className="w-48 rounded-xl border-sky-200 hover:bg-sky-50 dark:border-sky-600 dark:hover:bg-sky-900/30 transition-all"
            >
              Additional Info {showAdditionalInfo ? '▲' : '▼'}
            </Button>
          </div>

          {/* Additional Info Content */}
          {showAdditionalInfo && (
            <div className="grid grid-cols-2 gap-6 p-6 border border-sky-200 dark:border-sky-600 rounded-2xl bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-sky-900/20 dark:to-emerald-900/20 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Uploaded on:</span>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{artData.uploadDate}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                    <Edit className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tools Used:</span>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{artData.toolsUsed}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-sky-500 rounded-lg flex items-center justify-center">
                    <Bookmark className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tags:</span>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {linkedTags.length > 0
                          ? linkedTags.map(tag => tag.name).join(', ')
                          : 'No tags'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-lg flex items-center justify-center mt-0.5">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Additional Notes:</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{artData.additionalNotes}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
                    <Heart 
                      className={`h-4 w-4 text-white ${isLiked ? 'fill-white' : ''}`} 
                    />
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <div>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Likes:</span>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{likesCount}</div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLike}
                      className={`ml-auto px-4 py-1 text-xs rounded-lg transition-all ${
                        isLiked 
                          ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white border-transparent hover:from-pink-600 hover:to-red-600' 
                          : 'border-sky-200 hover:bg-sky-50 dark:border-sky-600 dark:hover:bg-sky-900/30'
                      }`}
                    >
                      {isLiked ? 'Unlike' : 'Like'}
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Tagged Characters</div>
                <div className="space-y-3">
                  {linkedCharacters.length === 0 && (
                      <div className="text-sm text-slate-500 dark:text-slate-400">No linked characters</div>
                  )}
                  {linkedCharacters.map((character) => (
                      <div key={character.id} className="flex items-center gap-3 p-2 bg-white/60 dark:bg-slate-700/60 rounded-xl">
                        <Avatar className="w-8 h-8 border border-sky-300">
                          {character.avatar ? (
                              <AvatarImage src={character.avatar} alt={character.name} />
                          ) : (
                              <AvatarFallback className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-xs font-bold">
                                {character.name.charAt(0)}
                              </AvatarFallback>
                          )}
                        </Avatar>
                        <span className="text-sm text-slate-600 dark:text-slate-400">{character.name}</span>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Note about features */}
          <div className="text-xs text-slate-600 dark:text-slate-400 p-4 bg-gradient-to-r from-sky-50 to-emerald-50 dark:from-sky-900/10 dark:to-emerald-900/10 rounded-xl border border-sky-200 dark:border-sky-600">
            <strong className="text-slate-700 dark:text-slate-300">Feature Note:</strong> Although not an early priority, likes could be tied to features for party owners to host contests or 
            other events inside their "party" to give a more fun and social atmosphere to each party. Many of the 
            current party hosts like to do giveaways or things of this nature, thus this could be a good way to handle 
            these needs externally.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  {zoomImageUrl && <ImageZoomModal imageUrl={zoomImageUrl} onClose={closeZoom} />}
      </>
  );
};

export default ArtDetailsModal;
