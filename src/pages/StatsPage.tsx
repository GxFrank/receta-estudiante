import React from 'react';
import { useRecipes } from '../hooks/useRecipes';

const StatsPage: React.FC = () => {
  const { recetas } = useRecipes();

  const totalRecetas = recetas.length;

  const recetasPorCategoria = recetas.reduce((acc, receta) => {
    acc[receta.categoria] = (acc[receta.categoria] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recetaMasPopular = recetas.reduce((max, receta) => 
    receta.valoracion > max.valoracion ? receta : max
  , recetas[0] || { nombre: 'N/A', valoracion: 0 });

  return (
    <div className="stats-page">
      <div className="page-header">
        <h1 className="page-title">📊 Estadísticas</h1>
        <p className="page-subtitle">
          Información resumida sobre las recetas
        </p>
      </div>

      <div className="stats-cards">
        
        <div className="stat-card">
          <h3>Total de Recetas</h3>
          <p className="stat-number">{totalRecetas}</p>
        </div>

        <div className="stat-card">
          <h3>Receta Más Popular</h3>
          <p className="stat-text">{recetaMasPopular.nombre}</p>
          <p className="stat-detail">⭐ {recetaMasPopular.valoracion}</p>
        </div>

        <div className="stat-card categories">
          <h3>Recetas por Categoría</h3>
          {Object.entries(recetasPorCategoria).map(([categoria, cantidad]) => (
            <div key={categoria} className="category-stat">
              <span>{categoria}:</span>
              <span>{cantidad}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsPage;