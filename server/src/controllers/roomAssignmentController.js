import {
  getWorkersService,
  createRoomAssignmentService,
  getAllRoomAssignmentsService,
  getWorkerTasksService,
  acceptTaskService,
  getTaskDetailService,
  submitWorkerTaskService
} from "../services/roomAssignmentService.js";

// ROOM MATRIX/ASSIGNMENT

// get all workers (response)
export const getWorkers = async (req, res) => {
  try {
    const workers = await getWorkersService();

    res.json(workers);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// get room assignment
export const getAllRoomAssignments = async (req, res) => {
  try {
    const assignments = await getAllRoomAssignmentsService();

    res.json(assignments);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// post room assignment (response)
export const createRoomAssignments = async (req, res) => {
  try {
    const {
      room_id,
      worker_ids,
      assigned_by,
      assigned_date,
    } = req.body;

    const result = await createRoomAssignmentService({
      room_id,
      worker_ids,
      assigned_by,
      assigned_date,
    });

    res.status(201).json({
      message: "Assignment created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// MY TASKS

// patch worker accept task
export const acceptTask = async (req, res) => {
  try {
    const { assignment_worker_id, assignment_id } = req.body;

    const result = await acceptTaskService({
      assignment_worker_id,
      assignment_id,
    });

    res.json({
      message: "Task accepted successfully",
      data: result,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get worker tasks
export const getWorkerTasks = async (req, res) => {
  try {
    const { worker_id } = req.params;

    const tasks =
      await getWorkerTasksService(worker_id);

    res.json(tasks);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// get worker task detail
export const getTaskDetail = async (
  req,
  res
) => {
  try {

    const { assignment_worker_id } =
      req.params;

    const result =
      await getTaskDetailService(
        assignment_worker_id
      );

    res.json(result);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// post worker submission
export const submitWorkerTask = async (req, res) => {
  try {
    const {
      assignment_worker_id,
      notes,
      image_url,
    } = req.body;

    const result =
      await submitWorkerTaskService({
        assignment_worker_id,
        notes,
        image_url,
      });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};