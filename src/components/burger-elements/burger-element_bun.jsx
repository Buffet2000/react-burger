import React from "react";
import PropTypes from "prop-types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-element.module.css";
import { useSelector } from "react-redux";

export default function BurgerBun({ containerType, isLocked, hideIco, nameType }) {

  const allIngredients = useSelector((store) => store.ingredients.items);
  const defaultBun = allIngredients.find(item => item.name = "Краторная булка N-200i");
  const buns = useSelector((store) => store.constructorIngredients.buns);

  return (
      <div className={styles.ingredient_container}>
        <div className={hideIco}>
          <DragIcon type="primary" />
        </div>
        {buns.length === 0 ?
          <ConstructorElement
            type={containerType}
            isLocked={isLocked}
            text={`${defaultBun.name} ${nameType}`}
            price={defaultBun.price}
            thumbnail={defaultBun.image}
          /> : 
          <ConstructorElement
            type={containerType}
            isLocked={isLocked}
            text={`${buns[0].name} ${nameType}`}
            price={buns[0].price}
            thumbnail={buns[0].image}
          />
        }
      </div>
  );
}

BurgerBun.propTypes = {
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  hideIco: PropTypes.string,
  nameType: PropTypes.string,
};