import React, { useEffect, useState } from 'react';
import { addToDb, getDb } from '../../utilities/addToInternalStorage';
import Meal from '../Meal/Meal';
import './MealArea.css'

const MealArea = () => {
    const [meals, setMeal] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState([]);
    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=a')
            .then(res => res.json())
            .then(data => {
                setMeal(data.meals);
                console.log(data.meals);
            });
    }, [])
    useEffect(() => {
        if (meals.length !== 0) {
            const internalLoadedItem = [];
            const saveItem = getDb();
            for (const mealId in saveItem) {
                const mathchMeal = meals.find(meal => meal.idMeal === mealId);
                console.log(mathchMeal);
                const quantity = saveItem[mealId];
                mathchMeal.quantity = quantity;
                internalLoadedItem.push(mathchMeal);
            }
            setSelectedMeal(internalLoadedItem);

        }

    }, [meals]);


    const clickHandler = (meal) => {

        // let newSelectedMeal = [...selectedMeal];
        // !meals.find(ml => ml.idMeal === meal.id
        if (!meal.quantity) {
            meal.quantity = 1;
            const newSelectedMeal = [...selectedMeal, meal];
            setSelectedMeal(newSelectedMeal);
        } else {
            meal['quantity'] = meal['quantity'] + 1;
        }


        // console.log(newSelectedMeal);
        addToDb(meal.idMeal);
    }

    const totalQuantity = selectedMeal.reduce((preavious, ml) => preavious + ml.quantity, 0);

    return (
        <div className="meal-area">

            <div className="meals-contianer">
                {/* <h1>THis is Meal area {meals.length}</h1> */}
                {
                    meals.map(meal => <Meal
                        key={meal.idMeal}
                        meal={meal}
                        clickHandler={clickHandler}
                    >
                    </Meal>)
                }
            </div>
            <div className="meal-selected">
                <h2>Meal Selected Area</h2>
                <h2>Meal Selected: {totalQuantity}</h2>
                {selectedMeal.map(meal => <h4 key={meal.idMeal}>{
                    meal.strMeal
                }: {meal.quantity}</h4>)}
            </div>
        </div>
    );
};

export default MealArea;