"use client";

import { Variants } from "framer-motion";

// directional fade-in, softened and typed
export const fadeIn = (
  direction: "up" | "down" | "left" | "right",
  type: "tween" | "spring" | "keyframes",
  delay = 0,
  duration = 0.5
): Variants => {
  const distance = 50;

  return {
    hidden: {
      x:
        direction === "left"
          ? distance
          : direction === "right"
          ? -distance
          : 0,
      y:
        direction === "up"
          ? distance
          : direction === "down"
          ? -distance
          : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

// stagger container for soft blossoming entrances
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

// classic menu slide with cubic ease
export const menuSlide: Variants = {
  initial: { x: "100%" },
  enter: {
    x: "0%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

// list sliding with index awareness
export const slide : Variants = {
  initial: { x: 80 },
  enter: (i: number) => ({
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.05 * i,
    },
  }),
  exit: (i: number) => ({
    x: 80,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.05 * i,
    },
  }),
};

// container blooming softly
export const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// graceful single item reveal
export const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};
