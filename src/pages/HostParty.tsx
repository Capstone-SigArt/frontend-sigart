
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ModernNavigation from '@/components/ModernNavigation';
import { useNavigate } from 'react-router-dom';

const HostParty = () => {
  const [formData, setFormData] = useState({
    title: '',
    theme: '',
    tags: '',
    dateTime: '',
    location: '',
    description: ''
  });
  const [previewGenerated, setPreviewGenerated] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGeneratePreview = () => {
    setPreviewGenerated(true);
  };

  const handleCreateParty = () => {
    console.log('Creating party with data:', formData);
    navigate('/my-parties');
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      theme: '',
      tags: '',
      dateTime: '',
      location: '',
      description: ''
    });
    setPreviewGenerated(false);
  };

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
                
                <Input
                  type="datetime-local"
                  placeholder="Date/Time"
                  value={formData.dateTime}
                  onChange={(e) => handleInputChange('dateTime', e.target.value)}
                  className="bg-white/60 dark:bg-slate-700/60 border-white/30 rounded-xl"
                />
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-white/40 border-white/30">Server</Button>
                  <Button variant="outline" size="sm" className="bg-white/40 border-white/30">Datacenter</Button>
                  <Input
                    placeholder="Location/Address"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="flex-1 bg-white/60 dark:bg-slate-700/60 border-white/30 rounded-xl"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-white/40 border-white/30 rounded-xl">
                    Upload Flyer/Cover Image
                  </Button>
                  <Button variant="secondary" className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-xl">
                    Choose File
                  </Button>
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
                      <span className="text-lg font-medium text-slate-600">Event Image</span>
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
