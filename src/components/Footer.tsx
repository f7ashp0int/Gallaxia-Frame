import { Button } from "./ui/button";
import { DollarSign } from "lucide-react";
import creatorLogo from "@/assets/creator-logo.png";

export const Footer = () => {
  return (
    <footer className="fixed bottom-6 left-6 right-6 flex items-center justify-between">
      <Button variant="outline" size="lg" className="gap-2">
        <DollarSign className="w-4 h-4" />
        Donate
      </Button>
      
      <div className="flex items-center gap-3 text-foreground">
        <span>Follow the creator on X</span>
        <a
          href="https://x.com/itsf7ash"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img 
            src={creatorLogo} 
            alt="Creator Logo" 
            className="w-8 h-8 rounded-lg"
          />
          <span className="text-primary font-medium">itsf7ash</span>
        </a>
      </div>
    </footer>
  );
};
