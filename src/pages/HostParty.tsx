
import React, {useEffect, useState} from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ModernNavigation from '@/components/ModernNavigation';
import { useNavigate } from 'react-router-dom';
import {supabase} from "@/lib/supabase.ts";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL

const HostParty = () => {
  const [formData, setFormData] = useState({
    title: '',
    theme: '',
    tags: '',
    startTime: '',
    endTime:'',
    location: '',
    description: '',
    cover_image: '',
    created_at: new Date().toISOString(),
    date: '',
    host_id: '',

  });
  const [previewGenerated, setPreviewGenerated] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    if (field === 'startTime' && value) {
      // Auto-set endTime to 2 hours after startTime
      const startDateTime = new Date(value);
      const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours
      const endTimeString = endDateTime.toISOString().slice(0, 16); // Format as datetime-local
      
      setFormData(prev => ({ 
        ...prev, 
        [field]: value,
        // Always update endTime to ensure it's after startTime
        endTime: prev.endTime && new Date(prev.endTime) > new Date(value) ? prev.endTime : endTimeString
      }));
    } else {
    setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleGeneratePreview = () => {
    setPreviewGenerated(true);
  };

  const associateTagsWithParty = async (partyId: string) => {
    const tags = formData.tags.split(',').map(tag=>tag.trim()).filter(tag=>tag);

    for (const tag of tags) {
      try {
        const tagRes = await fetch(`${API_BASE_URL}/tags/${encodeURIComponent(tag)}`);
        const tagData = await tagRes.json()
        console.log('Tag data fetched:', tagData);

        if(!tagData.id) {
          console.warn(`No tag ID found for "${tag}"`);
          continue;
        }

        const linkRes = await fetch(`${API_BASE_URL}/tags/partyTags`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ party_id: partyId, tag_id: tagData.id })
        });

        const linkResult = await linkRes.json();
        console.log(`Tag "${tag}" linked to party:`, linkResult);
      } catch (err) {
        console.error(`Failed to link tag "${tag}" to party`, err);
      }
    }
  };

  const associateHostWithParty = async (partyId: string) => {
    try{
    const response = await fetch(`${API_BASE_URL}/partyMember`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id: formData.host_id,
        party_id: partyId,
        role: 'host',
        joined_at: new Date().toISOString()
      })
    });

    if(!response.ok) {
      const err = await response.json();
      console.error("Failed to associate host with party:", err.message);
    } else {
      const data = await response.json();
      console.log("Host successfully associated with party:", data);
    }
    } catch (error) {
      console.error("Error associating host with party:", error);
    }
  };

  const handleCreateParty = async () => {
    // Validation
    if (!formData.startTime || !formData.endTime) {
      alert('Please set both start and end times');
      return;
    }
    
    const startDateTime = new Date(formData.startTime);
    const endDateTime = new Date(formData.endTime);
    
    if (endDateTime <= startDateTime) {
      alert('End time must be after start time. Please ensure the event has a proper duration.');
      return;
    }
    
    // Additional check: prevent events with less than 30 minutes duration
    const durationMinutes = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60);
    if (durationMinutes < 30) {
      alert('Event duration must be at least 30 minutes. Please adjust your end time.');
      return;
    }
    
    if (!formData.title || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      const payload = {
        host_id: formData.host_id,
        title: formData.title,
        description: formData.description,
        cover_image: formData.cover_image || '', // optional
        created_at: formData.created_at,
        scheduled_at: formData.startTime, // or a different date/time field
        date: formData.startTime.split('T')[0], // extract date from start datetime
        start_time: formData.startTime.split('T')[1] || '',
        end_time: formData.endTime.split('T')[1] || '',
        start_datetime: formData.startTime, // full start datetime
        end_datetime: formData.endTime, // full end datetime
        theme: formData.theme,
        address: formData.location,
      };
      console.log("Payload to be sent:");
      console.log("host_id:", formData.host_id);
      console.log("title:", formData.title);
      console.log("theme:", formData.theme);
      console.log("tags:", formData.tags);
      console.log("description:", formData.description);
      console.log("start_time:", formData.startTime.split('T')[1] || '');
      console.log("end_time:", formData.endTime.split('T')[1] || '');
      console.log("date:", formData.startTime.split('T')[0]);
      console.log("start_datetime:", formData.startTime);
      console.log("end_datetime:", formData.endTime);
      console.log("cover_image:", formData.cover_image || '');
      console.log("address:", formData.location);
      console.log("scheduled_at:", formData.startTime);
      console.log("created_at:", formData.created_at);


      const response = await fetch(`${API_BASE_URL}/parties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Error creating party:', error.message);
        return;
      }

      await testCreateTags();

      const data = await response.json();
      console.log('Party created:', data);
      console.log(data.id)


      //associate host
      await associateHostWithParty(data.id)
      //associate partyTags
      await associateTagsWithParty(data.id);

      navigate('/my-parties');
    } catch (error) {
      console.error('Failed to create party:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      theme: '',
      tags: '',
      startTime: '',
      endTime:'',
      location: '',
      description: '',
      cover_image: '',
      created_at: new Date().toISOString(),
      date: '',
      host_id: '',
    });
    setPreviewGenerated(false);
  };

  const handleImageUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) return;

    try {
      const res = await fetch(
          `${API_BASE_URL}/upload/generate-upload-url?fileName=${encodeURIComponent(file.name)}&fileType=${encodeURIComponent(file.type)}`
      );
      const {uploadURL} = await res.json();

      const uploadRes = await fetch(uploadURL, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      if(!uploadRes.ok) throw new Error("Upload failed");
      //this is not to be used for production and will be setup with a custom domain later, this has rate limits and is only for testing purposes
      const publicUrl = `https://pub-d09558734dc641f2b6f0331097b0c0e0.r2.dev/${encodeURIComponent(file.name)}`;
      setFormData(prev => ({ ...prev, cover_image: publicUrl }));
      console.log("Image uploaded and cover_image set:", publicUrl);
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Image upload failed");
    }
  };

  const testCreateTags = async () => {
    try {
      const tags = formData.tags
          .split(',')
          .map(t => t.trim())
          .filter(t => t);

      if (tags.length === 0) {
        console.log('No tags to test');
        return;
      }

      for (const tag of tags) {
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
    } catch (error) {
      console.error('Error testing tag create:', error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setFormData(prev => ({ ...prev, host_id: user?.id || '' }));
    };
    fetchUser();
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-slate-300">
      <ModernNavigation 
        title="Host a Party" 
        subtitle="Create a new art gathering"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/80 backdrop-blur-sm border border-blue-500/30 shadow-xl shadow-blue-500/10 rounded-2xl">
            <CardContent className="p-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] bg-clip-text text-transparent mb-6">
                  Party Details
              </h2>
              
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Party Title
                    </label>
                <Input
                      type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter party title"
                      className="bg-slate-900/50 border border-blue-500/30 text-slate-300 placeholder-slate-500 rounded-xl focus:border-[#38bdf8] focus:ring-[#38bdf8]"
                />
                  </div>
                
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Theme
                    </label>
                <Input
                      type="text"
                  value={formData.theme}
                  onChange={(e) => handleInputChange('theme', e.target.value)}
                      placeholder="Enter party theme"
                      className="bg-slate-900/50 border border-blue-500/30 text-slate-300 placeholder-slate-500 rounded-xl focus:border-[#38bdf8] focus:ring-[#38bdf8]"
                />
                  </div>
                
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Tags (comma separated)
                    </label>
                <Input
                      type="text"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                      placeholder="art, digital, character design"
                      className="bg-slate-900/50 border border-blue-500/30 text-slate-300 placeholder-slate-500 rounded-xl focus:border-[#38bdf8] focus:ring-[#38bdf8]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Start Time
                      </label>
                  <Input
                      type="datetime-local"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                        className="bg-slate-900/50 border border-blue-500/30 text-slate-300 rounded-xl focus:border-[#38bdf8] focus:ring-[#38bdf8]"
                  />
                </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        End Time
                      </label>
                  <Input
                      type="datetime-local"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                        className="bg-slate-900/50 border border-blue-500/30 text-slate-300 rounded-xl focus:border-[#38bdf8] focus:ring-[#38bdf8]"
                  />
                    </div>
                </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Location
                    </label>
                  <Input
                      type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Enter location"
                      className="bg-slate-900/50 border border-blue-500/30 text-slate-300 placeholder-slate-500 rounded-xl focus:border-[#38bdf8] focus:ring-[#38bdf8]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Description
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe your art party..."
                      className="bg-slate-900/50 border border-blue-500/30 text-slate-300 placeholder-slate-500 rounded-xl focus:border-[#38bdf8] focus:ring-[#38bdf8] min-h-[120px]"
                  />
                </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Cover Image
                  </label>
                  <Input
                      type="file"
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="bg-slate-900/50 border border-blue-500/30 text-slate-300 rounded-xl focus:border-[#38bdf8] focus:ring-[#38bdf8]"
                />
              </div>

                  <div className="flex space-x-4">
                <Button 
                  onClick={handleCreateParty}
                      className="flex-1 bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] hover:opacity-90 text-white rounded-xl py-3 shadow-lg shadow-blue-500/20 transition-all duration-300"
                >
                  Create Party
                </Button>
                <Button 
                      onClick={handleCancel}
                  variant="outline"
                      className="flex-1 border-blue-500/30 bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:text-[#38bdf8] rounded-xl py-3 transition-all duration-300"
                >
                  Cancel
                </Button>
                  </div>
              </div>
            </CardContent>
          </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/80 backdrop-blur-sm border border-blue-500/30 shadow-xl shadow-blue-500/10 rounded-2xl sticky top-8">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] bg-clip-text text-transparent mb-4">
                  Party Preview
              </h3>
            
            {previewGenerated ? (
                  <div className="space-y-4">
                    <div className="aspect-video rounded-lg bg-slate-900/50 border border-blue-500/30 overflow-hidden">
                      {formData.cover_image && (
                        <img
                          src={formData.cover_image}
                          alt="Cover"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    
                    <h4 className="text-lg font-semibold text-slate-300">
                      {formData.title || 'Party Title'}
                      </h4>
                    
                    {formData.theme && (
                      <Badge className="bg-[#38bdf8]/20 text-[#38bdf8] border-[#38bdf8]/30">
                        {formData.theme}
                      </Badge>
                    )}
                    
                    <p className="text-sm text-slate-400">
                      {formData.description || 'Party description will appear here...'}
                    </p>
                    
                    {formData.tags && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.split(',').map((tag, index) => (
                                  <Badge
                                      key={index}
                            className="bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30"
                                  >
                            {tag.trim()}
                                  </Badge>
                              ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Button
                    onClick={handleGeneratePreview}
                    className="w-full bg-slate-900/50 border border-blue-500/30 text-[#38bdf8] hover:bg-slate-800 hover:text-[#f59e0b] rounded-xl py-3 transition-all duration-300"
                  >
                    Generate Preview
                  </Button>
                )}
                </CardContent>
              </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostParty;
