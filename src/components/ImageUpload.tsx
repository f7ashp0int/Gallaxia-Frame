import { Upload } from "lucide-react";
import { useRef } from "react";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

export const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onImageUpload(file);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/50 transition-colors rounded-[var(--radius)]"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      <Upload className="w-12 h-12 text-muted-foreground mb-4" />
      <p className="text-xl text-muted-foreground">Upload Image</p>
    </div>
  );
};
