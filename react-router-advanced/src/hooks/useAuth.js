// src/hooks/useAuth.js
import { useState } from "react";

// A simple custom hook to simulate authentication
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return { isAuthenticated, login, logout };
}
