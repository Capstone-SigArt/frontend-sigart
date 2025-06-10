
import React, { useState } from 'react';
import { ArrowLeft, Upload, Image as ImageIcon, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const UploadArt = () => {
  const navigate = useNavigate();
  const [artData, setArtData] = useState({
    title: '',
    description: '',
    category: '',
    tags: [] as string[],
    image: null as File | null
  });

  const categories = ['Digital Art', 'Character Design', 'Fantasy', 'Concept Art', 'Traditional', 'Abstract'];
  const suggestedTags = ['Original', 'Commission', 'Study', 'WIP', 'Finished', 'Speed Paint', 'Tutorial'];

  const addTag = (tag: string) => {
    if (!artData.tags.includes(tag)) {
      setArtData({ ...artData, tags: [...artData.tags, tag] });
    }
  };

  const removeTag = (tag: string) => {
    setArtData({ ...artData, tags: artData.tags.filter(t => t !== tag) });
  };

  const handleUpload = () => {
    console.log('Uploading art:', artData);
    navigate('/gallery');
  };

  return (
    <div className="px-4 py-6 max-w-full mx-auto">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-3"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Upload Artwork</h1>
      </div>

      <div className="space-y-6">
        {/* Image Upload */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Artwork Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
              <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Drag and drop your artwork here, or click to browse</p>
              <Button variant="outline" className="border-border">
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Artwork Details */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Artwork Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Title</label>
              <Input
                value={artData.title}
                onChange={(e) => setArtData({ ...artData, title: e.target.value })}
                placeholder="Enter artwork title"
                className="bg-background border-border"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <Textarea
                value={artData.description}
                onChange={(e) => setArtData({ ...artData, description: e.target.value })}
                placeholder="Describe your artwork, inspiration, or process"
                className="bg-background border-border min-h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={artData.category === category ? 'default' : 'outline'}
                    className={`cursor-pointer ${
                      artData.category === category
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setArtData({ ...artData, category })}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {artData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-primary text-primary-foreground cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.filter(tag => !artData.tags.includes(tag)).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => addTag(tag)}
                  >
                    + {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex-1 border-border"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
          >
            Upload Artwork
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadArt;
