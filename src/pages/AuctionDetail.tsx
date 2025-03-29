
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
import { Clock, ArrowLeft, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { auctions, Auction } from "@/data/auctions";
import PlaceBidForm from "@/components/PlaceBidForm";
import BidLog from "@/components/BidLog";
import AuctionStats from "@/components/AuctionStats";
import { cn } from "@/lib/utils";
import ImageSlideshow from "@/components/ImageSlideshow";
import LinkifiedText from "@/components/LinkifiedText";
import DocumentViewer from "@/components/DocumentViewer";

const AuctionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundAuction = auctions.find(a => a.id === id);
      setAuction(foundAuction || null);
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-skeleton-pulse flex flex-col space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-72 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900">Auction Not Found</h2>
            <p className="mt-2 text-gray-500">The auction you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="mt-6 inline-flex items-center text-auction-purple hover:underline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Auctions
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const timeLeft = formatDistanceToNow(auction.endTime, { addSuffix: false });
  const isEndingSoon = auction.status === 'ending-soon';
  const isUpcoming = auction.status === 'upcoming';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <Link to="/" className="flex items-center text-auction-purple hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Auctions
          </Link>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Auction Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative bg-white rounded-xl overflow-hidden border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <ImageSlideshow images={auction.images} title={auction.title} />
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium",
                  auction.status === 'active' ? "bg-green-100 text-green-800" : 
                  auction.status === 'ending-soon' ? "bg-orange-100 text-orange-800" : 
                  auction.status === 'upcoming' ? "bg-blue-100 text-blue-800" :
                  "bg-gray-100 text-gray-800"
                )}>
                  {auction.status === 'active' ? 'Active' : 
                   auction.status === 'ending-soon' ? `Ends in ${timeLeft}` : 
                   auction.status === 'upcoming' && auction.startTime ? `Starts ${format(auction.startTime, 'MMM d')}` :
                   auction.status === 'upcoming' ? 'Upcoming' :
                   'Ended'}
                </span>
              </div>
              
              {/* Time Left for Ending Soon Auctions */}
              {isEndingSoon && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex items-center text-white">
                    <Clock className={cn("h-5 w-5 mr-2", isEndingSoon && "animate-pulse-slow")} />
                    <span className="font-medium">Ending soon! {timeLeft} left</span>
                  </div>
                </div>
              )}
              
              {/* Info for Upcoming Auctions */}
              {isUpcoming && auction.startTime && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex items-center text-white">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span className="font-medium">
                      Starts {format(auction.startTime, 'MMMM d, yyyy')}
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-xl border border-gray-100 p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{auction.title}</h1>
              
              {/* Seller Information */}
              <div className="flex items-center mb-4">
                <img 
                  src={auction.seller.avatar} 
                  alt={auction.seller.name}
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
                <span className="text-sm text-gray-600">
                  Listed by <span className="font-medium text-auction-purple">{auction.seller.name}</span>
                </span>
              </div>
              
              {/* Auction Stats */}
              <AuctionStats 
                views={auction.views} 
                likes={auction.likes} 
                bids={auction.bidCount} 
              />
              
              {/* Description */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <LinkifiedText 
                  text={auction.description} 
                  className="text-gray-700 whitespace-pre-line" 
                />
              </div>
              
              {/* Documents Section */}
              <DocumentViewer documents={auction.documents} />
            </div>
          </div>
          
          {/* Right Column - Bid Information and Actions */}
          <div className="space-y-6">
            {/* Current Bid Info */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="mb-4">
                <h2 className="text-sm text-gray-500 uppercase">
                  {isUpcoming ? "Starting Bid" : "Current Bid"}
                </h2>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-auction-purple mr-2">
                    {isUpcoming ? formatCurrency(auction.startingBid) : formatCurrency(auction.currentBid)}
                  </span>
                  {!isUpcoming && (
                    <span className="text-gray-500">
                      started at {formatCurrency(auction.startingBid)}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Time Left */}
              <div className="mb-6">
                <h2 className="text-sm text-gray-500 uppercase">
                  {isUpcoming ? "Starts" : "Time Left"}
                </h2>
                <div className="flex items-center">
                  {isUpcoming ? (
                    <>
                      <Calendar className="h-5 w-5 mr-2 text-auction-purple" />
                      <span className="font-medium">
                        {auction.startTime ? format(auction.startTime, 'MMMM d, yyyy') : 'Coming soon'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-5 w-5 mr-2 text-auction-purple" />
                      <span className="font-medium">
                        {formatDistanceToNow(auction.endTime, { addSuffix: true })}
                      </span>
                    </>
                  )}
                </div>
              </div>
              
              {/* Place Bid Form or Notification for Upcoming */}
              {isUpcoming ? (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
                  <p className="text-blue-800 mb-3">This auction hasn't started yet.</p>
                  <button 
                    className="bg-auction-purple hover:bg-auction-purple-dark text-white py-2 px-4 rounded-full text-sm transition-colors w-full"
                  >
                    Get Notified When It Starts
                  </button>
                </div>
              ) : (
                <PlaceBidForm auctionId={auction.id} currentBid={auction.currentBid} />
              )}
            </div>
            
            {/* Bid History */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <BidLog auctionId={auction.id} />
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white mt-16 border-t border-gray-200 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">© 2023 AuctionVerse. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-auction-purple">Terms</a>
              <a href="#" className="text-gray-500 hover:text-auction-purple">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-auction-purple">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuctionDetail;
