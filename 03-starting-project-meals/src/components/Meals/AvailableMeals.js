import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card"
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-http-5fac6-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
      if (!response.ok) {
        throw new Error('failed to fetch');
      }
      const data =  await response.json();

      const mealsData = [];
      for (const key in data) {
        mealsData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        })
      }
      setMeals(mealsData);
      setIsLoading(false);

    }
    fetchMeals().catch((e) => {
      setIsLoading(false);
      setIsError(e.message);
    })
  }, []);

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>{isError}</p>
  }

  const mealsView = meals.map(meal => <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />);

  return <section className={classes.meals}>
    <Card>
      <ul>{mealsView}</ul>
    </Card>
  </section>
};

export default AvailableMeals;