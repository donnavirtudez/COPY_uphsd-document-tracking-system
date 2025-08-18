import React, { useRef, useState } from "react";
import styles from "./modal.module.css"; // 👈 import the CSS module

interface UploadPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (filename: string) => void; // 👈 new callback
}

const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess, // Added missing prop
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); // 👈 Save the file for upload later
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a photo first.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", selectedFile); // Changed from "file" to "profilePicture"

    try {
      const res = await fetch("/api/employee/settings/upload-profile-picture", { // Fixed endpoint
        method: "POST",
        body: formData,
      });

      console.log("Selected file:", selectedFile);

      if (res.ok) {
        const data = await res.json(); // Get full response data
        console.log("Upload API response:", data);
        console.log("Using profilePicture:", data.profilePicture);
        alert("Profile photo updated!");
        onUploadSuccess(data); // Pass full response data like admin system
        onClose(); // Close modal
      } else {
        const err = await res.json();
        alert(`Upload failed: ${err.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong during upload.");
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Upload Photo</h2>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.previewBox}>
          {previewSrc ? (
            <img
              src={previewSrc}
              alt="Preview"
              className={styles.previewImage}
            />
          ) : (
            <p>No photo selected.</p>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        <div className={styles.buttonGroup}>
          <button
            className={styles.change}
            onClick={() => fileInputRef.current?.click()}
          >
            Change
          </button>
          <button className={styles.apply} onClick={handleUpload}>
            Apply Photo
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPhotoModal;
