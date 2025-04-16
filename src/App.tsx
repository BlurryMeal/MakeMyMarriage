
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ClientDashboard from "./pages/dashboard/ClientDashboard";
import VendorDashboard from "./pages/dashboard/VendorDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import VendorListing from "./pages/VendorListing";
import VendorDetails from "./pages/VendorDetails";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ListYourService from "./pages/ListYourService";

// Create a QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard/client" element={<ClientDashboard />} />
              <Route path="/dashboard/vendor" element={<VendorDashboard />} />
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
              <Route path="/services" element={<Services />} />
              <Route path="/vendors" element={<VendorListing />} />
              <Route path="/vendors/:id" element={<VendorDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/list-your-service" element={<ListYourService />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
