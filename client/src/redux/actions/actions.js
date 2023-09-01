import axios from "axios";
import { GET_ALL_RECIPES,
  GET_ALL_DIETS,
  GET_RECIPES_BY_NAME,
  GET_RECIPES_BY_ID,
  CLEAR_DETAIL,
  RECIPES_SORT_NAME,
  ORDER_SCORE,
  DIET_FILTER,
  PREV,
  NEXT,
 } from "./actionsTypes";

//const URL = 'http://localhost:3001'; 


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

export function getRecipesByName(name) {
	return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/recipes?name=${name}`)
      dispatch({ type: GET_RECIPES_BY_NAME, payload: response.data });
    } catch (error) {
      console.error("Error al intentar mostrar las recetas por name", error.message);
    }
  }
}


export function getRecipesById(id) {
	return async (dispatch) => {
    try {
      const {data} = await axios.get(`http://localhost:3001/recipes/${id}`)
      dispatch({ type: GET_RECIPES_BY_ID, payload: data });
    } catch (error) {
      console.error("Error al intentar mostrar las recetas por id", error.message);
    }
  }
}

export const getAllDiets = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/diets");
      dispatch({ type: GET_ALL_DIETS, payload: data });
    } catch (error) {
      console.error("Error al intentar mostrar los tipos de dietas", error.message);
    }
  };
};


export function postRecipe(data) {
  return async (dispatch) => {
    try {
      const recipe = await axios.post('http://localhost:3001/recipes', data);
      console.log(recipe); // Esto podría ser útil para depuración
      return recipe.data; // Devuelve la respuesta de la creación de la receta
    } catch (error) {
      console.error("Error al intentar crear la receta", error.message);
      throw error; // Relanza el error para que pueda ser manejado en el componente
    }     
  };
}




export const clearDetail = () => {
  return { type: CLEAR_DETAIL };
};

export function filterByDiet(diet) {
  return {
      type: DIET_FILTER,
      payload: diet
  }
};



export const recipesSortName = (order) => {
return {
  type: RECIPES_SORT_NAME,
  payload: order
 }
}

export const orderByHealthScore = (score) => {
  return {
    type: ORDER_SCORE,
    payload: score
  }
}

export function prev() {
  return {
    type: PREV
  }
};
export function next() {
  return {
    type: NEXT
  }  
};


