import React from "react";
import Link from "next/link";

export default function Index() {
  return (
    <div>
      <h1>Hello World</h1>
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
      </ul>
    </div>
  );
}
