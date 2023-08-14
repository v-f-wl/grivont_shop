import { useState } from 'react';

const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
};


interface NumericInputProps{
  changePrice:(label: string, value: number) => void;
  handleError: boolean,
  label: string,
  placeholderValue: string,
  argument: string,
}

const NumericInput: React.FC<NumericInputProps> = ({changePrice, handleError, placeholderValue, label, argument}) => {
  const [value, setValue] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key)) {
      e.preventDefault()
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '')
    setValue(formatNumber(Number(inputValue)))
    changePrice(argument, parseInt(inputValue))
  };

  return (
    <div className="">
      <input
        type="text"
        className={`${handleError ? 'border-red-400' : 'border-purple-400'} mt-4 border p-3 md:p-4 bg-inherit rounded-xl  text-purple-200 text-lg`}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={`${placeholderValue} ${label}`}
      />
    </div>
  );
};

export default NumericInput;
