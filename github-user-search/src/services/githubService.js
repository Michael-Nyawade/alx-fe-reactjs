import axios from "axios";

const API_BASE_URL = "https://api.github.com/users";

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
