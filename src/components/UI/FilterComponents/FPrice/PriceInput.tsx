import { useState } from "react";

interface PriceInput{
  placeholder: string,
  priceValue: string,
  changeValue: (value: string) => void
}
const formatNumber = (num: string) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
};
const PriceInput:React.FC<PriceInput> = ({placeholder, priceValue, changeValue}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key)) {
      e.preventDefault()
    }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '')
    changeValue(formatNumber(inputValue))
  }

  return (
    <div className="">
      <input
        type="text"
        className='border-purple-400 mt-4 border p-3 md:py-3 md:px-4 bg-inherit rounded-xl  dark:text-purple-200 text-purple-600 text-lg'
        value={priceValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </div>
  );
}
 
export default PriceInput;