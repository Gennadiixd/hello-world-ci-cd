import { Provider } from "react-redux";

import { initializeStore } from "@/ducks/index";
import { restoreSessionAC } from "@/modules/user/ducks";
import getClaims from "@/lib/security/get-claims";
import { isServer } from "@/lib/utils";

import "../assets/styles/index.scss";
import { useStore } from "../ducks";
import RestoreLocalStorageState from "@/lib/restore-local-storage-state";

export default function App({ Component, pageProps }) {
  const { initialReduxState, initialUserState } = pageProps;

  const store = useStore({
    ...(initialReduxState || {}),
    ...(initialUserState || {}),
  });

  return (
    <Provider store={store}>
      <RestoreLocalStorageState />
      <Component {...pageProps} />
    </Provider>
  );
}

App.getInitialProps = async function ({ ctx }) {
  const reduxStore = initializeStore({});
  const { dispatch } = reduxStore;

  const { token } = getClaims(ctx);

  if (token && isServer()) {
    await dispatch(restoreSessionAC(token));
  }

  const { user } = reduxStore.getState();
  if (isServer()) ctx.res.locals = { user };

  return { pageProps: { initialUserState: { user } } };
};
