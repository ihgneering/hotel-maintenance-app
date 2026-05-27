import {
  uploadReportImageService,
} from "../services/uploadImageService.js";

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