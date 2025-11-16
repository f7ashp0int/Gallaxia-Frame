import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import frameOverlay from "@/assets/frame-overlay.png";
import { Button } from "./ui/button";

interface ImagePreviewProps {
  uploadedImage: string | null;
}

export const ImagePreview = ({ uploadedImage }: ImagePreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [compositeDataUrl, setCompositeDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!uploadedImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    const frame = new Image();

    img.onload = () => {
      // Set canvas size to match the frame
      canvas.width = 1024;
      canvas.height = 1024;

      // Calculate dimensions to fit the image within the canvas
      const size = Math.min(canvas.width, canvas.height);
      const aspectRatio = img.width / img.height;
      
      let drawWidth = size;
      let drawHeight = size;
      
      if (aspectRatio > 1) {
        drawHeight = size / aspectRatio;
      } else {
        drawWidth = size * aspectRatio;
      }

      const x = (canvas.width - drawWidth) / 2;
      const y = (canvas.height - drawHeight) / 2;

      // Draw uploaded image
      ctx.drawImage(img, x, y, drawWidth, drawHeight);

      // Load and draw frame overlay
      frame.src = frameOverlay;
    };

    frame.onload = () => {
      // Draw frame on top
      ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
      
      // Store the composite image
      setCompositeDataUrl(canvas.toDataURL("image/png"));
    };

    img.src = uploadedImage;
  }, [uploadedImage]);

  const handleDownload = () => {
    if (!compositeDataUrl) return;

    const link = document.createElement("a");
    link.download = "framed-image.png";
    link.href = compositeDataUrl;
    link.click();
  };

  if (!uploadedImage) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <img 
          src={frameOverlay} 
          alt="Frame Preview" 
          className="max-w-full max-h-full object-contain opacity-50"
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        className="max-w-full max-h-full object-contain"
      />
      
      {isHovered && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity">
          <Button
            onClick={handleDownload}
            size="lg"
            className="gap-2"
          >
            <Download className="w-5 h-5" />
            Download
          </Button>
        </div>
      )}
    </div>
  );
};
