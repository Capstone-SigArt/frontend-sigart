
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AppLayout } from "./components/layout/AppLayout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Schedule from "./pages/Schedule";
import Create from "./pages/Create";
import CreateEvent from "./pages/CreateEvent";
import CreateWorkshop from "./pages/CreateWorkshop";
import CreateArtwork from "./pages/CreateArtwork";
import CreateGallery from "./pages/CreateGallery";
import MyParties from "./pages/MyParties";
import Messages from "./pages/Messages";
import ChatRoom from "./pages/ChatRoom";
import Studio from "./pages/Studio";
import Community from "./pages/Community";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/app" element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route path="events" element={<Events />} />
              <Route path="events/:id" element={<EventDetail />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="create" element={<Create />} />
              <Route path="create/event" element={<CreateEvent />} />
              <Route path="create/workshop" element={<CreateWorkshop />} />
              <Route path="create/artwork" element={<CreateArtwork />} />
              <Route path="create/gallery" element={<CreateGallery />} />
              <Route path="my-parties" element={<MyParties />} />
              <Route path="messages" element={<Messages />} />
              <Route path="messages/:id" element={<ChatRoom />} />
              <Route path="studio" element={<Studio />} />
              <Route path="community" element={<Community />} />
              <Route path="resources" element={<Resources />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
