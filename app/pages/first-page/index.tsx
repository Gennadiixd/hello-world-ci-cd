import React from "react";
import Link from "next/link";

export default function FirstPage() {
  const getProducts = () => {
    fetch("http://localhost:3000/products");
  };

  return (
    <div>
      <h1>First Post</h1>
      <button onClick={getProducts}>dddddd</button>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </div>
  );
}
