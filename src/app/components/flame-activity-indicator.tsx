'use client'

import { motion } from "framer-motion";
import React from "react";

interface FlameActivityIndicatorProps {
  size?: number;
  className?: string | undefined;
}

const FlameActivityIndicator: React.FC<FlameActivityIndicatorProps>  = ({ size = 30, className = '' }) => {
  const strokeWidth = size * 0.12; // Scales stroke width with size
  const radius = (size - strokeWidth) / 3; // Ensures stroke fits inside the viewBox
  const center = size / 2;
  const dashArray = `${radius * Math.PI * 0.75} ${radius * Math.PI * 1.25}`;

  return (
    <div className={className}>
    <div className="flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="flameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="grey" />
            <stop offset="50%" stopColor="white" />
            <stop offset="90%" stopColor="#2c2c2e" />
          </linearGradient>
        </defs>

        {/* Three rotating strokes with spaces between them */}
        {[0, 120, 240].map((offset) => (
          <motion.circle
            key={offset}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            stroke="url(#flameGradient)"
            fill="none"
            strokeDasharray={dashArray}
            strokeLinecap="round"
            animate={{ rotate: [0, 360] }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "linear",
              delay: offset / 360, // Staggered rotation
            }}
            style={{ transformOrigin: "center" }}
          />
        ))}
      </svg>
    </div>
    </div>
  );
};

export default FlameActivityIndicator;