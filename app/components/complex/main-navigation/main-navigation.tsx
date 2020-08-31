import { useDispatch } from "react-redux";

import { logoutCurrentUserAC } from "@/views/user/ducks/action-creators";
import Link from "@/components/atomic/link";
import { ROLES } from "@/constants";

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
        {authenticationUserSection}
        <li>
          <Link href="/products">Products page</Link>
        </li>
        <li>
          <Link href="/">Main page</Link>
        </li>
      </ul>
    </nav>
  );
}
