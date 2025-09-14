import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Recipe Sharing App</h1>

        <nav style={{ marginBottom: "20px" }}>
          <Link to="/">Home</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddRecipeForm />
                <SearchBar />
                <RecipeList />
              </>
            }
          />
          <Route path="/recipes/:id" element={<RecipeDetailsWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

// Wrapper to extract recipeId from URL params
function RecipeDetailsWrapper() {
  const { id } = useParams();
  return <RecipeDetails recipeId={id} />;
}

export default App;
