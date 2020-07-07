import React from "react";
import Link from "next/link";

export default function Index() {
  return (
    <div>
      <h1>Hello World</h1>
      <Link href="/first-page">
        <a>first page!</a>
      </Link>
    </div>
  );
}
