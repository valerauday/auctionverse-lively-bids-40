
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuctionDetail from "./pages/AuctionDetail";
import CreateAuction from "./pages/CreateAuction";
import MyBids from "./pages/MyBids";
import MyAuctions from "./pages/MyAuctions";
import AuctionAnalytics from "./pages/AuctionAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auction/:id" element={<AuctionDetail />} />
        <Route path="/create-auction" element={<CreateAuction />} />
        <Route path="/my-bids" element={<MyBids />} />
        <Route path="/my-auctions" element={<MyAuctions />} />
        <Route path="/auction-analytics/:id" element={<AuctionAnalytics />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
