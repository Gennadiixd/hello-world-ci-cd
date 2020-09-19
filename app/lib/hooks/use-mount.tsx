import { useEffect } from "react";

const useMount = (func) => useEffect(func, []);

export default useMount;
