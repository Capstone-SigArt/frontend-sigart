
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Browse from "./pages/Browse";
import EventDetails from "./pages/EventDetails";
import Create from "./pages/Create";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import AppLayout from "./components/layout/AppLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/app" element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="browse" element={<Browse />} />
            <Route path="event/:id" element={<EventDetails />} />
            <Route path="create" element={<Create />} />
            <Route path="messages" element={<Messages />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/dashboard" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/browse" element={<AppLayout />}>
            <Route index element={<Browse />} />
          </Route>
          <Route path="/create" element={<AppLayout />}>
            <Route index element={<Create />} />
          </Route>
          <Route path="/messages" element={<AppLayout />}>
            <Route index element={<Messages />} />
          </Route>
          <Route path="/profile" element={<AppLayout />}>
            <Route index element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
