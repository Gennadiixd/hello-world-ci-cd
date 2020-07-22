import React from "react";
import Link from "next/link";
import ProductsService from "../../services/products-service";

const productsService = new ProductsService({});

export default function FirstPage() {
  const getProducts = (): void => {
    productsService.getProducts();
  };

  return (
    <div>
      <h1>First Page</h1>
      <button onClick={getProducts}>get products</button>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </div>
  );
}
