
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Browse from "./pages/Browse";
import EventDetails from "./pages/EventDetails";
import Create from "./pages/Create";
import CreateEvent from "./pages/CreateEvent";
import UploadArt from "./pages/UploadArt";
import Messages from "./pages/Messages";
import ChatRoom from "./pages/ChatRoom";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Calendar from "./pages/Calendar";
import Gallery from "./pages/Gallery";
import AppLayout from "./components/layout/AppLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="browse" element={<Browse />} />
              <Route path="event/:id" element={<EventDetails />} />
              <Route path="create" element={<Create />} />
              <Route path="create-event" element={<CreateEvent />} />
              <Route path="upload-art" element={<UploadArt />} />
              <Route path="messages" element={<Messages />} />
              <Route path="chat/:id" element={<ChatRoom />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="gallery" element={<Gallery />} />
            </Route>
            {/* Direct routes for better UX */}
            <Route path="/dashboard" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
            <Route path="/browse" element={<AppLayout />}>
              <Route index element={<Browse />} />
            </Route>
            <Route path="/event/:id" element={<AppLayout />}>
              <Route index element={<EventDetails />} />
            </Route>
            <Route path="/create" element={<AppLayout />}>
              <Route index element={<Create />} />
            </Route>
            <Route path="/create-event" element={<AppLayout />}>
              <Route index element={<CreateEvent />} />
            </Route>
            <Route path="/upload-art" element={<AppLayout />}>
              <Route index element={<UploadArt />} />
            </Route>
            <Route path="/messages" element={<AppLayout />}>
              <Route index element={<Messages />} />
            </Route>
            <Route path="/chat/:id" element={<AppLayout />}>
              <Route index element={<ChatRoom />} />
            </Route>
            <Route path="/profile" element={<AppLayout />}>
              <Route index element={<Profile />} />
            </Route>
            <Route path="/settings" element={<AppLayout />}>
              <Route index element={<Settings />} />
            </Route>
            <Route path="/calendar" element={<AppLayout />}>
              <Route index element={<Calendar />} />
            </Route>
            <Route path="/gallery" element={<AppLayout />}>
              <Route index element={<Gallery />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
