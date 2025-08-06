
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
        end_time: formData.endTime || '',
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
    // Ask for confirmation if form has been filled
    const hasFormData = formData.title || formData.description || formData.theme || formData.tags || formData.location || formData.startTime || formData.endTime || formData.cover_image;
    
    if (hasFormData) {
      const confirmCancel = window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.');
      if (!confirmCancel) return;
    }
    
    // Reset form data
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
    
    // Navigate back to previous page or home
    navigate(-1); // Go back to previous page
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
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-blue-100 dark:from-blue-900 dark:via-blue-900 dark:to-blue-10 noise-overlay">
      <ModernNavigation 
        title="Host A Party" 
        subtitle="Create amazing art events"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Form Section */}
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl">
            <CardContent className="p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                Event Details
              </h2>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Party Title *
                  </label>
                <Input
                    placeholder="Enter party title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="bg-white/60 dark:bg-slate-700/60 border-white/30 rounded-xl"
                    required
                />
                </div>
                
                <Input
                  placeholder="Theme"
                  value={formData.theme}
                  onChange={(e) => handleInputChange('theme', e.target.value)}
                  className="bg-white/60 dark:bg-slate-700/60 border-white/30 rounded-xl"
                />
                
                <Input
                  placeholder="Tags, separate with commas"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  className="bg-white/60 dark:bg-slate-700/60 border-white/30 rounded-xl"
                />
                {/*<Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={testCreateTags}
                >
                  Test Create First Tag
                </Button>*/}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Start Date & Time *
                  </label>
                <div className="relative">
                  <Input
                      type="datetime-local"
                        placeholder="Select start date and time"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                        className="bg-white/60 dark:bg-slate-700/60 border-white/30 rounded-xl pr-20"
                        required
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs select-none font-semibold">
                    start-time
                  </span>
                </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    End Time *
                  </label>
                <div className="relative">
                  <Input
                      type="time"
                        placeholder="Select end date and time"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                        className="bg-white/60 dark:bg-slate-700/60 border-white/30 rounded-xl pr-20"
                        required
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs select-none font-semibold">
                    end-time
                  </span>
                  </div>
                  {formData.startTime && formData.endTime && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Duration: {(() => {
                        const start = new Date(formData.startTime);

                        // Extract date part from startTime
                        const datePart = formData.startTime.split('T')[0];
                        const endTime = `${datePart}T${formData.endTime}`;
                        const end = new Date(endTime);

                        // If the end time is before the start time (e.g., goes past midnight), add a day
                        if (end < start) {
                          end.setDate(end.getDate() + 1);
                        }

                        const diffMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
                        const hours = Math.floor(diffMinutes / 60);
                        const minutes = Math.round(diffMinutes % 60);
                        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
                      })()}
                      </p>
                  )}
                </div>
                <div className="flex gap-2">
{/*                  <Button variant="outline" size="sm" className="bg-white/40 border-white/30">Server</Button>
                  <Button variant="outline" size="sm" className="bg-white/40 border-white/30">Datacenter</Button>*/}
                  <Input
                    placeholder="Location/Address"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="flex-1 bg-white/60 dark:bg-slate-700/60 border-white/30 rounded-xl"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Upload Flyer/Cover Image (Optional)
                  </label>
                  <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="bg-white/60 dark:bg-slate-700/60 border-white/30 rounded-xl"
                  />
                  {formData.cover_image && (
                      <img
                          src={formData.cover_image}
                          alt="Cover Preview"
                          className="mt-2 rounded-xl border w-full max-w-sm object-cover"
                      />
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description *
                  </label>
                <Textarea
                    placeholder="Describe your party and what participants can expect"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="bg-white/60 dark:bg-slate-700/60 border-white/30 rounded-xl min-h-[100px]"
                    required
                />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">
                <Button 
                  variant="secondary" 
                  className="w-full sm:w-auto text-sm sm:text-base bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleGeneratePreview}
                >
                  <span className="hidden sm:inline">Generate Preview</span>
                  <span className="sm:hidden">Preview</span>
                </Button>
                <Button 
                  variant="secondary"
                  className="w-full sm:w-auto text-sm sm:text-base bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleCreateParty}
                >
                  <span className="hidden sm:inline">Create Party</span>
                  <span className="sm:hidden">Create</span>
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleCancel}
                  className="w-full sm:w-auto text-sm sm:text-base bg-white/40 dark:bg-slate-700/40 border-white/30 dark:border-slate-600/30 rounded-xl hover:bg-white/60 dark:hover:bg-slate-600/60 transition-all duration-300"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                Generated Preview
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
                See how your event will look
              </p>
            </div>
            
            {previewGenerated ? (
              <Card className="w-full max-w-sm sm:w-80 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-sky-200 to-blue-200 h-48 flex items-center justify-center">
                      {/*test for image*/}
                      <img
                          /*src="https://pbs.twimg.com/media/F2TPSgZbUAAZs3x?format=jpg&name=4096x4096" //this is a random image I am using just for testing what the images would look like
                          alt="Event Preview"
                          className="object-cover w-full h-full"*/
                          src={formData.cover_image || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop"}
                          alt="Event Preview"
                          className="object-cover w-full h-full"
                      />
                      {/*<span className="text-lg font-medium text-slate-600">Event Image</span>*/}
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-xl mb-2">
                        {formData.title || 'Your Event Title'}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                        {formData.description || 'Your event description will appear here'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-gradient-to-r from-sky-500 to-blue-500 text-white">
                          {formData.theme || 'Theme'}
                        </Badge>
                        <Badge className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                          Art Event
                        </Badge>
                        {/* Tag badges (on a separate row, wrapped if needed) */}
                        <div className="flex flex-wrap gap-2">
                          {formData.tags
                              .split(',')
                              .map(tag => tag.trim())
                              .filter(tag => tag !== '')
                              .map((tag, index) => (
                                  <Badge
                                      key={index}
                                      className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-white px-4 py-1 rounded-md"
                                  >
                                    {tag}
                                  </Badge>
                              ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="w-full max-w-sm sm:w-80 h-64 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl flex items-center justify-center bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white">🎨</span>
                  </div>
                  <span className="text-slate-600 dark:text-slate-300">Preview will appear here</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostParty;
