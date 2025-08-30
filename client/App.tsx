import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LanguagesPage from "./pages/Languages";
import DemoPage from "./pages/Demo";
import SettingsPage from "./pages/Settings";

const queryClient = new QueryClient();

const AppContent = () => (
  <>
    <Navigation />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/languages" element={<LanguagesPage />} />
      <Route path="/demo" element={<DemoPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider defaultTheme="system" storageKey="liphera-ui-theme">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
