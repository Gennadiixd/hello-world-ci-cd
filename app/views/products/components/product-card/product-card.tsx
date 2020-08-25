import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { addToCartAC } from "@/views/cart/ducks";

import CardButtons from "../card-buttons/card-buttons";

export default function ProductCard({ product }) {
  const { push } = useRouter();
  const { id, title, description, image, price } = product;
  const dispatch = useDispatch();

  const handleLookCloser = () => {
    push(`/product/[id]`, `/product/${id}`);
  };

  const handleAddToCart = () => {
    dispatch(addToCartAC(product))
  };

  return (
    <div className="grid-4 grid-sm-6 grid-xs-12 card--container">
      <div className="card">
        <div className="card--title">{title}</div>
        <div className="card--image">
          <img src={image} />
        </div>
        <div className="card--description">{description}</div>
        <div className="card--price">{price} $</div>
        <CardButtons
          onLookCloser={handleLookCloser}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}
