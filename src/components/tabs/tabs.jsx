import React from "react";
import styles from "./tabs.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Tabs() {
  const [current, setCurrent] = React.useState("one");
  return (
    <div className={styles.ingredient_tabs}>
      <Tab value="one" active={current === "one"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === "two"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === "three"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}
