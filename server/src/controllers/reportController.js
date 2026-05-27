import { createReportService } from "../services/reportService.js";

// create reports and report_items (response)
export const createReport = async (req, res) => {
  try {
    const { room_id, created_by, defects } = req.body;

    const result = await createReportService({
      room_id,
      created_by,
      defects,
    });
    
    res.json(result);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};