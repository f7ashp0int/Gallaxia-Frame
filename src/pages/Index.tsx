import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { ImagePreview } from "@/components/ImagePreview";
import { Footer } from "@/components/Footer";
import creatorLogo from "@/assets/creator-logo.png";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      {/* Logo Header */}
      <div className="fixed top-8 right-8">
        <img 
          src={creatorLogo} 
          alt="Site Logo" 
          className="w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-2xl shadow-primary/20"
        />
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Box */}
        <div className="aspect-square bg-card border border-border rounded-[var(--radius)] p-8">
          <ImageUpload onImageUpload={handleImageUpload} />
        </div>

        {/* Preview Box */}
        <div className="aspect-square bg-card border border-border rounded-[var(--radius)] p-8">
          <ImagePreview uploadedImage={uploadedImage} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
