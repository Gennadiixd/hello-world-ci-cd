import { useState } from "react";

function useBoolean(initValue = false): any {
  const [boolean, setBoolean] = useState(initValue);

  const setTrue = () => setBoolean(true);
  const setFalse = () => setBoolean(false);
  const toggle = () => setBoolean(!boolean);

  return [boolean, setTrue, setFalse, toggle];
}

export default useBoolean;
