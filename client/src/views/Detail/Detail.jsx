import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecipesById, clearDetail } from "../../redux/actions/actions";
import Loading from '../../assets/loading.gif';
import style from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.selectRecipes);

  useEffect(() => {
    dispatch(getRecipesById(id));
    return () => dispatch(clearDetail());
  }, [dispatch, id]);

  if (!recipes) {
    return <img src={Loading} alt="Loading..." /> // Manejo cuando no hay información cargada
  }

  console.log("Recipes:", recipes); // Agregado para mostrar la información
  
  return (
    <div key={id} className={style.bigDiv}>
      <div key={id} className={style.container}>
        <div className={style.name}>
          <p>Enjoy this delicious recipe🍴👌!</p>
          <h4>ID: # {recipes.id}</h4>
          <h3>Name: {recipes.name}</h3>
          <img className={style.recipe} src={recipes.image} alt={recipes.name} />
          <h3>Summary: {recipes.summary}</h3>
          <h3>HealthScore 🥗: {recipes.healthScore}</h3>
          <h3>Steps: {recipes.steps}</h3>
          {recipes.diets.length === 0 ? (
            <h3>Diet Types: No type of diet was found. 🤔</h3>
          ) : (
            <div>
              <h3>Diet Types:</h3>
              <ul className={style.dietTypes}>
                {recipes.diets.map((diet, index) => (
                  <li key={index}>{diet}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detail;
