import { Button } from "./ui/button";
import { DollarSign, Heart } from "lucide-react";
import creatorLogo from "@/assets/creator-logo.png";

export const Footer = () => {
  return (
    <footer className="w-full mt-12 pb-6">
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center px-6">
        {/* Donate button - Left */}
        <div className="justify-self-start">
          <a
            href="https://idriss.xyz/f7ashp0int"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="gap-2">
              <DollarSign className="w-4 h-4" />
              Donate
            </Button>
          </a>
        </div>

        {/* Made with love - Center */}
        <div className="justify-self-center flex items-center gap-2 text-muted-foreground">
          <span>Made with</span>
          <Heart className="w-4 h-4 fill-primary text-primary" />
          <span>by</span>
          <a
            href="https://x.com/itsf7ash"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img 
              src={creatorLogo} 
              alt="Creator" 
              className="w-6 h-6 rounded"
            />
            <span className="text-primary font-medium">@itsf7ash</span>
          </a>
        </div>

        {/* Logo - Right */}
        <div className="justify-self-end">
          <img 
            src={creatorLogo} 
            alt="Logo" 
            className="w-10 h-10 rounded-lg"
          />
        </div>
      </div>
    </footer>
  );
};
