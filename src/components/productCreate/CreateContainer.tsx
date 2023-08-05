'use client'
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Title from "../UI/Title";
import NumericInput from "./NumberInput";
import SelectCity from "./SelectCity";
import { HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2'
import axios from "axios";
import { useRouter } from "next/navigation";
import SelectCategory from "./SelectCategory";

interface InitialStateProps{
  [key: string]: string;
}
const initialState: InitialStateProps = {
  title: '',
  description: '',
  city: 'москва',
  price: '',
  category: 'dfvdf',
  imageSrc: '',
  userId: ''
}
const CreateContainer = () => {
  const [productData, setProductData] = useState<InitialStateProps>(initialState)
  const [errorCreate, setErrorCreate] = useState<boolean>(false)
  const userId = Cookies.get('id')
  const router = useRouter()
  useEffect(() => {
    if(userId !== undefined){
      setProductData(prev => {
        return {...prev, userId}
      })
    }
  }, [userId])

  const LocalTitle = ({title} : {title : string}) => {
    return <h3 className="text-2xl text-gray-300 font-medium">{title}</h3>
  }

  const handleChangeData = (label: string, value: string) => {
    setProductData(prev => {
      return {...prev, [label]: value}
    })
  }

  const createProduct = () => {
    axios.post('/api/createProduct',productData)
    .then(res => {
      router.push(`/profilepage/?id=${userId}`)
    })
    .catch(() => {
      setErrorCreate(true)
    })
  }
  return ( 
    <div className="pt-[120px] h-screen">
      <Title title="Добавить продукт"/>
      <div className="mt-8 flex flex-col gap-10">
        <div className="">
          <LocalTitle title='Заголовок товара'/>
          <input 
            onChange={(e) => handleChangeData('title', e.target.value)}
            type="text" 
            className="
              w-full mt-4
              border capitalize border-purple-400 rounded-xl bg-inherit p-4 
              text-purple-200 text-lg
            " 
            placeholder="Введите заголовок"
            value={productData.title}
          />
        </div>
        <div className="">
          <LocalTitle title='Описание товара'/>
          <textarea 
            onChange={(e) => handleChangeData('description', e.target.value)}
            className="
              w-full 
              mt-4
              border 
              h-[80px] resize-none leading-snug focus:resize-y focus:h-[250px] transition-all duration-300
              border-purple-400 
              capitalize 
              rounded-xl 
              bg-inherit p-4 
              text-purple-200 
              text-lg
            "
            placeholder="Опишите товар"
            value={productData.description}
          >
          </textarea>
        </div>
        <div className="grid grid-cols-2 gap-8 items-start">
          <div>
            <LocalTitle title='Выберете город'/>
            <div className="mt-4">
              <SelectCity changeCity={handleChangeData}/>
            </div>
          </div>
          <div>
            <LocalTitle title="Укажите цену"/>
            <NumericInput changePrice={handleChangeData}/>
          </div>
        </div>
        <div className="flex items-start gap-8">
          <div className="w-3/5">
            <LocalTitle title="Добавить фото товара"/>
            <div className="mt-4 flex items-center gap-8">
              <div className="border border-purple-400 rounded-xl w-[300px] h-[300px]"></div>
              <div 
                className="relative border border-purple-400 rounded-xl flex items-center gap-4 px-5 py-2 cursor-pointer"
              >
                <HiOutlineArrowTopRightOnSquare size={24}/>
                <span className="font-medium text-xl">Добавить фото</span>
                <input type="file" className="cursor-pointer absolute z-10 opacity-0"/>
              </div>
            </div>
          </div>
          <div className="w-2/5">
            <LocalTitle title="Добавить категорию"/>
            <SelectCategory/>
          </div>
        </div>
        <div className={`${errorCreate  ? "block" : 'hidden'}`}>
          чтолытмлоыв
        </div>
        <div 
          onClick={() => createProduct()}
          className="mt-4 border py-3 flex justify-center border-purple-400  rounded-xl text-xl font-bold cursor-pointer">
          Создать
        </div>
      </div>
    </div>
  );
}
 
export default CreateContainer;