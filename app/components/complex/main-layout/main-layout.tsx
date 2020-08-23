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

  const cartSection = useMemo(
    () => <Link href={"/cart"}>Your cart x {length}</Link>,
    [authorized, length]
  );

  const userInfoSection = useMemo(
    () => (
      <Link href={authorized ? "/user" : "/login"}>
        {authorized ? `You : ${name} / Role : ${role}` : `Unauthorized`}
      </Link>
    ),
    [name, role, authorized]
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
