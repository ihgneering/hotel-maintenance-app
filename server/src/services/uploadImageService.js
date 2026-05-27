import cloudinary from "../config/cloudinary.js";
import supabase from "../config/supabase.js";

// upload image service
export const uploadReportImageService = async ({
  file,
  report_item_id,
}) => {

  if (!file) {
    throw new Error("No file uploaded");
  }

  // convert buffer to base64
  const base64 =
    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

  // upload to cloudinary
  const result =
    await cloudinary.uploader.upload(base64, {
      folder: "hotel-reports",
    });

  // save to database
  const {
    data,
    error,
  } = await supabase
    .from("report_item_images")
    .insert([
      {
        report_item_id,
        image_url: result.secure_url,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};