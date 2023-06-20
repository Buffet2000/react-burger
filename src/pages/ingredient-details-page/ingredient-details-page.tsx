import React, { useEffect } from "react";
import styles from "./ingredient-details-page.module.css";
import { useSelector } from "../../services/types/hooks";
import { useParams } from "react-router-dom";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { FC } from 'react';

export const IngredientDetailsPage: FC = () => {

  const { id } = useParams();
  const itemsLoaded = useSelector((store) => store.ingredients.items);
  const openedIngredient = itemsLoaded.find(item => item._id === id);

  return (
    openedIngredient &&
    <div className={styles.container}>
      <h2 className="text text_type_main-large mt-3 mb-3">Детали ингредиента</h2>
      <IngredientDetails />
    </div>
  );
}
