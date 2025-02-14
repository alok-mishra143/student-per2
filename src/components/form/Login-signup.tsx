"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { setCookie } from "cookies-next";

import { useDispatch } from "react-redux";
import { setauth } from "@/redux/store/authSlice";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Loader2, LogIn, Mail, Lock } from "lucide-react";

/*

Elegent Shape Start here


*/

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-black/10 dark:border-white/15",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.2),transparent_70%)] dark:after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

interface LoginSignupProps {
  usefor: "login" | "signup";
}

const getValidationSchema = (isLogin: boolean) =>
  Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    name: isLogin
      ? Yup.string().notRequired()
      : Yup.string().required("Name is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

interface handleSubmitProps {
  usefor: "login" | "signup";
  email: string;
  name?: string;
  password: string;
  setSubmitting: (submiting: boolean) => void;
}

const LoginSignup: React.FC<LoginSignupProps> = ({ usefor }) => {
  const [submiting, setSubmitting] = React.useState(false);
  const isLogin = usefor === "login";
  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validationSchema: getValidationSchema(isLogin),
    onSubmit: (values) => handleSubmit({ setSubmitting, usefor, ...values }),
  });

  const handleSubmit = async (param: handleSubmitProps) => {
    const url = process.env.JSON_URL || "http://localhost:3001";
    const { usefor, email, name, password, setSubmitting } = param;

    setSubmitting(true);

    try {
      if (usefor === "login") {
        const response = await axios.get(
          `${url}/users?email=${email}&password=${password}`
        );

        if (response.data.length > 0) {
          toast.success("Login successful");
          dispatch(setauth(true));
          setCookie("isAuthenticated", "true", { maxAge: 60 * 60 * 24 }); // 1-day expiry
          router.push("/dashboard");
        } else {
          toast.error("Invalid email or password");
        }
      } else if (usefor === "signup") {
        const response = await axios.post(`${url}/users`, {
          name,
          email,
          password,
        });

        if (response.status === 201) {
          toast.success("Account created successfully");
          router.push("/login");
        } else {
          toast.error("Failed to create account");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient={cn(
            "from-black/[0.15] to-gray-500/10",
            "dark:from-indigo-500/[0.15] dark:to-transparent"
          )}
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient={cn(
            "from-black/[0.15] to-gray-500/10", // Light mode
            "dark:from-rose-500/[0.15] dark:to-transparent" // Dark mode
          )}
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
        <ElegantShape
          delay={0.3}
          width={300}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[60%] md:left-[55%] top-[45%] md:top-[40%]"
        />
      </div>

      <div className="backdrop-blur-2xl rounded-2xl shadow-xl p-8 border border-gray-300 dark:border-gray-700 bg-white/20 dark:bg-black/30 w-[450px] ">
        {/* Icon & Title */}
        <div className="flex flex-col items-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-16 h-16 bg-gray-900 dark:bg-gray-600 rounded-full flex items-center justify-center mb-4 shadow-lg"
          >
            <Lock className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {isLogin ? "Sign in to continue" : "Join us today!"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Name (Only for Sign Up) */}

          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label
                htmlFor="name"
                className="text-gray-900 dark:text-gray-300"
              >
                Name
              </Label>
              <div className="relative flex items-center bg-gray-700/30 backdrop-blur-lg p-2 rounded-lg border border-gray-600 dark:border-gray-400 shadow-md">
                <Input
                  id="name"
                  type="text"
                  className="bg-transparent outline-none ring-0 focus-visible:ring-0 border-none text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  {...formik.getFieldProps("name")}
                />
              </div>
            </motion.div>
          )}

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Label htmlFor="email" className="text-gray-900 dark:text-gray-300">
              Email
            </Label>
            <div className="relative flex items-center bg-gray-700/30 backdrop-blur-lg p-2 rounded-lg border border-gray-600 dark:border-gray-400 shadow-md">
              <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <Input
                id="email"
                type="email"
                className="bg-transparent outline-none ring-0 focus-visible:ring-0 border-none text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                {...formik.getFieldProps("email")}
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Label
              htmlFor="password"
              className="text-gray-900 dark:text-gray-300"
            >
              Password
            </Label>
            <div className="relative flex items-center bg-gray-700/30 backdrop-blur-lg p-2 rounded-lg border border-gray-600 dark:border-gray-400 shadow-md">
              <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <Input
                id="password"
                type="password"
                className="bg-transparent outline-none ring-0 focus-visible:ring-0 border-none text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                {...formik.getFieldProps("password")}
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              type="submit"
              disabled={submiting}
              className="w-full flex items-center justify-center gap-2 rounded-md px-4 py-2 
              bg-gradient-to-r from-gray-900/80 to-gray-700/80 dark:from-gray-800/80 dark:to-gray-600/80
              border border-gray-700 dark:border-gray-500 text-white 
              shadow-md transition-all duration-300 
              hover:shadow-lg hover:scale-[1.02] active:scale-95
              focus:ring-2 focus:ring-gray-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submiting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>{isLogin ? "Login" : "Sign Up"}</span>
                </>
              )}
            </Button>
          </motion.div>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              href={isLogin ? "/signup" : "/login"}
              className="font-medium text-gray-900 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400 transition"
            >
              {isLogin ? "Sign Up" : "Login"}
            </Link>
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
