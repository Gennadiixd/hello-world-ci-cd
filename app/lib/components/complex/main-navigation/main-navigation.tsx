import { useDispatch } from "react-redux";

import { logoutCurrentUserAC } from "@/modules/user/ducks/action-creators";
import Link from "@/lib/components/atomic/link";
import { ROLES } from "@/lib/constants";

export default function MainNavigation({ userRole }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutCurrentUserAC());
  };

  const adminSection =
    userRole === ROLES.ADMIN ? (
      <li>
        <Link href="/admin">Admin page</Link>
      </li>
    ) : null;

  const authenticationUserSection = userRole ? (
    <li>
      <a onClick={handleLogout}>Log out</a>
    </li>
  ) : (
    <li>
      <Link href="/login">Login</Link>
    </li>
  );

  return (
    <nav className="main__navigation">
      <ul>
        {adminSection}
        {/* {authenticationUserSection} */}
        <li>
          <Link href="/">Главная</Link>
        </li>
        <li>
          <Link href="/products">Каталог</Link>
        </li>
        <li>
          <Link href="/popular-products">Популярные</Link>
        </li>
        <li>
          <Link href="/new-products">Новинки</Link>
        </li>
      </ul>
    </nav>
  );
}
