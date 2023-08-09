'use client'
import { useState } from "react";


interface StringProps{
  title: string
}

interface ButtonProps{
  title: string,
  handleClick: () => void
}

interface InputProps{
  id: string, 
  inputType: string, 
  changeValue:(label: string, value: string) => void, 
  palceHolder: string,
  errorField: boolean
}

export const Input:React.FC<InputProps> = ({id, inputType, changeValue, palceHolder, errorField})=> {
  const [inputValue, setInputValue] = useState<string>('')
  return ( 
    <input 
      type={inputType}
      autoComplete={id === 'password' ? 'current-password' : 'off'}
      onChange={(e) => changeValue(id, e.target.value)}
      className={`
        ${errorField ? 'border border-gray-700' : 'border border-red-400 outline-red-400'}
        p-4 rounded-md cursor-pointer
      `}
      placeholder={palceHolder}
    />
  );
}

export const Title:React.FC<StringProps> = ({title}) => {
  return (
    <h2 className="text-purple-400 font-bold text-4xl">{title}</h2>
  );
}
 
export const SubTitle:React.FC<StringProps> = ({title}) => {
  return ( 
    <div className="text-md md:text-xl text-gray-300 text-center">
      {title}
    </div>
  );
}

export const ErrorTitle:React.FC<StringProps> = ({title}) => {
  return (
    <div className="text-center text-red-400 font-light">
      {title}
    </div>
  )
}

export const Button:React.FC<ButtonProps> = ({title, handleClick}) => {
  return (
    <div 
      onClick={handleClick}
      className="
        border 
        p-3 
        rounded-md 
        flex 
        items-center mt-2 md:mt-4
        justify-center text-xl cursor-pointer
      "
    >
      {title}
    </div>
  )
}