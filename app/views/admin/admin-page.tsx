import { useMemo } from "react";

import MainLayout from "@/components/complex/main-layout";
import OptionCard from "@/components/complex/option-card";
import { initializeStore } from "@/ducks/index";

const adminOptions = [
  {
    option: "manageProducts",
    title: "Manage products",
    description: "create/delete/update products information",
    actions: [{ actionPath: "/admin/manage-products", actionTitle: "Manage" }],
    icon:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqvvCCFRAASaxwrYf-Gm73LgEezxHjqM9IIw&usqp=CAU",
    id: 1,
  },
];

export default function AdminPage() {
  const adminOptionsSection = useMemo(
    () =>
      adminOptions.map((option) => (
        <OptionCard option={option} key={option.id} />
      )),
    []
  );

  return (
    <MainLayout title="Admin Page">
      <div className="grid-12 cards__grid">{adminOptionsSection}</div>
    </MainLayout>
  );
}

export async function getServerSideProps(ctx) {
  // const reduxStore = initializeStore({});
  // const { dispatch } = reduxStore;
  console.log(ctx);
  
  return {
    props: {},
  };
}
