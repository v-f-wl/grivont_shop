import { useEffect, useState } from 'react';


// ПРОВЕРКА НА ТО, ЧТО ЗНАЧЕНИЕ ЦИФРА
const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
};

interface NumericInputProps{
  changePrice:(label: string, value: number) => void;
  handleError: boolean,
  label: string,
  placeholderValue: string,
  context: string,
}

const NumericInput: React.FC<NumericInputProps> = ({changePrice, handleError, placeholderValue, context, label}) => {
  const [value, setValue] = useState('')

  // ОТСЛЕЖИВАНИЕ, ЧТОБЫ НЕ БЛОКИРОВАТЬ НАЖАТИЕ 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key)) {
      e.preventDefault()
    }
  };
  
  // ИЗМЕНЕНИЕ value ПРИ ВВОДЕ ДАННЫЗ В input И ПЕРЕДАЧА ДАННЫХ В CreateContainer
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '')
    setValue(formatNumber(Number(inputValue)))
    changePrice(label, parseInt(inputValue))
  };

  return (
    <div className="">
      <input
        type="text"
        className={`${handleError ? 'border-red-400' : 'border-purple-400'} mt-4 border p-3 md:p-4 bg-inherit rounded-xl  dark:text-purple-200 text-purple-600 text-lg`}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={`${placeholderValue} ${context}`}
      />
    </div>
  );
};

export default NumericInput;
