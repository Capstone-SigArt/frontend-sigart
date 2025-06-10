
import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Image as ImageIcon, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    maxAttendees: '',
    tags: [] as string[],
    image: null as File | null
  });

  const suggestedTags = ['Digital Art', 'Workshop', 'Exhibition', 'Gaming', 'Fantasy', 'Traditional', 'Virtual', 'In-Person'];

  const addTag = (tag: string) => {
    if (!eventData.tags.includes(tag)) {
      setEventData({ ...eventData, tags: [...eventData.tags, tag] });
    }
  };

  const removeTag = (tag: string) => {
    setEventData({ ...eventData, tags: eventData.tags.filter(t => t !== tag) });
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handlePublish = () => {
    console.log('Publishing event:', eventData);
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Event Title</label>
              <Input
                value={eventData.title}
                onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                placeholder="Enter event title"
                className="bg-background border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <Textarea
                value={eventData.description}
                onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                placeholder="Describe your event"
                className="bg-background border-border min-h-24"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Date</label>
              <Input
                type="date"
                value={eventData.date}
                onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                className="bg-background border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Time</label>
              <Input
                type="time"
                value={eventData.time}
                onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                className="bg-background border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Location</label>
              <Input
                value={eventData.location}
                onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                placeholder="Event location or 'Virtual'"
                className="bg-background border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Max Attendees</label>
              <Input
                type="number"
                value={eventData.maxAttendees}
                onChange={(e) => setEventData({ ...eventData, maxAttendees: e.target.value })}
                placeholder="Optional"
                className="bg-background border-border"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Event Image</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Upload an event image</p>
                <Button variant="outline">Choose Image</Button>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {eventData.tags.map((tag) => (
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
                {suggestedTags.filter(tag => !eventData.tags.includes(tag)).map((tag) => (
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
          </div>
        );
      default:
        return null;
    }
  };

  const stepTitles = ['Basic Info', 'Schedule & Location', 'Media', 'Tags & Publish'];

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
        <h1 className="text-2xl font-bold text-foreground">Create Event</h1>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {stepTitles.map((title, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                index + 1 <= currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {index + 1}
            </div>
            {index < stepTitles.length - 1 && (
              <div
                className={`w-16 h-1 mx-2 ${
                  index + 1 < currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form */}
      <Card className="bg-card border-border mb-8">
        <CardHeader>
          <CardTitle className="text-card-foreground">{stepTitles[currentStep - 1]}</CardTitle>
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
          className="border-border"
        >
          Back
        </Button>
        {currentStep < 4 ? (
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handlePublish}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
          >
            Publish Event
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
