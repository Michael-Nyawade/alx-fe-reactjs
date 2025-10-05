import { useState } from "react";

export default function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim() || !ingredients.trim() || !instructions.trim()) {
      setError("All fields are required.");
      setSuccess(false);
      return;
    }

    const ingredientList = ingredients
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    if (ingredientList.length < 2) {
      setError("Please include at least two ingredients.");
      setSuccess(false);
      return;
    }

    const newRecipe = {
      id: Date.now(),
      title,
      ingredients: ingredientList,
      instructions: instructions
        .split(".")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    console.log("New Recipe Submitted:", newRecipe);
    setError("");
    setSuccess(true);
    setTitle("");
    setIngredients("");
    setInstructions("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add New Recipe
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Recipe Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Recipe Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter recipe title"
            />
          </div>

          {/* Ingredients */}
          <div>
            <label
              htmlFor="ingredients"
              className="block text-gray-700 font-medium mb-2"
            >
              Ingredients (separated by commas)
            </label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              rows="3"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Eggs, Milk, Flour"
            ></textarea>
          </div>

          {/* Instructions */}
          <div>
            <label
              htmlFor="instructions"
              className="block text-gray-700 font-medium mb-2"
            >
              Instructions
            </label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the preparation steps..."
            ></textarea>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm">
              Recipe submitted successfully!
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
}
