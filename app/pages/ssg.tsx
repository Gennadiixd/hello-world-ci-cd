import MainLayout from "../components/complex/main-layout";
import { initializeStore } from "../ducks";
import { initialState } from "../ducks/reducer";

export default function SSG(props) {
  console.log(props);

  return (
    <MainLayout title="test">
      <div></div>
    </MainLayout>
  );
}

// If you build and start the app, the date returned here will have the same
// value for all requests, as this method gets executed at build time.
export function getServerSideProps() {
  const reduxStore = initializeStore(initialState);
  const { dispatch } = reduxStore;

  dispatch({
    type: "TICK",
    light: false,
    lastUpdate: 434343434,
  });

  return { props: { initialReduxState: reduxStore.getState() } };
}
