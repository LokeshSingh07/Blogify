import { encodeBase64 } from "hono/utils/encode";

export async function uploadToCloudinary(image: File, env: { CLOUDINARY_CLOUD_NAME: string; CLOUDINARY_UPLOAD_PRESET: string }) {
  try {
    if (!image) {
      throw new Error("No image uploaded");
    }

    // Convert image to Base64
    const byteArrayBuffer = await image.arrayBuffer();
    const base64 = encodeBase64(byteArrayBuffer);

    // Cloudinary Upload API URL
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`;

    // Prepare FormData
    const formData = new FormData();
    formData.append("file", `data:${image.type};base64,${base64}`); // Preserve MIME type
    formData.append("upload_preset", env.CLOUDINARY_UPLOAD_PRESET); // Unsigned preset

    // Upload to Cloudinary
    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    const results:{secure_url:string} = await response.json();
    return results?.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return { error: "Image upload failed" };
  }
}
