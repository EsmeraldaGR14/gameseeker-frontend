import Axios from "./Axios";

async function getAllUsers() {
  try {
    const response = await Axios.get("/users/get-all-users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    throw error;
  }
}

async function getUserById(id) {
  try {
    const response = await Axios.get(`/users/get-user-by-id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
}

async function loginUser(userData) {
  try {
    const response = await Axios.post("/users/login", userData);
    return response.data;
  } catch (error) {
    console.error("Error logging user in", error);
    throw error;
  }
}

async function addUser(userData) {
  try {
    const response = await Axios.post("/users/add-user", userData);
    return response.data;
  } catch (error) {
    console.error("Error adding user", error);
    throw error;
  }
}

async function updateUserEmail(id, email) {
  try {
    const response = await Axios.put(
      `/users/update-user-email/${id}`,
      email
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error updating user's email", error);
    throw error;
  }
}

async function updateUserPassword(id, password) {
  try {
    const response = await Axios.put(
      `/users/update-user-password/${id}`,
      password
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user's password", error);
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const response = await Axios.delete(`/users/delete-user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user", error);
    throw error;
  }
}

export { getAllUsers, loginUser, updateUserEmail, updateUserPassword, addUser, deleteUser, getUserById };