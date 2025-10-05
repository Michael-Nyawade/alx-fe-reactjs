import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => {
        const selected = data.find((item) => item.id === parseInt(id));
        setRecipe(selected);
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
      <Link
        to="/"
        className="text-blue-600 hover:underline text-sm font-medium mb-6 inline-block"
      >
        ← Back to Home
      </Link>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {recipe.title}
          </h1>

          {/* Ingredients Section */}
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Ingredients
          </h2>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          {/* Instructions Section */}
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Instructions
          </h2>
          <ol className="list-decimal list-inside text-gray-600 space-y-2">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
