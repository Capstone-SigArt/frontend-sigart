# API Documentation

## Table of Contents

1. [Authentication](#authentication)
2. [Profile Management](#profile-management)
3. [React Hooks](#react-hooks)
4. [UI Components](#ui-components)
5. [Application Components](#application-components)
6. [Utilities](#utilities)
7. [Context Providers](#context-providers)
8. [Database Types](#database-types)

---

## Authentication

### AuthService

The `authService` provides authentication functionality using Supabase.

**Location**: `src/services/api/auth.ts`

#### Methods

##### `signUp(email: string, password: string)`
Creates a new user account with email and password.

**Parameters:**
- `email` (string): User's email address
- `password` (string): User's password

**Returns:** Promise with authentication data

**Example:**
```typescript
import { authService } from '@/services/api/auth';

try {
  const result = await authService.signUp('user@example.com', 'password123');
  console.log('User created:', result);
} catch (error) {
  console.error('Sign up failed:', error);
}
```

##### `signIn(email: string, password: string)`
Signs in an existing user with email and password.

**Parameters:**
- `email` (string): User's email address
- `password` (string): User's password

**Returns:** Promise with authentication data

**Example:**
```typescript
try {
  const result = await authService.signIn('user@example.com', 'password123');
  console.log('User signed in:', result);
} catch (error) {
  console.error('Sign in failed:', error);
}
```

##### `signInWithGoogle()`
Initiates Google OAuth sign-in flow.

**Returns:** Promise with OAuth data

**Example:**
```typescript
try {
  await authService.signInWithGoogle();
  // User will be redirected to Google OAuth
} catch (error) {
  console.error('Google sign in failed:', error);
}
```

##### `signOut()`
Signs out the current user.

**Returns:** Promise<void>

**Example:**
```typescript
try {
  await authService.signOut();
  console.log('User signed out');
} catch (error) {
  console.error('Sign out failed:', error);
}
```

##### `getCurrentUser()`
Gets the currently authenticated user.

**Returns:** Promise<User | null>

**Example:**
```typescript
try {
  const user = await authService.getCurrentUser();
  if (user) {
    console.log('Current user:', user);
  }
} catch (error) {
  console.error('Failed to get current user:', error);
}
```

##### `resendVerificationEmail(email: string)`
Resends email verification to the specified email address.

**Parameters:**
- `email` (string): Email address to send verification to

**Returns:** Promise<void>

**Example:**
```typescript
try {
  await authService.resendVerificationEmail('user@example.com');
  console.log('Verification email sent');
} catch (error) {
  console.error('Failed to resend verification:', error);
}
```

---

## Profile Management

### ProfileService

The `profileService` manages user profiles and related data.

**Location**: `src/services/api/profile.ts`

#### Types

```typescript
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
```

#### Methods

##### `getProfile(userId: string)`
Retrieves a user's profile by ID.

**Parameters:**
- `userId` (string): The user's unique identifier

**Returns:** Promise<Profile | null>

**Example:**
```typescript
import { profileService } from '@/services/api/profile';

try {
  const profile = await profileService.getProfile('user-id-123');
  if (profile) {
    console.log('Profile:', profile);
  }
} catch (error) {
  console.error('Failed to get profile:', error);
}
```

##### `updateProfile(userId: string, updates: ProfileUpdate)`
Updates a user's profile with the provided data.

**Parameters:**
- `userId` (string): The user's unique identifier
- `updates` (ProfileUpdate): Object containing fields to update

**Returns:** Promise<Profile | null>

**Example:**
```typescript
try {
  const updatedProfile = await profileService.updateProfile('user-id-123', {
    full_name: 'John Doe',
    about: 'Digital artist and designer',
    specialties: 'Digital Art, UI/UX Design'
  });
  console.log('Updated profile:', updatedProfile);
} catch (error) {
  console.error('Failed to update profile:', error);
}
```

##### `getArtworkCount(userId: string)`
Gets the total number of artworks uploaded by a user.

**Parameters:**
- `userId` (string): The user's unique identifier

**Returns:** Promise<number>

**Example:**
```typescript
try {
  const count = await profileService.getArtworkCount('user-id-123');
  console.log(`User has ${count} artworks`);
} catch (error) {
  console.error('Failed to get artwork count:', error);
}
```

##### `getUserArtworks(userId: string, limit?: number)`
Retrieves a user's artworks with like counts.

**Parameters:**
- `userId` (string): The user's unique identifier
- `limit` (number, optional): Maximum number of artworks to return (default: 6)

**Returns:** Promise<Artwork[]>

**Example:**
```typescript
try {
  const artworks = await profileService.getUserArtworks('user-id-123', 10);
  artworks.forEach(artwork => {
    console.log(`${artwork.title}: ${artwork.likes_count} likes`);
  });
} catch (error) {
  console.error('Failed to get user artworks:', error);
}
```

##### `getUserParties(userId: string, limit?: number)`
Retrieves parties hosted or joined by a user.

**Parameters:**
- `userId` (string): The user's unique identifier
- `limit` (number, optional): Maximum number of parties to return (default: 5)

**Returns:** Promise<Party[]>

**Example:**
```typescript
try {
  const parties = await profileService.getUserParties('user-id-123');
  parties.forEach(party => {
    console.log(`${party.title} (${party.type})`);
  });
} catch (error) {
  console.error('Failed to get user parties:', error);
}
```

##### `createDefaultProfile(userId: string, email: string, username?: string)`
Creates a default profile for a new user.

**Parameters:**
- `userId` (string): The user's unique identifier
- `email` (string): The user's email address
- `username` (string, optional): Desired username (defaults to email prefix)

**Returns:** Promise<Profile | null>

**Example:**
```typescript
try {
  const profile = await profileService.createDefaultProfile(
    'user-id-123',
    'user@example.com',
    'artist123'
  );
  console.log('Default profile created:', profile);
} catch (error) {
  console.error('Failed to create default profile:', error);
}
```

---

## React Hooks

### Profile Hooks

**Location**: `src/hooks/useProfile.ts`

#### `useProfile()`
Hook for managing the current user's profile.

**Returns:**
```typescript
{
  profile: Profile | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  userId: string | undefined;
}
```

**Example:**
```typescript
import { useProfile } from '@/hooks/useProfile';

function ProfileComponent() {
  const { profile, isLoading, error } = useProfile();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <div>
      <h1>{profile.full_name}</h1>
      <p>{profile.about}</p>
    </div>
  );
}
```

#### `useUserStats()`
Hook for getting user statistics (artwork count, likes, etc.).

**Returns:**
```typescript
{
  artworkCount: number;
  isLoadingArtwork: boolean;
  likes: number;
  followers: number;
  following: number;
}
```

**Example:**
```typescript
import { useUserStats } from '@/hooks/useProfile';

function UserStatsComponent() {
  const { artworkCount, isLoadingArtwork } = useUserStats();

  return (
    <div>
      <p>Artworks: {isLoadingArtwork ? 'Loading...' : artworkCount}</p>
    </div>
  );
}
```

#### `useUserArtworks(limit?: number)`
Hook for fetching user's artworks.

**Parameters:**
- `limit` (number, optional): Maximum number of artworks to fetch (default: 6)

**Returns:**
```typescript
{
  artworks: Artwork[];
  isLoading: boolean;
  error: Error | null;
}
```

**Example:**
```typescript
import { useUserArtworks } from '@/hooks/useProfile';

function ArtworkGallery() {
  const { artworks, isLoading } = useUserArtworks(12);

  if (isLoading) return <div>Loading artworks...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {artworks.map(artwork => (
        <div key={artwork.id}>
          <img src={artwork.image_url} alt={artwork.title} />
          <h3>{artwork.title}</h3>
          <p>{artwork.likes_count} likes</p>
        </div>
      ))}
    </div>
  );
}
```

#### `useUpdateProfile()`
Hook for updating user profile.

**Returns:**
```typescript
{
  updateProfile: (updates: ProfileUpdate) => void;
  isUpdating: boolean;
  error: Error | null;
  isSuccess: boolean;
}
```

**Example:**
```typescript
import { useUpdateProfile } from '@/hooks/useProfile';

function EditProfileComponent() {
  const { updateProfile, isUpdating, isSuccess } = useUpdateProfile();

  const handleSubmit = (formData) => {
    updateProfile({
      full_name: formData.fullName,
      about: formData.about
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={isUpdating}>
        {isUpdating ? 'Updating...' : 'Update Profile'}
      </button>
      {isSuccess && <p>Profile updated successfully!</p>}
    </form>
  );
}
```

### Utility Hooks

#### `useIsMobile()`
Hook for detecting mobile screen sizes.

**Location**: `src/hooks/use-mobile.tsx`

**Returns:** boolean

**Example:**
```typescript
import { useIsMobile } from '@/hooks/use-mobile';

function ResponsiveComponent() {
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? 'mobile-layout' : 'desktop-layout'}>
      <p>Current view: {isMobile ? 'Mobile' : 'Desktop'}</p>
    </div>
  );
}
```

#### `useToast()`
Hook for displaying toast notifications.

**Location**: `src/hooks/use-toast.ts`

**Returns:**
```typescript
{
  toast: (props: ToastProps) => void;
  dismiss: (toastId?: string) => void;
  toasts: Toast[];
}
```

**Example:**
```typescript
import { useToast } from '@/hooks/use-toast';

function NotificationComponent() {
  const { toast } = useToast();

  const showSuccess = () => {
    toast({
      title: "Success!",
      description: "Your action was completed successfully.",
      variant: "default",
    });
  };

  const showError = () => {
    toast({
      title: "Error",
      description: "Something went wrong.",
      variant: "destructive",
    });
  };

  return (
    <div>
      <button onClick={showSuccess}>Show Success</button>
      <button onClick={showError}>Show Error</button>
    </div>
  );
}
```

---

## UI Components

### Button Component

**Location**: `src/components/ui/button.tsx`

A versatile button component with multiple variants and sizes.

#### Props

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}
```

#### Usage Examples

```typescript
import { Button } from '@/components/ui/button';

// Basic button
<Button>Click me</Button>

// Different variants
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Subtle action</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">🎨</Button>

// As child (renders as different element)
<Button asChild>
  <a href="/link">Link Button</a>
</Button>
```

### Card Components

**Location**: `src/components/ui/card.tsx`

A set of components for creating card layouts.

#### Components

- `Card`: Main container
- `CardHeader`: Header section
- `CardTitle`: Title element
- `CardDescription`: Description text
- `CardContent`: Main content area
- `CardFooter`: Footer section

#### Usage Example

```typescript
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';

function ProfileCard() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Profile content goes here...</p>
      </CardContent>
      <CardFooter>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
```

### Form Components

#### Input Component

**Location**: `src/components/ui/input.tsx`

```typescript
import { Input } from '@/components/ui/input';

<Input 
  type="email" 
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

#### Textarea Component

**Location**: `src/components/ui/textarea.tsx`

```typescript
import { Textarea } from '@/components/ui/textarea';

<Textarea 
  placeholder="Tell us about yourself..."
  rows={4}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>
```

#### Label Component

**Location**: `src/components/ui/label.tsx`

```typescript
import { Label } from '@/components/ui/label';

<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" />
```

### Dialog Components

**Location**: `src/components/ui/dialog.tsx`

Modal dialog components for overlays and forms.

#### Usage Example

```typescript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function EditDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        {/* Dialog content */}
      </DialogContent>
    </Dialog>
  );
}
```

---

## Application Components

### ModernNavigation

**Location**: `src/components/ModernNavigation.tsx`

Main navigation component for the application.

#### Props

```typescript
interface ModernNavigationProps {
  title: string;
  subtitle?: string;
}
```

#### Usage

```typescript
import ModernNavigation from '@/components/ModernNavigation';

function AppLayout() {
  return (
    <div>
      <ModernNavigation 
        title="Art Community" 
        subtitle="Connect and Create" 
      />
      {/* Page content */}
    </div>
  );
}
```

### ProtectedRoute

**Location**: `src/components/ProtectedRoute.tsx`

Component for protecting routes that require authentication.

#### Props

```typescript
interface ProtectedRouteProps {
  children: React.ReactNode;
}
```

#### Usage

```typescript
import ProtectedRoute from '@/components/ProtectedRoute';

// In routing configuration
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### ProfileDropdown

**Location**: `src/components/ProfileDropdown.tsx`

User profile dropdown menu component.

#### Usage

```typescript
import ProfileDropdown from '@/components/ProfileDropdown';

function Header() {
  return (
    <header>
      <div className="flex items-center space-x-4">
        <h1>App Title</h1>
        <ProfileDropdown />
      </div>
    </header>
  );
}
```

### ThemeToggle

**Location**: `src/components/ThemeToggle.tsx`

Component for toggling between light and dark themes.

#### Usage

```typescript
import ThemeToggle from '@/components/ThemeToggle';

function Header() {
  return (
    <header>
      <div className="flex items-center space-x-4">
        <h1>App Title</h1>
        <ThemeToggle />
      </div>
    </header>
  );
}
```

---

## Utilities

### Utils Functions

**Location**: `src/lib/utils.ts`

#### `cn(...inputs: ClassValue[])`
Utility function for combining and merging CSS classes using clsx and tailwind-merge.

**Parameters:**
- `inputs` (...ClassValue[]): CSS class names, objects, or arrays

**Returns:** string

**Example:**
```typescript
import { cn } from '@/lib/utils';

// Basic usage
const className = cn('base-class', 'additional-class');

// Conditional classes
const buttonClass = cn(
  'btn',
  {
    'btn-primary': isPrimary,
    'btn-disabled': isDisabled
  },
  className
);

// In component
<div className={cn('default-styles', props.className)} />
```

### Specialties Utilities

**Location**: `src/lib/specialties.ts`

Utility functions for handling user specialties.

#### `parseSpecialties(specialtiesString: unknown)`
Parses a specialty string into an array.

**Parameters:**
- `specialtiesString` (unknown): String containing comma-separated specialties

**Returns:** string[]

**Example:**
```typescript
import { parseSpecialties } from '@/lib/specialties';

const specialties = parseSpecialties('Digital Art, UI Design, Illustration');
// Returns: ['Digital Art', 'UI Design', 'Illustration']
```

#### `formatSpecialties(specialties: string[])`
Formats an array of specialties into a comma-separated string.

**Parameters:**
- `specialties` (string[]): Array of specialty strings

**Returns:** string

**Example:**
```typescript
import { formatSpecialties } from '@/lib/specialties';

const formatted = formatSpecialties(['Digital Art', 'UI Design']);
// Returns: 'Digital Art, UI Design'
```

#### `getDefaultSpecialties()`
Returns default specialties for new users.

**Returns:** string[]

**Example:**
```typescript
import { getDefaultSpecialties } from '@/lib/specialties';

const defaults = getDefaultSpecialties();
// Returns: ['Digital Art', 'Creative', 'Portfolio']
```

#### `addHashtags(specialties: string[])`
Adds hashtags to specialties that don't already have them.

**Parameters:**
- `specialties` (string[]): Array of specialty strings

**Returns:** string[]

**Example:**
```typescript
import { addHashtags } from '@/lib/specialties';

const withHashtags = addHashtags(['Digital Art', '#UI Design']);
// Returns: ['#Digital Art', '#UI Design']
```

#### `removeHashtags(specialties: string[])`
Removes hashtags from specialties.

**Parameters:**
- `specialties` (string[]): Array of specialty strings

**Returns:** string[]

**Example:**
```typescript
import { removeHashtags } from '@/lib/specialties';

const withoutHashtags = removeHashtags(['#Digital Art', '#UI Design']);
// Returns: ['Digital Art', 'UI Design']
```

---

## Context Providers

### AuthContext

**Location**: `src/contexts/AuthContext.tsx`

Provides authentication state and methods throughout the application.

#### Context Value

```typescript
interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, username: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}
```

#### Usage

```typescript
import { useAuth } from '@/contexts/AuthContext';

function UserProfile() {
  const { user, loading, logout } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// Provider setup (in App.tsx)
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <YourAppComponents />
    </AuthProvider>
  );
}
```

### ThemeProvider

**Location**: `src/components/ThemeProvider.tsx`

Provides theme context for dark/light mode switching.

#### Usage

```typescript
import ThemeProvider from '@/components/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <YourAppComponents />
    </ThemeProvider>
  );
}
```

---

## Database Types

### Supabase Types

**Location**: `src/integrations/supabase/types.ts`

TypeScript definitions for database tables and relationships.

#### Key Types

```typescript
// Artwork table
type Artwork = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  uploader_id: string;
  created_at: string | null;
  updated_at: string | null;
};

// Profile table
type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  about: string | null;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  specialties: string | null;
  created_at: string | null;
};

// Events table
type Event = {
  id: string;
  title: string;
  description: string | null;
  scheduled_at: string;
  address: string | null;
  category: string;
  created_at: string | null;
  host_id: string;
};
```

#### Usage

```typescript
import type { Database } from '@/integrations/supabase/types';

// Use with Supabase client
const { data, error } = await supabase
  .from('artwork')
  .select('*')
  .returns<Database['public']['Tables']['artwork']['Row'][]>();
```

---

## Configuration

### Supabase Configuration

**Location**: `src/lib/supabase.ts`

Supabase client configuration and initialization.

#### Environment Variables

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

#### Usage

```typescript
import { supabase } from '@/lib/supabase';

// Use the configured client
const { data, error } = await supabase
  .from('profiles')
  .select('*');
```

---

## Error Handling

### Best Practices

1. **Always wrap async operations in try-catch blocks**
```typescript
try {
  const result = await authService.signIn(email, password);
  // Handle success
} catch (error) {
  console.error('Authentication failed:', error);
  // Handle error appropriately
}
```

2. **Use React Query for error handling in hooks**
```typescript
const { data, error, isLoading } = useProfile();

if (error) {
  return <ErrorComponent message={error.message} />;
}
```

3. **Display user-friendly error messages**
```typescript
const { toast } = useToast();

try {
  await updateProfile(data);
  toast({ title: "Success", description: "Profile updated!" });
} catch (error) {
  toast({ 
    title: "Error", 
    description: "Failed to update profile. Please try again.",
    variant: "destructive"
  });
}
```

---

## Performance Considerations

### React Query Caching

The application uses React Query for efficient data fetching and caching:

- Profile data is cached for 5 minutes (`staleTime: 5 * 60 * 1000`)
- Queries are automatically invalidated when related mutations succeed
- Background refetching keeps data fresh

### Lazy Loading

Components and routes can be lazy-loaded for better performance:

```typescript
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

---

## Contributing

When adding new components or APIs:

1. **Follow TypeScript best practices** - Define proper interfaces and types
2. **Add comprehensive JSDoc comments** - Document parameters, return values, and examples
3. **Include error handling** - Always handle potential errors gracefully
4. **Write unit tests** - Test components and functions thoroughly
5. **Update this documentation** - Keep the API documentation current

---

## Support

For questions or issues:

1. Check the existing documentation
2. Review the component source code
3. Look for similar patterns in the codebase
4. Create detailed bug reports with reproduction steps

This documentation covers all major public APIs, components, and utilities in the application. Each section includes practical examples and usage patterns to help developers understand and use the codebase effectively.