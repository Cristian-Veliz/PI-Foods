import React from 'react';
import { Link } from 'react-router-dom';
import style from './CardDb.module.css';

const CardDb = ({ id, name, image, Diets, healthScore, createInDb }) => {

  return (
    <div key={id} className={style.container}>
      <div className={style.header}></div>
      <div>
        <Link to={`/recipes/${id}`}>
          <img className={style.image} src={image} alt={name} />
        </Link>
      </div>
      <div className={style.name}>
        <h3>Name: {name}</h3>
        <h3>Health Score: {healthScore}</h3>
        <div>
          {Diets.length === 0 ? (
            <p>No type of diet was found 🤔</p>
          ) : (
            <div>
              <h3>Diet Types:</h3>
              <ul className={style.dietTypes}>
                {Diets && Diets.map((diet, index) => (
                  <li key={index}>{diet.name.toLowerCase()}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};





export default CardDb;
