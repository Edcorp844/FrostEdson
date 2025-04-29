import { Variants } from 'framer-motion'

export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right', type: string, delay: number, duration: number): Variants => {
  return {
    hidden: {
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: 'easeOut',
      },
    },
  }
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

export const menuSlide = {
  initial: { x: '100%' },
  enter: { x: '0', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: { x: '100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
}

export const slide = {
  initial: { x: 80 },
  enter: (i: number) => ({ x: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i } }),
  exit: (i: number) => ({ x: 80, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i } }),
}

export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

export const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};