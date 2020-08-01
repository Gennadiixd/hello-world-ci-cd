import useAllowed from "./use-allowed";

export default function AdminRoute(Component) {
  return (...args) => {

    useAllowed({ forRole: "admin", redirectTo: "user" });

    return <Component {...args} />;
  };
}
