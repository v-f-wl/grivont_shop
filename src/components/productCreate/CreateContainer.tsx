'use client'
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Title from "../UI/Title";
import NumericInput from "./NumberInput";
import SelectCity from "./SelectCity";
import axios from "axios";
import { useRouter } from "next/navigation";
import SelectCategory from "./SelectCategory";
import { categoryMappings } from "../../../utils/categoryMappings";
import AddImage from "./AddImage";
interface InitialStateProps{
  title: string;
  description: string;
  city: string;
  category: string;
  imageSrc: string;
  imageData: Object[];
  categoryLink: string;
  userId: string;
  price: number;
}
const initialState: InitialStateProps = {
  title: '',
  description: '',
  city: 'Mосква',
  price: 0,
  category: '',
  categoryLink: '',
  imageSrc: '',
  imageData: [],
  userId: ''
}
const CreateContainer = () => {
  const [productData, setProductData] = useState<InitialStateProps>(initialState)
  const [errorCreate, setErrorCreate] = useState<boolean>(false)
  const [fieldsError, setFieldsError] = useState<string []>([])
  const userId = Cookies.get('id')
  const router = useRouter()
  
  useEffect(() => {
    if(userId !== undefined){
      setProductData(prev => {
        return {...prev, userId}
      })
    }
  }, [userId])

  useEffect(() => {
    setProductData(prev => {
      const obj = {...prev}
      obj.categoryLink = categoryMappings[productData.category]
      return obj
    })
  }, [productData.category])

  const LocalTitle = ({title} : {title : string}) => {
    return <h3 className="text-2xl text-gray-300 font-medium">{title}</h3>
  }

  const handleChangeData = (label: string, value: string | number) => {
    setProductData(prev => {
      return {...prev, [label]: value}
    })
  }

  const validationValue = (callback: ()=> void ) => {
    const errorFieds: string[] = []

    if(productData.title.trim().length < 10){
      errorFieds.push('title')
    }
    if(productData.description.trim().length < 20){
      errorFieds.push('description')
    }
    if(productData.price < 100){
      errorFieds.push('price')
    }
    if(productData.category === ''){
      errorFieds.push('category')
    }
    setFieldsError(errorFieds)
    if(errorFieds.length === 0 ){
      callback()
    }else return
  }
  const createProduct = () => {
    setFieldsError([])
    validationValue(sendData)
  }
  async function sendData() {
      const headers = {
        'Content-Type': 'application/json'
      }
      const file = JSON.stringify({data: productData.imageSrc})

      const uploadResponse = await axios.post('/api/uploadImage', file, {headers})
      console.log(uploadResponse)
      const bodyInfo = {...productData, imageData: [uploadResponse], categoryLink: categoryMappings[productData.category]}
      axios.post('/api/createProduct', bodyInfo)
      .then(res => {
        router.push(`/profilepage/?id=${userId}`)
      })
      .catch(() => {
        setErrorCreate(true)
      })
  }

  return ( 
    <div className="pt-[120px] h-screen mb-[100px]">
      <Title title="Добавить продукт"/>
      <div className="mt-8 flex flex-col gap-10">
        <div className="">
          <LocalTitle title='Заголовок товара'/>
          <input 
            onChange={(e) => handleChangeData('title', e.target.value)}
            type="text" 
            className={`
              ${fieldsError.indexOf('title') > -1 ? 'border-red-400' : 'border-purple-400'} 
              w-full mt-4
              border capitalize border-purple-400 rounded-xl bg-inherit p-4 
              text-purple-200 text-lg
            `}
            placeholder="Введите заголовок(минимальное количество символов 10)"
            value={productData.title}
          />
        </div>
        <div className="">
          <LocalTitle title='Описание товара'/>
          <textarea 
            onChange={(e) => handleChangeData('description', e.target.value)}
            className={`
              ${fieldsError.indexOf('description') > -1 ? 'border-red-400' : 'border-purple-400'} 
              w-full 
              mt-4
              border 
              h-[120px] resize-none leading-snug focus:resize-y transition-all duration-300
              border-purple-400 
              capitalize 
              rounded-xl 
              bg-inherit p-4 
              text-purple-200 
              text-lg
            `}
            placeholder="Опишите товар(минимальное количество символов 20)"
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
            <NumericInput 
              handleError={fieldsError.indexOf('price') > -1}
              changePrice={handleChangeData}
              />
          </div>
        </div>
        <div className="flex items-start gap-8">
          <div className="w-3/5">
            <LocalTitle title="Добавить фото товара"/>
            <AddImage changeCategory={handleChangeData}/>
          </div>
          <div className="w-2/5">
            <LocalTitle title="Добавить категорию"/>
            <SelectCategory changeCategory={handleChangeData} handleError={fieldsError.indexOf('category') > -1}/>
          </div>
        </div>
        <div className={`${errorCreate  ? "block" : 'hidden'} text-center text-xl font-light`}>
          Что-то пошло не так -  попробуйте позже
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