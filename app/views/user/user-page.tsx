import React from "react";
import MainLayout from "@/components/complex/main-layout";
import { useSelector } from "react-redux";

import { getCurrentUserSelector } from "./ducks/selectors";

export default function UserPage() {
  const { name, role, id } = useSelector(getCurrentUserSelector);

  return (
    <MainLayout title="User page">
      <div className="grid-12 user-page--container">
        {name} {role} {id}
      </div>
    </MainLayout>
  );
}
