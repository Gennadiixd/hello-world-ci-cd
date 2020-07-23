import MainNavigation from "../main-navigation";

export default function Header({ title }) {
  return (
    <div>
      <h1>{title}</h1>
      <MainNavigation />
    </div>
  );
}
