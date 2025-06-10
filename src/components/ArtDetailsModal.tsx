
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Edit, Bookmark, Heart } from 'lucide-react';

interface ArtDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  artData?: {
    title: string;
    artist: string;
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

const ArtDetailsModal = ({ open, onOpenChange, artData }: ArtDetailsModalProps) => {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  if (!artData) return null;

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-foreground">
            {artData.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Image Display */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-border rounded-lg p-2 bg-muted/50">
              <img 
                src={artData.imageUrl} 
                alt={artData.title}
                className="w-full h-48 object-cover rounded"
              />
            </div>
            {artData.referenceImageUrl && (
              <div className="border border-border rounded-lg p-2 bg-muted/50">
                <img 
                  src={artData.referenceImageUrl} 
                  alt="Reference"
                  className="w-full h-48 object-cover rounded"
                />
                <div className="text-center text-sm text-muted-foreground mt-2">
                  Reference Image
                </div>
              </div>
            )}
          </div>

          {/* Artist Info */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-blue-500 text-white">
                  <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Artist</div>
                <div className="text-sm text-muted-foreground">profile</div>
              </div>
            </div>
            <div className="text-foreground font-medium">{artData.artist}</div>
          </div>

          {/* Additional Info Toggle */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
              className="w-48"
            >
              Additional Info {showAdditionalInfo ? '▲' : '▼'}
            </Button>
          </div>

          {/* Additional Info Content */}
          {showAdditionalInfo && (
            <div className="grid grid-cols-2 gap-6 p-4 border border-border rounded-lg bg-muted/50">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Uploaded on:</span>
                  <span className="text-sm text-muted-foreground">{artData.uploadDate}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Edit className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Tools Used:</span>
                  <span className="text-sm text-muted-foreground">{artData.toolsUsed}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Tags:</span>
                  <span className="text-sm text-muted-foreground">{artData.tags.join(' ')}</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Additional Notes:</div>
                    <div className="text-sm text-muted-foreground">{artData.additionalNotes}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Heart 
                    className={`h-4 w-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-muted-foreground'}`} 
                  />
                  <span className="text-sm font-medium">Likes:</span>
                  <span className="text-sm text-muted-foreground">{artData.likes}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLike}
                    className="ml-auto px-4 py-1 text-xs"
                  >
                    {isLiked ? 'Unlike' : 'Like/Unlike'}
                  </Button>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Tagged Characters</div>
                <div className="space-y-2">
                  {artData.taggedCharacters.map((character, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-blue-500 text-white text-xs">
                          <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">—</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Note about features */}
          <div className="text-xs text-muted-foreground p-3 bg-muted/30 rounded border border-border">
            Although not an early on priority, likes could be tied to features for party owners to host contests or 
            other events inside their "party" to give a more fun and social atmosphere to each party. Many of the 
            current party hosts like to do giveaways or things of this nature, thus this could be a good way to handle 
            these needs externally
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtDetailsModal;
