import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDbRecipesById, clearDbDetail } from "../../redux/actions/actions"; 
import Loading from "../../assets/loading.gif";
import style from "./DetailDb.module.css"; 

const DetailDb = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dbRecipe = useSelector((state) => state.selectDbRecipes);

  useEffect(() => {
    dispatch(getDbRecipesById(id));
    return () => dispatch(clearDbDetail());
  }, [dispatch, id]);

  if (!dbRecipe) {
    return <img src={Loading} alt="Loading..." />; // Manejo cuando no hay información cargada
  }

  console.log("Database Recipe:", dbRecipe); // Agregado para mostrar la información

  return (
    <div key={id} className={style.bigDiv}>
      <div key={id} className={style.container}>
        <div className={style.name}>
          <p>Enjoy this delicious recipe create! 🍴👌</p>
          <h4>ID: # {dbRecipe.id}</h4>
          <h3>Name: {dbRecipe.name}</h3>
          <img
            className={style.recipe}
            src={dbRecipe.image}
            alt={dbRecipe.name}
          />
          <h3>Summary: {dbRecipe.summary}</h3>
          <h3>HealthScore 🥗: {dbRecipe.healthScore}</h3>
          <h3>Steps: {dbRecipe.steps}</h3>
          <h3>Diet Types:</h3>
          <ul className={style.dietTypes}>
            { dbRecipe.Diets && dbRecipe.Diets.map((diet, index) => (
              <li key={index}>{diet.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailDb;
