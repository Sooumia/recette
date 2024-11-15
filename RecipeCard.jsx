import React from "react";
const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={recipe.image}
        alt={recipe.label}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{recipe.label}</h2>
        <p className="text-sm text-gray-500 mt-2">
          Calories : {Math.round(recipe.calories)}
        </p>
        <p className="text-sm text-gray-500">
          Temps : {recipe.totalTime || 'N/A'} min
        </p>
        <a
          href={recipe.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Voir la recette
        </a>
      </div>
    </div>
  );
};

export default RecipeCard;
