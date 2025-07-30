import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ThemeProvider from "@/components/ThemeProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Studio from "./pages/Studio";
import Schedule from "./pages/Schedule";
import EventDetails from "./pages/EventDetails";
import HostParty from "./pages/HostParty";
import MyParties from "./pages/MyParties";
import CommunityArt from "./pages/CommunityArt";
import CommunityPartyDetails from "./pages/CommunityPartyDetails";
import UserStudio from "./pages/UserStudio";
import Resources from "./pages/Resources";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/callback" element={
                <ProtectedRoute>
                  <Navigate to="/" replace />
                </ProtectedRoute>
              } />
              <Route path="/" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/studio" element={
                <ProtectedRoute>
                  <Studio />
                </ProtectedRoute>
              } />
              <Route path="/schedule" element={
                <ProtectedRoute>
                  <Schedule />
                </ProtectedRoute>
              } />
              <Route path="/host-party" element={
                <ProtectedRoute>
                  <HostParty />
                </ProtectedRoute>
              } />
              <Route path="/my-parties" element={
                <ProtectedRoute>
                  <MyParties />
                </ProtectedRoute>
              } />
              <Route path="/community-art" element={
                <ProtectedRoute>
                  <CommunityArt />
                </ProtectedRoute>
              } />
              <Route path="/user-studio" element={
                <ProtectedRoute>
                  <UserStudio />
                </ProtectedRoute>
              } />
              <Route path="/user-studio/:userId" element={
                <ProtectedRoute>
                  <UserStudio />
                </ProtectedRoute>
              } />
              <Route path="/resources" element={
                <ProtectedRoute>
                  <Resources />
                </ProtectedRoute>
              } />
              <Route path="/event/:eventId" element={
                <ProtectedRoute>
                  <EventDetails />
                </ProtectedRoute>
              } />
              <Route path="/community-party/:partyId" element={
                <ProtectedRoute>
                  <CommunityPartyDetails />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
