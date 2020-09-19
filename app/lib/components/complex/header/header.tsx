import MainNavigation from "../main-navigation";
import Logo from "../../atomic/logo";
import Motto from "../../atomic/motto";

export default function Header({ title, children, userRole }) {
  return (
    <header className="header grid-12">
      <div className="grid-6 logo__container">
        <Logo />
        <Motto />
      </div>
      <div className="grid-6 header__content">
        {children}
        <MainNavigation userRole={userRole} />
      </div>
    </header>
  );
}
