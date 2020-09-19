import { useDispatch } from "react-redux";

import { addToCartAC } from "@/modules/cart/ducks";

import CardButtons from "../card-buttons/card-buttons";
import useRedirect from "@/lib/hooks/use-redirect";

export default function ProductCard({ product }) {
  const { id, title, description, image, price } = product;
  const dispatch = useDispatch();
  const { redirectToProductPage } = useRedirect();

  const handleLookCloser = () => {
    redirectToProductPage(id);
  };

  const handleAddToCart = () => {
    dispatch(addToCartAC(product));
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
