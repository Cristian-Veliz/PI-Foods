import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { orderByHealthScore } from '../../redux/actions/actions';
import style from './Order.module.css';

const OrderByScore = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(''); // Estado para mantener la opción seleccionada

  const handleChange = (order) => {
    setSelectedOption(order); // Actualiza la opción seleccionada
    if (order === 'asc' || order === 'desc') {
      dispatch(orderByHealthScore(order));
    }
  };

  return (
    <div>
      <label>Sort HealthScore: </label>
      <select className={style.selectStyle} onChange={(e) => handleChange(e.target.value)} value={selectedOption}>
        <option value="">Select</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default OrderByScore;
