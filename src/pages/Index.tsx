
import Header from "@/components/Header";
import AuctionCard from "@/components/AuctionCard";
import CreateAuctionButton from "@/components/CreateAuctionButton";
import { auctions } from "@/data/auctions";
import { useState } from "react";

const Index = () => {
  const [displayAuctions, setDisplayAuctions] = useState(auctions);
  const [activeFilter, setActiveFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'All Auctions' },
    { id: 'ending-soon', label: 'Ending Soon' },
    { id: 'active', label: 'Active' }
  ];

  const filterAuctions = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setDisplayAuctions(auctions);
    } else {
      setDisplayAuctions(auctions.filter(auction => auction.status === filter));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Live Auctions</h1>
            <p className="mt-1 text-gray-500">Discover unique items and place your bids</p>
          </div>
          <CreateAuctionButton />
        </div>
        
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => filterAuctions(option.id)}
                  className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                    ${activeFilter === option.id
                      ? 'border-auction-purple text-auction-purple'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  {option.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {displayAuctions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No auctions found. Try a different filter or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        )}
      </main>
      
      <footer className="bg-white mt-16 border-t border-gray-200">
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

export default Index;
