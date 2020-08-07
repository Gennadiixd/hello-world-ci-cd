import AdminPage from "@/views/admin";
import { privateRoute } from "@/components/security/private-route";

export default privateRoute(AdminPage);
