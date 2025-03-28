
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const CreateAuctionButton = () => {
  return (
    <Button 
      className="bg-auction-purple hover:bg-auction-purple-dark text-white"
    >
      <Plus className="h-5 w-5 mr-2" />
      Create Auction
    </Button>
  );
};

export default CreateAuctionButton;
