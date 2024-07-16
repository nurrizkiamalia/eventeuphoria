"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import useEvent from "@/hooks/useEvent";
import ConfirmationDialog from "../ConfirmationDialog";

interface UploadImageProps {
  eventId: number;
  isUpdate?: boolean;
}

const UploadImage: React.FC<UploadImageProps> = ({ eventId, isUpdate = false }) => {
  const [image, setImage] = useState<File | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { uploadImage, loading, error } = useEvent();
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

      if (acceptedTypes.includes(selectedFile.type)) {
        setImage(selectedFile);
      } else {
        alert("Please upload a valid image file (jpeg, png, webp, jpg).");
        e.target.value = ""; // Reset the input value
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (image) {
      setShowConfirmation(true);
    } else {
      alert("Please select an image to upload.");
    }
  };

  const handleConfirm = async () => {
    if (image) {
      const result = await uploadImage(eventId, image, isUpdate ? 'PUT' : 'POST');
      if (result) {
        alert(`Image ${isUpdate ? 'updated' : 'uploaded'} successfully!`);
        router.push(`/dashboard/my-event`);
      } else {
        alert(`Failed to ${isUpdate ? 'update' : 'upload'} image. Please try again.`);
      }
    }
    setShowConfirmation(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      <input type="file" onChange={handleImageChange} accept="image/*" className="p-2 border rounded" />
      <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
        {isUpdate ? 'Update Image' : 'Upload Image'}
      </Button>

      {showConfirmation && (
        <ConfirmationDialog
          isOpen={showConfirmation}
          onConfirm={handleConfirm}
          onClose={() => setShowConfirmation(false)}
          title={`Confirm ${isUpdate ? 'Update' : 'Upload'}`}
          message={`Are you sure you want to ${isUpdate ? 'update' : 'upload'} this image?`}
        />
      )}

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default UploadImage;
