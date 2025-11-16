import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { ImagePreview } from "@/components/ImagePreview";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [zoomPercent, setZoomPercent] = useState<number>(100);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Reset no longer removes the image; handled in ImagePreview.
  const handleReset = () => {};

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        {/* Upload Box */}
        <div className="aspect-square bg-card border border-border rounded-[var(--radius)] p-8">
          <ImageUpload onImageUpload={handleImageUpload} />
        </div>

        {/* Preview Box */}
        <div className="flex flex-col gap-2">
          <div className="aspect-square bg-card border border-border rounded-[var(--radius)] p-0">
            <ImagePreview
              uploadedImage={uploadedImage}
              onReset={handleReset}
              onZoomChange={(z) => setZoomPercent(Math.round(z * 100))}
            />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Scroll to zoom • Zoom: {zoomPercent}%
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
