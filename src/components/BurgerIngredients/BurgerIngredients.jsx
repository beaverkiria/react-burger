import burgerIngredientsStyles from "./BurgerIngredients.module.css";
import { useState } from "react";
import {
  INGREDIENT_TYPE_BUN,
  INGREDIENT_TYPE_MAIN,
  INGREDIENT_TYPE_SAUCE,
} from "./types";
import {
  Counter,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import INGREDIENTS_DATA from "../../utils/data";
import BurgerPrice from "../BurgerPrice";

const INGREDIENT_TITLE_MAP = {
  [INGREDIENT_TYPE_BUN]: "Булки",
  [INGREDIENT_TYPE_SAUCE]: "Соусы",
  [INGREDIENT_TYPE_MAIN]: "Начинки",
};
const INGREDIENT_ORDER = [
  INGREDIENT_TYPE_BUN,
  INGREDIENT_TYPE_SAUCE,
  INGREDIENT_TYPE_MAIN,
];

const BurgerIngredientTypes = (props) => {
  return (
    <div style={{ display: "flex" }}>
      {INGREDIENT_ORDER.map((ingredient_type) => (
        <Tab
          active={ingredient_type === props.currentIngredientType}
          value={ingredient_type}
          onClick={props.onIngredientTypeClick}
          key={ingredient_type}
        >
          {INGREDIENT_TITLE_MAP[ingredient_type]}
        </Tab>
      ))}
    </div>
  );
};

const BurgerIngredient = (props) => {
  return (
    <div
      className={burgerIngredientsStyles.burgerIngredient}
      onClick={() => props.onIngredientSelect(props.ingredient)}
    >
      {props.count > 0 && <Counter count={props.count} size="default" />}
      <img
        src={props.ingredient.image}
        className={"pl-4 pr-4"}
        alt={props.ingredient.name}
      />
      <BurgerPrice price={props.ingredient.price} />
      <p
        className={`${burgerIngredientsStyles.burgerIngredientName} text_type_main-default`}
      >
        {props.ingredient.name}
      </p>
    </div>
  );
};

const BurgerIngredientSection = (props) => {
  return (
    <>
      <p className="mt-10 mb-6 text_type_main-medium" id={props.id}>
        {INGREDIENT_TITLE_MAP[props.ingredientType]}
      </p>
      <div
        className=""
        style={{
          display: "flex",
          flexFlow: "row wrap",
          gap: "24px",
        }}
      >
        {INGREDIENTS_DATA.filter(
          (ingredient) => ingredient.type === props.ingredientType,
        ).map((ingredient) => (
          <BurgerIngredient
            key={ingredient._id}
            ingredient={ingredient}
            count={
              (props.selectedBun && props.selectedBun._id === ingredient._id
                ? 1
                : 0) +
              props.selectedIngredients.filter(
                (selectedIngredient) =>
                  ingredient._id === selectedIngredient._id,
              ).length
            }
            onIngredientSelect={props.onIngredientSelect}
          />
        ))}
      </div>
    </>
  );
};

const BurgerIngredients = (props) => {
  const [currentIngredientType, setCurrentIngredientType] =
    useState(INGREDIENT_TYPE_BUN);

  const onIngredientTypeClick = (ingredient_type) => {
    setCurrentIngredientType(ingredient_type);
    const element = document.getElementById(
      `burger-ingredient-section-${ingredient_type}`,
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ width: "600px" }}>
      <p className="mt-10 text_type_main-large">Соберите бургер</p>
      <BurgerIngredientTypes
        className="mt-5"
        currentIngredientType={currentIngredientType}
        onIngredientTypeClick={onIngredientTypeClick}
      />
      <div
        className={burgerIngredientsStyles.burgerIngredientSectionsContainer}
      >
        {INGREDIENT_ORDER.map((ingredient_type) => (
          <BurgerIngredientSection
            id={`burger-ingredient-section-${ingredient_type}`}
            key={ingredient_type}
            ingredientType={ingredient_type}
            onIngredientSelect={props.onIngredientSelect}
            selectedBun={props.selectedBun}
            selectedIngredients={props.selectedIngredients}
          />
        ))}
      </div>
    </div>
  );
};
export default BurgerIngredients;
