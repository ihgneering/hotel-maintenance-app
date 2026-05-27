import supabase from "../config/supabase.js";

// create into reports db and report_items db
export const createReportService = async ({
  room_id,
  created_by,
  defects = [],
}) => {
  // insert to reports db
  const { data: report, error: reportError } = await supabase
    .from("reports")
    .insert([{ room_id, created_by }])
    .select()
    .single();

  if (reportError) throw new Error(reportError.message);

  if (!Array.isArray(defects)) {
    throw new Error("Defects must be an array");
  }

  // insert into report_items db 
  const reportItems = defects.map((d) => ({
    report_id: report.id,
    title: d.title,
    defect_type: d.defect_type,
    priority_level: d.priority_level,
  }));

  const {
    data: createdItems,
    error: itemError,
  } = await supabase
    .from("report_items")
    .insert(reportItems)
    .select();

  if (itemError) throw new Error(itemError.message);

  // update room status to DEFECT
  const { error: roomError } = await supabase
    .from("rooms")
    .update({ status: "defect" }) // update status to "defect" in rooms db after submit 
    .eq("id", room_id);

  if (roomError) throw new Error(roomError.message);

  return {
    message: "Report created successfully",
    report,
    report_items: createdItems,
  };
};