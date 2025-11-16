import { Button } from "./ui/button";
import { DollarSign } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="fixed bottom-6 left-6 right-6 flex items-center justify-between">
      <Button variant="outline" size="lg" className="gap-2">
        <DollarSign className="w-4 h-4" />
        Donate
      </Button>
      
      <div className="flex items-center gap-2 text-foreground">
        <span>Follow the creator on X</span>
        <a
          href="https://x.com/f7ash"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-current"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          f7ash
        </a>
      </div>
    </footer>
  );
};
