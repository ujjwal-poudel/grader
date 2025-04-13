'use client';
import { useState } from 'react';
import PersistenceForm from '@/components/forms/PersistenceForm';
import PredictionResult from '@/components/PredictionResult';

export default function PredictionTabs({ onResult, setLoading, setResult }) {
  const [activeTab, setActiveTab] = useState('persistence');
  const [formKey, setFormKey] = useState(0);

  const handleNewResult = (data) => {
    setResult(data);
    setFormKey(prev => prev + 1); // resets form
  };

  return (
    <div className="max-w-6xl mx-auto z-0 py-15">
      {/* Tabs */}
      <div className="text-sm px-4 font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px justify-center">
          <li className="me-2">
            <button
              onClick={() => setActiveTab('persistence')}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'persistence'
                  ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }`}
            >
              First Year Persistence
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => setActiveTab('gpa')}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'gpa'
                  ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }`}
            >
              Second Term GPA
            </button>
          </li>
        </ul>
      </div>

      {/* Tab Content */}
      <div className="mt-6 px-4">
      {activeTab === 'persistence' && (
        <PersistenceForm
          key={formKey}
          onResult={(data) => {
            onResult(data);    // send up to PredictionPage (for PredictionResult)
            handleNewResult(data); // reset form
          }}
          setLoading={setLoading}
        />
      )}
        {activeTab === 'gpa' && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Predict Second Term GPA</h2>
            <p>This section will handle predicting a student's second term GPA.</p>
          </div>
        )}
      </div>
    </div>
  );
}
