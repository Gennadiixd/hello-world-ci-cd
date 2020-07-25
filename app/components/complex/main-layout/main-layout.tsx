import Header from "../header";
import Footer from "../footer";

export default function MainLayout({ children, title }) {
  return (
    <>
      <Header title={title} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
