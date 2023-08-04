'use client'
import { useState } from "react";
import { HiMiniChevronDown, HiMiniChevronUp } from 'react-icons/hi2'


interface SelectCityProps{
  changeCity:(label: string, value: string) => void
}
const SelectCity:React.FC<SelectCityProps> = ({changeCity}) => {
  const [selectedCity, setSelectedCity] = useState<string>('москва')
  const [openModal, setOpenModal] = useState<boolean>(false)

  const changeCalue = (value: string) => {
    setSelectedCity(value)
    changeCity('city', value)
  }
  const CityItem = ({value} : {value: string}) => {
    return (
      <div 
        onClick={() => changeCalue(value)}
        className={`
          ${selectedCity === value ? 'text-indigo-500' : ''}
          ${selectedCity === value ? 'opacity-80' : ''}
          ${selectedCity === value ? 'hover:text-indigo-500' : ''}
          py-2 
          cursor-pointer 
          transition-colors 
          hover:text-purple-400
        `}
      >
        {value}
      </div>
    )
  }

  return ( 
    <div 
      onClick={() => setOpenModal(prev => !prev)}
      className="w-[400px] relative transition-all"
    >
      <div className="border p-4 border-purple-400 rounded-xl relative z-20 bg-gray-900 capitalize">
        {selectedCity !== '' ? selectedCity : 'Выберете город'}
        <div
          className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
        >
          {openModal ? <HiMiniChevronUp size={26}/> : <HiMiniChevronDown size={26}/>}
        </div>
      </div>
      <div 
        className={`
          ${openModal ? 'top-20' : 'top-0'}
          ${openModal ? 'opacity-100' : 'opacity-0'}
          absolute 
          w-full 
          p-4
          bg-gray-800  
          transition-all 
          flex 
          flex-col 
          gap-2
          rounded-xl 
          z-10
          capitalize
        `}
      >
        <CityItem value="москва"/>
        <CityItem value="санкт-Петербург"/>
        <CityItem value="южно-Сахалинск"/>
      </div>
    </div>
  );
}
 
export default SelectCity;