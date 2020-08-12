import Link from "next/link";
import { useMemo } from "react";

export default function MainNavigation({ userRole }) {
  const adminLinksSection = useMemo(
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

  return (
    <nav className="main__navigation">
      <ul>
        {adminLinksSection}
        <li>
          <Link href="/user">
            <a>User page</a>
          </Link>
        </li>
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
