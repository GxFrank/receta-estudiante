import { useContext, useState, useMemo } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import type { Recipe } from '../types/Recipe';

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes debe ser usado dentro de un RecipeProvider');
  }

  const [difficultyFilter, setDifficultyFilter] = useState<'fácil' | 'medio' | 'difícil' | ''>('');

  const filterByDifficulty = (difficulty: 'fácil' | 'medio' | 'difícil' | '') => {
    setDifficultyFilter(difficulty);
  };

  const filteredRecipes = useMemo(() => {
    if (!difficultyFilter) {
      return context.recetas; 
    }
    return context.recetas.filter((recipe: Recipe) => recipe.dificultad === difficultyFilter);
  }, [context.recetas, difficultyFilter]);

  return {
    ...context,
    difficultyFilter,
    filterByDifficulty,
    filteredRecipes
  };
};