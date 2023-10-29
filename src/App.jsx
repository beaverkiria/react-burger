import React, { useState } from "react";
import AppHeader from "./components/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients";
import BurgerConstructor from "./components/BurgerConstructor";
import "./App.css";

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedBun, setSelectedBun] = useState(null);
  const onIngredientSelect = (ingredient) => {
    if (ingredient.type === "bun") {
      setSelectedBun(ingredient);
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };
  const onIngredientDelete = (ingredient) => {
    setSelectedIngredients(
      selectedIngredients.filter((item) => item._id !== ingredient._id),
    );
  };
  return (
    <>
      <AppHeader />
      <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
        <BurgerIngredients
          selectedIngredients={selectedIngredients}
          selectedBun={selectedBun}
          onIngredientSelect={onIngredientSelect}
        />
        <BurgerConstructor
          selectedBun={selectedBun}
          selectedIngredients={selectedIngredients}
          onIngredientDelete={onIngredientDelete}
        />
      </div>
    </>
  );
}

export default App;
