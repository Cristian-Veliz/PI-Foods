import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets } from "../../redux/actions/actions";
import { useHistory } from 'react-router-dom';


import style from "./Form.module.css";

export default function CreateRecipe() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDiets());
  }, [dispatch]);

  const diets = useSelector((state) => state.allDiets);

  const [form, setForm] = useState({
    name: "",
    image: "",
    summary: "",
    healthScore: "",
    steps: "",
    diets: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    summary: "",
    healthScore: "",
    steps: "",
    image: "",
    diets: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setForm((form) => ({
      ...form,
      [name]: value,
    }));
    setErrors((errors) => ({
      ...errors,
      [name]: "", // Clear the error message when the input changes
    }));
  };

  const changeHandlerDiets = (event) => {
    const value = event.target.value;
    if (!form.diets.includes(value)) {
      setForm((form) => ({
        ...form,
        diets: [...form.diets, value],
      }));
    } else {
      const updatedDiets = form.diets.filter((diet) => diet !== value);
      setForm((form) => ({
        ...form,
        diets: updatedDiets,
      }));
    }
    setErrors((errors) => ({
      ...errors,
      diets: "", // Clear the error message when the diets selection changes
    }));
  };

  const validateForm = (formData) => {
    const errors = {
      name: formData.name.length < 1 ? "Name is required" : /^[a-zA-Z\s]*$/.test(formData.name) ? "" : "Name can only contain letters and spaces",
      summary: formData.summary.length < 1 ? "Summary is required" : "",
      healthScore:
        formData.healthScore.length < 1 || isNaN(formData.healthScore)
          ? "Health Score must be a number"
          : formData.healthScore < 0 || formData.healthScore > 100
          ? "Health Score must be between 0 and 100"
          : "",
      steps: formData.steps.length < 1 ? "Steps are required" : "",
      image:
        formData.image.length < 1 ||
        !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(formData.image)
          ? "Valid image URL is required"
          : "",
      diets:
        formData.diets.length < 1 ? "At least one diet must be selected" : "",
    };
    return errors;
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    // Validate the form before submitting
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).some((key) => validationErrors[key])) {
      setErrors(validationErrors);
    } else {
      try {
        await axios.post("http://localhost:3001/recipes", form);
        alert('Recipe Created!')
      history.push("/home");
      } catch (error) {
        alert("Failed to create Recipe");
      }
    }
  };

  return (
    <div className={style.bigDiv}>
      <div className={style.container}>
        <form onSubmit={submitHandler}>
          <h1> 👨‍🍳 Create Recipe Favorite 👨‍🍳</h1>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={changeHandler}
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
              onChange={changeHandler}
            />
            {errors.image && <p className={style.error}>{errors.image}</p>}
          </div>
  
          <div>
            <label htmlFor="summary">Summary:</label>
            <textarea
              id="summary"
              name="summary"
              value={form.summary}
              onChange={changeHandler}
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
              onChange={changeHandler}
            />
            {errors.healthScore && <p className={style.error}>{errors.healthScore}</p>}
          </div>
  
          <div>
            <label htmlFor="steps">Steps:</label>
            <textarea
              id="steps"
              name="steps"
              value={form.steps}
              onChange={changeHandler}
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
                  onChange={changeHandlerDiets}
                />
                <label htmlFor={`diet-${diet.id}`}>{diet.name}</label>
              </span>
            ))}
            {errors.diets && <p className={style.error}>{errors.diets}</p>}
          </div>
  
          <button type="submit">Create Recipe</button>
        </form>
      </div>
    </div>
  );
 }
 