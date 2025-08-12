import HeaderClient from "./header-client";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();
  // Render a client header for dynamic auth UI
  return <HeaderClient />;
};

export default Header;
