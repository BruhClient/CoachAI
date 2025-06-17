"use client";

import { motion } from "framer-motion";

export default function StrokeDrawLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-volleyball-icon lucide-volleyball fixed inset-0 -z-30 text-muted"
    >
      <motion.path
        d="M11.1 7.1a16.55 16.55 0 0 1 10.9 4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M12 12a12.6 12.6 0 0 1-8.7 5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M16.8 13.6a16.55 16.55 0 0 1-9 7.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}
