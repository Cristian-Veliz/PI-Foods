import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { recipesSortName } from '../../redux/actions/actions';
import style from './Order.module.css';

const OrderByName = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(''); // Estado para mantener la opción seleccionada

  const handleChange = (order) => {
    setSelectedOption(order); // Actualiza la opción seleccionada
    if (order === 'A' || order === 'Z') {
      dispatch(recipesSortName(order));
    }
  };

  return (
    <div>
      <label>Sort by Name:     </label>
      <select className={style.selectStyle} onChange={(e) => handleChange(e.target.value)} value={selectedOption}>
        <option value="">Select</option>
        <option value="A">Sort A to Z</option>
        <option value="Z">Sort Z to A</option>
      </select>
    </div>
  );
};

export default OrderByName;

