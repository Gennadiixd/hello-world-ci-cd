import MainLayout from "../../components/complex/main-layout.js/main-layout";
import { useRouter } from "next/router";

export default function ProductsPage() {
  const router = useRouter();

  console.log(router);

  return (
    <MainLayout title="Product">
      <div>d</div>
    </MainLayout>
  );
}
