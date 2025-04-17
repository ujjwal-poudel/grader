'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepModelGpa from './steps/StepModelGpa';
import StepDemographics from './steps/StepDemographics';
import StepAcademicInfo from './steps/StepAcademicInfo';

export default function PersistenceForm({ onResult, setLoading }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    model: 'logistic',
    gpa: '',
    prediction: 'persistence',
    firstLanguage: '',
    funding: '',
    fastTrack: '',
    coop: '',
    residency: '',
    gender: '',
    prevEducation: '',
    ageGroup: '',
    hsAverage: '',
    mathScore: '',
    englishGrade: '',
    secondTermGpa: '',
  });

  const [errors, setErrors] = useState({});

  const [formKey, setFormKey] = useState(Date.now());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = (customStep = step) => {
    const newErrors = {};

    if (customStep === 0) {
      const parsedGpa = parseFloat(formData.gpa);
      if (isNaN(parsedGpa) || parsedGpa < 0 || parsedGpa > 4.5) {
        newErrors.gpa = 'GPA must be between 0.0 and 4.5';
      }
    }

    if (customStep === 1) {
      ['firstLanguage', 'funding', 'fastTrack', 'coop'].forEach(field => {
        if (!formData[field]) newErrors[field] = 'This field is required';
      });
    }

    if (customStep === 2) {
      ['residency', 'gender', 'prevEducation', 'ageGroup', 'hsAverage', 'mathScore', 'englishGrade'].forEach(field => {
        if (!formData[field]) newErrors[field] = 'This field is required';
      });
    }

    return newErrors;
  };

  const nextStep = () => {
    const newErrors = validateStep();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    onResult(null); // Clear previous result immediately
    setLoading(true);
  
    // Validate all steps
    const allErrors = {
      ...validateStep(0),
      ...validateStep(1),
      ...validateStep(2),
    };
  
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setLoading(false); // stop spinner if errors
      return;
    }
  
    try {
      // Scroll to result section after a slight delay
      setTimeout(() => {
        document.getElementById('prediction-result')?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100);
  
      // Create final JSON structure for submission
      const submissionData = {
        model: formData.model,
        prediction: formData.prediction,
        First_Term_Gpa: parseFloat(formData.gpa),
        ...(formData.secondTermGpa && { Second_Term_Gpa: parseFloat(formData.secondTermGpa) }),
        First_Language: parseInt(formData.firstLanguage),
        Funding: parseInt(formData.funding),
        FastTrack: parseInt(formData.fastTrack),
        Coop: parseInt(formData.coop),
        Residency: parseInt(formData.residency),
        Gender: parseInt(formData.gender),
        Previous_Education: parseInt(formData.prevEducation),
        Age_Group: parseInt(formData.ageGroup),
        Math_Score: parseFloat(formData.mathScore),
        English_Grade: parseInt(formData.englishGrade)
      };
      
  
      // Show JSON structure to be sent
      console.log("JSON to POST:", JSON.stringify(submissionData, null, 2));

      const stringifiedData = Object.fromEntries(
        Object.entries(submissionData).map(([key, value]) => [key, String(value)])
      );
  
      // POST request (commented out for now, remove /* */ to activate)
      const response = await fetch('https://api.jsonbin.io/v3/qs/68016c5a8561e97a5001f70c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(stringifiedData),
      });
  
      const json = await response.json();
      console.log("Response from POST:", JSON.stringify(json, null, 2));
  
      if (onResult) {
        onResult(json.record || json); // depends on API shape
      }
  
      // Reset form
      setFormKey(Date.now());
    } catch (err) {
      console.error("Error posting prediction:", err);
    } finally {
      setLoading(false);
    }
  };
  
  
  const transition = { duration: 0.3, ease: 'easeInOut' };

  const steps = [
    <StepModelGpa key="step-0" formData={formData} handleChange={handleChange} errors={errors} />,
    <StepDemographics key="step-1" formData={formData} handleChange={handleChange} errors={errors} />,
    <StepAcademicInfo key="step-2" formData={formData} handleChange={handleChange} errors={errors} />
  ];

  const stepLabels = ["Model", "Demographic", "Academic"];

  return (
    <div className="mt-6 space-y-6 flex flex-col items-center justify-center px-4">
      <ol className="flex justify-center items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-xs dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse max-w-2xl mx-auto">
        {stepLabels.map((label, i) => (
          <li
            key={i}
            className={`flex items-center justify-center ${i <= step ? 'text-blue-600 dark:text-blue-500' : ''}`}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${i <= step ? 'border-blue-600 dark:border-blue-500' : 'border-gray-500 dark:border-gray-400'
                }`}
            >
              {i + 1}
            </span>
            <span className="sm:inline">{label}</span>

            {i < stepLabels.length - 1 && (
              <svg
                className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 12 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m7 9 4-4-4-4M1 9l4-4-4-4"
                />
              </svg>
            )}
          </li>
        ))}
      </ol>


      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className="w-full max-w-2xl"
        >
          {steps[step]}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between w-full max-w-2xl pt-4">
        {step > 0 && (
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Back
          </button>
        )}
        {step < steps.length - 1 ? (
          <button
            onClick={nextStep}
            className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            Submit
          </button>
        )}
      </div>

      {/* {submittedData && (
        <div className="mt-6 bg-gray-100 p-4 rounded max-w-2xl w-full">
          <h4 className="text-sm font-semibold mb-2">Submitted JSON:</h4>
          <pre className="text-xs overflow-x-auto whitespace-pre-wrap break-words">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )} */}
    </div>
  );
}