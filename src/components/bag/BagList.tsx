'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import Cookies from "js-cookie";

import { generateOrderNumber } from "../../../utils/generationOrder" // ФУНКЦИЯ ДЛЯ ГЕНЕРАЦИИ УНИКАЛЬНОГО ЧИСЛА ДЛЯ ЗАКАЗА

import EmptyPage from "../UI/EmptyPage";
import Loading from "../UI/Loading";
import ProductCardForBag from "../UI/ProductCardForBag"
import BagWrapper from "./bagUI/BagWrapper";
import BagProducts from "./bagUI/BagProducts";
import CTotal from "./bagUI/CTotal";


type ImageData = {url: string}

interface ImageObj{
  data: ImageData 
}


interface initialStateProps {
  _id: string,
  title: string,
  description: string,
  imageSrc: ImageObj[],
  priceOfProduct: number,
  countOfProducts: number,
  productCount: number,
}

interface CountObj{
  totalPrice: number,
  totalCount: number
}

interface Items{
  productId: String,
  image: String,
  title: String
}
interface objForRequest{
  orderNumber: String,
  totalPrice: Number,
  totalCount: Number,
  items: Items[]
}


const initialState = {
  totalPrice: 0,
  totalCount: 0
}

const BagList = () => {
  const [bagData, setBagData] = useState<initialStateProps[]>([])
  const [loaded, setLoaded] = useState(false)
  const [countInfo, setCountInfo] = useState<CountObj>(initialState)
  const [reqSended, setReqSended] = useState(false)
  const [orderModal, setOrderModal] = useState(false)
  const [reqError, setReqError] = useState(false)

  const userId: string | undefined = Cookies.get('id')
  const router = useRouter()

  // ПОЛУЧАЕТСЯ ЗНАЧЕНИЕ ID ПОЛЬЗОВАТЕЛЯ ИЗ COOKIES
  // И ОТПРАВЛЯЕТ ЗАПРОС НА СЕРВЕР ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ о КОРЗИНЕ
  useEffect(() => {
    const fetchBagItems = async () => {
      if (userId !== undefined) {
        try {
          const response = await axios.get(`/api/bag/getBagItems/?userId=${userId}`);
          setBagData(response.data)
          document.title = 'Grivont - Корзина '
          return response.data
        } catch (error) {
          console.log(error)
        }
      }
      return null
    }
    const processDataAndSetLoaded = async () => {
      const data = await fetchBagItems()
      if (data !== null) {
        setLoaded(true)
      }
    }
    processDataAndSetLoaded();
  }, [userId])


  // СЛЕДИТ ЗА ИЗМЕНЕНИЕМ КОЛИЧЕСТВА ТОВАРОВ
  useEffect(() => {
    changePrice(bagData)
  }, [bagData])


  // ФУНКЦИЯ РАСЧИТЫВАЕТ ИТОГОВУ СТОИМОСТЬ КОРЗИНЫ
  const changePrice = (data: initialStateProps[]) => {
    let totalPrice = 0
    let totalCount = 0

    for (const item of data) {
      if(item.countOfProducts !== 0){
        totalCount++
        totalPrice += item.priceOfProduct * item.productCount
      }
    }
    setCountInfo(prev => ({
      ...prev,
      totalPrice,
      totalCount
    }))
  };

  // ОТПРАВЛЯЕТ ЗАПРОС НА СЕРВЕР 
  // ПРОВЕРКА НА ТО НЕ ЯВЛЯЕТСЯ ЛИ КОРЗИНА ПУСТОЙ ПРОИЗВОДИТСЯ В КОМПОНЕНТЕ
  const sendRequest = () => {
    if (userId !== undefined) {
      // ГЕНЕРИРУЕТ ЧИСЛО ДЛЯ НОМЕРА ЗАКАЗА
      const orderNumber = generateOrderNumber(7)

      // ОТВЕЧАЕТ ЗА ВКЛЮЧЕНИЕ LOADER 
      setReqSended(true)
  
      // СБОР ИНФОРМАЦИИ О ЗАКАЗЕ ДЛЯ ОТПРАВКИ
      const objForRequest: objForRequest = {
        orderNumber,
        totalPrice: countInfo.totalPrice,
        totalCount: countInfo.totalCount,
        items: bagData
          .filter(item => item.countOfProducts !== 0)
          .map(item => ({
          productId: item._id,
          image: item.imageSrc[0].data.url,
          title: item.title,
          count: item.productCount
        }))
      }
      axios.patch(`/api/order/createOrder/?userId=${userId}`, objForRequest)
        .then(() => {
          setBagData([])
          router.push('/orderspage')
        })
        .catch(error => {
          setReqSended(false)
          setOrderModal(false)
          setReqError(true)
          console.log(error)
        })
    }
  }


  // ОТСЛЕЖИВАЕТ ИЗМЕНЕНИЕ КОЛИЧЕСТВА ОДНОЙ ПОЗИЦИИ
  const changeCountOfProduct = (productId: string, value: number) => {
    setBagData(prev => {
      const arr = [...prev]
      for(let item of arr){
        if(item._id === productId){
          item.productCount = value
          break
        }
      }
      return arr
    })
  }

  // УДАЛЕНИЕ ТОВАРА ИЗ КОРЗИНЫ ПРОИСХОДИТ ВНУТРИ КАРТОЧкИ ТОВАРА 
  // ЭТА ФУНКЦИЯ НУЖНА ДЛЯ ОБНАВЛЕНИЯ ДАННЫХ В РОДИТЕЛЬСКОМ( ТЕКУЩЕМ ) КОМПОНЕНТЕ

  const updateDeletedProduct = (id: string) => {
    const newArray = bagData.filter(obj => obj._id !== id);
    setBagData(newArray);
  }

  return (  
    <BagWrapper>
      <Loading isLoaded={loaded}/>
      <BagProducts
        bagData={bagData}
        isLoaded={loaded}
        userId={userId}
        deleteProducts={updateDeletedProduct}
        countChange={changeCountOfProduct}
        reqSended={reqSended}
      />
      <CTotal isLoaded={loaded} reqSended={reqSended} sendRequest={sendRequest} countInfo={countInfo} reqError={reqError}/>
    </BagWrapper>
  )
}
 
export default BagList;