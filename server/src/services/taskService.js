import supabase from "../config/supabase.js";

// get my tasks
export const getMyTasks = async (workerId) => {
  const { data, error } = await supabase
    .from("room_assignment_workers")
    .select(`
      id,
      status,
      note,
      assignment_id,
      room_assignment:assignment_id (
        report_id,
        room_id
      )
    `)
    .eq("worker_id", workerId)
    .in("status", ["pending", "accepted", "in_progress", "waiting_approval"]) // optional filter

  if (error) throw error;

  return data;
};