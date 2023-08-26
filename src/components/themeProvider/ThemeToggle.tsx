
import { useTheme } from "next-themes";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme()

  const renderIcon = () => {
    if(theme === 'light'){
      return <HiOutlineSun />
    }else{
      return <HiOutlineMoon />
    }
  }
  const changeTheme = () => {
    if(theme === 'light'){
      setTheme('dark')
    }else{
      setTheme('light')
    }
  }
  return ( 
    <div 
      onClick={changeTheme}
      className="cursor-pointer text-gray-900 dark:text-white hover:text-indigo-400 transition-colors"
    >
      {renderIcon()}
    </div>  
  );
}
 
export default ThemeToggle;