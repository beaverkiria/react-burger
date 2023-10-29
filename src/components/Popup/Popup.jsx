import React from "react";
import popupStyles from "./Popup.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Popup = (props) => {
  return (
    <div className={popupStyles.popupContainer}>
      <div className={popupStyles.popupBody} style={props.extraStyle}>
        <div
          onClick={props.onClose}
          style={{ position: "absolute", right: "40px", top: "60px" }}
        >
          <div style={{ cursor: "pointer" }}>
            <CloseIcon type={"primary"} />
          </div>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Popup;
