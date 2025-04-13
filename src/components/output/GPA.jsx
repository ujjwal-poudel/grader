'use client';
import { useEffect, useState } from 'react';

export default function GPAResult({ gpa }) {
  const [animatedGpa, setAnimatedGpa] = useState(0);

  useEffect(() => {
    let value = 0;
    const step = 0.01;
    const gpaInterval = setInterval(() => {
      if (value >= parseFloat(gpa)) {
        clearInterval(gpaInterval);
        return;
      }
      value = parseFloat((value + step).toFixed(2));
      setAnimatedGpa(value);
    }, 20);
    return () => clearInterval(gpaInterval);
  }, [gpa]);

  return (
    <h2 className="text-white text-3xl sm:text-4xl font-bold mb-4 pb-8">
      Second Term GPA: {animatedGpa.toFixed(2)}
    </h2>
  );
}