import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import EditRecipeForm from "./components/EditRecipeForm";
import FavoritesList from "./components/FavoritesList";
import RecommendationsList from "./components/RecommendationsList";
import SearchBar from "./components/SearchBar";

const App = () => {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        {/* Navigation */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "10px" }}>
            Recipes
          </Link>
          <Link to="/favorites" style={{ marginRight: "10px" }}>
            Favorites
          </Link>
          <Link to="/recommendations">Recommendations</Link>
        </nav>

        {/* Global Search */}
        <SearchBar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/edit/:id" element={<EditRecipeForm />} />
          <Route path="/favorites" element={<FavoritesList />} />
          <Route path="/recommendations" element={<RecommendationsList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
