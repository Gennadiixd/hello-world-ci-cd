import { useState } from "react";
import useMount from "./use-mount";

export default function useCSR() {
  const [isCSR, setIsCSR] = useState(false);

  useMount(() => {
    setIsCSR(true);
  });

  return isCSR;
}
