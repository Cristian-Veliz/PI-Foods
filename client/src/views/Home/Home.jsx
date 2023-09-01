import React, { useEffect, useState } from 'react';
import style from '../Home/Home.module.css';
import Loading from '../../assets/loading.gif';
import CardContainer from '../../components/CardContainer/CardContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../../redux/actions/actions';
import SearchBar from '../../components/SearchBar/Searchbar';
import OrderByName from '../../components/OrderByName/OrderByName';
import OrderByScore from '../../components/OrderByHealthScore/OrderByHealthScore';

const diets = [
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Lacto-Vegetarian",
  "Ovo-Vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleolitic",
  "Primal",
  "Whole30",
];

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipes);

  useEffect(() => {
    console.log('El Componente Home se montó');
    dispatch(getAllRecipes());
  }, [dispatch]);

  const [searchRecipe, setSearchRecipe] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('all');

  const handleSearch = (recipe) => {
    console.log('Busqueda por receta:', recipe);
    setSearchRecipe(recipe);
  };

const handleDietFilter = (event) => {
  const selectedValue = event.target.value;
  const cleanedValue = selectedValue.replace(/\W+/g, '').toLowerCase();
  setSelectedDiet(cleanedValue);
};
  const filteredRecipes = allRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchRecipe.toLowerCase())
  );

  const dietFilteredRecipes = selectedDiet === 'all'
    ? filteredRecipes
    : filteredRecipes.filter((recipe) => {
        const recipeDiets = recipe.diets ? recipe.diets.map(diet => diet.toLowerCase().replace(/-/g, '')) : [];
        return recipeDiets.includes(selectedDiet);
      });

  return (
    <div>
      <h1 className={style.orderSelect}>
        🍽️ Explore and Choose Your Favorite Recipe, ¡Bon Appétit! 🍳🍷🍰
      </h1>
      <SearchBar setSearch={handleSearch} />
      <div className={style.orderselect}>
        <OrderByName />
        <OrderByScore />
        <select className={style.select} value={selectedDiet} onChange={handleDietFilter}>
          <option value="all">All Diets</option>
          {diets.map((diet) => (
            <option key={diet} value={diet}>
              {diet}
            </option>
          ))}
        </select>
      </div>
      {allRecipes.length === 0 && (
        <img src={Loading} alt="Loading..." />
      )}
      {dietFilteredRecipes.length === 0 && searchRecipe && (
        alert('❌ Recipe Not found! ❌ ')
      )}
      <CardContainer allRecipes={dietFilteredRecipes.length > 0 ? dietFilteredRecipes : allRecipes} />
    </div>
  );
};


export default Home;
