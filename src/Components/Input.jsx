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
  ...rest 
}) => {
  return (
    <div className={`mb-1 `}>
      {label && <label className=" text-sm bg-transparent font-medium mb-2 flex justify-start gap-1 appearence-none cursor-pointer">
{  
     type === 'password' || type === 'email' ? <span className='block'>{label}</span> : ''
}      <input
        type={type}
        value={value}
        onChange={(e)=>onChange(e)}
        placeholder={placeholder}
        disabled={disabled}
        name={name}
        className={` px-3 py-2 cursor-pointer border rounded-md focus:outline-none appearance-auto ${width ? width : ""} cursor-pointer  ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''} ${className}`}
        {...rest}
      />
           { type === 'checkbox' ? <span className='block'>{label}</span> : ''}

      </label>}
    </div>
  );
};

export default Input;
