const supabase = require("../config/supabase");

// Create organizer
const createOrganizer = async (organizerData) => {
  try {
    const { data, error } = await supabase
      .from("organizers")
      .insert([
        {
          name: organizerData.name,
          email: organizerData.email,
          phone: organizerData.phone,
          address: organizerData.address,
          city: organizerData.city,
          description: organizerData.description,
          user_id: organizerData.userId,
          verification_status: "pending",
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

// Get all organizers
const getAllOrganizers = async () => {
  try {
    const { data, error } = await supabase.from("organizers").select("*");

    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

// Get organizer by ID
const getOrganizerById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("organizers")
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

// Update organizer
const updateOrganizer = async (id, updateData) => {
  try {
    const { data, error } = await supabase
      .from("organizers")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

// Delete organizer
const deleteOrganizer = async (id) => {
  try {
    const { data, error } = await supabase
      .from("organizers")
      .delete()
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createOrganizer,
  getAllOrganizers,
  getOrganizerById,
  updateOrganizer,
  deleteOrganizer,
};
