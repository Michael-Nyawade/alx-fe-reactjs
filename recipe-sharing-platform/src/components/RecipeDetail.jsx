import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => {
        const foundRecipe = data.find((item) => item.id === parseInt(id));
        setRecipe(foundRecipe);
      })
      .catch((err) => console.error("Error loading recipe:", err));
  }, [id]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading recipe details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">
            {recipe.title}
          </h1>

          <p className="text-gray-700 mb-6">{recipe.summary}</p>

          {/* Example Ingredients Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Ingredients
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Ingredient 1</li>
              <li>Ingredient 2</li>
              <li>Ingredient 3</li>
            </ul>
          </div>

          {/* Example Instructions Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Instructions
            </h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              <li>Step 1: Prepare all ingredients.</li>
              <li>Step 2: Cook according to recipe directions.</li>
              <li>Step 3: Serve and enjoy!</li>
            </ol>
          </div>

          <Link
            to="/"
            className="inline-block mt-6 text-blue-600 font-medium hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
