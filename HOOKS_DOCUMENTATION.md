# React Hooks Documentation

## Overview

This documentation covers all custom React hooks used in the application, including profile management, authentication, UI utilities, and data fetching hooks.

## Table of Contents

1. [Profile Management Hooks](#profile-management-hooks)
2. [Authentication Hooks](#authentication-hooks)
3. [UI Utility Hooks](#ui-utility-hooks)
4. [Data Fetching Patterns](#data-fetching-patterns)
5. [Custom Hook Development](#custom-hook-development)
6. [Performance Considerations](#performance-considerations)

---

## Profile Management Hooks

### useProfile()

**Location**: `src/hooks/useProfile.ts`

Hook for managing the current authenticated user's profile data.

#### Returns
```typescript
{
  profile: Profile | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  userId: string | undefined;
}
```

#### Features
- Automatic profile fetching based on authenticated user
- React Query caching with 5-minute stale time
- Automatic refetch on authentication state changes
- Error handling and loading states

#### Usage Example
```typescript
import { useProfile } from '@/hooks/useProfile';

function UserProfileCard() {
  const { profile, isLoading, error, refetch } = useProfile();

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">Failed to load profile</p>
        <Button onClick={() => refetch()} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  if (!profile) {
    return <CreateProfilePrompt />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={profile.avatar_url} />
            <AvatarFallback>
              {profile.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{profile.full_name || profile.username}</CardTitle>
            <CardDescription>@{profile.username}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{profile.about}</p>
      </CardContent>
    </Card>
  );
}
```

### useUserStats()

Hook for retrieving user statistics including artwork count, likes, followers, etc.

#### Returns
```typescript
{
  artworkCount: number;
  isLoadingArtwork: boolean;
  likes: number;
  followers: number;
  following: number;
}
```

#### Usage Example
```typescript
import { useUserStats } from '@/hooks/useProfile';

function UserStatsDisplay() {
  const { artworkCount, isLoadingArtwork } = useUserStats();

  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      <div>
        <p className="text-2xl font-bold">
          {isLoadingArtwork ? '...' : artworkCount}
        </p>
        <p className="text-sm text-muted-foreground">Artworks</p>
      </div>
      <div>
        <p className="text-2xl font-bold">0</p>
        <p className="text-sm text-muted-foreground">Followers</p>
      </div>
      <div>
        <p className="text-2xl font-bold">0</p>
        <p className="text-sm text-muted-foreground">Following</p>
      </div>
    </div>
  );
}
```

### useUserArtworks(limit?)

Hook for fetching the current user's artworks with pagination support.

#### Parameters
- `limit` (number, optional): Maximum number of artworks to fetch (default: 6)

#### Returns
```typescript
{
  artworks: Artwork[];
  isLoading: boolean;
  error: Error | null;
}
```

#### Usage Example
```typescript
import { useUserArtworks } from '@/hooks/useProfile';

function UserArtworkGallery() {
  const { artworks, isLoading, error } = useUserArtworks(12);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ArtworkCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message="Failed to load artworks" />;
  }

  if (artworks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No artworks yet</p>
        <Button asChild className="mt-4">
          <Link to="/studio">Upload Your First Artwork</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {artworks.map(artwork => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </div>
  );
}
```

### useUserEvents(limit?)

Hook for fetching user's hosted and participated events.

#### Parameters
- `limit` (number, optional): Maximum number of events to fetch (default: 5)

#### Returns
```typescript
{
  events: Event[];
  isLoading: boolean;
  error: Error | null;
}
```

#### Usage Example
```typescript
import { useUserEvents } from '@/hooks/useProfile';

function UserEventsTimeline() {
  const { events, isLoading, error } = useUserEvents(10);

  if (isLoading) return <EventsSkeleton />;
  if (error) return <ErrorMessage message="Failed to load events" />;

  return (
    <div className="space-y-4">
      {events.map(event => (
        <Card key={event.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <Badge variant={event.type === 'Hosted' ? 'default' : 'secondary'}>
                {event.type}
              </Badge>
            </div>
            <CardDescription>
              {new Date(event.scheduled_at).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{event.address}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

### useUpdateProfile()

Hook for updating user profile information with optimistic updates.

#### Returns
```typescript
{
  updateProfile: (updates: ProfileUpdate) => void;
  isUpdating: boolean;
  error: Error | null;
  isSuccess: boolean;
}
```

#### Usage Example
```typescript
import { useUpdateProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';

function EditProfileForm() {
  const { updateProfile, isUpdating, error, isSuccess } = useUpdateProfile();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    full_name: '',
    about: '',
    specialties: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  // Show success toast
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success!",
        description: "Your profile has been updated.",
      });
    }
  }, [isSuccess, toast]);

  // Show error toast
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="full_name">Full Name</Label>
        <Input
          id="full_name"
          value={formData.full_name}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            full_name: e.target.value
          }))}
        />
      </div>
      
      <div>
        <Label htmlFor="about">About</Label>
        <Textarea
          id="about"
          value={formData.about}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            about: e.target.value
          }))}
          rows={4}
        />
      </div>
      
      <Button type="submit" disabled={isUpdating}>
        {isUpdating ? 'Updating...' : 'Update Profile'}
      </Button>
    </form>
  );
}
```

### useProfileById(userId)

Hook for fetching any user's profile by their ID.

#### Parameters
- `userId` (string, optional): The user ID to fetch profile for

#### Returns
```typescript
{
  profile: Profile | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  userId: string | undefined;
}
```

#### Usage Example
```typescript
import { useProfileById } from '@/hooks/useProfile';
import { useParams } from 'react-router-dom';

