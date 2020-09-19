import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import Link from "@/lib/components/atomic/link/link";
import { getCartStateSelector } from "@/modules/cart/ducks/selectors";
import { getCurrentUserSelector } from "@/modules/user/ducks/selectors";

import Header from "../header";
import Footer from "../footer";

export default function MainLayout({ children, title }) {
  const { name, role, authorized } = useSelector(getCurrentUserSelector);

  const { totalCount } = useSelector(getCartStateSelector);

  const cartSection = (
    <Link href={"/cart"}>
      <div className="cart">
        <p>
          <FontAwesomeIcon icon={faShoppingCart} />
        </p>
        <p>Корзина {totalCount ? `x ${totalCount}` : ""}</p>
      </div>
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
        {/* {userInfoSection} */}
        <div className="header__cart">{cartSection}</div>
      </Header>
      <main>{children}</main>
      <Footer />
    </>
  );
}
