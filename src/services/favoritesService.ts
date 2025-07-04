export const favoritesService = {
  getFavorites: (): number[] => {
    try {
      const favorites = localStorage.getItem('favoritos'); 
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error al obtener favoritos:', error);
      return [];
    }
  },

  addFavorite: (recipeId: number): void => {
    try {
      const favorites = favoritesService.getFavorites();
      if (!favorites.includes(recipeId)) {
        const updatedFavorites = [...favorites, recipeId];
        localStorage.setItem('favoritos', JSON.stringify(updatedFavorites)); 
      }
    } catch (error) {
      console.error('Error al agregar favorito:', error);
    }
  },

  removeFavorite: (recipeId: number): void => {
    try {
      const favorites = favoritesService.getFavorites();
      const updatedFavorites = favorites.filter(id => id !== recipeId);
      localStorage.setItem('favoritos', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error al remover favorito:', error);
    }
  }
};