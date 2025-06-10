
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from '@/components/ProfileDropdown';

const HostParty = () => {
  const [activeTab, setActiveTab] = useState('Create');
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

  const navigationTabs = [
    'Browse', 'Schedule', 'Create', 'My Parties', 'Showcase', 'My Studio', 'Resources'
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'Browse') {
      navigate('/');
    } else if (tab === 'Schedule') {
      navigate('/schedule');
    } else if (tab === 'My Parties') {
      navigate('/my-parties');
    } else if (tab === 'My Studio') {
      navigate('/studio');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGeneratePreview = () => {
    setPreviewGenerated(true);
  };

  const handleCreateParty = () => {
    console.log('Creating party with data:', formData);
    // Party creation logic would go here
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center border-2 border-border">
                <span className="text-sm font-medium text-muted-foreground">Logo</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground">Host A Party</h1>
            </div>
            <ProfileDropdown />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {navigationTabs.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                className={`whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-4">
            <div className="space-y-4">
              <Input
                placeholder="Party Title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full"
              />
              
              <Input
                placeholder="Theme"
                value={formData.theme}
                onChange={(e) => handleInputChange('theme', e.target.value)}
                className="w-full"
              />
              
              <Input
                placeholder="Tags, separate with commas"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                className="w-full"
              />
              
              <Input
                placeholder="Date/Time"
                value={formData.dateTime}
                onChange={(e) => handleInputChange('dateTime', e.target.value)}
                className="w-full"
              />
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Server</Button>
                <Button variant="outline" size="sm">Datacenter</Button>
                <Input
                  placeholder="Location/Address"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="flex-1"
                />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Upload Flyer/Cover Image
                </Button>
                <Button variant="secondary">Choose File</Button>
              </div>
              
              <Textarea
                placeholder="Description/ notes"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full min-h-[100px]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button 
                variant="secondary" 
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={handleGeneratePreview}
              >
                Generate Preview
              </Button>
              <Button 
                variant="secondary"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={handleCreateParty}
              >
                Create Party
              </Button>
              <Button 
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium text-muted-foreground italic">Generated</h3>
              <h3 className="text-lg font-medium text-muted-foreground italic">Preview</h3>
            </div>
            
            {previewGenerated ? (
              <Card className="w-64 bg-card border-border">
                <CardContent className="p-4">
                  <div className="bg-muted h-32 rounded mb-3 flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Event Image</span>
                  </div>
                  <h4 className="font-semibold text-center mb-2">
                    {formData.title || 'Event title'}
                  </h4>
                  <div className="text-center text-sm text-muted-foreground mb-2">
                    Partial Flyer
                  </div>
                  <div className="flex justify-center gap-1">
                    <Badge variant="secondary" className="text-xs">Grayscale</Badge>
                    <Badge variant="secondary" className="text-xs">Cyberpunk</Badge>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="w-64 h-48 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Preview will appear here</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostParty;
