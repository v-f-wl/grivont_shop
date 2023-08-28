'use client'
import Arrow from "../Arrow";
import { AppDispatch } from "@/redux/store"
import { changeCategoryModal } from "@/redux/features/filterModal-slice";
import { useDispatch } from "react-redux"
import { useAppSelector } from "@/redux/store"

interface CategorySelectProps{
  dataList: string[] | null,
  mute: boolean,
  label: string,
  placeholder: string,
  changeValue: (label: string, value: string) => void,
  value: string
}
const CategorySelect:React.FC<CategorySelectProps> = ({
  dataList,
  mute,
  label,
  placeholder,
  changeValue,
  value
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const isOpenModal = useAppSelector(store => store.filterModal.categoryModal)

  const openList = () => {
    if(mute) return
    dispatch(changeCategoryModal(label))
  }
  
  const changeCategory = (value: string) => {
    dispatch(changeCategoryModal(''))
    if(label === 'mainCategory'){
      changeValue('subCategory', '')
      changeValue('mainCategory', value)
    }else{
      changeValue('subCategory', value)
    }
  }

  return ( 
    <div className="relative">
      <div 
        onClick={openList}
        className="border dark:border-gray-100 border-gray-800 cursor-pointer py-1 px-2 rounded-xl flex items-center justify-between"
      >
        <div className=" w-full clamped-text">
          {value ? value : placeholder}
        </div>
        <Arrow label=""/>
      </div>
      <div 
        className={`
          ${isOpenModal === label ? 'block' : 'hidden'}
          absolute z-20
          top-12 max-h-[150px]
          border dark:border-gray-100 border-gray-800
          dark:bg-gray-700 bg-gray-200  w-full rounded-xl flex flex-col gap-2 p-2 text-base overflow-y-scroll
        `}
      >
        {dataList !== null && dataList.map(item => (
          <div 
            key={item}
            onClick={() => changeCategory(item)}
            className=""
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default CategorySelect;