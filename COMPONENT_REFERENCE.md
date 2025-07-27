# Component Reference Guide

## Overview

This guide provides detailed documentation for all UI components in the application, including ShadCN UI components and custom application components.

## Table of Contents

1. [Form Components](#form-components)
2. [Layout Components](#layout-components)
3. [Navigation Components](#navigation-components)
4. [Feedback Components](#feedback-components)
5. [Data Display Components](#data-display-components)
6. [Modal Components](#modal-components)
7. [Custom Application Components](#custom-application-components)

---

## Form Components

### Button

**Location**: `src/components/ui/button.tsx`

A flexible button component with multiple variants and sizes.

#### Variants
- `default`: Primary blue button
- `destructive`: Red button for dangerous actions
- `outline`: Button with border, no fill
- `secondary`: Gray secondary button
- `ghost`: Transparent button with hover effect
- `link`: Text button styled as link

#### Sizes
- `default`: Standard button size (h-10 px-4 py-2)
- `sm`: Small button (h-9 px-3)
- `lg`: Large button (h-11 px-8)
- `icon`: Square button for icons (h-10 w-10)

#### Complete Example
```typescript
import { Button } from '@/components/ui/button';
import { Trash2, Edit, Plus } from 'lucide-react';

function ButtonExamples() {
  return (
    <div className="space-y-4">
      {/* Primary actions */}
      <div className="space-x-2">
        <Button>Save Changes</Button>
        <Button variant="outline">Cancel</Button>
      </div>

      {/* Destructive actions */}
      <Button variant="destructive" size="sm">
        <Trash2 className="w-4 h-4 mr-2" />
        Delete Item
      </Button>

      {/* Icon buttons */}
      <div className="space-x-2">
        <Button size="icon" variant="ghost">
          <Edit className="w-4 h-4" />
        </Button>
        <Button size="icon">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Link button */}
      <Button variant="link" asChild>
        <a href="/profile">View Profile</a>
      </Button>
    </div>
  );
}
```

### Input

**Location**: `src/components/ui/input.tsx`

Standard text input component with consistent styling.

#### Props
- All standard HTML input attributes
- `className`: Additional CSS classes
- `type`: Input type (text, email, password, etc.)

#### Example
```typescript
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
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
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <Button type="submit">Sign In</Button>
    </form>
  );
}
```

### Textarea

**Location**: `src/components/ui/textarea.tsx`

Multi-line text input component.

#### Example
```typescript
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

function ProfileForm() {
  const [bio, setBio] = useState('');

  return (
    <div className="space-y-2">
      <Label htmlFor="bio">About Me</Label>
      <Textarea
        id="bio"
        placeholder="Tell us about yourself..."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        rows={4}
        className="resize-none"
      />
      <p className="text-sm text-muted-foreground">
        {bio.length}/500 characters
      </p>
    </div>
  );
}
```

### Checkbox

**Location**: `src/components/ui/checkbox.tsx`

Checkbox component with label support.

#### Example
```typescript
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

function SettingsForm() {
  const [notifications, setNotifications] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="notifications"
          checked={notifications}
          onCheckedChange={setNotifications}
        />
        <Label htmlFor="notifications">
          Enable email notifications
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="newsletter"
          checked={newsletter}
          onCheckedChange={setNewsletter}
        />
        <Label htmlFor="newsletter">
          Subscribe to newsletter
        </Label>
      </div>
    </div>
  );
}
```

### Select

**Location**: `src/components/ui/select.tsx`

Dropdown select component with search and keyboard navigation.

#### Example
```typescript
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function CategorySelect() {
  return (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="digital-art">Digital Art</SelectItem>
        <SelectItem value="painting">Painting</SelectItem>
        <SelectItem value="photography">Photography</SelectItem>
        <SelectItem value="sculpture">Sculpture</SelectItem>
        <SelectItem value="illustration">Illustration</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

---

## Layout Components

### Card

**Location**: `src/components/ui/card.tsx`

Flexible card component for content organization.

#### Complete Example
```typescript
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

function ArtworkCard({ artwork }) {
  return (
    <Card className="w-80 overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img
          src={artwork.image_url}
          alt={artwork.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{artwork.title}</CardTitle>
          <Badge variant="secondary">{artwork.category}</Badge>
        </div>
        <CardDescription>
          By {artwork.artist_name}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {artwork.description}
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm">❤️ {artwork.likes_count}</span>
          <span className="text-sm">👁️ {artwork.views_count}</span>
        </div>
        <Button size="sm" variant="outline">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### Separator

**Location**: `src/components/ui/separator.tsx`

Visual separator for content sections.

#### Example
```typescript
import { Separator } from '@/components/ui/separator';

function ProfileSection() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Personal Information</h2>
        <p>Your basic profile details</p>
      </div>
      
      <Separator />
      
      <div>
        <h2 className="text-lg font-semibold">Social Links</h2>
        <p>Connect your social media accounts</p>
      </div>
      
      <Separator />
      
      <div>
        <h2 className="text-lg font-semibold">Privacy Settings</h2>
        <p>Control your profile visibility</p>
      </div>
    </div>
  );
}
```

### Tabs

**Location**: `src/components/ui/tabs.tsx`

Tabbed interface component.

#### Example
```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function ProfileTabs() {
  return (
    <Tabs defaultValue="artworks" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="artworks">Artworks</TabsTrigger>
        <TabsTrigger value="events">Events</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
      </TabsList>
      
      <TabsContent value="artworks" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Artwork cards */}
        </div>
      </TabsContent>
      
      <TabsContent value="events" className="space-y-4">
        <div className="space-y-2">
          {/* Event list */}
        </div>
      </TabsContent>
      
      <TabsContent value="about" className="space-y-4">
        <div className="prose">
          {/* About content */}
        </div>
      </TabsContent>
    </Tabs>
  );
}
```

---

## Navigation Components

### Navigation Menu

**Location**: `src/components/ui/navigation-menu.tsx`

Accessible navigation menu with dropdown support.

#### Example
```typescript
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

function MainNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/">
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger>Browse</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 w-48">
              <NavigationMenuLink href="/community-art">
                Community Art
              </NavigationMenuLink>
              <NavigationMenuLink href="/events">
                Events
              </NavigationMenuLink>
              <NavigationMenuLink href="/artists">
                Artists
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger>Create</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 w-48">
              <NavigationMenuLink href="/studio">
                My Studio
              </NavigationMenuLink>
              <NavigationMenuLink href="/host-party">
                Host Event
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

### Breadcrumb

**Location**: `src/components/ui/breadcrumb.tsx`

Breadcrumb navigation component.

#### Example
```typescript
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

function PageBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/community-art">Community Art</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Digital Paintings</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

---

## Feedback Components

### Toast

**Location**: `src/components/ui/toast.tsx`, `src/hooks/use-toast.ts`

Toast notification system for user feedback.

#### Complete Example
```typescript
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

function NotificationDemo() {
  const { toast } = useToast();

  const showSuccess = () => {
    toast({
      title: "Success!",
      description: "Your profile has been updated successfully.",
      duration: 3000,
    });
  };

  const showError = () => {
    toast({
      title: "Error",
      description: "Failed to save changes. Please try again.",
      variant: "destructive",
      duration: 5000,
    });
  };

  const showWithAction = () => {
    toast({
      title: "Artwork uploaded",
      description: "Your artwork is now live in the community gallery.",
      action: (
        <Button variant="outline" size="sm">
          View
        </Button>
      ),
    });
  };

  return (
    <div className="space-x-2">
      <Button onClick={showSuccess}>Show Success</Button>
      <Button onClick={showError} variant="destructive">
        Show Error
      </Button>
      <Button onClick={showWithAction} variant="outline">
        Show with Action
      </Button>
    </div>
  );
}
```

### Alert

**Location**: `src/components/ui/alert.tsx`

Alert component for important messages.

#### Example
```typescript
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

function AlertExamples() {
  return (
    <div className="space-y-4">
      {/* Success alert */}
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          Your artwork has been successfully uploaded to the gallery.
        </AlertDescription>
      </Alert>

      {/* Warning alert */}
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Your session will expire in 5 minutes. Please save your work.
        </AlertDescription>
      </Alert>

      {/* Info alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Tip</AlertTitle>
        <AlertDescription>
          Use high-resolution images for better quality in the gallery.
        </AlertDescription>
      </Alert>
    </div>
  );
}
```

### Progress

**Location**: `src/components/ui/progress.tsx`

Progress indicator component.

#### Example
```typescript
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';

function UploadProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Uploading artwork...</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
}
```

---

## Data Display Components

### Table

**Location**: `src/components/ui/table.tsx`

Table component for structured data display.

#### Example
```typescript
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

function ArtworkTable({ artworks }) {
  return (
    <Table>
      <TableCaption>Recent artwork uploads</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Likes</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {artworks.map((artwork) => (
          <TableRow key={artwork.id}>
            <TableCell className="font-medium">
              {artwork.title}
            </TableCell>
            <TableCell>{artwork.artist_name}</TableCell>
            <TableCell>
              <Badge variant="outline">{artwork.category}</Badge>
            </TableCell>
            <TableCell>{artwork.likes_count}</TableCell>
            <TableCell>
              {new Date(artwork.created_at).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Badge

**Location**: `src/components/ui/badge.tsx`

Small status or category indicators.

#### Example
```typescript
import { Badge } from '@/components/ui/badge';

function BadgeExamples() {
  return (
    <div className="space-x-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}
```

### Avatar

**Location**: `src/components/ui/avatar.tsx`

User avatar component with fallback support.

#### Example
```typescript
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function UserAvatar({ user }) {
  return (
    <Avatar className="h-10 w-10">
      <AvatarImage src={user.avatar_url} alt={user.username} />
      <AvatarFallback>
        {user.username?.charAt(0).toUpperCase() || 'U'}
      </AvatarFallback>
    </Avatar>
  );
}

function AvatarSizes() {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-6 w-6">
        <AvatarImage src="/avatar.jpg" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      
      <Avatar className="h-10 w-10">
        <AvatarImage src="/avatar.jpg" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      
      <Avatar className="h-16 w-16">
        <AvatarImage src="/avatar.jpg" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  );
}
```

---

## Modal Components

### Dialog

**Location**: `src/components/ui/dialog.tsx`

Modal dialog component for overlays and forms.

#### Complete Example
```typescript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

function EditProfileDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const handleSave = () => {
    // Save logic here
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Alert Dialog

**Location**: `src/components/ui/alert-dialog.tsx`

Confirmation dialog for destructive actions.

#### Example
```typescript
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

function DeleteConfirmation({ onDelete }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Artwork</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            artwork and remove it from the community gallery.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>
            Yes, delete artwork
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

---

## Custom Application Components

### ModernNavigation

**Location**: `src/components/ModernNavigation.tsx`

Main navigation component with modern design and responsive behavior.

#### Features
- Sticky header with backdrop blur
- Gradient logo and title
- Tab-based navigation
- Profile dropdown integration
- Theme toggle support
- Mobile responsive

#### Example
```typescript
import ModernNavigation from '@/components/ModernNavigation';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-green-100">
      <ModernNavigation 
        title="Art Community" 
        subtitle="Connect, Create, Collaborate" 
      />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
```

### ProtectedRoute

**Location**: `src/components/ProtectedRoute.tsx`

Route protection component that redirects unauthenticated users.

#### Features
- Authentication check
- Loading state handling
- Automatic redirect to auth page
- Smooth loading animation

#### Example
```typescript
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/studio" element={
        <ProtectedRoute>
          <Studio />
        </ProtectedRoute>
      } />
    </Routes>
  );
}
```

### ProfileDropdown

**Location**: `src/components/ProfileDropdown.tsx`

User profile dropdown menu with account actions.

#### Features
- User avatar display
- Profile information
- Navigation links
- Sign out functionality
- Responsive design

#### Example Integration
```typescript
import ProfileDropdown from '@/components/ProfileDropdown';

function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <h1>Art Community</h1>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <ProfileDropdown />
      </div>
    </header>
  );
}
```

### ThemeToggle

**Location**: `src/components/ThemeToggle.tsx`

Theme switching component for dark/light mode.

#### Features
- Smooth theme transitions
- System preference detection
- Persistent theme storage
- Icon animations

#### Example
```typescript
import ThemeToggle from '@/components/ThemeToggle';

function SettingsPanel() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span>Theme</span>
        <ThemeToggle />
      </div>
    </div>
  );
}
```

---

## Component Composition Patterns

### Form with Validation

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const profileSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  bio: z.string().max(500).optional(),
});

function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: '',
      email: '',
      bio: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us about yourself"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">Update Profile</Button>
      </form>
    </Form>
  );
}
```

### Data Loading with Skeleton

```typescript
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

function ArtworkCardSkeleton() {
  return (
    <Card className="w-80">
      <Skeleton className="h-48 w-full" />
      <CardHeader>
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );
}

function ArtworkGrid({ artworks, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ArtworkCardSkeleton key={i} />
        ))}
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

---

## Accessibility Guidelines

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab order follows logical flow
- Focus indicators are clearly visible
- Escape key closes modals and dropdowns

### Screen Reader Support
- All components include proper ARIA labels
- Form fields have associated labels
- Error messages are announced
- Loading states are communicated

### Color and Contrast
- All text meets WCAG contrast requirements
- Color is not the only means of conveying information
- Focus indicators have sufficient contrast
- Dark mode maintains accessibility standards

### Example Accessible Component
```typescript
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

function AccessibleSearchForm() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    // Search logic
    setIsSearching(false);
  };

  return (
    <form onSubmit={handleSubmit} role="search">
      <Label htmlFor="search-input" className="sr-only">
        Search artworks
      </Label>
      <div className="flex space-x-2">
        <Input
          id="search-input"
          type="search"
          placeholder="Search artworks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-describedby="search-help"
          disabled={isSearching}
        />
        <Button 
          type="submit" 
          disabled={isSearching || !query.trim()}
          aria-label={isSearching ? 'Searching...' : 'Search artworks'}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </Button>
      </div>
      <p id="search-help" className="text-sm text-muted-foreground mt-1">
        Search by title, artist, or category
      </p>
    </form>
  );
}
```

This component reference provides comprehensive documentation for all UI components with practical examples and accessibility considerations.