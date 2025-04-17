export default function StepModelGpa({ formData, handleChange, errors }) {
  const handleCheckboxToggle = () => {
    const newValue = formData.prediction === 'gpa' ? 'persistence' : 'gpa';
    handleChange({ target: { name: 'prediction', value: newValue } });
  };

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded text-sm sm:text-base">
        Please select a prediction model and enter your GPA to begin. This will help tailor the predictions based on your academic performance.
      </div>

      {/* Model + Prediction Type Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full space-y-4 sm:space-y-0">
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

        {/* Prediction Type Toggle */}
        {/* Prediction Type Toggle */}
        <div className="flex items-center mt-4 space-x-4">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={formData.prediction === 'gpa'}
              onChange={() =>
                handleChange({
                  target: {
                    name: 'prediction',
                    value: formData.prediction === 'gpa' ? 'persistence' : 'gpa',
                  },
                })
              }
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600 dark:peer-checked:bg-purple-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Predict GPA
            </span>
          </label>
        </div>


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