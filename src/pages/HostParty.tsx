
import React, {useEffect, useState} from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ModernNavigation from '@/components/ModernNavigation';
import { useNavigate } from 'react-router-dom';
import {supabase} from "@/lib/supabase.ts";

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
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGeneratePreview = () => {
    setPreviewGenerated(true);
  };

  const associateTagsWithParty = async (partyId: string) => {
    const tags = formData.tags.split(',').map(tag=>tag.trim()).filter(tag=>tag);

    for (const tag of tags) {
      try {
        const tagRes = await fetch(`http://localhost:3000/tags/${encodeURIComponent(tag)}`);
        const tagData = await tagRes.json()
        console.log('Tag data fetched:', tagData);

        if(!tagData.id) {
          console.warn(`No tag ID found for "${tag}"`);
          continue;
        }

        const linkRes = await fetch('http://localhost:3000/tags/partyTags', {
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
    const response = await fetch('http://localhost:3000/partyMember', {
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
    //console.log('Creating party with data:', formData);
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
      console.log("cover_image:", formData.cover_image || '');
      console.log("address:", formData.location);
      console.log("scheduled_at:", formData.startTime);
      console.log("created_at:", formData.created_at);


      const response = await fetch('http://localhost:3000/parties', {
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
          `http://localhost:3000/upload/generate-upload-url?fileName=${encodeURIComponent(file.name)}&fileType=${encodeURIComponent(file.type)}`
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
        const response = await fetch('http://localhost:3000/tags', {
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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-green-100 dark:from-sky-900 dark:via-emerald-900 dark:to-green-900">
      <ModernNavigation 
        title="Host A Party" 
        subtitle="Create amazing art events"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent mb-6">
                Event Details
              </h2>
              
              <div className="space-y-4">
                <Input
                  placeholder="Party Title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="bg-white/60 dark:bg-slate-700/60 border-white/30 rounded-xl"
                />
                
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
                <div className="relative">
                  <Input
                      type="datetime-local"
                      placeholder="Date/Time"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                      className="bg-white/60 dark:bg-slate-700/60 border-white/30 rounded-xl pr-20" // add right padding
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs select-none font-semibold">
                    start-time
                  </span>
                </div>
                <div className="relative">
                  <Input
                      type="datetime-local"
                      placeholder="Date/Time"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      className="bg-white/60 dark:bg-slate-700/60 border-white/30 rounded-xl pr-20" // add right padding
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs select-none font-semibold">
                    end-time
                  </span>
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
                
                <Textarea
                  placeholder="Description/ notes"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="bg-white/60 dark:bg-slate-700/60 border-white/30 rounded-xl min-h-[100px]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Button 
                  variant="secondary" 
                  className="bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white rounded-xl"
                  onClick={handleGeneratePreview}
                >
                  Generate Preview
                </Button>
                <Button 
                  variant="secondary"
                  className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl"
                  onClick={handleCreateParty}
                >
                  Create Party
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleCancel}
                  className="bg-white/40 border-white/30 rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                Generated Preview
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mt-2">
                See how your event will look
              </p>
            </div>
            
            {previewGenerated ? (
              <Card className="w-80 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-sky-200 to-emerald-200 h-48 flex items-center justify-center">
                      {/*test for image*/}
                      <img
                          /*src="https://pbs.twimg.com/media/F2TPSgZbUAAZs3x?format=jpg&name=4096x4096" //this is a random image I am using just for testing what the images would look like
                          alt="Event Preview"
                          className="object-cover w-full h-full"*/
                          src={formData.cover_image || "https://via.placeholder.com/600x300?text=Event+Flyer"}
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
                        <Badge className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white">
                          {formData.theme || 'Theme'}
                        </Badge>
                        <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
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
                                      className="bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-white px-4 py-1 rounded-md"
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
              <div className="w-80 h-64 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl flex items-center justify-center bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
