import { Provider } from "react-redux";
import { useStore } from "../ducks";

export default function App({ Component, pageProps }) {
  console.log(pageProps);
  
  const store = useStore(pageProps.initialReduxState);
  
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
