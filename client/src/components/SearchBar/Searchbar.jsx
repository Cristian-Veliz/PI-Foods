import React, { useState } from 'react';
import styles from './Searchbar.module.css';
import { useDispatch } from 'react-redux';
import { getRecipesByName, getAllRecipes } from '../../redux/actions/actions';

export default function SearchBar({ setSearch }) {
  const [nameRecipe, setNameRecipe] = useState('');
  const dispatch = useDispatch();

  function handleChange(e) {
    setNameRecipe(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (nameRecipe) {
      dispatch(getRecipesByName(nameRecipe));
      setSearch(nameRecipe);
      setNameRecipe('');
    }
  }
  function handleClickRecipes(e){
    e.preventDefault();
    dispatch(getAllRecipes())
    setSearch('');
  }


  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Enter Recipes name..."
        value={nameRecipe}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
      <button type="submit" onClick={handleClickRecipes}>All Recipes</button>
    </form>
  );
}