import { useMemo } from "react";

import MainLayout from "@/lib/components/complex/main-layout";
import OptionCard from "@/lib/components/complex/option-card";
import componentGuard from "@/lib/components/security/component-guard";

import { ROLES } from "@/lib/constants";

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
  componentGuard(ctx.res, [ROLES.ADMIN]);

  return { props: {} };
}
