import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import Link from "@/components/atomic/link/link";
import { getCartStateSelector } from "@/views/cart/ducks/selectors";
import { getCurrentUserSelector } from "@/views/user/ducks/selectors";

import Header from "../header";
import Footer from "../footer";

export default function MainLayout({ children, title }) {
  const { name, role, authorized } = useSelector(getCurrentUserSelector);

  const { totalCount } = useSelector(getCartStateSelector);

  const cartSection = (
    <Link href={"/cart"}>
      <FontAwesomeIcon icon={faShoppingCart} />
      Your cart x {totalCount}
    </Link>
  );

  const userInfoSection = (
    <Link href={authorized ? "/user" : "/login"}>
      {authorized ? `You : ${name} / Role : ${role}` : `Unauthorized`}
    </Link>
  );

  return (
    <>
      <Header title={title} userRole={role}>
        {userInfoSection}
        <div>{cartSection}</div>
      </Header>
      <main>{children}</main>
      <Footer />
    </>
  );
}
