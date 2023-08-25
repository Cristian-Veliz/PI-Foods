import {
    GET_ALL_RECIPES
}from './actions/actionsTypes';


//Creo mi estado inicial
const inicialState = {
    allRecipes: [],

};


export default function reducer(state = inicialState, { type, payload }) {
switch(type) {
    case GET_ALL_RECIPES:
    return {
        ...state,
        allRecipes: payload,
    }
    default:
        return{...state};
}
}