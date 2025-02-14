/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, LogOut, Layers, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { deleteCookie } from "cookies-next";

const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogOut = () => {
    deleteCookie("isAuthenticated");
    router.push("/login");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <nav className=" top-0 left-0 w-full  shadow-md z-50 transition-colors">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link href="/">
          <div className="text-lg font-bold flex items-center gap-2 cursor-pointer">
            <Layers size={28} className="text-gray-900 dark:text-gray-100" />
            <h1 className="bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-gray-200 dark:via-gray-400 dark:to-gray-600 bg-clip-text text-transparent">
              Stud Layer
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {[
            { href: "/dashboard", label: "Dashboard" },
            { href: "/student", label: "Student" },
            { href: "/report", label: "Report" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-lg font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
                pathname === item.href
                  ? "text-emerald-700 dark:text-emerald-500"
                  : "text-gray-900 dark:text-gray-300"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Theme Toggle & Logout (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white font-medium shadow-md transition-all duration-200 hover:bg-red-600 hover:shadow-lg"
            onClick={handleLogOut}
          >
            <LogOut size={18} className="stroke-[2]" />
            Sign Out
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-md text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 py-4 bg-white dark:bg-black shadow-md">
          <div className=" flex flex-col space-x-6">
            {[
              { href: "/dashboard", label: "Dashboard" },
              { href: "/student", label: "Student" },
              { href: "/report", label: "Report" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-lg font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
                  pathname === item.href
                    ? "text-emerald-700 dark:text-emerald-500"
                    : "text-gray-900 dark:text-gray-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Logout (Mobile) */}
          <div className="flex items-center gap-3">
            <Button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white font-medium shadow-md transition-all duration-200 hover:bg-red-600 hover:shadow-lg"
              onClick={handleLogOut}
            >
              <LogOut size={18} className="stroke-[2]" />
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