function UserProfilePage() {
  const { userId } = useParams();
  const { profile, isLoading, error } = useProfileById(userId);

  if (isLoading) return <ProfilePageSkeleton />;
  if (error) return <ErrorPage message="User not found" />;
  if (!profile) return <NotFoundPage />;

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <UserProfileCard profile={profile} />
        </div>
        <div className="lg:col-span-2">
          <UserContentTabs userId={userId} />
        </div>
      </div>
    </div>
  );
}
```

### useEnsureProfile()

Hook that automatically creates a default profile for new users.

#### Returns
```typescript
{
  isChecking: boolean;
}
```

#### Usage Example
```typescript
import { useEnsureProfile } from '@/hooks/useProfile';

function AppWrapper({ children }) {
  const { isChecking } = useEnsureProfile();

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner className="mx-auto mb-4" />
          <p>Setting up your profile...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
```

---

## Authentication Hooks

### useAuth()

**Location**: `src/contexts/AuthContext.tsx`

Hook for accessing authentication state and methods throughout the application.

#### Returns
```typescript
{
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, username: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}
```

#### Usage Examples

##### Basic Authentication Check
```typescript
import { useAuth } from '@/contexts/AuthContext';

function AuthenticatedComponent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <LoginPrompt />;
  }

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      {/* Authenticated content */}
    </div>
  );
}
```

##### Login Form
```typescript
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

function LoginForm() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
}
```

##### Google OAuth Login
```typescript
import { useAuth } from '@/contexts/AuthContext';

