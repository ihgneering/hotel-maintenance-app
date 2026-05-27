import supabase from "../config/supabase.js";

// get all workers role
export const getWorkersService = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "worker")
    .order("first_name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// get assignment
export const getAllRoomAssignmentsService = async () => {
  const { data, error } = await supabase
    .from("room_assignments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};

// create assignment 
export const createRoomAssignmentService = async ({
  room_id,
  worker_ids,
  assigned_by,
  assigned_date,
}) => {
  // 1. create assignment into room_assignment
  const { data: assignment, error } = await supabase
    .from("room_assignments")
    .insert([
      {
        room_id,
        assigned_by,
        assigned_date,
        status: "pending",
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);

  // 2. insert workers into room_assigment_workers
  const workersData = worker_ids.map((id) => ({
    assignment_id: assignment.id,
    worker_id: id,
  }));

  const { error: workerError } = await supabase
    .from("room_assignment_workers")
    .insert(workersData);

  if (workerError) throw new Error(workerError.message);

  return assignment;
};

// get worker tasks 
export const getWorkerTasksService = async (worker_id) => {
  // 1. get worker assignments (get id and status from room_assignment_worker -> then get room_assignment -> and rooms)
  const { data: workerAssignments, error } = await supabase
    .from("room_assignment_workers")
    .select(`
      id,
      status,

      room_assignments (
        id,
        status,
        assigned_date,
        created_at,

        rooms (
          id,
          floor,
          room_number,
          room_category,
          status
        )
      )
    `)
    .eq("worker_id", worker_id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  // 2. attach latest report (get db reports and its report_items)
  const formattedTasks = await Promise.all(
    workerAssignments.map(async (task) => {
      const room =
        task.room_assignments?.rooms;

      if (!room) {
        return task;
      }

      // get latest report for room
      const { data: latestReport } = await supabase
        .from("reports")
        .select(`
          id,
          created_at,

          report_items (
            id,
            title,
            defect_type,
            priority_level
          )
        `)
        .eq("room_id", room.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      return {
        ...task,
        latest_report: latestReport || null,
      };
    })
  );

  return formattedTasks;
};

// worker accept task
export const acceptTaskService = async ({
  assignment_worker_id,
  assignment_id,
}) => {
  // 1. update worker status
  const { error: workerError } = await supabase
    .from("room_assignment_workers")
    .update({ status: "on_progress" })
    .eq("id", assignment_worker_id);

  if (workerError) throw new Error(workerError.message);

  // 2. update assignment status
  const { data, error: assignmentError } = await supabase
    .from("room_assignments")
    .update({ status: "on_progress" })
    .eq("id", assignment_id)
    .select()
    .single();

  if (assignmentError) throw new Error(assignmentError.message);

  return data;
};