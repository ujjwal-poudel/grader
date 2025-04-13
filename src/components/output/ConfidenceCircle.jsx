import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ConfidenceCircle({ prediction = 1, confidence = 80 }) {
  const [circleProgress, setCircleProgress] = useState(0);

  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (circleProgress / 100) * circumference;
  const circleColor = Number(prediction) === 1 ? '#10b981' : '#ef4444';

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      if (progress >= confidence) {
        clearInterval(interval);
        return;
      }
      progress += 1;
      setCircleProgress(progress);
    }, 20);
    return () => clearInterval(interval);
  }, [confidence]);

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg width={radius * 2} height={radius * 2}>
        <circle
          stroke="#2d2d2d"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <motion.circle
          stroke={circleColor}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-xl font-semibold">{circleProgress}%</span>
      </div>
      <div className="mt-4 text-white text-sm sm:text-base font-medium">
        Model Confidence
      </div>
    </div>
  );
}  