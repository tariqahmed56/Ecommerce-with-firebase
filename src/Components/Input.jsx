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
  checked
}) => {
  return (
    <div className={`mb-1 `}>
      {label && <label className={`text-sm bg-transparent font-medium mb-2 flex ${type !== "checkbox" ? "flex-col" : ""} justify-start gap-1 appearence-none cursor-pointer`}>
{  
     type !== 'checkbox' && <span className='block'>{label}</span>
}    
 
  <input
        type={type}
        value={value}
        onChange={(e)=>onChange(e)}
        placeholder={placeholder}
        disabled={disabled}
        name={name}
        className={` px-3 py-2 ${type === 'checkbox' && 'accent-blue-700 appearance-none w-4 h-4 checkBox'} cursor-pointer border rounded-md focus:outline-none appearance-auto ${width ? width : "w-full"} cursor-pointer  ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''} ${className}`}
      />
           { type === 'checkbox' ? <span className=''>{label}</span> : ''}

      </label>}
    </div>
  );
};

export default Input;
