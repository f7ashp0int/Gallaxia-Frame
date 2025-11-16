import { useEffect, useRef, useState } from "react";
import { Download, RotateCcw } from "lucide-react";
import frameOverlay from "@/assets/frame-overlay.png";
import { Button } from "./ui/button";

interface ImagePreviewProps {
  uploadedImage: string | null;
  onReset?: () => void;
  onZoomChange?: (zoom: number) => void;
}

export const ImagePreview = ({ uploadedImage, onReset, onZoomChange }: ImagePreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [compositeDataUrl, setCompositeDataUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

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
      
      let drawWidth = size * zoom;
      let drawHeight = size * zoom;
      
      if (aspectRatio > 1) {
        drawHeight = (size / aspectRatio) * zoom;
      } else {
        drawWidth = (size * aspectRatio) * zoom;
      }

      const x = (canvas.width - drawWidth) / 2;
      const y = (canvas.height - drawHeight) / 2;

      // Clear canvas before drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
  }, [uploadedImage, zoom]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((prev) => {
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newZoom = prev + delta;
      const clamped = Math.max(0.5, Math.min(3, newZoom));
      onZoomChange?.(clamped);
      return clamped;
    });
  };

  const handleDownload = () => {
    if (!compositeDataUrl) return;

    const link = document.createElement("a");
    link.download = "framed-image.png";
    link.href = compositeDataUrl;
    link.click();
  };

  const handleReset = () => {
    // Reset zoom to initial state and re-render
    setZoom(1);
    onZoomChange?.(1);
    onReset?.();
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
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative w-full h-full rounded-[var(--radius)] ring-1 ring-border bg-muted/30 overflow-hidden"
        onWheel={handleWheel}
      >
        <canvas ref={canvasRef} className="w-full h-full" />

        {isHovered && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center gap-3 transition-opacity">
            <Button onClick={handleDownload} size="lg" className="gap-2">
              <Download className="w-5 h-5" />
              Download
            </Button>
            <Button onClick={handleReset} size="lg" variant="outline" className="gap-2">
              <RotateCcw className="w-5 h-5" />
              Reset
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
