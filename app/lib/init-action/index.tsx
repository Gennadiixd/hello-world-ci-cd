import { useDispatch } from "react-redux";
import useMount from "@/lib/hooks/use-mount";

export default function InitAction({ children, initAC }) {
  const dispatch = useDispatch();

  useMount(() => {
    dispatch(initAC());
  });

  return <>{children}</>;
}
