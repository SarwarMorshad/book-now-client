import axios from "axios";

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
const IMGBB_API_URL = "https://api.imgbb.com/1/upload";

// Upload image to ImgBB
export const uploadImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("key", IMGBB_API_KEY);

    const response = await axios.post(IMGBB_API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.success) {
      return {
        success: true,
        url: response.data.data.display_url,
        deleteUrl: response.data.data.delete_url,
      };
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    console.error("ImgBB upload error:", error);
    throw error;
  }
};

// Validate image file
export const validateImage = (file) => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file type. Please upload JPG, PNG, WEBP, or GIF.",
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: "File too large. Maximum size is 5MB.",
    };
  }

  return { valid: true };
};
