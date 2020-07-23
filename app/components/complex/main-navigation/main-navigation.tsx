import Link from "next/link";

export default function MainNavigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/first-page">
            <a>first page!</a>
          </Link>
        </li>
        <li>
          <Link href="/admin-page">
            <a>Admin page!</a>
          </Link>
        </li>
        <li>
          <Link href="/products">
            <a>Products page!</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
