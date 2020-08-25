import MainNavigation from "../main-navigation";

export default function Header({ title, children, userRole }) {
  return (
    <header className="main__header grid-12">
      <h1 className="page__title">{title}</h1>
      {children}
      <MainNavigation userRole={userRole} />
    </header>
  );
}
