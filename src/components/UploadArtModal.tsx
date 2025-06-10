
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from 'lucide-react';

interface UploadArtModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (artData: any) => void;
}

const UploadArtModal = ({ open, onOpenChange, onUpload }: UploadArtModalProps) => {
  const [title, setTitle] = useState('');
  const [toolsUsed, setToolsUsed] = useState('');
  const [tags, setTags] = useState('');
  const [notesDescription, setNotesDescription] = useState('');
  const [taggedCharacterNames, setTaggedCharacterNames] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const handleUpload = () => {
    const artData = {
      title,
      toolsUsed,
      tags,
      notesDescription,
      taggedCharacterNames,
      image: selectedImage,
      referenceImage
    };
    onUpload(artData);
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
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
            Upload your art!
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground text-center">
            Share your artwork with the community by uploading your creations.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Left side - Image upload */}
          <div className="space-y-4">
            <div className="h-64 border-2 border-dashed border-sky-300 dark:border-sky-600 rounded-2xl flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-sky-900/20 dark:to-emerald-900/20">
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
              className="block w-full text-center py-3 px-4 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white rounded-xl cursor-pointer transition-all shadow-lg hover:shadow-xl"
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
              <Input
                id="taggedCharacterNames"
                value={taggedCharacterNames}
                onChange={(e) => setTaggedCharacterNames(e.target.value)}
                className="bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm"
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
            className="px-8 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white rounded-xl shadow-lg"
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
