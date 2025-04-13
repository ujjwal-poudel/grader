'use client';

import { useState } from 'react';
import { IntroSlider } from '@/components/IntroSlider';
import PredictionTabs from '@/components/pages/PredictionTabs';
import PredictionResult from '@/components/PredictionResult';

export default function PredictionPage() {
  const [result, setResult] = useState(null);
  const [isLoading, setLoading] = useState(false); // ✅ Loading state

  return (
    <div className="flex flex-col w-full bg-[#202020]">
      <IntroSlider pathLengths={[1, 1, 1, 1, 1]} />

      {/* Prediction form always visible */}
      <div id="prediction-tabs">
        <PredictionTabs
          onResult={setResult}
          setLoading={setLoading}
          setResult={setResult}
        />

      </div>

      {/* Result output + animated background */}
      <PredictionResult
  key={JSON.stringify(result)}  // <-- this will trigger remount when result changes
  result={result}
  isLoading={isLoading}
/>

    </div>
  );
}
