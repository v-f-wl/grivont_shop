import { changePage } from "@/redux/features/profileSwitch-slice"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"

interface ButtonProps{
  title: string,
  id: string
}

const PageNavigation = () => {
  const info = useAppSelector((state) => state.profileSwitch.value)
  const dispatch = useDispatch<AppDispatch>()
  const Button:React.FC<ButtonProps> = ({title, id}) => {
    return (
      <div 
        onClick={() => dispatch(changePage(id))}
        className={`
          border
          ${id === info ? 'border-indigo-400 ' : 'border-gray-600 '}
          py-1 px-2
          lg:py-2 
          lg:px-4 
          rounded-full 
          bg-gray-600 
          cursor-pointer 
          font-light 
          hover:border-indigo-400 
          transition-all
        `}
      >
        {title}
      </div>
    )
  }


  return (  
    <div className="flex items-center gap-2 lg:gap-8">
      <Button title="Объявления" id='page1'/>
      <Button title="Лента" id='page2'/>
      <Button title="События" id='page3'/>
    </div>
  );
}
 
export default PageNavigation;

