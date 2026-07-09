import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { IoHomeOutline } from "react-icons/io5";
import { FiPlusSquare } from "react-icons/fi";
import { CiViewTable } from "react-icons/ci";
import { GoGraph } from "react-icons/go";
import { HiShoppingCart } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import useUserStore from "../store/useUserStore";
import NavLinkWrapper from "./NavLinkWrapper";
import { useCartLength } from "../store/useCartStore";
import { formatProductName } from "../utils/formatProductName";

const adminlinks = [
  { name: "home", title: "Home", link: "/", icon: <IoHomeOutline size={20} /> },
  {
    name: "createProduct",
    title: "Create/Update Product",
    link: "/products/create",
    icon: <FiPlusSquare size={20} />,
  },
  {
    name: "allProducts",
    title: "All Products",
    link: "/products",
    icon: <CiViewTable size={20} />,
  },
  {
    name: "analytics",
    title: "Analytics",
    link: "/analytics",
    icon: <GoGraph size={20} />,
  },
];

const customerLinks = [
  { name: "home", title: "Home", link: "/", icon: <IoHomeOutline size={20} /> },
];

export default function NavbarComponent() {
  const { user, signout } = useUserStore();
  const navigate = useNavigate();
  const cartLength = useCartLength();

  const linksToUse = user?.role === "admin" ? adminlinks : customerLinks;

  const handleSignout = () => {
    signout();

    toast.info("You have been signed out");
  };

  const handleRedirectToCart = () => {
    if (user) {
      navigate("/cart");
    }
  };

  return (
    <>
      <Navbar fluid rounded className="relative">
        <NavbarBrand as={Link} to="/" className="">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="flex flex-row"
          >
            <img
              src="/favicon.svg"
              className="mr-3 -mt-2 h-9"
              alt="E-commerce icon"
            />
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white ">
              Svea
            </span>
          </motion.div>
        </NavbarBrand>
        <motion.div
          className="flex md:order-2 gap-2 justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {user ? (
            <>
              <Button
                className="relative mt-0.5 cursor-pointer"
                size="sm"
                color="light"
                pill
                onClick={handleRedirectToCart}
              >
                <HiShoppingCart className="h-4 w-4 cursor-pointer" />
                <span className="absolute bg-gray-300/50 text-black/70 text-md -top-1.5 -left-1.5 rounded-full px-1.5 py-0.5">
                  {cartLength}
                </span>
              </Button>

              <Dropdown
                arrowIcon={false}
                inline
                label={<Avatar alt="User settings" img={user?.image} rounded />}
              >
                <DropdownHeader>
                  <span className="block text-lg font-semibold">
                    Welcome back {formatProductName(user?.name)}!
                  </span>
                  <span className="block truncate text-sm">{user?.email}</span>
                </DropdownHeader>

                <DropdownDivider />
                <DropdownItem onClick={handleSignout}>Sign out</DropdownItem>
              </Dropdown>
            </>
          ) : (
            <>
              <Link to="/sign-up" className="shrink-0">
                <Button className="text-xs px-2 py-1 lg:text-sm lg:px-3 lg:py-1.5">
                  Sign up
                </Button>
              </Link>
              <Link to="sign-in" className="shrink-0">
                <Button
                  color="alternative"
                  className="text-xs px-2 py-1 lg:text-sm lg:px-4 lg:py-2"
                >
                  Sign in
                </Button>
              </Link>
            </>
          )}

          <NavbarToggle />
        </motion.div>
        {user ? (
          <NavbarCollapse
            className="
      absolute md:static
    top-full right-0
    w-52 md:w-auto
    z-50
    bg-white md:bg-transparent
    border-gray-100 md:border-0
    rounded-lg
    shadow-lg md:shadow-none
    "
          >
            {linksToUse.map((link, index) => (
              <NavLinkWrapper link={link} index={index} key={index} />
            ))}
          </NavbarCollapse>
        ) : (
          ""
        )}
      </Navbar>
      <div className="border-b border-gray-200"></div>
    </>
  );
}
