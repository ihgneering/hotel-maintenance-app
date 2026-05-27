import supabase from "../config/supabase.js";

// get rooms db
export const getAllRoomsService = async () => {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .order("room_number", { ascending: true });

  if (error) throw new Error(error.message);

  return data;
};

// get floor from rooms db
export const getRoomsByFloorService = async (floor) => {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("floor", floor)
    .order("room_number", { ascending: true });

  if (error) throw new Error(error.message);

  return data;
};