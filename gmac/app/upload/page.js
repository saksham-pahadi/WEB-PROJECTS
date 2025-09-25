"use client";
import { useState } from "react";
import ImageCropper from "@/component/ImageCropper";

export default function UploadPage() {
  const [preview, setPreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setShowCropper(true); // Open cropper immediately
    }
  };

  const handleCropDone = async (croppedBlob) => {
    setLoading(true);

    // Convert blob -> File
    const croppedFile = new File([croppedBlob], "cropped.jpg", { type: "image/jpeg" });
    const formData = new FormData();
    formData.append("file", croppedFile);

    // Upload to Cloudinary
    // const res = await fetch("/api/upload", {
    //   method: "POST",
    //   body: formData,
    // });

    // const data = await res.json();
    setTimeout(() => {
      
      // setImageUrl(data.url);
      setImageUrl(URL.createObjectURL(croppedFile));
      setShowCropper(false);
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="p-6">
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {showCropper && preview && (
        <ImageCropper
          image={preview}
          onCropDone={handleCropDone}
          onCancel={() => setShowCropper(false)}
        />
      )}

      {loading && <p className="mt-4">Uploading...</p>}

      {imageUrl && (
        <div className="mt-4">
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" width={300} />
        </div>
      )}
    </div>
  );
}
