import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/services/api/profile';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';

export const useProfile = () => {
  const { user } = useAuth();
  
  const {
    data: profile,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => user?.id ? profileService.getProfile(user.id) : null,
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });

  return {
    profile,
    isLoading,
    error,
    refetch,
    userId: user?.id
  };
};

export const useUserStats = () => {
  const { user } = useAuth();
  
  const {
    data: artworkCount,
    isLoading: isLoadingArtwork
  } = useQuery({
    queryKey: ['artworkCount', user?.id],
    queryFn: () => user?.id ? profileService.getArtworkCount(user.id) : 0,
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });

  return {
    artworkCount: artworkCount || 0,
    isLoadingArtwork,
    likes: 0,
    followers: 0,
    following: 0
  };
};

export const useUserArtworks = (limit: number = 6) => {
  const { user } = useAuth();
  
  const {
    data: artworks,
    isLoading,
    error
  } = useQuery({
    queryKey: ['userArtworks', user?.id, limit],
    queryFn: () => user?.id ? profileService.getUserArtworks(user.id, limit) : [],
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });

  return {
    artworks: artworks || [],
    isLoading,
    error
  };
};

export const useUserEvents = (limit: number = 5) => {
  const { user } = useAuth();
  
  const {
    data: events,
    isLoading,
    error
  } = useQuery({
    queryKey: ['userEvents', user?.id, limit],
    queryFn: () => user?.id ? profileService.getUserParties(user.id, limit) : [],
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });

  return {
    events: events || [],
    isLoading,
    error
  };
};

export const useCreateProfile = () => {
  const { user } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  
  const createProfile = async (userData: { username?: string } = {}) => {
    if (!user?.id || !user?.email) {
      throw new Error('User not authenticated');
    }
    
    setIsCreating(true);
    try {
      const profile = await profileService.createDefaultProfile(
        user.id,
        user.email,
        userData.username
      );
      return profile;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createProfile,
    isCreating
  };
};

export const useUpdateProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (updates: any) => {
      if (!user?.id) throw new Error('User not authenticated');
      return profileService.updateProfile(user.id, updates);
    },
    onSuccess: () => {
      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
  });

  return {
    updateProfile: mutation.mutate,
    isUpdating: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess
  };
};

export const useEnsureProfile = () => {
  const { user } = useAuth();
  const [isChecking, setIsChecking] = useState(false);
  
  useEffect(() => {
    const checkAndCreateProfile = async () => {
      if (!user?.id || !user?.email) return;
      
      setIsChecking(true);
      try {
        const exists = await profileService.profileExists(user.id);
        if (!exists) {
          console.log('Creating default profile for user:', user.id);
          await profileService.createDefaultProfile(user.id, user.email);
        }
      } catch (error) {
        console.error('Error checking/creating profile:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkAndCreateProfile();
  }, [user?.id, user?.email]);

  return { isChecking };
}; 