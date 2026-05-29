import cloudinary from "../config/cloudinary.js";
import supabase from "../config/supabase.js";

// REPORT DEFECT

// upload image service report_item_images
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

// MY TASKS

// upload worker image submission
export const submitWorkerTaskWithImageService = async ({
  file,
  assignment_worker_id,
  notes,
}) => {
  if (!file) {
    throw new Error("No image uploaded");
  }

  // 1. convert to base64
  const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

  // 2. upload to cloudinary
  const uploadResult = await cloudinary.uploader.upload(base64, {
    folder: "worker-tasks",
  });

  // 3. insert submission into DB
  const { data, error } = await supabase
    .from("worker_task_submissions")
    .insert([
      {
        assignment_worker_id,
        notes,
        image_url: uploadResult.secure_url,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);

  // 4. update worker status → completed
  const { error: workerError } = await supabase
    .from("room_assignment_workers")
    .update({ status: "completed" })
    .eq("id", assignment_worker_id);

  if (workerError) throw new Error(workerError.message);

  // 5. update assignment → on_review
  const { data: workerRow, error: fetchError } = await supabase
    .from("room_assignment_workers")
    .select("assignment_id")
    .eq("id", assignment_worker_id)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  await supabase
    .from("room_assignments")
    .update({ status: "on_review" })
    .eq("id", workerRow.assignment_id);

  return {
    message: "Task submitted with image successfully",
    data,
  };
};