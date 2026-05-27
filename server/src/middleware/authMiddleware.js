import supabase from "../config/supabase.js";

// verify token based on role
export const verifyToken = async (
  req,
  res,
  next
) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token =
      authHeader.split(" ")[1];

    // verify token
    const { data, error } =
      await supabase.auth.getUser(token);

    if (error) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    // get profile from users table
    const {
      data: userProfile,
      error: profileError,
    } = await supabase
      .from("users")
      .select("*")
      .eq("auth_id", data.user.id)
      .single();

    if (profileError) {
      return res.status(401).json({
        message: "User profile not found",
      });
    }

    req.user = data.user;
    req.userProfile = userProfile;

    next();

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};