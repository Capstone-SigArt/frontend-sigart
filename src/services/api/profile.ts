import { supabase } from '@/lib/supabase';

type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string | null;
  about: string | null;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  specialties: string | null;
};

type ProfileInsert = {
  id: string;
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  about?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  specialties?: string | null;
};

type ProfileUpdate = {
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  about?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  specialties?: string | null;
};

export const profileService = {
  async getProfile(userId: string): Promise<Profile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      console.log('getProfile result:', { data, error, userId });

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  },

  async createProfile(profile: ProfileInsert): Promise<Profile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert(profile)
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  },

  async updateProfile(userId: string, updates: ProfileUpdate): Promise<Profile | null> {
    try {
      // Filter out specialties if the column doesn't exist yet
      const safeUpdates = { ...updates };
      
      const { data, error } = await supabase
        .from('profiles')
        .update(safeUpdates)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        // If specialties column doesn't exist, try without it
        if (error.message?.includes('specialties') && updates.specialties !== undefined) {
          const { specialties, ...updatesWithoutSpecialties } = updates;
          const { data: retryData, error: retryError } = await supabase
            .from('profiles')
            .update(updatesWithoutSpecialties)
            .eq('id', userId)
            .select()
            .single();
          
          if (retryError) {
            console.error('Error updating profile:', retryError);
            throw retryError;
          }
          
          return retryData;
        }
        
        console.error('Error updating profile:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  async getArtworkCount(userId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('artwork')
        .select('*', { count: 'exact', head: true })
        .eq('uploader_id', userId);

      if (error) {
        console.error('Error fetching artwork count:', error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error('Error fetching artwork count:', error);
      return 0;
    }
  },

  async getUserArtworks(userId: string, limit: number = 6) {
    try {
      const { data: artworks, error } = await supabase
          .from('artwork')
          .select('*')
          .eq('uploader_id', userId)
          .order('created_at', { ascending: false })
          .limit(limit);

      if (error) {
        console.error('Error fetching user artworks:', error);
        return [];
      }

      if (!artworks) {
        console.log('No artworks found for user:', userId);
        return [];
      }

      console.log(`Fetched ${artworks.length} artworks for user ${userId}`);

      const artworksWithLikes = await Promise.all(
          artworks.map(async (artwork) => {
            const { count, error: countError } = await supabase
                .from('likes')
                .select('*', { count: 'exact', head: true })
                .eq('artwork_id', artwork.id);

            if (countError) {
              console.error('Error counting likes for artwork', artwork.id, JSON.stringify(countError, null, 2));
            }
            else {
              console.log(`Artwork ${artwork.id} titled "${artwork.title}" has ${count} likes`);
            }

            return {
              ...artwork,
              likes_count: count || 0,
            };
          })
      );

      console.log('Artworks with likes:', artworksWithLikes);

      return artworksWithLikes;
    } catch (error) {
      console.error('Error fetching user artworks:', error);
      return [];
    }
  },


  async getUserParties(userId: string, limit: number = 5) {
    try {
      // 1. Fetch parties hosted by the user
      const { data: hostedParties, error: hostedError } = await supabase
          .from('parties')
          .select('*')
          .eq('host_id', userId)
          .order('scheduled_at', { ascending: false })
          .limit(limit);

      if (hostedError) {
        console.error('Error fetching hosted parties:', hostedError);
      }

      // 2. Fetch parties joined by the user
      const { data: joinedParties, error: joinedError } = await supabase
          .from('party_members')
          .select(`
        *,
        parties:party_id (
          id,
          title,
          scheduled_at,
          address,
          theme
        )
      `)
          .eq('user_id', userId)
          .order('joined_at', { ascending: false })
          .limit(limit);

      if (joinedError) {
        console.error('Error fetching joined parties:', joinedError);
      }

      // 3. Normalize structure and tag types
      const hosted = (hostedParties || []).map(party => ({
        ...party,
        type: 'Hosted' as const
      }));

      const joined = (joinedParties || []).map(item => ({
        ...item.parties,
        type: 'Participated' as const
      }));

      // 4. Combine and deduplicate by party ID
      const allParties = [...hosted, ...joined];

      const uniquePartiesMap = new Map<string, typeof allParties[0]>();
      for (const party of allParties) {
        if (party?.id && !uniquePartiesMap.has(party.id)) {
          uniquePartiesMap.set(party.id, party);
        }
      }

      const uniqueParties = Array.from(uniquePartiesMap.values())
          .sort((a, b) => new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime())
          .slice(0, limit);

      return uniqueParties;
    } catch (error) {
      console.error('Error fetching user parties:', error);
      return [];
    }
  },

  async profileExists(userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single();

      return !error && !!data;
    } catch {
      return false;
    }
  },

  async createDefaultProfile(userId: string, email: string, username?: string): Promise<Profile | null> {
    try {
      const defaultUsername = username || email.split('@')[0];
      
      const profileData: ProfileInsert = {
        id: userId,
        username: defaultUsername,
        full_name: defaultUsername,
        about: null,
        avatar_url: null,
        facebook: null,
        twitter: null,
        instagram: null
      };

      return await this.createProfile(profileData);
    } catch (error) {
      console.error('Error creating default profile:', error);
      return null;
    }
  }
}; 