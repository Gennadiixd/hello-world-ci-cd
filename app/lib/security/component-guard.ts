const serverSideRedirect = (res, to = "/login") => {
  res.writeHead(302, { Location: to });
  res.end();
};

export default function componentGuard(res, allowedRoles) {
  const currentUserRole = res.locals?.user?.currentUser?.role;

  if (!allowedRoles.includes(currentUserRole)) {
    serverSideRedirect(res);
  }
}
