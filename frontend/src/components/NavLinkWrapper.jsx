import { NavbarLink } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function NavLinkWrapper({ link, index }) {
  const location = useLocation();
  const isActive = location.pathname === link.link;

  return (
    <NavbarLink
      as={Link}
      to={link.link}
      active={isActive}
      className="block py-2 px-3 rounded-lg transition-all duration-200"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: index * 0.2 }}
        className="flex items-center justify-center gap-2"
      >
        <span className="-mt-0.5">{link.icon}</span>
        <span>{link.title}</span>
      </motion.div>
    </NavbarLink>
  );
}

export default NavLinkWrapper;
