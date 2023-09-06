import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDiets } from '../../redux/actions/actions';
import { useHistory } from 'react-router-dom';
import style from './Form.module.css';

const CreateRecipe = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.allDiets);

  const [form, setForm] = useState({
    name: '',
    image: '',
    summary: '',
    healthScore: '',
    steps: '',
    diets: [],
  });

  const [errors, setErrors] = useState({
    name: '',
    image: '',
    summary: '',
    healthScore: '',
    steps: '',
    diets: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    dispatch(getAllDiets());
  }, [dispatch]);

  useEffect(() => {
    validateForm(form);
  }, [form]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    validateField(name, value); // Validar en tiempo real al cambiar el valor
  };

  const handleToggleDiet = (value) => {
    setForm((prevForm) => ({
      ...prevForm,
      diets: prevForm.diets.includes(value)
        ? prevForm.diets.filter((diet) => diet !== value)
        : [...prevForm.diets, value],
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      diets: '',
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm(form);

    if (Object.values(validationErrors).every((error) => !error)) {
      try {
        await axios.post('http://localhost:3001/recipes', form);
        alert('Recipe Created!');
        history.push('/home');
      } catch (error) {
        alert('Failed to create Recipe');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (formData) => {
    const errors = {
      name: '',
      image: '',
      summary: '',
      healthScore: '',
      steps: '',
      diets: '',
    };
  
    // Validar el campo "name" si se ha ingresado algún valor
    if (formData.name.trim() !== '') {
      errors.name = validateName(formData.name);
    }
  
    // Validar el campo "image" si se ha ingresado algún valor
    if (formData.image.trim() !== '') {
      errors.image = validateImage(formData.image);
    }
  
    // Validar el campo "summary" si se ha ingresado algún valor
    if (formData.summary.trim() !== '') {
      errors.summary = validateSummary(formData.summary);
    }
  
    // Validar el campo "healthScore" si se ha ingresado algún valor
    if (formData.healthScore.trim() !== '') {
      errors.healthScore = validateHealthScore(formData.healthScore);
    }
  
    // Validar el campo "steps" si se ha ingresado algún valor
    if (formData.steps.trim() !== '') {
      errors.steps = validateSteps(formData.steps);
    }
  
    // Validar el campo "diets" si se ha ingresado algún valor
    if (formData.diets.length > 0) {
      errors.diets = validateDiets(formData.diets);
    }
  
    setErrors(errors);
  
    const isValid = Object.values(errors).every((error) => !error);
    setIsFormValid(isValid);
  
    return errors;
  };
  

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: validateName(value),
        }));
        break;
      case 'image':
        setErrors((prevErrors) => ({
          ...prevErrors,
          image: validateImage(value),
        }));
        break;
      case 'summary':
        setErrors((prevErrors) => ({
          ...prevErrors,
          summary: validateSummary(value),
        }));
        break;
      case 'healthScore':
        setErrors((prevErrors) => ({
          ...prevErrors,
          healthScore: validateHealthScore(value),
        }));
        break;
      case 'steps':
        setErrors((prevErrors) => ({
          ...prevErrors,
          steps: validateSteps(value),
        }));
        break;
      case 'diets':
        setErrors((prevErrors) => ({
          ...prevErrors,
          diets: validateDiets(value),
        }));
        break;
      default:
        break;
    }
  };

  const validateName = (value) => {
    if (value.length > 25) {
      return 'Name cannot exceed 25 characters';
    } else if (/\d/.test(value)) {
      return 'The name cannot contain numbers';
    }
  
    // Usar una expresión regular para verificar si contiene caracteres especiales
    const specialCharactersRegex = /[&%$#!*\/@+\-=]/;
    if (specialCharactersRegex.test(value)) {
      return 'Special characters are not allowed in names';
    }
  
    return '';
  };
  

  const validateImage = (value) => {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|png|gif)$/i;
    if (!regex.test(value)) {
      return 'Valid image URL is required (JPG, PNG, GIF)';
    }
    return '';
  };

  const validateSummary = (value) => {
    if (value.length < 30) {
      return 'Summary must be at least 30 characters';
    }
    if (value.length > 2300) {
      return 'Summary cannot exceed 2300 characters';
    }
    return '';
  };

  const validateHealthScore = (value) => {
    if (isNaN(value)) {
      return 'Health Score must be a number';
    }
    if (value < 0 || value > 100) {
      return 'Health Score must be between 0 and 100';
    }
    return '';
  };

  const validateSteps = (value) => {
    if (value.length < 50) {
      return 'Steps must be at least 50 characters';
    }
    if (value.length > 4000) {
      return 'Steps cannot exceed 4000 characters';
    }
    return '';
  };

  const validateDiets = (value) => {
    if (value.length === 0) {
      return 'At least one diet must be selected';
    }
    return '';
  };

  const areAllRequiredFieldsEmpty = (formData) => {
    return (
      formData.name.trim() === '' &&
      formData.image.trim() === '' &&
      formData.summary.trim() === '' &&
      formData.healthScore.trim() === '' &&
      formData.steps.trim() === '' &&
      formData.diets.length === 0 
    );
  };
  

  return (
    <div className={style.bigDiv}>
      <div className={style.container}>
        <form onSubmit={handleSubmit}>
          <h1>👨‍🍳 Create Recipe Favorite 👨‍🍳</h1>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={() => validateField('name', form.name)}
             
            />
            {errors.name && <p className={style.error}>{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="image">Image:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={form.image}
              onChange={handleChange}
              onBlur={() => validateField('image', form.image)}
             
            />
            {errors.image && <p className={style.error}>{errors.image}</p>}
          </div>

          <div>
            <label htmlFor="summary">Summary:</label>
            <textarea
              id="summary"
              name="summary"
              value={form.summary}
              onChange={handleChange}
              onBlur={() => validateField('summary', form.summary)}
            
            ></textarea>
            {errors.summary && <p className={style.error}>{errors.summary}</p>}
          </div>

          <div>
            <label htmlFor="healthScore">Health Score:</label>
            <input
              type="number"
              id="healthScore"
              name="healthScore"
              value={form.healthScore}
              onChange={handleChange}
              onBlur={() => validateField('healthScore', form.healthScore)}
            
            />
            {errors.healthScore && (
              <p className={style.error}>{errors.healthScore}</p>
            )}
          </div>

          <div>
            <label htmlFor="steps">Steps:</label>
            <textarea
              id="steps"
              name="steps"
              value={form.steps}
              onChange={handleChange}
              onBlur={() => validateField('steps', form.steps)}
           
            ></textarea>
            {errors.steps && <p className={style.error}>{errors.steps}</p>}
          </div>

          <div>
            <label htmlFor="diets">Diets:</label>
            {diets.map((diet, index) => (
              <span key={index}>
                <input
                  type="checkbox"
                  id={`diet-${diet.id}`}
                  name={`diet-${diet.id}`}
                  value={diet.name}
                  onChange={() => handleToggleDiet(diet.name)}
                />
                <label htmlFor={`diet-${diet.id}`}>{diet.name}</label>
              </span>
            ))}
            {errors.diets && <p className={style.error}>{errors.diets}</p>}
          </div>
          <button type="submit" disabled={areAllRequiredFieldsEmpty(form) || !isFormValid}>
          Create Recipe
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;