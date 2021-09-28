import React from 'react';
import './Meal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faInfo, faCartPlus } from '@fortawesome/free-solid-svg-icons'

const Meal = (props) => {
    // console.log(props);
    const { strMeal, strMealThumb, strArea, idMeal } = props.meal;
    return (
        <div onClick={() => { props.clickHandler(props.meal) }} className="meal">
            <img src={strMealThumb} alt="" />
            <h2>{strMeal}</h2>
            <p>Region: {strArea}</p>
            <p>ID: {idMeal}</p>
            <button className="add-to-cart-btn"><FontAwesomeIcon icon={faCartPlus} />Add to Cart</button>
        </div>
    );
};

export default Meal;