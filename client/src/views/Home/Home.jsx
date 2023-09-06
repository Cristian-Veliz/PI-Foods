import React, { useEffect, useState } from 'react';
import style from './Home.module.css';
import Loading from '../../assets/loading.gif';
import CardContainer from '../../components/CardContainer/CardContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes, getAllDiets } from '../../redux/actions/actions';
import SearchBar from '../../components/SearchBar/Searchbar';
import OrderByName from '../../components/OrderByName/OrderByName';
import OrderByScore from '../../components/OrderByHealthScore/OrderByHealthScore';
import { dietOptions } from './diet';

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipes);

  useEffect(() => {
    console.log('El Componente Home se montó');
    dispatch(getAllRecipes());
    dispatch(getAllDiets());
  }, [dispatch]);

  const [searchRecipe, setSearchRecipe] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('all');
  const [sortingType, setSortingType] = useState(''); 
  const [recipeSource, setRecipeSource] = useState('all'); 

  const handleSearch = (recipe) => {
    setSearchRecipe(recipe.toLowerCase());
  };

  const handleDietFilter = (event) => {
    const selectedValue = event.target.value;
    setSelectedDiet(selectedValue.toLowerCase());
    setSortingType('');
  };

  const filteredRecipes = allRecipes.filter((recipe) => {
    const recipeDiets = recipe.diets ? recipe.diets.map(diet => diet.toLowerCase()) : [];
    
    if (selectedDiet === 'all') {
      return recipe.name.toLowerCase().includes(searchRecipe);
    } else {
      return (
        recipeDiets.includes(selectedDiet) &&
        recipe.name.toLowerCase().includes(searchRecipe)
      );
    }
  });

  const orderBy = (recipes, type) => {
    const clonedList = [...recipes];
    if (type === 'asc') {
      return clonedList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === 'desc') {
      return clonedList.sort((a, b) => b.name.localeCompare(a.name));
    }
    return clonedList;
  };

  const filteredRecipesBySource = () => {
    switch (recipeSource) {
      case 'db':
        return filteredRecipes.filter((recipe) => recipe.createInDb);
      case 'api':
        return filteredRecipes.filter((recipe) => !recipe.createInDb);
      default:
        return filteredRecipes;
    }
  };

  const sortedRecipesBySource = orderBy(filteredRecipesBySource(), sortingType);

  return (
    <div className={style.homeContainer}>
      <h1 className={style.orderSelect}>
        🍽️ Explore and Choose Your Favorite Recipe, ¡Bon Appétit! 🍳🍷🍰
      </h1>
      <SearchBar setSearch={handleSearch} />
      <div className={style.filtersContainer}>
        <div className={style.divSelect}>
        <OrderByName  onOrderByName={() => setSortingType('asc')} />
        <OrderByScore onOrderByScore={() => setSortingType('desc')} />
        </div>
        <label> Types of Diets: </label>
        <select className={style.selectStyle} value={selectedDiet} onChange={handleDietFilter}>
          <option value="all">All Diets</option>
          {dietOptions && dietOptions.map((diet, index) => (
            <option key={diet} value={diet}>
              {diet}
            </option>
          ))}
        </select>
        <label> Source of Recipes:  </label>
        <select className={style.selectStyle} value={recipeSource} onChange={(event) => setRecipeSource(event.target.value)}>
          <option value="all">All Recipes</option>
          <option value="db">Database Recipes</option>
          <option value="api">API Recipes</option>
        </select>
      </div>
      {allRecipes.length === 0 && (
        <img src={Loading} alt="Loading..." />
      )}
      {sortedRecipesBySource.length === 0 && searchRecipe && (
        <p className={style.errorText}>❌ Recipe Not found! ❌</p>
      )}
      <CardContainer allRecipes={sortedRecipesBySource} />
    </div>
  );
};

export default Home;


