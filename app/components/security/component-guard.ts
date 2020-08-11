export default function componentGuard(res, role) {
  if (res.locals?.user?.currentUser?.role !== role) {
    res.writeHead(302, { Location: "/user" });
    res.end();
  }
}
