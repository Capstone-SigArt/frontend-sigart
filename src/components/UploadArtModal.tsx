
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
      <DialogContent className="max-w-2xl bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-foreground">
            Upload your art!
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Left side - Image upload */}
          <div className="space-y-4">
            <div className="h-64 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center bg-muted/50">
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-h-60 max-w-full object-contain rounded"
                />
              ) : (
                <>
                  <div className="text-center">
                    <div className="text-muted-foreground mb-2">Image</div>
                    <div className="text-muted-foreground">preview</div>
                  </div>
                  <Upload className="h-8 w-8 text-muted-foreground mt-4" />
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
              className="block w-full text-center py-2 px-4 bg-muted text-muted-foreground rounded cursor-pointer hover:bg-muted/80"
            >
              Choose Image
            </label>
          </div>

          {/* Right side - Form fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-foreground">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-background border-border"
              />
            </div>

            <div>
              <Label htmlFor="toolsUsed" className="text-foreground">
                Tools used?
                <span className="text-muted-foreground text-xs ml-1">(Separate with ",")</span>
              </Label>
              <Input
                id="toolsUsed"
                value={toolsUsed}
                onChange={(e) => setToolsUsed(e.target.value)}
                className="bg-background border-border"
              />
            </div>

            <div>
              <Label htmlFor="tags" className="text-foreground">
                Tags?
                <span className="text-muted-foreground text-xs ml-1">(Separate with ",")</span>
              </Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="bg-background border-border"
              />
            </div>

            <div>
              <Label htmlFor="notesDescription" className="text-foreground">Notes/Description?</Label>
              <Textarea
                id="notesDescription"
                value={notesDescription}
                onChange={(e) => setNotesDescription(e.target.value)}
                className="bg-background border-border min-h-[80px]"
              />
            </div>

            <div>
              <Label htmlFor="taggedCharacterNames" className="text-foreground">Tagged Character names</Label>
              <Input
                id="taggedCharacterNames"
                value={taggedCharacterNames}
                onChange={(e) => setTaggedCharacterNames(e.target.value)}
                className="bg-background border-border"
              />
            </div>

            <div>
              <Label className="text-foreground">Reference Image (optional)</Label>
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
                  className="px-3 py-1 bg-muted text-muted-foreground rounded cursor-pointer hover:bg-muted/80 text-sm"
                >
                  upload
                </label>
                {referenceImage && (
                  <span className="text-sm text-muted-foreground">{referenceImage.name}</span>
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
            className="px-8"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            className="px-8"
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
