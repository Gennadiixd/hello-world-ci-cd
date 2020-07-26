import Link from "next/link";

export default function MainNavigation() {
  return (
    <nav className="main__navigation">
      <ul>
        <li>
          <Link href="/admin-page">
            <a>Admin page</a>
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
