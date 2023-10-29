import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./AppHeader.module.css";
import HeaderButton from "./components/HeaderButton";

const AppHeader = () => {
  return (
    <header className={`${headerStyles.header} pt-4 pb-4`}>
      <HeaderButton icon={<BurgerIcon />} text="Конструктор" />
      <HeaderButton icon={<ListIcon />} text="Лента заказов" />
      <div style={{ flexGrow: "1", justifyContent: "center", display: "flex" }}>
        <Logo />
      </div>
      <div style={{ width: "197px" }}></div>
      {/* stub element to center logo */}
      <HeaderButton icon={<ProfileIcon />} text="Личный кабинет" />
    </header>
  );
};

export default AppHeader;
