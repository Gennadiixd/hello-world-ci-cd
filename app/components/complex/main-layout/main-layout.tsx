import { useSelector } from "react-redux";
import { useMemo } from "react";
import Link from "next/link";

import Header from "../header";
import Footer from "../footer";

export default function MainLayout({ children, title }) {
  const { name, role, authorized } = useSelector(
    (state: any) => state.user.currentUser
  );

  const userInfoSection = useMemo(
    () => (
      <Link href={authorized ? "/user" : "/login"}>
        <a>{authorized ? `You : ${name} / Role : ${role}` : `Unauthorized`}</a>
      </Link>
    ),
    [name, role, authorized]
  );

  return (
    <>
      <Header title={title} userRole={role}>
        {userInfoSection}
      </Header>
      <main>{children}</main>
      <Footer />
    </>
  );
}
