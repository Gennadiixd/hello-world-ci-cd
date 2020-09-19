import { useSelector } from "react-redux";
import { initializeStore } from "@/ducks/index";
import MainLayout from "@/lib/components/complex/main-layout";

import { getCurrentProductSelector } from "../products/ducks/selectors";
import { fetchProductByIdAC } from "../products/ducks/action-creators";

export default function ProductPage() {
  const { image, title, description, price } = useSelector(
    getCurrentProductSelector
  );

  return (
    <MainLayout title="Product">
      <div className="grid-12 product__page--container">
        <div className="product__page--title">
          <h1>{title}</h1>
        </div>
        <div className="grid-12 product__page--info">
          <div className="grid-5 product__page--image-container">
            <img src={image} />
          </div>
          <div className="grid-6 product__page--description-container">
            {description}
            <div className="product__page--commerce-container">
              <div className="product__page--price">
                <h3>{price} $</h3>
              </div>
              <button>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps({ query }) {
  const reduxStore = initializeStore({});
  const { dispatch } = reduxStore;
  const { id } = query;

  await dispatch(fetchProductByIdAC(id));

  const { products } = reduxStore.getState();

  return {
    props: { initialReduxState: { products } },
  };
}
