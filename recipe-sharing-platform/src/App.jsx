import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import RecipeDetail from "./components/RecipeDetail";
import AddRecipeForm from "./components/AddRecipeForm";

export default function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold hover:text-blue-200 transition-colors"
          >
            Recipe Sharing Platform
          </Link>
          <div className="space-x-4">
            <Link
              to="/"
              className="hover:text-blue-200 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/add"
              className="hover:text-blue-200 font-medium transition-colors"
            >
              Add Recipe
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6 bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/add" element={<AddRecipeForm />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-4 text-center mt-8">
        <p className="text-sm">
          © {new Date().getFullYear()} Recipe Sharing Platform. All rights
          reserved.
        </p>
      </footer>
    </Router>
  );
}
