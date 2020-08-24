import { useSelector } from "react-redux";
import { useMemo } from "react";

import Link from "@/components/atomic/link/link";
import { getCartStateSelector } from "@/views/cart/ducks/selectors";
import { getCurrentUserSelector } from "@/views/user/ducks/selectors";

import Header from "../header";
import Footer from "../footer";

export default function MainLayout({ children, title }) {
  const { name, role, authorized } = useSelector(getCurrentUserSelector);

  const { length } = useSelector(getCartStateSelector);

  const cartSection = <Link href={"/cart"}>Your cart x {length}</Link>;

  const userInfoSection = (
    <Link href={authorized ? "/user" : "/login"}>
      {authorized ? `You : ${name} / Role : ${role}` : `Unauthorized`}
    </Link>
  );

  return (
    <>
      <Header title={title} userRole={role}>
        {userInfoSection}
        {cartSection}
      </Header>
      <main>{children}</main>
      <Footer />
    </>
  );
}
