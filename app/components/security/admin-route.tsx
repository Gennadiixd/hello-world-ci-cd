import useAllowed from "./use-allowed";

export default function AdminRoute(Component) {
  return (...args) => {
    const isAllowed = useAllowed({ forRole: "admin", redirectTo: "user" });
    
    return isAllowed ? <Component {...args} /> : null;
  };
}
