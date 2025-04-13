'use client';

import { cn } from "@/utils/utils";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import React from "react";

const transition = {
  duration: -1,
  ease: "easeInOut",
};

export const IntroSlider = ({
  title,
  description,
  className,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const dotPatterns = {
    light: {
      default:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23d4d4d4' cx='10' cy='10' r='2.5'/%3E%3C/svg%3E\")",
      hover:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%236366f1' cx='10' cy='10' r='2.5'/%3E%3C/svg%3E\")",
    },
    dark: {
      default:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23404040' cx='10' cy='10' r='2.5'/%3E%3C/svg%3E\")",
      hover:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%238183f4' cx='10' cy='10' r='2.5'/%3E%3C/svg%3E\")",
    },
  };

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const scrollToTabs = () => {
    const el = document.getElementById("prediction-tabs");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={cn(
        "group relative h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-black",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Pattern backgrounds */}
      <div
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{ backgroundImage: dotPatterns.light.default }}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{ backgroundImage: dotPatterns.dark.default }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 dark:hidden"
        style={{
          backgroundImage: dotPatterns.light.hover,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(200px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
          maskImage: useMotionTemplate`
            radial-gradient(200px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 hidden opacity-0 transition duration-300 group-hover:opacity-100 dark:block"
        style={{
          backgroundImage: dotPatterns.dark.hover,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(200px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
          maskImage: useMotionTemplate`
            radial-gradient(200px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
        }}
      />

      {/* Animated text content */}
      <div className="relative z-20 text-center px-4">
        <motion.h1
          className="text-4xl md:text-7xl font-extrabold bg-clip-text text-transparent"
          animate={{
            backgroundImage: [
              "linear-gradient(270deg, #8b5cf6, #6366f1, #ec4899, #ef4444, #10b981, #eab308, #f97316, #9333ea, #0ea5e9, #a855f7, #22d3ee, #facc15, #ffffff, #8b5cf6)"
            ],
            backgroundSize: '1500% 100%',
            backgroundPosition: [
              "0% 50%",
              "100% 50%"
            ]
          }}
          transition={{
            duration: 35,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left center'
          }}
        >
          {title || "Predict Student Performance"}
        </motion.h1>
        <motion.p
          className="mt-4 text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {description ||
            "Easy and fast way to predict student second term grade and first year persistence."}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          className="mt-6 px-6 py-3 text-sm font-semibold bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full hover:from-indigo-500 hover:to-purple-600 transition-all duration-300"
          onClick={scrollToTabs}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Predicting
        </motion.button>
      </div>
    </div>
  );
};
