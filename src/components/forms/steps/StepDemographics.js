export default function StepDemographics({ formData, handleChange, errors }) {
    const fields = [
      { name: 'firstLanguage', label: 'First Language', options: [['1','English'], ['2','French'], ['3','Other']] },
      { name: 'funding', label: 'Funding', options: [
        ['1','Apprentice_PS'], ['2','GPOG_FT'], ['3','Intl Offshore'], ['4','Intl Regular'],
        ['5','Intl Transfer'], ['6','Joint Program Ryerson'], ['7','Joint Program UTSC'],
        ['8','Second Career Program'], ['9','Work Safety Insurance Board']
      ] },
      { name: 'fastTrack', label: 'Fast Track', options: [['1','Yes'], ['2','No']] },
      { name: 'coop', label: 'Co-op', options: [['1','Yes'], ['2','No']] },
    ];
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ name, label, options }) => (
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
      </div>
    );
  }
  