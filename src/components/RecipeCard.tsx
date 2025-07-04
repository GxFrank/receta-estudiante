import React from 'react';
import { Link } from 'react-router-dom';
import type { Recipe } from '../types/Recipe';
import { useRecipes } from '../hooks/useRecipes';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { isFavorito, addToFavoritos, removeFromFavoritos } = useRecipes();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorito(recipe.id)) {
      removeFromFavoritos(recipe.id);
    } else {
      addToFavoritos(recipe.id);
    }
  };

  const getDificultadEmoji = (dificultad: string) => {
    switch (dificultad) {
      case 'fácil': return '🟢';
      case 'medio': return '🟡';
      case 'difícil': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="recipe-card">
      <div className="recipe-image-container">
        <img 
          src={recipe.imagen} 
          alt={recipe.nombre}
          className="recipe-image"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-recipe.svg';
          }}
        />
        <button 
          className="favorite-btn"
          onClick={handleFavoriteClick}
        >
          {isFavorito(recipe.id) ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.nombre}</h3>
        
        <div className="recipe-meta">
          <span className="recipe-time">⏱️ {recipe.tiempo} min</span>
          <span className="recipe-difficulty">
            {getDificultadEmoji(recipe.dificultad)} {recipe.dificultad}
          </span>
          <span className="recipe-portions">👥 {recipe.porciones}</span>
        </div>
        
        <div className="recipe-category">
          <span className="category-tag">{recipe.categoria}</span>
        </div>
        
        <div className="recipe-rating">
          <span className="rating-stars">
            {'⭐'.repeat(Math.floor(recipe.valoracion))}
          </span>
          <span className="rating-number">{recipe.valoracion}</span>
        </div>
        
        <Link to={`/receta/${recipe.id}`} className="recipe-link">
          Ver Receta Completa
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;