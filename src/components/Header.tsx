
import { User, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-auction-purple">AuctionVerse</span>
            </Link>
            <nav className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={cn(
                  "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                  currentPath === "/" 
                    ? "border-auction-purple text-gray-900" 
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                Browse
              </Link>
              <Link
                to="/my-bids"
                className={cn(
                  "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                  currentPath === "/my-bids" 
                    ? "border-auction-purple text-gray-900" 
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                My Bids
              </Link>
              <Link
                to="/my-auctions"
                className={cn(
                  "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                  currentPath === "/my-auctions" 
                    ? "border-auction-purple text-gray-900" 
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                My Auctions
              </Link>
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-auction-purple">
                  <User className="h-6 w-6" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500">john.doe@example.com</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Link to="/profile" className="w-full">Profile Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link to="/account" className="w-full">Account</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-auction-purple"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("sm:hidden", mobileMenuOpen ? "block" : "hidden")}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={cn(
              "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
              currentPath === "/"
                ? "bg-auction-purple bg-opacity-10 border-auction-purple text-auction-purple"
                : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            )}
          >
            Browse
          </Link>
          <Link
            to="/my-bids"
            className={cn(
              "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
              currentPath === "/my-bids"
                ? "bg-auction-purple bg-opacity-10 border-auction-purple text-auction-purple"
                : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            )}
          >
            My Bids
          </Link>
          <Link
            to="/my-auctions"
            className={cn(
              "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
              currentPath === "/my-auctions"
                ? "bg-auction-purple bg-opacity-10 border-auction-purple text-auction-purple"
                : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            )}
          >
            My Auctions
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-600" />
              </div>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">John Doe</div>
              <div className="text-sm font-medium text-gray-500">john.doe@example.com</div>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <Link
              to="/profile"
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >
              Profile Settings
            </Link>
            <Link
              to="/account"
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >
              Account
            </Link>
            <button
              className="w-full text-left block px-4 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
