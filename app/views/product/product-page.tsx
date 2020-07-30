import { useSelector } from "react-redux";
import { initializeStore } from "@/ducks/index";
import MainLayout from "@/components/complex/main-layout";

import { getCurrentProductSelector } from "../products/ducks/selectors";
import { serverGetProductByIdAC } from "../products/ducks/action-creators";

export default function ProductPage() {
  const { image, title, description, price } = useSelector(
    getCurrentProductSelector
  );

  return (
    <MainLayout title="Product">
      <div className="product__page--container">
        <div className="product__page--title">{title}</div>
        <div className="product__page--image">
          <img src={image} />
        </div>
        <div className="product__page--description">{description}</div>
        <div className="product__page--price">{price} $</div>
        <button>Add to cart</button>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps({ query }) {
  const reduxStore = initializeStore({});
  const { dispatch } = reduxStore;
  const { id } = query;

  await dispatch(serverGetProductByIdAC(id));

  return { props: { initialReduxState: reduxStore.getState() } };
}
