
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

export default function CreateWorkshop() {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate('/app/create')}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Create
      </Button>

      <div className="text-center">
        <h1 className="text-3xl font-bold">Create Workshop</h1>
        <p className="text-muted-foreground mt-2">
          Share your knowledge and teach others
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workshop Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Workshop Title</Label>
              <Input id="title" placeholder="Enter workshop title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe what you'll teach..." 
                className="min-h-[120px]"
              />
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" className="flex-1">Save Draft</Button>
              <Button className="flex-1">Create Workshop</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
