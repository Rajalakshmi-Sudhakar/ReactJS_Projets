//import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { fetchAvailableFood } from "../http.js";

export default function AvailableFood({ onAddToCart }) {
  const {
    isFetching,
    error,
    fetchedData: availableFoods,
    setFetchedData,
  } = useFetch(fetchAvailableFood, []);
  console.log("fetched data:", availableFoods);

  if (error) {
    return <p>An error occoured {error.message}</p>;
  }

  return (
    <section>
      {isFetching && <p>Fetching Food Data</p>}
      {!isFetching && availableFoods.length === 0 && <p>No Foods Available</p>}
      {!isFetching && availableFoods.length > 0 && (
        <ul id="meals">
          {availableFoods.map((food) => (
            <li key={food.id} className="meal-item">
              <article>
                <img
                  src={`http://localhost:3000/${food.image}`}
                  alt={`${food.name} image`}
                />
                <h3>{food.name}</h3>
                <p className="meal-item-description ">{food.description}</p>
                <p className="meal-item-price">{`$${food.price}`}</p>
                <p className="meal-item-actions">
                  <button onClick={() => onAddToCart(food)}>Add to Cart</button>
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
