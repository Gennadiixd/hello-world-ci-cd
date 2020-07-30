import React from "react";
import Link from "next/link";

import MainLayout from "../../components/complex/main-layout";

export default function AdminPage() {
  return (
    <MainLayout title="Admin Page">
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
        <hr />
        <Link href="/admin/create-product">
          <a>Create product</a>
        </Link>
      </h2>
    </MainLayout>
  );
}
