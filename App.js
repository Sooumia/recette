import React, { useState } from 'react';
import RecipeCard from './component/RecipeCard';

const APP_ID = '19774';
const APP_KEY = '339329abb5a04f8ebb76430e646b1578';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState('');

  const fetchRecipes = async () => {
    if (!search) {
      setError('Veuillez entrer un terme de recherche.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://spoonacular.com/profile/meriemai/settings?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      if (data.hits.length === 0) {
        setError('Aucune recette trouvée.');
      } else {
        setRecipes(data.hits.map((hit) => hit.recipe));
      }
    } catch (err) {
      setError("Une erreur s'est produite lors de la récupération des recettes.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  const sortRecipes = (recipes, option) => {
    if (option === 'calories') {
      return [...recipes].sort((a, b) => a.calories - b.calories);
    } else if (option === 'time') {
      return [...recipes].sort((a, b) => (a.totalTime || Infinity) - (b.totalTime || Infinity));
    }
    return recipes;
  };

  const sortedRecipes = sortRecipes(recipes, sortOption);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 shadow-md">
        <h1 className="text-4xl font-bold text-white text-center">
          Recherche de Recettes
        </h1>
      </header>

      <main className="container mx-auto p-6">
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une recette..."
            className="w-full md:w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
          >
            Rechercher
          </button>
        </form>

        <div className="flex items-center justify-center gap-4 mb-6">
          <label htmlFor="sort" className="font-semibold">
            Trier par :
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Aucun</option>
            <option value="calories">Calories</option>
            <option value="time">Temps de préparation</option>
          </select>
        </div>

        {error && (
          <p className="text-red-600 text-center font-semibold">{error}</p>
        )}

        {loading ? (
          <p className="text-blue-600 text-center font-semibold">
            Chargement des recettes...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {sortedRecipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center mt-8">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Recherche de Recettes. Tous droits
          réservés.
        </p>
      </footer>
    </div>
  );
};

export default App;
