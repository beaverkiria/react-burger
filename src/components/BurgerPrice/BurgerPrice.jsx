import burgerPriceStyles from "../BurgerPrice/BurgerPrice.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerPrice = (props) => {
  return (
    <div
      className={`${burgerPriceStyles.burgerIngredientPrice} ${props.extraClass}`}
    >
      <p className="text_type_digits-default">{props.price}</p>
      <CurrencyIcon type={"primary"} />
    </div>
  );
};
export default BurgerPrice;
