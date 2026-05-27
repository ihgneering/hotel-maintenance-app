import { getMyTasks } from "../services/taskService.js";

// get my tasks
export const fetchMyTasks = async (req, res) => {
  try {
    const workerId = req.user.id; // assuming JWT middleware

    const tasks = await getMyTasks(workerId);

    res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};