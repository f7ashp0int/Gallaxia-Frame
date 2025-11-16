import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { ImagePreview } from "@/components/ImagePreview";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setUploadedImage(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Upload Box */}
        <div className="aspect-square bg-card border border-border rounded-[var(--radius)] p-8">
          <ImageUpload onImageUpload={handleImageUpload} />
        </div>

        {/* Preview Box */}
        <div className="aspect-square bg-card border border-border rounded-[var(--radius)] p-8">
          <ImagePreview uploadedImage={uploadedImage} onReset={handleReset} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
