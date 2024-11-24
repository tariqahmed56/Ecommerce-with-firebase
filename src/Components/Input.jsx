import React from 'react';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  className = '',
  disabled = false,
  name,
  width,
  radioStyle,
  checked,
}) => {
  const isCheckbox = type === 'checkbox';
  const inputClasses = `
    px-3 py-2
    ${isCheckbox ? 'accent-blue-700  w-4 h-4 checkBox' : ' text-black'}
    border  focus:outline-none
    ${width || 'w-full'}
    ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}
    ${className}
  `;

  return (
    <div className="">
      {label && (
        <label
          className={`text-sm bg-transparent font-medium  flex ${
            !isCheckbox ? 'flex-col' : ''
          } justify-start gap-1 cursor-pointer`}
        >
          {!isCheckbox && <span className="block">{label}</span>}

          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e)}
            placeholder={placeholder}
            disabled={disabled}
            name={name}
            checked={checked} 
            className={inputClasses}
            required={true}
            inputMode={type==='number'?"numeric":''}
          />

          {isCheckbox && <span>{label}</span>}
        </label>
      )}
    </div>
  );
};

export default Input;
