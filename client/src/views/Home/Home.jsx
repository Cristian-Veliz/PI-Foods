import React, { useEffect, useState } from 'react';
import CardContainer from '../../components/CardContainer/CardContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../../redux/actions/actions';
import style from '../../views/Home/Home.module.css'

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipes);
  console.log('Se monta el componente Home', allRecipes);

  useEffect(() => {
    console.log('Se ejecuta useEffect al montar el componente');
    dispatch(getAllRecipes());

  }, [dispatch]);

  return (
    <div>
      <h1 className={style.title}>🍽️ Explore and Choose Your Favorite Recipe, ¡Bon Appétit! 🍳🍷🍰</h1>
      <CardContainer allRecipes={allRecipes} />
    </div>
  );
};

export default Home;

