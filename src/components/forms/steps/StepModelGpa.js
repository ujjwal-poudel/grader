export default function StepModelGpa({ formData, handleChange, errors }) {
    return (
      <div className="space-y-6">
        {/* Info Banner */}
        <div className="p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded text-sm sm:text-base">
          Please select a prediction model and enter your GPA to begin. This will help tailor the predictions based on your academic performance.
        </div>
  
        {/* Model Selection */}
        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200">
            Prediction Model
          </label>
          <select
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full sm:w-64 px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:text-white focus:outline-none"
          >
            <option value="logistic">Logistic Regression</option>
            <option value="svm">Support Vector Machine</option>
            <option value="random_forest">Random Forest</option>
          </select>
        </div>
  
        {/* GPA Input */}
        <div className="space-y-2 w-full sm:w-48">
          <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200">
            First Term GPA
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="4.5"
            name="gpa"
            placeholder="Enter GPA (0.0 - 4.5)"
            value={formData.gpa}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm sm:text-base border rounded"
          />
          {errors.gpa && (
            <p className="text-red-600 text-xs sm:text-sm">{errors.gpa}</p>
          )}
        </div>
  
        {/* Data Safety Note */}
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
          You can return and update any field at any time. The information provided is not stored or shared — your data is completely safe.
        </p>
      </div>
    );
  }
  