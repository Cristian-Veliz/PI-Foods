import {
  GET_ALL_RECIPES,
  GET_ALL_DIETS,
  GET_RECIPES_BY_NAME,
  GET_RECIPES_BY_ID,
  GET_DB_RECIPES_BY_ID,
  CLEAR_DETAIL,
  CLEAR_DB_DETAIL,
  GET_RECIPES_FROM_DB,
  RECIPES_SORT_NAME,
  ORDER_SCORE,
  DIET_FILTER,
  PREV,
  NEXT,
} from "./actions/actionsTypes";

const initialState = {
  allRecipes: [],
  allDiets: [],
  recipesByName: [],
  temporal: [], 
  selectRecipes: null,
  selectDbRecipes: null,
  numPage: 1,
};

export default function reducer(state = initialState, { type, payload }) {
  console.log("Reducer type:", type); // Agregado para depuración
  console.log("Reducer payload:", payload); // Agregado para depuración
  switch (type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        allRecipes: payload,
        temporal: payload, 
      };

    case GET_ALL_DIETS:
      return {
        ...state,
        allDiets: payload,
      };

    case GET_RECIPES_BY_NAME:
      return {
        ...state,
        recipesByName: payload,
      };
    case GET_RECIPES_BY_ID:
      return {
        ...state,
        selectRecipes: payload,
      };
      case GET_DB_RECIPES_BY_ID:
        return {
          ...state,
          selectDbRecipes: payload,
        };

      case GET_RECIPES_FROM_DB:
        const searchRecipe = payload.toLowerCase();
        const dbRecipes = state.temporal.filter(recipe =>
          recipe.name.toLowerCase().includes(searchRecipe)
        );
  
        const combinedRecipes = [
          ...state.recipesByName,
          ...dbRecipes,
        ];
  
        return {
          ...state,
          recipesByName: combinedRecipes,
        };
   
    case CLEAR_DETAIL:
      return {
        ...state,
        selectRecipes: null,
      };
    case CLEAR_DB_DETAIL:
      return {
          ...state,
          selectDbRecipes: null,
       };

    case RECIPES_SORT_NAME:
      const sortedRecipesByName = [...state.allRecipes];
      sortedRecipesByName.sort((a, b) => {
        if (payload === "A") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
      return {
        ...state,
        allRecipes: sortedRecipesByName,
      };

    case ORDER_SCORE:
      const sortedRecipesByScore = [...state.allRecipes];
      if (payload === "asc") {
        sortedRecipesByScore.sort((a, b) => a.healthScore - b.healthScore);
      } else if (payload === "desc") {
        sortedRecipesByScore.sort((a, b) => b.healthScore - a.healthScore);
      }
      return {
        ...state,
        allRecipes: sortedRecipesByScore,
      };

      case DIET_FILTER:
        if (payload === "all") {
          return {
            ...state,
            recipesByName: state.allRecipes, // Restaurar las recetas originales
          };
        }
        const filteredRecipesByDiet = state.allRecipes.filter((recipe) =>
          recipe.diets.includes(payload)
        );
        return {
          ...state,
          recipesByName: filteredRecipesByDiet,
        };
      

    case PREV:
      return {
        ...state,
        numPage: state.numPage - 1,
      };
    case NEXT:
      return {
        ...state,
        numPage: state.numPage + 1,
      };

    default:
      return { ...state };
  }
}
