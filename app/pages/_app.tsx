import { Provider } from "react-redux";
import InitAction from "@/components/init-action";

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import "../assets/styles/index.scss";

import { useStore } from "../ducks";
import { loginCurrentUserByCookieAC } from "../views/user/ducks";

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <InitAction initAC={loginCurrentUserByCookieAC}>
        <Component {...pageProps} />
      </InitAction>
    </Provider>
  );
}
