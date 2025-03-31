
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const BannedUserScreen = () => {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
          <LogOut className="h-10 w-10 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900">Account Suspended</h1>
        
        <div className="space-y-4 text-gray-500">
          <p>
            We regret to inform you that your account has been suspended due to a violation of our terms of service.
          </p>
          <p>
            If you believe this is a mistake, please contact our support team at <a href="mailto:support@auctionverse.com" className="text-auction-purple hover:underline">support@auctionverse.com</a>
          </p>
        </div>
        
        <div className="pt-4">
          <Button 
            onClick={logout}
            className="w-full"
            variant="outline"
          >
            Sign Out
          </Button>
        </div>
        
        <p className="text-xs text-gray-400 pt-2">
          Account ID: {user?.id}
        </p>
      </div>
    </div>
  );
};

export default BannedUserScreen;
