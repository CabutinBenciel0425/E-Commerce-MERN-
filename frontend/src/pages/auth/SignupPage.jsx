import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const { signup, loading: isSigningUp } = useUserStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(formData);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    toast.success("Account successfully created. You can now sign in");
  };

  return (
    <div className="flex items-center justify-center max-h-full mt-10 flex-col gap-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl font-bold tracking-wider md:text-4xl">
          Create your account
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
            <div className="mb-2 flex items-center justify-center mt-1.5">
              <Label htmlFor="name" className="text-md font-semibold mt-1">
                Name:
              </Label>
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder="John Doe"
              required
              shadow
              className="w-1/2"
              sizing="sm"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={isSigningUp}
            />
          </div>

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
              disabled={isSigningUp}
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
              disabled={isSigningUp}
            />
          </div>
          <div className="flex flex-row gap-10 w-full justify-between">
            <div className="mb-2 block mt-1.5">
              <Label
                htmlFor="confirm-password"
                className="text-md font-semibold"
              >
                Confirm password:
              </Label>
            </div>
            <TextInput
              id="confirm-password"
              type="password"
              required
              shadow
              className="w-1/2"
              sizing="sm"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              disabled={isSigningUp}
            />
          </div>

          <Button type="submit" size="sm" className="cursor-pointer">
            {isSigningUp ? (
              <Spinner light size="sm" className="me-3">
                Loading
              </Spinner>
            ) : (
              "Register new account"
            )}
          </Button>
        </form>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        Already have an account?{" "}
        <Link
          to="/sign-in"
          className="underline font-semibold text-primary-600"
        >
          Sign in here
        </Link>
      </motion.p>
    </div>
  );
}
