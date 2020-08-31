import { useRouter } from "next/router";

export default function useRedirect() {
  const { push } = useRouter();

  const redirectToProductsPage = () => {
    push("/products");
  };

  const redirectToProductPage = (id) => {
    push(`/product/[id]`, `/product/${id}`);
  };

  return { redirectToProductsPage, redirectToProductPage };
}
