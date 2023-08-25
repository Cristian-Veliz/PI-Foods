import React from 'react';
import { Link } from 'react-router-dom';
import style from '../Card/Card.module.css';

const Card = ({ id, name, image, diets }) => {
  return (
    <div key={id} className={style.container}>
      <div className={style.header}></div>
      {/* <h5 style={{ color: 'black' }}>ID: {id}</h5> */}
      <div>
        <Link to={`/recipes/${id}`}>
          <img src={image} alt={name} />
        </Link>
      </div>
      <div className={style.name}>
        <h3>Name: {name}</h3>
        <div>
          {diets.length === 0 ? (
            <p>No se encontró ningún tipo de dieta 🤔</p>
          ) : (
            <div>
              <h3>Diet Types:</h3>
              <ul className={style.dietTypes}>
                {diets.map((diet, index) => (
                  <li key={index}>{diet}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
