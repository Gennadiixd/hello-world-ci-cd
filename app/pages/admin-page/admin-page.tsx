import React from "react";
import Link from "next/link";

import UsersService from "../../services/users-service";
import ProductsService from "../../services/products-service";
import MainLayout from "../../components/complex/main-layout";

const usersService = new UsersService({});
const productsService = new ProductsService({});

export default function AdminPage() {
  const loginUser = (): void => {
    usersService.loginUser({ name: "admin", password: "1234" });
  };

  const createProduct = (): void => {
    productsService.createProduct({
      title: "Product Title",
      price: "1234",
      description: "Product Description",
    });
  };

  return (
    <MainLayout title="Admin Page">
      <button onClick={loginUser}>login</button>
      <button onClick={createProduct}>createProduct</button>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </MainLayout>
  );
}
