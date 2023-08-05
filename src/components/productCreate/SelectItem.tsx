interface SelectItemProps{
  selectedCity: string,
  value: string, 
  handleChange: (value: string) => void
}

const SelectItem:React.FC<SelectItemProps> = ({selectedCity, value, handleChange}) => {
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
          hover:text-purple-400
        `}
      >
        {value}
      </div>
  );
}
 
export default SelectItem;