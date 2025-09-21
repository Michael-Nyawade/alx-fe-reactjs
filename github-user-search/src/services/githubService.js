import axios from "axios";

const API_BASE_URL = "https://api.github.com";

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Advanced search with filters
export const searchUsers = async ({ username, location, minRepos }) => {
  try {
    // Build query string
    let query = username ? `${username}` : "";
    if (location) query += `+location:${location}`;
    if (minRepos) query += `+repos:>=${minRepos}`;

    const response = await axios.get(`${API_BASE_URL}/search/users?q=${query}`);
    return response.data.items; // list of users
  } catch (error) {
    throw error;
  }
};
