import { useSelector } from "react-redux";
import { useMemo } from "react";

import Header from "../header";
import Footer from "../footer";

export default function MainLayout({ children, title }) {
  const { name, role, authorized } = useSelector(
    (state: any) => state.user.currentUser
  );

  const userInfoSection = useMemo(
    () => (
      <h4>{authorized ? `You : ${name} / Role : ${role}` : `Unauthorized`}</h4>
    ),
    [name, role, authorized]
  );

  return (
    <>
      <Header title={title} userRole={role}>{userInfoSection}</Header>
      <main>{children}</main>
      <Footer />
    </>
  );
}
