"use client";

import { useState, useRef } from "react";
import { Avatar } from "@heroui/avatar";

interface ProfileImageUploadProps {
  currentImage?: string;
  onImageChange: (_file: File | null) => void;
}

export default function ProfileImageUpload({
  currentImage,
  onImageChange,
}: ProfileImageUploadProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(
    currentImage || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran file maksimal 2MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("File harus berupa gambar");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageChange(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center w-full md:w-1/3">
      <div className="relative mb-2">
        <Avatar
          isBordered
          src={previewImage || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-28 h-28"
          showFallback
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className="absolute bottom-1 right-1 bg-gray-700 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-black transition"
        >
          Ubah
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
      <p className="text-xs text-gray-500 text-center">
        Unggah foto profil (max 2MB)
      </p>
    </div>
  );
}
