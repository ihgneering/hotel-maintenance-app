import supabase from "../config/supabase.js";

// register user (handle SQL)
export const registerService = async ({
  first_name, 
  last_name, 
  email,
  password,
  role,
}) => {

  // signup to supabase authentication
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  // insert into users table
  const { error: userError } = await supabase
    .from("users")
    .insert([
      {
        auth_id: data.user.id,
        first_name,
        last_name,
        email,
        role,
      },
    ]);

  if (userError) {
    throw new Error(userError.message);
  }

  return {
    message: "User registered successfully",
    user: {
      id: data.user.id,
      first_name,
      last_name,
      email,
      role,
    },
  };
};

// login user (handle SQL)
export const loginService = async ({
  email,
  password,
}) => {

  // login to supabase auth
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    throw new Error(error.message);
  }

  // get user profile
  const {
    data: userData,
    error: userError,
  } = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", data.user.id)
    .single();

  if (userError) {
    throw new Error(userError.message);
  }

  return {
    message: "Login successful",
    session: data.session,
    user: userData,
  };
};