import { useEffect } from "react";

import useLocalStorage from "@/lib/hooks/use-local-storage";
import { isServer } from "@/lib/utils";

let isFirstRender = true;

function useReduxLocalStorage(localStorageKey, reduxState, setReduxState) {
  const [fromLocalStorage, setValue] = useLocalStorage(
    localStorageKey,
    reduxState
  );

  useEffect(() => {
    if (isServer()) return;
    
    if (isFirstRender) {
      setReduxState(fromLocalStorage);
      isFirstRender = false;
    } else {
      setValue(reduxState);
    }
  }, [reduxState]);
}

export default useReduxLocalStorage;
