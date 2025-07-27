# Setup and Usage Guide

## Overview

This guide provides comprehensive instructions for setting up, developing, and deploying the Art Community application. It covers everything from initial setup to advanced development patterns and deployment strategies.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Development Environment](#development-environment)
4. [Project Structure](#project-structure)
5. [Development Workflow](#development-workflow)
6. [Testing](#testing)
7. [Building and Deployment](#building-and-deployment)
8. [Environment Configuration](#environment-configuration)
9. [Common Development Tasks](#common-development-tasks)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### System Requirements

- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (or equivalent package manager)
- **Git**: Latest version
- **Modern Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

### Required Accounts

- **Supabase Account**: For database and authentication
- **Google Cloud Console**: For Google OAuth (optional)
- **Vercel/Netlify Account**: For deployment (optional)

### Development Tools (Recommended)

- **VS Code**: With the following extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - ESLint
- **Browser DevTools**: React Developer Tools extension

---

## Initial Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd art-community-app
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install

# Or using bun
bun install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Custom Backend URL
VITE_BACKEND_URL=your_backend_url

# Optional: Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 4. Supabase Setup

#### Database Schema

Create the following tables in your Supabase database:

```sql
-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  about TEXT,
  facebook TEXT,
  twitter TEXT,
  instagram TEXT,
  specialties TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Artwork table
CREATE TABLE artwork (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  uploader_id UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events/Parties table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  address TEXT,
  category TEXT NOT NULL,
  host_id UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Party members table
CREATE TABLE party_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  party_id UUID REFERENCES events(id) NOT NULL,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(party_id, user_id)
);

-- Likes table
CREATE TABLE likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  artwork_id UUID REFERENCES artwork(id) NOT NULL,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(artwork_id, user_id)
);

-- Conversations table
CREATE TABLE conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  participant1_id UUID REFERENCES profiles(id) NOT NULL,
  participant2_id UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_message_at TIMESTAMP WITH TIME ZONE
);
```

#### Row Level Security (RLS)

Enable RLS and create policies:

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE artwork ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE party_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Artwork policies
CREATE POLICY "Anyone can view artwork" ON artwork FOR SELECT USING (true);
CREATE POLICY "Users can insert own artwork" ON artwork FOR INSERT WITH CHECK (auth.uid() = uploader_id);
CREATE POLICY "Users can update own artwork" ON artwork FOR UPDATE USING (auth.uid() = uploader_id);
CREATE POLICY "Users can delete own artwork" ON artwork FOR DELETE USING (auth.uid() = uploader_id);

-- Events policies
CREATE POLICY "Anyone can view events" ON events FOR SELECT USING (true);
CREATE POLICY "Users can create events" ON events FOR INSERT WITH CHECK (auth.uid() = host_id);
CREATE POLICY "Users can update own events" ON events FOR UPDATE USING (auth.uid() = host_id);

-- Likes policies
CREATE POLICY "Anyone can view likes" ON likes FOR SELECT USING (true);
CREATE POLICY "Users can manage own likes" ON likes FOR ALL USING (auth.uid() = user_id);
```

### 5. Authentication Setup

Configure authentication providers in Supabase:

1. Go to Authentication > Providers in your Supabase dashboard
2. Enable Email provider
3. (Optional) Enable Google OAuth:
   - Add Google OAuth credentials
   - Set redirect URL: `https://your-domain.com/auth/callback`

---

## Development Environment

### Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build for development
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Type checking
npx tsc --noEmit     # Type check without emitting files
```

### Development Tools Integration

#### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "'([^']*)'"],
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

#### Prettier Configuration

The project includes `.prettierrc`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false
}
```

---

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # ShadCN UI components
│   └── *.tsx           # Custom components
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── integrations/       # Third-party integrations
│   └── supabase/      # Supabase types and config
├── lib/               # Utility functions and configurations
├── pages/             # Page components
├── services/          # API services
│   └── api/           # API service modules
├── App.tsx            # Main app component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

### File Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Hooks**: camelCase starting with 'use' (e.g., `useProfile.ts`)
- **Services**: camelCase (e.g., `authService.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase (e.g., `UserTypes.ts`)

---

## Development Workflow

### 1. Creating New Components

#### UI Component Template

```typescript
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'base-styles',
          {
            'variant-default': variant === 'default',
            'variant-secondary': variant === 'secondary',
            'size-sm': size === 'sm',
            'size-md': size === 'md',
            'size-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Component.displayName = 'Component';

export { Component };
export type { ComponentProps };
```

#### Page Component Template

```typescript
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ModernNavigation from '@/components/ModernNavigation';

function PageName() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-green-100">
      <ModernNavigation title="Page Title" />
      <main className="container mx-auto px-4 py-8">
        {/* Page content */}
      </main>
    </div>
  );
}

export default PageName;
```

### 2. Creating Custom Hooks

```typescript
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface UseCustomHookOptions {
  enabled?: boolean;
  refetchInterval?: number;
}

function useCustomHook(param: string, options: UseCustomHookOptions = {}) {
  const { enabled = true, refetchInterval } = options;

  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['customHook', param],
    queryFn: () => fetchData(param),
    enabled,
    refetchInterval,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}

export { useCustomHook };
```

### 3. Adding API Services

```typescript
import { supabase } from '@/lib/supabase';

interface CreateItemData {
  title: string;
  description?: string;
}

interface UpdateItemData {
  title?: string;
  description?: string;
}

export const itemService = {
  async getItems(limit = 10) {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },

  async createItem(itemData: CreateItemData) {
    try {
      const { data, error } = await supabase
        .from('items')
        .insert(itemData)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  },

  async updateItem(id: string, updates: UpdateItemData) {
    try {
      const { data, error } = await supabase
        .from('items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  },

  async deleteItem(id: string) {
    try {
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  },
};
```

### 4. State Management Patterns

#### Using React Query for Server State

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

function useCreateItem() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: itemService.createItem,
    onSuccess: (newItem) => {
      // Update cache
      queryClient.setQueryData(['items'], (old: any[]) => [
        newItem,
        ...(old || [])
      ]);

      // Show success message
      toast({
        title: 'Success!',
        description: 'Item created successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to create item. Please try again.',
        variant: 'destructive',
      });
    },
  });
}
```

#### Local State with Context

```typescript
import React, { createContext, useContext, useReducer } from 'react';

interface State {
  items: Item[];
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ITEMS'; payload: Item[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_ITEM'; payload: Item };

const initialState: State = {
  items: [],
  loading: false,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ITEMS':
      return { ...state, items: action.payload, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'ADD_ITEM':
      return { ...state, items: [action.payload, ...state.items] };
    default:
      return state;
  }
}

const StateContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}

export const useAppState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be used within StateProvider');
  }
  return context;
};
```

---

## Testing

### Setup Testing Environment

Install testing dependencies:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest jsdom
```

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

Create `src/test/setup.ts`:

```typescript
import '@testing-library/jest-dom';
```

### Component Testing Examples

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByText('Delete');
    expect(button).toHaveClass('bg-destructive');
  });
});
```

### Hook Testing

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProfile } from '@/hooks/useProfile';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useProfile Hook', () => {
  it('returns loading state initially', () => {
    const { result } = renderHook(() => useProfile(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.profile).toBe(null);
  });
});
```

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

---

## Building and Deployment

### Production Build

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Deployment Options

#### Vercel Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel --prod
```

3. Configure environment variables in Vercel dashboard

#### Netlify Deployment

1. Create `netlify.toml`:
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Deploy via Netlify CLI or GitHub integration

#### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Upload `dist` folder contents to your web server

3. Configure server to serve `index.html` for all routes (SPA routing)

### Environment Variables for Production

Set these in your deployment platform:

```env
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key
VITE_BACKEND_URL=your_production_backend_url
```

---

## Environment Configuration

### Development Environment

`.env.local`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_BACKEND_URL=http://localhost:3000
```

### Staging Environment

`.env.staging`:
```env
VITE_SUPABASE_URL=https://your-staging-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_staging_anon_key
VITE_BACKEND_URL=https://staging-api.yourdomain.com
```

### Production Environment

Set directly in deployment platform or use `.env.production`:
```env
VITE_SUPABASE_URL=https://your-production-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key
VITE_BACKEND_URL=https://api.yourdomain.com
```

### Environment-Specific Builds

```bash
# Development build
npm run build:dev

# Production build
npm run build

# Custom environment
VITE_ENV=staging npm run build
```

---

## Common Development Tasks

### Adding a New Page

1. Create the page component in `src/pages/`:

```typescript
// src/pages/NewPage.tsx
import React from 'react';
import ModernNavigation from '@/components/ModernNavigation';

function NewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-green-100">
      <ModernNavigation title="New Page" />
      <main className="container mx-auto px-4 py-8">
        <h1>New Page Content</h1>
      </main>
    </div>
  );
}

export default NewPage;
```

2. Add route in `src/App.tsx`:

```typescript
import NewPage from './pages/NewPage';

// Add to routes
<Route path="/new-page" element={
  <ProtectedRoute>
    <NewPage />
  </ProtectedRoute>
} />
```

3. Add navigation link in `src/components/ModernNavigation.tsx`:

```typescript
const navigationTabs = [
  // ... existing tabs
  { name: 'New Page', path: '/new-page' },
];
```

### Adding Database Migrations

1. Create migration in Supabase dashboard or SQL editor:

```sql
-- Migration: Add new column to profiles table
ALTER TABLE profiles ADD COLUMN new_field TEXT;

-- Update RLS policies if needed
CREATE POLICY "Users can update new_field" ON profiles 
FOR UPDATE USING (auth.uid() = id);
```

2. Update TypeScript types in `src/integrations/supabase/types.ts`

3. Update relevant services and hooks

### Implementing Real-time Features

```typescript
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

function useRealTimeData(table: string) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Initial fetch
    const fetchData = async () => {
      const { data: initialData } = await supabase
        .from(table)
        .select('*');
      setData(initialData || []);
    };

    fetchData();

    // Set up real-time subscription
    const subscription = supabase
      .channel(`public:${table}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setData(prev => [payload.new, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setData(prev => prev.map(item => 
              item.id === payload.new.id ? payload.new : item
            ));
          } else if (payload.eventType === 'DELETE') {
            setData(prev => prev.filter(item => 
              item.id !== payload.old.id
            ));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [table]);

  return data;
}
```

### Adding Form Validation

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  description: z.string().max(500, 'Description too long').optional(),
  category: z.enum(['art', 'photography', 'design'], {
    required_error: 'Please select a category',
  }),
});

type FormData = z.infer<typeof formSchema>;

function MyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Form fields */}
      </form>
    </Form>
  );
}
```

### File Upload Implementation

```typescript
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

function useFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (file: File, bucket: string, path: string) => {
    setUploading(true);
    setProgress(0);

    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          onUploadProgress: (progress) => {
            setProgress((progress.loaded / progress.total) * 100);
          },
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);

      return publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return { uploadFile, uploading, progress };
}
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Supabase Connection Issues

**Problem**: "Failed to fetch" or connection errors

**Solutions**:
- Check environment variables are correctly set
- Verify Supabase URL and keys
- Check network connectivity
- Ensure RLS policies allow the operation

```typescript
// Debug Supabase connection
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 10) + '...');
```

#### 2. Authentication Issues

**Problem**: User not persisting after refresh

**Solutions**:
- Check if session is being properly restored
- Verify auth context is wrapping the app
- Check browser storage for session data

```typescript
// Debug auth state
useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    console.log('Current session:', session);
  });
}, []);
```

#### 3. Build Errors

**Problem**: TypeScript or build failures

**Solutions**:
- Run type checking: `npx tsc --noEmit`
- Check for missing dependencies
- Verify import paths are correct
- Clear node_modules and reinstall

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

#### 4. Styling Issues

**Problem**: Tailwind classes not working

**Solutions**:
- Check Tailwind config includes all files
- Verify CSS imports are correct
- Check for class name conflicts
- Use browser dev tools to inspect styles

#### 5. Performance Issues

**Problem**: Slow loading or poor performance

**Solutions**:
- Check React Query cache configuration
- Implement proper loading states
- Use React.memo for expensive components
- Optimize images and assets

```typescript
// Performance monitoring
useEffect(() => {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      console.log('Performance entry:', entry);
    });
  });
  
  observer.observe({ entryTypes: ['navigation', 'paint'] });
  
  return () => observer.disconnect();
}, []);
```

### Debugging Tools

#### React Developer Tools

Install the browser extension and use:
- Component tree inspection
- Props and state debugging
- Profiler for performance analysis

#### Network Debugging

```typescript
// Log all API calls
const originalFetch = window.fetch;
window.fetch = function(...args) {
  console.log('Fetch:', args);
  return originalFetch.apply(this, args);
};
```

#### Error Boundaries

```typescript
import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-muted-foreground mb-4">
              {this.state.error?.message}
            </p>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

### Getting Help

1. **Check Documentation**: Review API documentation and component references
2. **Search Issues**: Look for similar problems in the project repository
3. **Console Logs**: Check browser console for error messages
4. **Network Tab**: Inspect failed API requests
5. **Community**: Ask questions in project discussions or relevant communities

---

## Performance Optimization

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist
```

### Lazy Loading

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

### Image Optimization

```typescript
// Use modern image formats
<img 
  src="image.webp" 
  alt="Description"
  loading="lazy"
  style={{ aspectRatio: '16/9' }}
/>

// Or use a service like Cloudinary
const optimizedImageUrl = `https://res.cloudinary.com/your-cloud/image/fetch/w_400,h_300,c_fill,f_auto,q_auto/${originalUrl}`;
```

This comprehensive setup and usage guide provides everything needed to successfully develop, deploy, and maintain the Art Community application.