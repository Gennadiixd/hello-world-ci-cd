import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getProductsSelector, fetchProductsAC } from "@/views/products/ducks";
import useMount from "@/hooks/use-mount";
import ProductRow from "@/components/complex/product-row";

export default function UpdateProduct() {
  const products = useSelector(getProductsSelector);
  const dispatch = useDispatch();

  useMount(() => {
    dispatch(fetchProductsAC());
  });

  const productRowsSection = useMemo(() => {
    return products.map((product) => (
      <ProductRow product={product} key={product.id} />
    ));
  }, [products]);

  return (
    <div className="grid-8 update__product__form--container">
      <h3>Update Product Form</h3>
      <div className="grid-12 rows__view">{productRowsSection}</div>
    </div>
  );
}
