
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { SheetClose } from "@/components/ui/sheet";

const auctionFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  startingBid: z.coerce.number().positive("Starting bid must be positive"),
  endDate: z.date({
    required_error: "End date is required",
  }).refine((date) => date > new Date(), {
    message: "End date must be in the future",
  })
});

type AuctionFormValues = z.infer<typeof auctionFormSchema>;

const AuctionForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<AuctionFormValues>({
    resolver: zodResolver(auctionFormSchema),
    defaultValues: {
      title: "",
      description: "",
      startingBid: 0,
    }
  });

  const onSubmit = async (data: AuctionFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would send data to a backend
      console.log("Creating new auction:", data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Auction created successfully",
        description: `"${data.title}" has been listed for auction.`,
      });
      
      // Reset form
      form.reset();
      
      // Close the sheet after successful submission
      document.querySelector<HTMLButtonElement>(".sheet-close-button")?.click();
    } catch (error) {
      toast({
        title: "Error creating auction",
        description: "There was a problem creating your auction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Vintage Watch" {...field} />
              </FormControl>
              <FormDescription>
                A descriptive title for your auction item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="A rare vintage mechanical watch from the 1960s in excellent condition."
                  className="min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Provide details about your item's condition, history, and special features.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="startingBid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Starting Bid</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                  <Input className="pl-7" {...field} type="number" min="1" step="1" />
                </div>
              </FormControl>
              <FormDescription>
                Set the minimum bid for your auction.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Select an end date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                When the auction will automatically end.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-3">
          <SheetClose className="sheet-close-button">
            <Button type="button" variant="outline">Cancel</Button>
          </SheetClose>
          <Button 
            type="submit" 
            className="bg-auction-purple hover:bg-auction-purple-dark text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Auction"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AuctionForm;
