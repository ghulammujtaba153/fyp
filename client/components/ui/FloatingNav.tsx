"use client";
import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname
import { cn } from "@/utils/cn";
import { UserContext } from "@/context/UserContext";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { user, logout } = useContext(UserContext);
  const [visible, setVisible] = useState(true);
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  useEffect(() => {
    // Hide the navbar on specific routes
    if (pathname.startsWith("/doctordashboard") || 
        pathname.startsWith("/dashboard") || 
        pathname.startsWith("/conversation") ||
        pathname.startsWith("/conference") ||
        pathname.startsWith("/room") ||
        pathname.startsWith("/admin") ||
        pathname.startsWith("/nurse")) {
      setVisible(false);
    } else {
      setVisible(true);
    }
}, [pathname]);
 // Re-run the effect when the rou

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setDropdownVisible(false);
  };

  const handleDashboardClick = () => {
    setDropdownVisible(false);
    // setVisible(false);

    // Navigate based on the user's role
    if (user.role === "doctor") {
      router.push("/doctordashboard");
    } if (user.role === "patient"){
      router.push("/dashboard");
    } else {
      router.push("/admin");
    }
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const linkVariants = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  if (!visible) {
    return null; // Don't render the navbar if it's not visible
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex w-full fixed z-[5000] inset-x-0 mx-auto px-10 py-5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-between space-x-4",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.75)",
          borderRadius: "0px", // Removed rounded corners
          border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        <div>
          <Link href="/">
            <img src="Laboratory.png" alt="Laboratory Image" className="w-[40px] h-[40px]" />
          </Link>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <Link
            href="/doctor"
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            <span className="block sm:hidden"></span>
            <span className="text-sm !cursor-pointer">Find Doctor</span>
          </Link>

          <Link
            href="/tests"
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            <span className="block sm:hidden"></span>
            <span className="text-sm !cursor-pointer">Tests</span>
          </Link>

          <Link
            href="/contact"
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            <span className="block sm:hidden"></span>
            <span className="text-sm !cursor-pointer">Contact</span>
          </Link>

          {!user && (
            <Link
              href="/login"
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
              )}
            >
              <span className="block sm:hidden"></span>
              <span className="text-sm !cursor-pointer">Login</span>
            </Link>
          )}

          <div className="relative">
            <div
              className="flex items-center space-x-4 cursor-pointer"
              onClick={toggleDropdown}
            >
              {user && (
                <img
                  className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                  src={user.profile}
                  alt="Bordered avatar"
                />
              )}
            </div>
            <AnimatePresence>
              {dropdownVisible && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md shadow-lg py-2"
                >
                  <motion.div variants={linkVariants}>
                    <div
                      onClick={handleDashboardClick}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      Dashboard
                    </div>
                  </motion.div>
                  <motion.div variants={linkVariants}>
                    <Link
                      href="/profile"
                      onClick={() => setDropdownVisible(false)}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Profile
                    </Link>
                  </motion.div>
                  <motion.div variants={linkVariants}>
                    <Link
                      href="/settings"
                      onClick={() => setDropdownVisible(false)}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Settings
                    </Link>
                  </motion.div>
                  <motion.div variants={linkVariants}>
                    <Link
                      href="/"
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
