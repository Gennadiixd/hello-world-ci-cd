import { useRouter } from "next/router";

import CardButtons from "../card-buttons/card-buttons";

export default function ProductCard({ product }) {
  const { push } = useRouter();
  const { id, title, description, image, price } = product;
  const onClickLookCloser = () => {
    push(`/product/[id]`, `/product/${id}`);
  };

  return (
    <div className="grid-3 card--container">
      <div className="card">
        <div className="card--title">{title}</div>
        <div className="card--image">
          <img src={image} />
        </div>
        <div className="card--description">{description}</div>
        <div className="card--price">{price} $</div>
        <CardButtons onClickLookCloser={onClickLookCloser} />
      </div>
    </div>
  );
}
