"use client";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

export default function ImageCropper({ image, onCropDone, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Convert canvas to cropped image blob
  const getCroppedImg = async () => {
    const img = document.createElement("img");
    img.src = image;
    await new Promise((resolve) => (img.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    });
  };

  const handleCropDone = async () => {
    const croppedImageBlob = await getCroppedImg();
    onCropDone(croppedImageBlob);
  };

  return (
    <div className="absolute w-full p-2 lg:left-[35%] lg:w-[50%]  h-[500px] bg-black z-10">
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={1} // 1:1 ratio
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
      />
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
        <button onClick={handleCropDone} className="bg-green-500 text-white px-4 py-2 rounded">
          Done
        </button>
        <button onClick={onCancel} className="bg-red-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
}
