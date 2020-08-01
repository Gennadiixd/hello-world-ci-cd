import { useSelector } from "react-redux";

import Header from "../header";
import Footer from "../footer";
import { useMemo } from "react";

export default function MainLayout({ children, title }) {
  const { name, role, authorized } = useSelector(
    (state: any) => state.user.currentUser
  );

  const userSection = useMemo(
    () =>
      authorized ? (
        <>
          <h4>
            You : {name} / Role : {role}
          </h4>
        </>
      ) : null,
    [name, role, authorized]
  );

  return (
    <>
      <Header title={title}>{userSection}</Header>
      <main>{children}</main>
      <Footer />
    </>
  );
}
