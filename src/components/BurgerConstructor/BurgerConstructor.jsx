import {
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./BurgerConstructor.module.css";
import BurgerPrice from "../BurgerPrice";
import Popup from "../Popup";
import { useState } from "react";
import { DoneIcon } from "../../icons/done";

const CreateOrderPopup = (props) => {
  return (
    <Popup onClose={props.onClose} extraStyle={{ textAlign: "center" }}>
      <p
        className="pt-30 text text_type_digits-large"
        style={{ textShadow: "#4C4CFF 1px 1px 10px" }}
      >
        0345636
      </p>
      <p className="mt-8 mb-15 text text_type_main-medium">
        идентификатор заказа
      </p>
      <DoneIcon />
      <p className="mt-15 text text_type_main-small">
        Ваш заказ начали готовить
      </p>
      <p className="mt-2 pb-30 text text_type_main-small text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </Popup>
  );
};

const IngredientInfoPopup = (props) => {
  return (
    <Popup onClose={props.onClose}>
      <p className="pl-10 pr-10 pt-10 text text_type_main-large">
        Детали ингредиента
      </p>
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexDirection: "column",
          textAlign: "center",
          justifyContent: "center",
        }}
        className="mb-15"
      >
        <img
          src={props.selectedIngredientInfo.image_large}
          alt={props.selectedIngredientInfo.name}
        />
        <p className="text text_type_main-medium">
          {props.selectedIngredientInfo.name}
        </p>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
            <br />
            {props.selectedIngredientInfo.calories}
          </p>{" "}
          <p className="text text_type_main-default text_color_inactive">
            Белки,г
            <br />
            {props.selectedIngredientInfo.proteins}
          </p>{" "}
          <p className="text text_type_main-default text_color_inactive">
            Жиры,г
            <br />
            {props.selectedIngredientInfo.fat}
          </p>{" "}
          <p className="text text_type_main-default text_color_inactive">
            Углеводы,г
            <br />
            {props.selectedIngredientInfo.carbohydrates}
          </p>
        </div>
      </div>
    </Popup>
  );
};

const BurgerConstructor = (props) => {
  const [isCreateOrderPopupOpen, setIsCreateOrderPopupOpen] = useState(false);
  const onOrderButtonClick = () => {
    setIsCreateOrderPopupOpen(true);
  };
  const [isIngredientInfoPopupOpen, setIsIngredientInfoPopupOpen] =
    useState(false);
  const [selectedIngredientInfo, setSelectedIngredientInfo] = useState(null);
  const onIngredientInfoClick = (ingredient) => {
    setIsIngredientInfoPopupOpen(true);
    setSelectedIngredientInfo(ingredient);
  };

  return (
    <>
      {isCreateOrderPopupOpen && (
        <CreateOrderPopup onClose={() => setIsCreateOrderPopupOpen(false)} />
      )}
      {isIngredientInfoPopupOpen && (
        <IngredientInfoPopup
          onClose={() => setIsIngredientInfoPopupOpen(false)}
          selectedIngredientInfo={selectedIngredientInfo}
        />
      )}
      <div
        className="mt-25 pl-4"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "600px",
        }}
      >
        {props.selectedBun ? (
          <div onClick={() => onIngredientInfoClick(props.selectedBun)}>
            <ConstructorElement
              text={props.selectedBun.name}
              thumbnail={props.selectedBun.image}
              price={props.selectedBun.price}
              type="top"
              isLocked={true}
              extraClass={`${constructorStyles.constructorItem} ${constructorStyles.constructorBun}`}
            />
          </div>
        ) : (
          <div style={{ height: "80px" }}></div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            flexGrow: "1",
            minHeight: "0px",
            height: "calc(100vh - 612px)",
            overflowY: "auto",
          }}
        >
          {props.selectedIngredients.map((ingredient, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <DragIcon type={"primary"} />
              <div
                style={{ flexGrow: "1" }}
                onClick={() => onIngredientInfoClick(ingredient)}
              >
                <ConstructorElement
                  text={ingredient.name}
                  thumbnail={ingredient.image}
                  price={ingredient.price}
                  handleClose={() => props.onIngredientDelete(ingredient)}
                  extraClass={constructorStyles.constructorItem}
                />
              </div>
            </div>
          ))}
        </div>
        {props.selectedBun && (
          <div onClick={() => onIngredientInfoClick(props.selectedBun)}>
            <ConstructorElement
              text={props.selectedBun.name}
              thumbnail={props.selectedBun.image}
              price={props.selectedBun.price}
              type="bottom"
              isLocked={true}
              extraClass={`${constructorStyles.constructorItem} ${constructorStyles.constructorBun}`}
            />
          </div>
        )}
        <div
          className="mt-6 pr-8"
          style={{
            display: "flex",
            gap: "40px",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: "52px",
          }}
        >
          <BurgerPrice
            price={
              props.selectedIngredients.reduce(
                (sum, item) => sum + item.price,
                0,
              ) + (props.selectedBun ? props.selectedBun.price * 2 : 0)
            }
            extraClass={constructorStyles.totalPrice}
          />
          <Button
            type={"primary"}
            size={"large"}
            disabled={!props.selectedBun && !props.selectedIngredients.length}
            onClick={onOrderButtonClick}
            htmlType={"button"}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </>
  );
};
export default BurgerConstructor;