function GoogleLoginButton() {
  const { loginWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      // User will be redirected to Google OAuth
    } catch (error) {
      console.error('Google login failed:', error);
      toast({
        title: "Login Failed",
        description: "Could not sign in with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      disabled={isLoading}
      variant="outline"
      className="w-full"
    >
      {isLoading ? (
        <Spinner className="w-4 h-4 mr-2" />
      ) : (
        <GoogleIcon className="w-4 h-4 mr-2" />
      )}
      Continue with Google
    </Button>
  );
}
```

##### User Profile Dropdown
```typescript
import { useAuth } from '@/contexts/AuthContext';

function UserDropdown() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback>
              {user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.user_metadata?.full_name || 'User'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

## UI Utility Hooks

### useIsMobile()

**Location**: `src/hooks/use-mobile.tsx`

Hook for detecting mobile screen sizes and implementing responsive behavior.

#### Returns
- `boolean`: True if the screen width is less than 768px

#### Features
- Responsive to window resize events
- Uses `matchMedia` API for efficient detection
- Updates in real-time as screen size changes
- Handles SSR gracefully

#### Usage Examples

##### Responsive Navigation
```typescript
import { useIsMobile } from '@/hooks/use-mobile';

function ResponsiveNavigation() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileNavigation />;
  }

  return <DesktopNavigation />;
}
```

##### Conditional Rendering
```typescript
import { useIsMobile } from '@/hooks/use-mobile';

function ArtworkGrid({ artworks }) {
  const isMobile = useIsMobile();
  
  const columns = isMobile ? 1 : 3;
  const gap = isMobile ? 'gap-4' : 'gap-6';

  return (
    <div className={`grid grid-cols-${columns} ${gap}`}>
      {artworks.map(artwork => (
        <ArtworkCard 
          key={artwork.id} 
          artwork={artwork}
          size={isMobile ? 'small' : 'large'}
        />
      ))}
    </div>
  );
}
```

##### Modal Behavior
```typescript
import { useIsMobile } from '@/hooks/use-mobile';

function ArtworkModal({ artwork, isOpen, onClose }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent>
          <ArtworkDetails artwork={artwork} />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <ArtworkDetails artwork={artwork} />
      </DialogContent>
    </Dialog>
  );
}
```

### useToast()

**Location**: `src/hooks/use-toast.ts`

Hook for displaying toast notifications with various styles and actions.

#### Returns
```typescript
{
  toast: (props: ToastProps) => void;
  dismiss: (toastId?: string) => void;
  toasts: Toast[];
}
```

#### Toast Props
```typescript
interface ToastProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  duration?: number;
  variant?: 'default' | 'destructive';
}
```

#### Usage Examples

##### Success Notifications
```typescript
import { useToast } from '@/hooks/use-toast';

function UploadArtworkForm() {
  const { toast } = useToast();

  const handleUpload = async (formData) => {
    try {
      await uploadArtwork(formData);
      
      toast({
        title: "Success!",
        description: "Your artwork has been uploaded successfully.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Could not upload your artwork. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <form onSubmit={handleUpload}>
      {/* Form fields */}
      <Button type="submit">Upload Artwork</Button>
    </form>
  );
}
```

##### Toast with Action
```typescript
import { useToast } from '@/hooks/use-toast';

function DeleteArtworkButton({ artworkId, onDelete }) {
  const { toast } = useToast();

  const handleDelete = async () => {
    await deleteArtwork(artworkId);
    
    toast({
      title: "Artwork deleted",
      description: "Your artwork has been removed from the gallery.",
      action: (
        <Button variant="outline" size="sm" onClick={onUndo}>
          Undo
        </Button>
      ),
      duration: 10000, // Longer duration for undo action
    });
    
    onDelete(artworkId);
  };

  const onUndo = async () => {
    // Restore artwork logic
    toast({
      title: "Artwork restored",
      description: "Your artwork is back in the gallery.",
    });
  };

  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete Artwork
    </Button>
  );
}
```

##### Progress Notifications
```typescript
import { useToast } from '@/hooks/use-toast';

function FileUploadProgress() {
  const { toast, dismiss } = useToast();
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async (file) => {
    const toastId = toast({
      title: "Uploading...",
      description: `Progress: ${uploadProgress}%`,
      duration: Infinity, // Don't auto-dismiss
    });

    try {
      await uploadWithProgress(file, (progress) => {
        setUploadProgress(progress);
        toast({
          id: toastId,
          title: "Uploading...",
          description: `Progress: ${progress}%`,
          duration: Infinity,
        });
      });

      dismiss(toastId);
      toast({
        title: "Upload complete!",
        description: "Your file has been uploaded successfully.",
      });
    } catch (error) {
      dismiss(toastId);
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <input
      type="file"
      onChange={(e) => handleUpload(e.target.files[0])}
    />
  );
}
```

---

## Data Fetching Patterns

### React Query Integration

All profile hooks use React Query for efficient data fetching, caching, and synchronization.

#### Query Configuration
```typescript
// Standard query configuration used across hooks
const queryConfig = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  refetchOnWindowFocus: false,
  retry: 3,
  retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
};
```

#### Mutation Patterns
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useCreateArtwork() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createArtwork,
    onSuccess: (newArtwork) => {
      // Update artwork list cache
      queryClient.setQueryData(['userArtworks'], (old) => [
        newArtwork,
        ...(old || [])
      ]);
      
      // Invalidate related queries
      queryClient.invalidateQueries(['artworkCount']);
    },
    onError: (error) => {
      console.error('Failed to create artwork:', error);
    },
  });
}
```

#### Optimistic Updates
```typescript
function useUpdateArtwork() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateArtwork,
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries(['artwork', variables.id]);

      // Snapshot previous value
      const previousArtwork = queryClient.getQueryData(['artwork', variables.id]);

      // Optimistically update
      queryClient.setQueryData(['artwork', variables.id], (old) => ({
        ...old,
        ...variables.updates,
      }));

      return { previousArtwork };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousArtwork) {
        queryClient.setQueryData(
          ['artwork', variables.id],
          context.previousArtwork
        );
      }
    },
    onSettled: (data, error, variables) => {
      // Always refetch after error or success
      queryClient.invalidateQueries(['artwork', variables.id]);
    },
  });
}
```

---

## Custom Hook Development

### Best Practices

#### 1. Single Responsibility
Each hook should have one clear purpose:

```typescript
// Good: Focused on profile data
function useProfile() {
  // Profile-specific logic only
}

