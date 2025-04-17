'use client';

import { useEffect, useState } from 'react';
import GPAResult from '@/components/output/GPA';
import PersistenceMessage from '@/components/output/PersistenceMessage';
import { ConfidenceCircle } from '@/components/output/ConfidenceCircle';

export default function PredictionResult({ result, isLoading }) {
  const hasGpa = result?.gpa !== undefined;
  const hasPersistance = result?.persistance !== undefined;
  const [fakeConfidence] = useState(() => Math.floor(Math.random() * 21) + 80); // Random 80–100

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-mono">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-container" id="prediction-result">
        <div className="plane">
          <div className="grid"></div>
          <div className="glow"></div>
        </div>
        <div className="plane">
          <div className="grid"></div>
          <div className="glow"></div>
        </div>
      </div>

      {/* Prediction Results or Loading Message */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        {isLoading && !result && (
          <div className="text-white text-xl animate-pulse">
            <p className="text-red-400 text-4xl font-bold mb-2">Shōshō omachi kudasai</p>
            <p className="text-gray-300">We're waiting for our rusty backend to catch up...</p>
          </div>
        )}

        {hasGpa && <GPAResult gpa={result.gpa} />}
        {hasPersistance && <PersistenceMessage prediction={result.persistance} />}
        {(hasGpa || hasPersistance) && (
          <ConfidenceCircle
          prediction={hasPersistance ? result.persistance : 1}
          confidence={fakeConfidence}
        />
        
        )}
      </div>

      {/* Background styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        .grid-container {
          --grid: 10rem;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          transform-style: preserve-3d;
          perspective: 100rem;
          animation: rotate 100s linear infinite forwards;
        }
        .plane {
          --dir: 1;
          width: 300%;
          height: 150%;
          min-height: 70rem;
          position: absolute;
          bottom: 0;
          transform-style: preserve-3d;
          transform-origin: bottom center;
          transform: translateX(-50%) rotateX(85deg);
        }
        .plane:last-child {
          --dir: -1;
          top: 0;
          transform-origin: top center;
          transform: translateX(-50%) rotateX(-85deg);
        }
        .plane .grid::before {
          content: '';
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          background-image:
            repeating-linear-gradient(to left, #edf2f4, #edf2f4 4px, transparent 4px, transparent var(--grid)),
            repeating-linear-gradient(to bottom, #edf2f4, #edf2f4 4px, transparent 4px, transparent var(--grid));
          animation: move 1s linear infinite forwards;
        }
        .plane .grid::after {
          content: '';
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(to bottom, rgba(0, 0, 0, 255) var(--grid), rgba(0, 0, 0, 0));
          z-index: 1;
          transform: translateZ(1px);
        }
        .plane:last-child .grid::after {
          background-image: linear-gradient(to top, rgba(0, 0, 0, 255) var(--grid), rgba(0, 0, 0, 0));
        }
        .plane .glow {
          filter: blur(1rem);
          z-index: 1;
          mix-blend-mode: plus-lighter;
        }
        @keyframes move {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(calc(var(--grid) * var(--dir)));
          }
        }
      `}</style>
    </div>
  );
}