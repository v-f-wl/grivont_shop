interface SelectItemProps{
  selectedCity: string,
  color?: string;
  value: string, 
  handleChange: (value: string) => void
}

const SelectItem:React.FC<SelectItemProps> = ({selectedCity, value, handleChange, color}) => {
  return ( 
    <div 
        onClick={() => handleChange(value)}
        className={`
          ${selectedCity === value ? 'text-indigo-500' : ''}
          ${selectedCity === value ? 'opacity-80' : ''}
          ${selectedCity === value ? 'hover:text-indigo-500' : ''}
          py-2 
          cursor-pointer 
          transition-colors 
          hover:text-purple-400 flex items-center gap-2
        `}
      >
        {color && <div className="w-6 h-6 rounded-lg border dark:border-gray-700 border-gray-300" style={{background: color}}></div>}
        {value}
      </div>
  );
}
 
export default SelectItem;