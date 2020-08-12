import Link from "next/link";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { logoutCurrentUserAC } from "@/views/user/ducks/action-creators";

export default function MainNavigation({ userRole }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutCurrentUserAC());
  };

  const adminSection = useMemo(
    () =>
      userRole === "admin" ? (
        <li>
          <Link href="/admin">
            <a>Admin page</a>
          </Link>
        </li>
      ) : null,
    [userRole]
  );

  const authenticationUserSection = useMemo(
    () =>
      userRole ? (
        <li>
          <a onClick={handleLogout}>Log out</a>
        </li>
      ) : (
        <li>
          <Link href="/login">
            <a>login</a>
          </Link>
        </li>
      ),
    [userRole]
  );

  return (
    <nav className="main__navigation">
      <ul>
        {authenticationUserSection}
        {adminSection}
        <li>
          <Link href="/products">
            <a>Products page</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Main page</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
