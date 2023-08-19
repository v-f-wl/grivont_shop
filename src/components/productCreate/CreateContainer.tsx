'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";
import { categoryMappings } from "../../../utils/categoryMappings";
import axios from "axios";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

import Title from "../UI/Title";
import SelectCategory from "./SelectCategory";
import AddImage from "./AddImage";
import NumericInput from "./NumberInput";
import SelectCity from "./SelectCity";

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
  count: number;
}
const initialState: InitialStateProps = {
  title: '',
  description: '',
  city: 'Mосква',
  price: 0,
  count: 0,
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
  const [loading, setLoading] = useState<boolean>(false)
  const userId = Cookies.get('id')
  const router = useRouter()
  
  // Добавление ID пользователя в productData 
  useEffect(() => {
    if(userId !== undefined){
      setProductData(prev => {
        return {...prev, userId}
      })
    }
  }, [userId])

  // ПРИ ИЗМЕНЕНИИ productData.category
  // В ПОЛЕ categoryLink ДОБАВЛЯЕТСЯ АНГЛИЙСКАЯ ВЕРСИЯ КАТЕРОГИИ
  useEffect(() => {
    setProductData(prev => {
      const obj = {...prev}
      obj.categoryLink = categoryMappings[productData.category]
      return obj
    })
  }, [productData.category])


  const LocalTitle = ({title} : {title : string}) => {
    return <h3 className="text-2xl dark:text-gray-200 text-gray-800 font-medium">{title}</h3>
  }

  // ОБНОВЛЯЕТ ГЛАВНЫЙ ОБЪЕКТ
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
    if(productData.imageSrc === ''){
      errorFieds.push('image')
    }
    if(productData.count < 1){
      errorFieds.push('count')
    }
    setFieldsError(errorFieds)
    if(errorFieds.length === 0 ){
      callback()
    }else return
  }
  
  async function sendData() {
      const headers = {
        'Content-Type': 'application/json'
      }
      const file = JSON.stringify({data: productData.imageSrc})

      // ОТПРАВКА ИЗОБРАЖЕНИЯ
      const uploadResponse = await axios.post('/api/product/uploadImage', file, {headers})
      // ПОЛУЧЕНИЯ ССЫЛКИ НА ИЗОБРАЖЕНИЕ
      const bodyInfo = {...productData, imageData: [uploadResponse], categoryLink: categoryMappings[productData.category]}
      // СОЗДАНИЕ ПРОДУКТА
      axios.post('/api/product/createProduct', bodyInfo)
      .then(res => {
        router.push(`/profilepage/?id=${userId}`)
      })
      .catch(() => {
        setLoading(false)
        setErrorCreate(true)
      })
  }

  const createProduct = () => {
    setLoading(true)
    setFieldsError([])
    validationValue(sendData)
  }
  

  return ( 
    <div className="pt-[80px] md:pt-[120px] pb-10 min-h-screen">

      {/* КОМПОНЕНТ Load ПРИ ОТПРАВКИ ДАННЫХ О ТОВАРЕ НА СЕРВЕР */}
      <div className={`${loading ? 'flex' : 'hidden'} absolute inset-0 dark:bg-slate-800 bg-white dark:text-purple-300 text-purple-400 z-[55]  items-center justify-center`}>
        <AiOutlineLoading3Quarters size={53} className="animate-spin"/>
      </div>


      <Title title="Добавить продукт"/>
      <div className="mt-5 md:mt-8 flex flex-col gap-4 md:gap-10">


      {/* ЗАГОЛОВОК */}
        <div className="">
          <LocalTitle title='Заголовок товара'/>
          <input 
            onChange={(e) => handleChangeData('title', e.target.value)}
            type="text" 
            className={`
              ${fieldsError.indexOf('title') > -1 ? 'border-red-400' : 'border-purple-400'} 
              w-full mt-4
              border capitalize border-purple-400 rounded-xl bg-inherit p-3 md:p-4 
              dark:text-purple-200 text-purple-600 text-base md:text-lg
            `}
            placeholder="Введите заголовок(минимальное количество символов 10)"
            value={productData.title}
          />
        </div>


      {/* ОПИСАНИЕ ТОВАРА */}
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
              bg-inherit p-3 md:p-4 
              dark:text-purple-200 text-purple-600 
              text-base md:text-lg
            `}
            placeholder="Опишите товар(минимальное количество символов 20)"
            value={productData.description}
          >
          </textarea>
        </div>

      {/* КОМПОНЕНТ ВЫБОРА КАТЕГОРИИ */}
        <div className="w-full md:w-2/5">
          <LocalTitle title="Добавить категорию"/>
          <SelectCategory changeCategory={handleChangeData} handleError={fieldsError.indexOf('category') > -1}/>
        </div>

        <div className="flex flex-wrap gap-x-10 gap-y-4  items-start">


        {/* ВЫБОР ГОРОДА */}
          <div className="">
            <LocalTitle title='Выберете город'/>
            <div className="mt-4">
              <SelectCity changeCity={handleChangeData}/>
            </div>
          </div>


        {/* ВВОД ЦЕНЫ */}
          <div>
            <LocalTitle title="Укажите цену"/>
            <NumericInput 
              handleError={fieldsError.indexOf('price') > -1}
              changePrice={handleChangeData}
              placeholderValue='От 100'
              context="руб."
              label="price"
              />
          </div>


        {/* ВВОД КОЛИЧЕСТВА ТОВАРА */}
          <div>
            <LocalTitle title="Укажите количество товара"/>
            <NumericInput 
              handleError={fieldsError.indexOf('count') > -1}
              changePrice={handleChangeData}
              placeholderValue='От 1'
              context='шт.'
              label="count"
              />
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-start gap-8">


          {/* КОМПОНЕНТ ДОБАВЛЕНИЯ ИЗОБРАЖЕНИЯ */}
          <div className="w-full md:w-3/5">
            <LocalTitle title="Добавить фото товара"/>
            <AddImage handleError={fieldsError.indexOf('image') > -1} changeCategory={handleChangeData}/>
          </div>
        </div>


        {/* БЛОГ ОШИБКИ ОТПРАВКИ ДАННЫХ НА СЕРВЕР */}
        <div className={`${errorCreate  ? "block" : 'hidden'} text-center text-xl font-light`}>
          Что-то пошло не так -  попробуйте позже
        </div>

        {/* КНОПКА СОЗДАНИЯ ПОСТА */}
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