// Bad: Mixed concerns
function useProfileAndArtworks() {
  // Profile and artwork logic mixed
}
```

#### 2. Consistent Return Types
Use consistent patterns for return values:

```typescript
// Standard pattern for data hooks
function useCustomData() {
  return {
    data: /* fetched data */,
    isLoading: /* loading state */,
    error: /* error state */,
    refetch: /* refetch function */,
  };
}

// Standard pattern for action hooks
function useCustomAction() {
  return {
    execute: /* action function */,
    isExecuting: /* loading state */,
    error: /* error state */,
    isSuccess: /* success state */,
  };
}
```

#### 3. Error Handling
Always include proper error handling:

```typescript
function useDataFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        setError(null);
        setIsLoading(true);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (!isCancelled) {
          setData(result);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [url]);

  return { data, error, isLoading };
}
```

#### 4. Cleanup and Cancellation
Always clean up side effects:

```typescript
function useWebSocket(url) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(url);
    
    ws.onmessage = (event) => {
      setMessages(prev => [...prev, JSON.parse(event.data)]);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  return { socket, messages };
}
```

### Example Custom Hook

```typescript
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

/**
 * Hook for managing local storage with type safety and error handling
 */
function useLocalStorage<T>(key: string, initialValue: T) {
  const { toast } = useToast();
  
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
      toast({
        title: "Storage Error",
        description: "Failed to save data locally.",
        variant: "destructive",
      });
    }
  }, [key, storedValue, toast]);

  // Remove from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}

// Usage example
function UserPreferences() {
  const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');
  const [language, setLanguage] = useLocalStorage('language', 'en');

  return (
    <div>
      <p>Current theme: {theme}</p>
      <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </Button>
      <Button onClick={removeTheme} variant="outline">
        Reset Theme
      </Button>
    </div>
  );
}
```

---

## Performance Considerations

### React Query Optimization

#### 1. Stale Time Configuration
```typescript
// Frequent updates - short stale time
const useRealTimeData = () => {
  return useQuery({
    queryKey: ['realtime'],
    queryFn: fetchRealTimeData,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000,
  });
};

// Static data - long stale time
const useStaticData = () => {
  return useQuery({
    queryKey: ['static'],
    queryFn: fetchStaticData,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};
```

#### 2. Query Invalidation Strategies
```typescript
// Specific invalidation
queryClient.invalidateQueries(['profile', userId]);

// Pattern-based invalidation
queryClient.invalidateQueries({
  predicate: (query) => query.queryKey[0] === 'user'
});

// Selective invalidation
queryClient.invalidateQueries({
  queryKey: ['artworks'],
  exact: false, // Invalidate all artwork-related queries
});
```

#### 3. Background Updates
```typescript
const useBackgroundSync = () => {
  return useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    refetchIntervalInBackground: false, // Only when tab is active
  });
};
```

### Memory Management

#### 1. Cleanup Effects
```typescript
function useSubscription(topic) {
  useEffect(() => {
    const subscription = subscribe(topic);
    
    return () => {
      subscription.unsubscribe();
    };
  }, [topic]);
}
```

#### 2. Debounced Hooks
```typescript
function useDebouncedSearch(query, delay = 300) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [query, delay]);

  return useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchAPI(debouncedQuery),
    enabled: !!debouncedQuery,
  });
}
```

#### 3. Conditional Queries
```typescript
function useConditionalData(shouldFetch, params) {
  return useQuery({
    queryKey: ['data', params],
    queryFn: () => fetchData(params),
    enabled: shouldFetch && !!params,
  });
}
```

This comprehensive hooks documentation provides detailed information about all custom React hooks in the application, including usage examples, best practices, and performance considerations.