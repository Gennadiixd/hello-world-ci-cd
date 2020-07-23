// import React from "react";
// import { useStaticRendering } from "mobx-react";

// import { ProductsStore } from "./products-store";

// const isServer = typeof window === "undefined";
// useStaticRendering(isServer);

// let store = null;

// function initializeStore() {
//   if (isServer) {
//     return {
//       productsStore: new ProductsStore(),
//     };
//   }

//   if (store === null) {
//     store = {
//       productsStore: new ProductsStore(),
//     };
//   }

//   return store;
// }

// const StoreContext = React.createContext({ ...initializeStore() });
// const { Provider } = StoreContext;

// export const StoreProvider = ({ children }) => {
//   return <Provider value={{ ...initializeStore() }}>{children}</Provider>;
// };

// export const useStore = () => React.useContext(StoreContext);

export { getProductsStore } from "./products-store";
