import React from 'react';
import styles from '../CardContainer/CardContainer.module.css';
import Card from '../Card/card';
import CardDb from '../CardDb/CardDb';
import Paginate from '../Paginate/Paginate';
import { useSelector } from 'react-redux';

const CardContainer = ({ allRecipes }) => {
  const { numPage } = useSelector((state) => state);
  const recipes = allRecipes;
  const cantRecipesPage = 9;

  let desde = (numPage - 1) * cantRecipesPage;
  let hasta = numPage * cantRecipesPage;

  const userCreatedRecipes = recipes.filter((recipe) => !recipe.createInDb);
  const uniqueUserCreatedRecipes = Array.from(new Set(userCreatedRecipes.map((recipe) => recipe.id)))
    .map((id) => userCreatedRecipes.find((recipe) => recipe.id === id));

  let cantPage = Math.ceil(uniqueUserCreatedRecipes.length / cantRecipesPage);

  return (
    <div>
      <div className={`${styles.cardContainer}`}>
        {/* Renderizar las recetas de la base de datos (CardDb) */}
        {recipes.filter((recipe) => recipe.createInDb).map((recipe) => (
          <CardDb
            key={recipe.id}
            id={recipe.id}
            name={recipe.name}
            healthScore={recipe.healthScore}
            image={recipe.image}
            Diets={recipe.Diets.map((diet) => ({ name: diet.name }))}
            createInDb={recipe.createInDb}
          />
        ))}

        {/* Renderizar las recetas únicas creadas por ti (Card) */}
        {uniqueUserCreatedRecipes.slice(desde, hasta).map((recipe) => (
          <Card
            key={recipe.id}
            id={recipe.id}
            name={recipe.name}
            healthScore={recipe.healthScore}
            image={recipe.image}
            diets={recipe.diets}
          />
        ))}
      </div>
      <div>
        <Paginate numPage={numPage} cantPage={cantPage} />
      </div>
    </div>
  );
};

export default CardContainer;
