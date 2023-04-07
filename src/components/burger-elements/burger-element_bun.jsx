import React, {useMemo} from "react";
import PropTypes from "prop-types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-element.module.css";
import { DataType } from "../../utils/dataType";
import { IngredientContext } from "../../services/ingredient-context";
import { ConstructorIngredients } from "../../services/constructor-ingredients";

export default function BurgerBun({ data, type, isLocked, hideIco }) {
  //const data = React.useContext(IngredientContext);
  //const ingredients = data.find((ingr) => ingr.type === type);

  return (
      <div className={styles.ingredient_container}>
        <div className={hideIco}>
          <DragIcon type="primary" />
        </div>
        {data && (
          <ConstructorElement
            type={type}
            isLocked={isLocked}
            text={data.name}
            price={data.price}
            thumbnail={data.image}
          />
        )}
      </div>
  );
}

BurgerBun.propTypes = {
  data: PropTypes.arrayOf(DataType.isRequired).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  hideIco: PropTypes.string,
};