import { useDispatch } from "react-redux";
import useMount from "@/hooks/useMount";

export default function InitAction({ children, initAC }) {
  const dispatch = useDispatch();

  useMount(() => {
    dispatch(initAC());
  });

  return <>{children}</>;
}
