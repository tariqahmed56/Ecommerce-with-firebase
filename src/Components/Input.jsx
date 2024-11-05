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
      {label && <label className=" text-sm font-medium mb-2 flex justify-start gap-1 appearence-none">
{  
     type === 'password' || type === 'email' ? <span className='block'>{label}</span> : ''
}      <input
        type={type}
        value={value}
        onChange={(e)=>onChange(e)}
        placeholder={placeholder}
        disabled={disabled}
        name={name}
        className={` px-3 py-2 border rounded-md focus:outline-none appearance-auto  ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
        {...rest}
      />
           { type === 'checkbox' ? <span className='block'>{label}</span> : ''}

      </label>}
    </div>
  );
};

export default Input;
