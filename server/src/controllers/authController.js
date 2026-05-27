import {
  registerService,
  loginService,
} from "../services/authService.js";

// register user (response)
export const registerUser = async (req, res) => {
  try {

    const {
      first_name,
      last_name,
      email,
      password,
      role,
    } = req.body;

    // validation
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const result = await registerService({
      first_name,
      last_name,
      email,
      password,
      role,
    });

    res.status(201).json(result);

  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// login user (response)
export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const result = await loginService({
      email,
      password,
    });

    res.status(200).json(result);

  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};