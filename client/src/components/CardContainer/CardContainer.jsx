import styles from '../CardContainer/CardContainer.module.css';
import Card from '../Card/card';
import Paginate from '../Paginate/Paginate';
import { useSelector } from 'react-redux';

const CardContainer = ({ allRecipes }) => {
const {numPage} = useSelector((state) => state)
const recipes = allRecipes;
const cantRecipesPage = 9;

let desde = (numPage - 1 ) * cantRecipesPage;
let hasta = numPage * cantRecipesPage;

let cantPage = Math.floor(recipes.length / cantRecipesPage) 
const viewsRecipes = recipes?.slice(desde, hasta);

  return (
    <div>
      <div className={`${styles.cardContainer}`}>
        {viewsRecipes?.map((recipe) => (
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
      <Paginate numPage={numPage} cantPage={cantPage}/>
      </div>
    </div>
  );
};

export default CardContainer;
