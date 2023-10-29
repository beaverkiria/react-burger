import headerButtonStyles from "./HeaderButton.module.css";

const HeaderButton = ({ icon, text }) => {
  return (
    <div className={`${headerButtonStyles.container} pt-4 pb-4 pl-5 pr-5`}>
      <div className={headerButtonStyles.item}>{icon}</div>
      <div className={headerButtonStyles.item}>{text}</div>
    </div>
  );
};

export default HeaderButton;
