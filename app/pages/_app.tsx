import { Provider } from "react-redux";

import "../assets/styles/index.scss";

import { useStore } from "../ducks";

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
