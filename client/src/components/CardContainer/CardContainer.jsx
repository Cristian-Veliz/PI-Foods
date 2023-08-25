import React from 'react';
import Card from '../Card/card'; 
import styles from '../CardContainer/CardContainer.module.css'

const CardContainer = ({ allRecipes }) => {
    return (
      <div className={styles.cardContainer}> 
        {allRecipes?.map((recipe) => (
          <Card
            key={recipe.id}
            id={recipe.id}
            name={recipe.name}
            image={recipe.image}
            diets={recipe.diets}
          />
        ))}
      </div>
    );
  };
  

export default CardContainer;