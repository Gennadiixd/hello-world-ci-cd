import { withMobx } from "next-mobx-wrapper";
import { configure } from "mobx";
import { Provider, useStaticRendering } from "mobx-react";
import "../assets/styles/index.scss";
import * as getStores from "../stores";
const isServer = !process.browser;

configure({ enforceActions: "observed" });
useStaticRendering(isServer);

function App({ Component, pageProps, store }) {
  return (
    <Provider {...store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default withMobx(getStores)(App);
