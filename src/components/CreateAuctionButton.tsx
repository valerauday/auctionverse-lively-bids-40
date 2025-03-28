
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import AuctionForm from "@/components/AuctionForm";
import { TooltipProvider } from "@/components/ui/tooltip";

const CreateAuctionButton = () => {
  return (
    <TooltipProvider>
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            className="bg-auction-purple hover:bg-auction-purple-dark text-white"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Auction
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">Create New Auction</SheetTitle>
          </SheetHeader>
          <AuctionForm />
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
};

export default CreateAuctionButton;
