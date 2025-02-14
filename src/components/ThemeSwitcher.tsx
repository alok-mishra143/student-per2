"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "@/components/ui/toggle";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed bottom-8 right-8">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <Toggle
          variant="outline"
          size="lg"
          pressed={theme === "dark"}
          onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
          className="h-[52px] w-[52px] rounded-full bg-white/90 shadow-lg backdrop-blur-sm dark:bg-black/90 hover:bg-white/95 dark:hover:bg-black/95"
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === "dark" ? 360 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-full w-full flex items-center justify-center"
          >
            {theme === "dark" ? (
              <Moon className="h-5 w-5 text-yellow-500" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-500" />
            )}
          </motion.div>
        </Toggle>
      </motion.div>
    </div>
  );
}
