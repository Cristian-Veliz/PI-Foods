import axios from "axios";
import { GET_ALL_RECIPES,
 } from "./actionsTypes";



//ACTIONS CREATORS

export const getAllRecipes = () => {
  return async (dispatch) => {
    try {
     const response = await axios.get('http://localhost:3001/recipes')   
     dispatch({type: GET_ALL_RECIPES, payload: response.data})
    } catch (error) {
      console.error("Error al intentar mostrar las recetas", error.message);
    }
  };
};
