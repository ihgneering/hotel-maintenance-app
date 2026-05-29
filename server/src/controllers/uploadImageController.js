import {
  uploadReportImageService,
  submitWorkerTaskWithImageService,
} from "../services/uploadImageService.js";

// REPORT DEFECT

// upload defect image (response)
export const uploadReportImage = async (
  req,
  res
) => {

  try {
    const file = req.file;

    const { report_item_id } = req.body;

    const data =
      await uploadReportImageService({
        file,
        report_item_id,
      });

    res.json({
      message:
        "Image uploaded successfully",
      data,
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });
  }
};

// MY TASKS

// upload worker image submission
export const submitWorkerTaskWithImage = async (req, res) => {
  try {
    const { assignment_worker_id, notes } = req.body;
    const file = req.file;

    const result =
      await submitWorkerTaskWithImageService({
        file,
        assignment_worker_id,
        notes,
      });

    res.status(201).json(result);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};