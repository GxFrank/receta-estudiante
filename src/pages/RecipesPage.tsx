import React, { useState, useMemo } from 'react';
import { useRecipes } from '../hooks/useRecipes';
import RecipeCard from '../components/RecipeCard';
import FilterBar from '../components/FilterBar';

const RecipesPage: React.FC = () => {
  const { 
    recetas,            
    difficultyFilter,
    filterByDifficulty,
    filteredRecipes
  } = useRecipes();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleDifficultyChange = (difficulty: string) => {
    filterByDifficulty(difficulty as 'fácil' | 'medio' | 'difícil' | '');
  };

  const categories = useMemo(() => {
    return Array.from(new Set(filteredRecipes.map(recipe => recipe.categoria)));
  }, [filteredRecipes]);

  const finalFilteredRecetas = useMemo(() => {
    return filteredRecipes.filter(recipe => {
      const matchesSearch = recipe.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        recipe.ingredientes.some(ingrediente =>
          ingrediente.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesCategory = selectedCategory === '' || 
        recipe.categoria === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [filteredRecipes, searchTerm, selectedCategory]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    filterByDifficulty('');
  };

  return (
    <div className="recipes-page">
      <div className="page-header">
        <h1 className="page-title">📖 Todas las Recetas</h1>
        <p className="page-subtitle">
          Descubre recetas deliciosas y fáciles de preparar
        </p>
      </div>

      <FilterBar
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedDifficulty={difficultyFilter}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        onDifficultyChange={handleDifficultyChange}
        categories={categories}
      />

      <div className="results-info">
        <p className="results-count">
          {finalFilteredRecetas.length === recetas.length 
            ? `Mostrando todas las ${recetas.length} recetas`
            : `Mostrando ${finalFilteredRecetas.length} de ${recetas.length} recetas`
          }
        </p>
      </div>

      {finalFilteredRecetas.length === 0 ? (
        <div className="no-results">
          <h3>😔 No se encontraron recetas</h3>
          <p>Intenta cambiar los filtros o términos de búsqueda</p>
          <button 
            onClick={clearAllFilters}
            className="clear-filters-btn"
          >
            Limpiar Todos los Filtros
          </button>
        </div>
      ) : (
        <div className="recipes-grid">
          {finalFilteredRecetas.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipesPage;