import { useRouter } from "next/router";

import CardButtons from "../card-buttons/card-buttons";

export default function ProductCard({ product }) {
  const { push } = useRouter();
  const { id, title, description, image, price } = product;
  const onClickLookCloser = () => {
    push(`/product/[id]`, `/product/${id}`);
  };

  return (
    <div className="grid-3 product__card--container">
      <div className="product__card">
        <div className="product__card--title">{title}</div>
        <div className="product__card--image">
          <img src={image} />
        </div>
        <div className="product__card--description">{description}</div>
        <div className="product__card--price">{price} $</div>
        <CardButtons onClickLookCloser={onClickLookCloser} />
      </div>
    </div>
  );
}
