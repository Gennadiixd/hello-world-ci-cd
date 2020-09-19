import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getProductsPageSelector,
  fetchProductsAC,
} from "@/modules/products/ducks";
import useMount from "@/lib/hooks/use-mount";
import ProductRow from "@/lib/components/complex/product-row";

export default function UpdateProduct() {
  const products = useSelector((state) => getProductsPageSelector(1, state));
  const dispatch = useDispatch();

  // useMount(() => {
  //   dispatch(fetchProductsAC(1));
  // });

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
