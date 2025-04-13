export default function StepAcademicInfo({ formData, handleChange, errors }) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { name: 'residency', label: 'Residency', options: [['1','Domestic'], ['2','International']] },
          { name: 'gender', label: 'Gender', options: [['1','Female'], ['2','Male'], ['3','Neutral']] },
          { name: 'prevEducation', label: 'Previous Education', options: [['1','High School'], ['2','Post-Secondary']] },
          { name: 'ageGroup', label: 'Age Group', options: Array.from({ length: 10 }, (_, i) => [`${i+1}`, ['0 to 18','19 to 20','21 to 25','26 to 30','31 to 35','36 to 40','41 to 50','51 to 60','61 to 65','66+'][i]]) },
          { name: 'englishGrade', label: 'English Grade', options: Array.from({ length: 11 }, (_, i) => [`${i+1}`, `Level-${130+i}`]) },
        ].map(({ name, label, options }) => (
          <div key={name} className="space-y-1">
            <label className="text-sm font-medium">{label}</label>
            <select
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border rounded"
            >
              <option value="">Select</option>
              {options.map(([val, text]) => (
                <option key={val} value={val}>{text}</option>
              ))}
            </select>
            {errors[name] && <p className="text-red-600 text-xs">{errors[name]}</p>}
          </div>
        ))}
  
        {[
          { name: 'hsAverage', label: 'High School Average', placeholder: '0.0 - 100.0' },
          { name: 'mathScore', label: 'Math Score', placeholder: '0.0 - 50.0' }
        ].map(({ name, label, placeholder }) => (
          <div key={name} className="space-y-1">
            <label className="text-sm font-medium">{label}</label>
            <input
              type="number"
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border rounded"
            />
            {errors[name] && <p className="text-red-600 text-xs">{errors[name]}</p>}
          </div>
        ))}
      </div>
    );
  }
  