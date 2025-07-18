
import React, {useEffect, useState} from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface UploadArtModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (artData: any) => void;
  eventId: string;
}

interface PartyCharacter {
  id: string;            // primary key of the character record
  character_id: string;  // actual FFXIV character ID
  name: string;
  avatar: string;
  user_id: string;       // foreign key linking to the user
}


const UploadArtModal = ({ open, onOpenChange, onUpload,eventId }: UploadArtModalProps) => {
  const [title, setTitle] = useState('');
  const [toolsUsed, setToolsUsed] = useState('');
  const [tags, setTags] = useState('');
  const [notesDescription, setNotesDescription] = useState('');
  const [taggedCharacterNames, setTaggedCharacterNames] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [partyMembers, setPartyMembers] = useState<PartyCharacter[]>([]);
  const [selectedCharacterIds, setSelectedCharacterIds] = useState<string[]>([]);


  useEffect(() => {
    const fetchPartyMembers = async () => {
      const res = await fetch(`${API_BASE_URL}/partyCharacters/${eventId}`);
      if(!res.ok) {
        console.error('Failed to fetch partyCharacters');
        return;
      }
      const data = await res.json();
      setPartyMembers(data); // contains avatar, name, character_id, etc.
    };

    if (open) fetchPartyMembers();
  }, [open, eventId]);


  const uploadFileToR2 = async (file: File): Promise<string> => {
    const res = await fetch(`${API_BASE_URL}/upload/generate-upload-url?fileName=${encodeURIComponent(file.name)}&fileType=${encodeURIComponent(file.type)}`);
    const { uploadURL } = await res.json();

    const uploadRes = await fetch(uploadURL, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file
    });

    if (!uploadRes.ok) throw new Error('Failed to upload to R2');
    return `https://pub-d09558734dc641f2b6f0331097b0c0e0.r2.dev/${encodeURIComponent(file.name)}`;
  };

  const associateTagsWithArtwork = async (artworkId: string) => {
    const tagList = tags.split(',').map(tag=>tag.trim()).filter(tag=>tag);

    for (const tag of tagList) {
      try {
        const tagRes = await fetch(`${API_BASE_URL}/tags/${encodeURIComponent(tag)}`);
        const tagData = await tagRes.json()
        console.log('Tag data fetched:', tagData);

        if(!tagData.id) {
          console.warn(`No tag ID found for "${tag}"`);
          continue;
        }

        const linkRes = await fetch(`${API_BASE_URL}/tags/artworkTags`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ artwork_id: artworkId, tag_id: tagData.id })
        });

        const linkResult = await linkRes.json();
        console.log(`Tag "${tag}" linked to artwork:`, linkResult);
      } catch (err) {
        console.error(`Failed to link tag "${tag}" to artwork`, err);
      }
    }
  };

  const CharacterSelectList = ({ characters, selectedIds, onToggle }) => {
    return (
        <ScrollArea className="max-h-60 space-y-2 pr-2" style={{maxHeight:'10rem',overflowY:'auto'}}>
          {characters.map((char) => {
            const isChecked = selectedIds.includes(char.id);
            return (
                <div
                    key={char.id}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-xl border border-sky-200 dark:border-sky-600 hover:bg-sky-100/50 dark:hover:bg-sky-800/30 transition"
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => onToggle(char.id)}
                    />
                    <img
                        src={char.avatar}
                        alt={char.name}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {char.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        ID: {char.character_id}
                      </div>
                    </div>
                  </div>
                </div>
            );
          })}
        </ScrollArea>
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReferenceImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setReferenceImage(file);
    }
  };

  const handleUpload = async () => {
    try {
      const {
        data: { user }
      } = await import("@/lib/supabase").then(m => m.supabase.auth.getUser());

      if (!user || !selectedImage) {
        alert("Missing image or user not logged in.");
        return;
      }

      const imageUrl = await uploadFileToR2(selectedImage);
      const referenceUrl = referenceImage ? await uploadFileToR2(referenceImage) : null;

      const payload = {
        uploader_id: user.id,
        party_id: eventId,
        image_url: imageUrl,
        reference_url: referenceUrl,
        notes: notesDescription,
        tools_used: toolsUsed,
        created_at: new Date().toISOString(),
        title: title
      };

      const res = await fetch(`${API_BASE_URL}/artwork`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to upload art metadata");

      const savedArtwork = await res.json();

      if (selectedCharacterIds.length > 0) {
        await fetch(`${API_BASE_URL}/artworkCharacters`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            artwork_id: savedArtwork.id,
            character_ids: selectedCharacterIds
          })
        });
      }

      const tagList = tags
          .split(',')
          .map(t => t.trim())
          .filter(t => t);

      if (tagList.length === 0) {
        console.log('No tags to test');
        return;
      }

      for (const tag of tagList) {
        const response = await fetch(`${API_BASE_URL}/tags`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: tag }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.warn(`Tag "${tag}" create failed:`, errorData.message);
        } else {
          const data = await response.json();
          console.log(`Tag "${tag}" created or already exists:`, data);
        }
      }

      await associateTagsWithArtwork(savedArtwork.id)

      onUpload(payload); // trigger re-render in parent
      onOpenChange(false); // close modal

      // Clear form
      setTitle('');
      setToolsUsed('');
      setTags('');
      setNotesDescription('');
      setTaggedCharacterNames('');
      setSelectedImage(null);
      setReferenceImage(null);
      setImagePreview(null);
      setSelectedCharacterIds([]);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    }
  };


  const handleCancel = () => {
    // Reset form
    setTitle('');
    setToolsUsed('');
    setTags('');
    setNotesDescription('');
    setTaggedCharacterNames('');
    setSelectedImage(null);
    setReferenceImage(null);
    setImagePreview(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-white/30 shadow-2xl rounded-2xl z-[9999]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
            Upload your art!
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground text-center">
            Share your artwork with the community by uploading your creations.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Left side - Image upload */}
          <div className="space-y-4">
            <div className="h-64 border-2 border-dashed border-sky-300 dark:border-sky-600 rounded-2xl flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20">
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-h-60 max-w-full object-contain rounded-xl"
                />
              ) : (
                <>
                  <div className="text-center">
                    <div className="text-slate-600 dark:text-slate-300 mb-2 font-medium">Image</div>
                    <div className="text-slate-500 dark:text-slate-400">preview</div>
                  </div>
                  <Upload className="h-8 w-8 text-sky-500 mt-4" />
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="block w-full text-center py-3 px-4 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white rounded-xl cursor-pointer transition-all shadow-lg hover:shadow-xl"
            >
              Choose Image
            </label>
          </div>

          {/* Right side - Form fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-slate-700 dark:text-slate-300 font-medium">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm"
              />
            </div>

            <div>
              <Label htmlFor="toolsUsed" className="text-slate-700 dark:text-slate-300 font-medium">
                Tools used?
                <span className="text-slate-500 dark:text-slate-400 text-xs ml-1">(Separate with ",")</span>
              </Label>
              <Input
                id="toolsUsed"
                value={toolsUsed}
                onChange={(e) => setToolsUsed(e.target.value)}
                className="bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm"
              />
            </div>

            <div>
              <Label htmlFor="tags" className="text-slate-700 dark:text-slate-300 font-medium">
                Tags?
                <span className="text-slate-500 dark:text-slate-400 text-xs ml-1">(Separate with ",")</span>
              </Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm"
              />
            </div>

            <div>
              <Label htmlFor="notesDescription" className="text-slate-700 dark:text-slate-300 font-medium">Notes/Description?</Label>
              <Textarea
                id="notesDescription"
                value={notesDescription}
                onChange={(e) => setNotesDescription(e.target.value)}
                className="bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm min-h-[80px]"
              />
            </div>

            <div>
              <Label htmlFor="taggedCharacterNames" className="text-slate-700 dark:text-slate-300 font-medium">Tagged Character names</Label>
              {/*<Input
                id="taggedCharacterNames"
                value={taggedCharacterNames}
                onChange={(e) => setTaggedCharacterNames(e.target.value)}
                className="bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm"
              />*/}
              <CharacterSelectList
                  characters={partyMembers}
                  selectedIds={selectedCharacterIds}
                  onToggle={(id) => {
                    setSelectedCharacterIds((prev) =>
                        prev.includes(id)
                            ? prev.filter((c) => c !== id)
                            : [...prev, id]
                    );
                  }}
              />

            </div>

            <div>
              <Label className="text-slate-700 dark:text-slate-300 font-medium">Reference Image (optional)</Label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleReferenceImageUpload}
                  className="hidden"
                  id="reference-upload"
                />
                <label
                  htmlFor="reference-upload"
                  className="px-4 py-2 bg-white/60 dark:bg-slate-700/60 border border-sky-200 dark:border-sky-600 text-slate-600 dark:text-slate-300 rounded-xl cursor-pointer hover:bg-sky-50 dark:hover:bg-sky-900/30 transition-all text-sm"
                >
                  upload
                </label>
                {referenceImage && (
                  <span className="text-sm text-slate-600 dark:text-slate-400 truncate">{referenceImage.name}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="px-8 rounded-xl border-sky-200 hover:bg-sky-50 dark:border-sky-600 dark:hover:bg-sky-900/30"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            className="px-8 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white rounded-xl shadow-lg"
            disabled={!title || !selectedImage}
          >
            Upload
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadArtModal;
