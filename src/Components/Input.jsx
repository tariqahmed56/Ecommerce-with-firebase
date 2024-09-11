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
  ...rest 
}) => {
  return (
    <div className={`mb-1 ${className}`}>
      {label && <label className=" text-sm font-medium mb-2 flex justify-start items-center gap-1">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={` px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
        {...rest}
      />
      {label}
      </label>}
    </div>
  );
};

export default Input;
