import useAllowed from "./use-allowed";
import useCSR from "@/hooks/use-csr";

export default function AdminRoute(Component) {
  return (...args) => {
    const isAllowed = useAllowed({ forRole: "admin", redirectTo: "user" });
    const isCSR = useCSR();

    return isCSR && isAllowed ? <Component {...args} /> : null;
  };
}
