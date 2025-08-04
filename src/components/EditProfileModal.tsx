import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Loader2, Upload, Lock } from 'lucide-react';
import { profileService } from '@/services/api/profile';
import { useAuth } from '@/contexts/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { parseSpecialties, formatSpecialties } from '@/lib/specialties';
import ChangePasswordModal from './ChangePasswordModal';

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: any;
}

const EditProfileModal = ({ open, onOpenChange, profile }: EditProfileModalProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    about: '',
    facebook: '',
    twitter: '',
    instagram: '',
    avatar_url: '',
    specialties: ''
  });

  // Initialize form data when profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || '',
        full_name: profile.full_name || '',
        about: profile.about || '',
        facebook: profile.facebook || '',
        twitter: profile.twitter || '',
        instagram: profile.instagram || '',
        avatar_url: profile.avatar_url || '',
        specialties: profile.specialties || ''
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      // Only send non-empty values or null for empty strings
      const updates = Object.entries(formData).reduce((acc, [key, value]) => {
        if (typeof value === 'string') {
          acc[key] = value.trim() === '' ? null : value.trim();
        } else {
          acc[key] = value ?? null; // fallback to null if undefined
        }
        return acc;
      }, {} as any);

      await profileService.updateProfile(user.id, updates);
      
      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: ['profile', user.id] });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original values
    if (profile) {
      setFormData({
        username: profile.username || '',
        full_name: profile.full_name || '',
        about: profile.about || '',
        facebook: profile.facebook || '',
        twitter: profile.twitter || '',
        instagram: profile.instagram || '',
        avatar_url: profile.avatar_url || '',
        specialties: profile.specialties || ''
      });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[95vh] sm:max-h-[90vh] w-[95vw] sm:w-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-white/30 shadow-2xl rounded-2xl z-[9999] overflow-y-auto">
        <DialogHeader className="pb-4 sm:pb-6">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
            Edit Profile
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground text-center px-2">
            Update your profile information to personalize your artist studio.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 sm:space-y-6 pb-4 px-1">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-3 sm:space-y-4">
            <Avatar className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-sky-500 to-blue-500">
              {formData.avatar_url ? (
                <AvatarImage src={formData.avatar_url} alt="Profile" />
              ) : (
                <AvatarFallback className="bg-gradient-to-r from-sky-500 to-blue-500 text-white text-xl sm:text-2xl">
                  <User className="h-10 w-10 sm:h-12 sm:w-12" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="text-center w-full">
              <Label htmlFor="avatar_url" className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
                Avatar URL
              </Label>
              <Input
                id="avatar_url"
                value={formData.avatar_url}
                onChange={(e) => handleInputChange('avatar_url', e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="mt-2 text-sm bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Enter a URL to your profile image
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label htmlFor="username" className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
                Username
              </Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="text-sm bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <Label htmlFor="full_name" className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
                Full Name
              </Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
                className="text-sm bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="about" className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
              About
            </Label>
            <Textarea
              id="about"
              value={formData.about}
              onChange={(e) => handleInputChange('about', e.target.value)}
              className="text-sm bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm min-h-[80px] sm:min-h-[100px]"
              placeholder="Tell us about yourself and your art..."
            />
          </div>

          <div>
            <Label htmlFor="specialties" className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
              Specialties
            </Label>
            <Input
              id="specialties"
              value={formData.specialties}
              onChange={(e) => handleInputChange('specialties', e.target.value)}
              className="text-sm bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm"
              placeholder="e.g., Digital Art, Painting, Photography"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Separate multiple specialties with commas
            </p>
          </div>

          {/* Social Media Links */}
          <div>
            <Label className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium mb-2 sm:mb-3 block">
              Social Media Links
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <Label htmlFor="facebook" className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Facebook
                </Label>
                <Input
                  id="facebook"
                  value={formData.facebook}
                  onChange={(e) => handleInputChange('facebook', e.target.value)}
                  className="text-sm bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm"
                  placeholder="Facebook URL"
                />
              </div>

              <div>
                <Label htmlFor="twitter" className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Twitter/X
                </Label>
                <Input
                  id="twitter"
                  value={formData.twitter}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                  className="text-sm bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm"
                  placeholder="Twitter URL"
                />
              </div>

              <div>
                <Label htmlFor="instagram" className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  className="text-sm bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm"
                  placeholder="Instagram URL"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-3 sm:gap-0">
            {/* Change Password Button */}
            <Button
              variant="outline"
              onClick={() => setIsPasswordModalOpen(true)}
              disabled={isLoading}
              className="w-full sm:w-auto text-sm border-orange-300 text-orange-600 hover:bg-orange-50 dark:border-orange-600 dark:text-orange-400 dark:hover:bg-orange-900/30"
            >
              <Lock className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Change Password</span>
              <span className="sm:hidden">Password</span>
            </Button>

            {/* Save/Cancel Buttons */}
            <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 sm:flex-none text-sm border-sky-300 text-sky-600 hover:bg-sky-50 dark:border-sky-600 dark:text-sky-400 dark:hover:bg-sky-900/30"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="flex-1 sm:flex-none text-sm bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <span className="hidden sm:inline">Saving...</span>
                    <span className="sm:hidden">Save...</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Save Changes</span>
                    <span className="sm:hidden">Save</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Change Password Modal */}
        <ChangePasswordModal 
          open={isPasswordModalOpen}
          onOpenChange={setIsPasswordModalOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;