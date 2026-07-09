import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import useUserStore from "../../store/useUserStore";

function SigninPage() {
  const { signin, loading: isSigningIn } = useUserStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signin(formData);

    setFormData({
      email: "",
      password: "",
    });
    toast.success("Account successfully signed in");

    setTimeout(() => {
      navigate("/");
    }, 500);
  };
  return (
    <div className="flex items-center justify-center max-h-full mt-10 flex-col gap-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl font-bold tracking-wider md:text-4xl">
          Sign in to your account
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <form
          className="flex w-2xl px-30 flex-col gap-8 border-2 border-gray-200/50 shadow-sm p-10 rounded-xl"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row gap-10 w-full justify-between">
            <div className="mb-2 block mt-1.5">
              <Label htmlFor="email" className="text-md font-semibold">
                Email:
              </Label>
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="john@gmail.com"
              required
              shadow
              className="w-1/2"
              sizing="sm"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={isSigningIn}
            />
          </div>
          <div className="flex flex-row gap-10 w-full justify-between">
            <div className="mb-2 block mt-1.5">
              <Label htmlFor="password" className="text-md font-semibold">
                Password:
              </Label>
            </div>
            <TextInput
              id="password"
              type="password"
              required
              shadow
              className="w-1/2"
              sizing="sm"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              disabled={isSigningIn}
            />
          </div>

          <Button type="submit" size="sm" className="cursor-pointer">
            {isSigningIn ? (
              <Spinner light size="sm" className="me-3">
                Loading
              </Spinner>
            ) : (
              "Sign in account"
            )}
          </Button>
        </form>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        Don't have an account yet?{" "}
        <Link
          to="/sign-up"
          className="underline font-semibold text-primary-600"
        >
          Sign up here
        </Link>
      </motion.p>
    </div>
  );
}

export default SigninPage;
