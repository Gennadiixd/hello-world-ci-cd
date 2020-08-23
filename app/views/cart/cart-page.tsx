import MainLayout from "@/components/complex/main-layout";
import componentGuard from "@/components/security/component-guard";

export default function CartPage() {
  return <MainLayout title="Cart Page">Hello cart page</MainLayout>;
}

export async function getServerSideProps(ctx) {
  componentGuard(ctx.res, ["admin", "customer"]);

  return { props: {} };
}
