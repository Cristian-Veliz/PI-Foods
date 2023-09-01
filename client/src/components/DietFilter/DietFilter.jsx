import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByDiet } from '../../redux/actions/actions'; 
import style from './DietFilter.module.css';

const DietFilter = () => {
  const dispatch = useDispatch();
  const allDiets = useSelector(state => state.allDiets); 
  const [selectedDiet, setSelectedDiet] = useState('all');

  const handleDietChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDiet(selectedValue);
    dispatch(filterByDiet(selectedValue));
  };

  return (
    <div className={style.container}>
      <span className={style.title}>Filter by Diet:</span>
      <select className={style.select} value={selectedDiet} onChange={handleDietChange}>
        <option value="all">All Diets</option>
        {allDiets.map((diet) => (
          <option key={diet} value={diet}>
            {diet}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DietFilter;
