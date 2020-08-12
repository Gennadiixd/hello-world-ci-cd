import { Provider } from "react-redux";

import "../assets/styles/index.scss";

import { useStore } from "../ducks";

import { initializeStore } from "@/ducks/index";
import { loginCurrentUserByCookieAC } from "@/views/user/ducks";
import getClaims from "@/components/security/get-claims";
import { isServer } from "@/utils";

export default function App({ Component, pageProps }) {
  const { initialReduxState, initialUserState } = pageProps;

  const store = useStore({
    ...(initialReduxState || {}),
    ...(initialUserState || {}),
  });

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

App.getInitialProps = async function ({ ctx }) {
  const reduxStore = initializeStore({});
  const { dispatch } = reduxStore;

  const { token } = getClaims(ctx);

  if (token && isServer()) {
    await dispatch(loginCurrentUserByCookieAC(token));
  }

  const { user } = reduxStore.getState();
  if (isServer()) ctx.res.locals = { user };

  return { pageProps: { initialUserState: { user } } };
};
