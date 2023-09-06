import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../assets/Landing.jpg';
import style from './Landing.module.css';


const Landing = () => {
  return (
    <div className={style.container}>
      <img src={image} alt="LandingImg" className={style.image} />
      <div className={style.content}>
        <h1 style={{ color: "#e55743" }}>WELCOME TO THE FOOD APP</h1>
        <h2 >Explore a world of exquisite flavors that will delight your senses</h2>
        <Link to='/home'>
          <button className={style.button}>Explore Recipes</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
