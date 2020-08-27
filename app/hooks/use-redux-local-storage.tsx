import { useEffect } from "react";

import useLocalStorage from "@/hooks/use-local-storage";
import { isServer } from "@/utils";

let isFirstRender = true;

function useReduxLocalStorage(localStorageKey, reduxState, setReduxState) {
  const [fromLocalStorage, setValue] = useLocalStorage(
    localStorageKey,
    reduxState
  );

  useEffect(() => {
    if (!isServer()) {
      if (isFirstRender) {
        setReduxState(fromLocalStorage);
        isFirstRender = false;
      } else {
        setValue(reduxState);
      }
    }
  }, [reduxState]);
}

export default useReduxLocalStorage;
