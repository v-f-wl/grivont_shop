'use client'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { AppDispatch } from "@/redux/store"
import { changeAuth } from "@/redux/features/authSwitch-slice"
import { useDispatch } from "react-redux"

interface StringProps{
  title: string
}

interface ButtonProps{
  title: string,
  handleClick: () => void,
  isLoading: boolean
}
interface ErrorProps{
  title: string,
  show: boolean
}

interface InputProps{
  id: string, 
  inputType: string, 
  changeValue:(label: string, value: string) => void, 
  palceHolder: string,
  errorField: boolean
}

interface SwitchWindow{
  labelWindow: string, 
  hidden: boolean, 
  buttonTitle: string,
}

export const Input:React.FC<InputProps> = ({id, inputType, changeValue, palceHolder, errorField})=> {
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
    <div className="text-md md:text-xl dark:text-gray-200 text-gray-700 text-center">
      {title}
    </div>
  );
}

export const ErrorTitle:React.FC<ErrorProps> = ({title, show}) => {
  return (
    <div className={`${show ? 'block' : 'hidden'} text-center text-red-400 font-light`}>
      {title}
    </div>
  )
}

export const Button:React.FC<ButtonProps> = ({title, handleClick, isLoading}) => {
  return (
    <div 
      onClick={() => {if(!isLoading) handleClick()}}
      className="
        border dark:border-gray-200
        border-gray-800
        p-3 
        rounded-md 
        flex 
        items-center mt-2 md:mt-4
        justify-center text-xl cursor-pointer
      "
    >
      {isLoading ? 
        <AiOutlineLoading3Quarters size={24} className="animate-spin"/>
        :
        <>
          {title}
        </>
      }
    </div>
  )
}

export const SwitchWindow:React.FC<SwitchWindow> = ({
  labelWindow, 
  hidden, 
  buttonTitle
}) => {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div 
      onClick={() => dispatch(changeAuth(labelWindow))}
      className={`${hidden && 'hidden'} cursor-pointer`}
    >
      {buttonTitle}
    </div>
  )
}