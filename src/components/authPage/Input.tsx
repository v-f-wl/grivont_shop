'use client'

import { useState } from "react";


interface InputProps{
  id: string, 
  inputType: string, 
  changeValue:(label: string, value: string) => void, 
  palceHolder: string,
  error?: boolean
}
const Input:React.FC<InputProps> = ({id, inputType, changeValue, palceHolder, error})=> {
  const [inputValue, setInputValue] = useState<string>('')


  return ( 
    <input 
      type={inputType}
      autoComplete={id === 'password' ? 'current-password' : 'off'}
      onChange={(e) => changeValue(id, e.target.value)}
      className={`
        ${error && 'border border-red-400 outline-red-400'}
        p-4 rounded-md cursor-pointer
      `}
      placeholder={palceHolder}
    />
  );
}
 
export default Input;