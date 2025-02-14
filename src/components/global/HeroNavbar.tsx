"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Layers } from "lucide-react";
import { useRouter } from "next/navigation";

const HeroNavbar = () => {
  const router = useRouter();
  const handleLogin = () => {
    const isauth = document.cookie.includes("isAuthenticated");
    if (isauth) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };
  const handleSignup = () => {
    const isauth = document.cookie.includes("isAuthenticated");
    if (isauth) {
      router.push("/dashboard");
    } else {
      router.push("/signup");
    }
  };
  return (
    <nav className="fixed w-full z-10 flex justify-between p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 bg-white/30 dark:bg-black/30 backdrop-blur-lg p-2 m-2 max-w-5xl rounded-3xl flex items-center justify-between border border-gray-300 dark:border-gray-700"
      >
        {/* Logo with gradient */}
        <Link href="/">
          <div className="text-lg font-bold flex items-center gap-2 cursor-pointer">
            <Layers size={28} className="text-gray-900 dark:text-gray-100" />
            <h1 className="bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-gray-200 dark:via-gray-400 dark:to-gray-600 bg-clip-text text-transparent">
              Stud Layer
            </h1>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              className="font-bold bg-gradient-to-r from-gray-600 via-gray-800 to-black dark:from-neutral-100 dark:via-neutral-400 dark:to-neutral-700 bg-clip-text text-transparent"
              variant="ghost"
              onClick={handleLogin}
            >
              Login
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              className="hidden sm:block relative overflow-hidden px-6 py-2 rounded-full text-black dark:text-white border border-gray-700 dark:border-gray-300"
              variant="outline"
              onClick={handleSignup}
            >
              Sign Up
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </nav>
  );
};

export default HeroNavbar;
