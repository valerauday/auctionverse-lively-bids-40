
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CreateAuctionButton = () => {
  return (
    <Link to="/create-auction">
      <Button 
        className="bg-auction-purple hover:bg-auction-purple-dark text-white"
      >
        <Plus className="h-5 w-5 mr-2" />
        Create Auction
      </Button>
    </Link>
  );
};

export default CreateAuctionButton;
