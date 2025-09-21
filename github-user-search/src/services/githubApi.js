import axios from "axios";

const API_BASE_URL = "https://api.github.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY || ""}`,
  },
});

export const searchUser = async (username) => {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
