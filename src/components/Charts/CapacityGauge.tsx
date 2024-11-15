import React from 'react';
import { motion } from 'framer-motion';

interface CapacityGaugeProps {
  value: number;
  size?: number;
  thickness?: number;
}

export default function CapacityGauge({ value, size = 200, thickness = 20 }: CapacityGaugeProps) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;
  const rotation = -90; // Start from top

  const getColor = (value: number) => {
    if (value < 60) return '#ef4444';
    if (value < 80) return '#f59e0b';
    return '#22c55e';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Background circle */}
      <svg className="absolute" width={size} height={size}>
        <circle
          className="text-gray-200"
          strokeWidth={thickness}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '50% 50%' }}
        />
      </svg>

      {/* Progress circle */}
      <svg className="absolute" width={size} height={size}>
        <circle
          className="transition-all duration-1000 ease-in-out"
          strokeWidth={thickness}
          stroke={getColor(value)}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: '50% 50%',
            strokeDasharray: circumference,
            strokeDashoffset: circumference - progress,
            strokeLinecap: 'round',
          }}
        />
      </svg>

      {/* Value display */}
      <div className="relative flex flex-col items-center">
        <span className="text-3xl font-bold text-gray-900">{value}%</span>
        <span className="text-sm text-gray-500">Capacity</span>
      </div>
    </motion.div>
  );
}