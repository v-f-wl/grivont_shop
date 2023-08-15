'use client'
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import EmptyPage from "../UI/EmptyPage";
import Loading from "../UI/Loading";
import ProductCardForBag from "../UI/ProductCardForBag"
import { generateOrderNumber } from "../../../utils/generationOrder"
import { useRouter } from "next/router";


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

// интерфейс объекта для отправки на сервер 
// ==========

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

const initialStateObj = {
  orderNumber: '',
  totalPrice: '',
  totalCount: '',
  items: []
}

// ==========



const initialState = {
  totalPrice: 0,
  totalCount: 0
}

const BagList = () => {
  const [bagData, setBagData] = useState<initialStateProps[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)
  const [countInfo, setCountInfo] = useState<CountObj>(initialState)
  const [reqSended, setReqSended] = useState<boolean>(false)
  const [orderModal, setOrderModal] = useState<boolean>(false)
  const [reqError, setReqError] = useState(false)

  const userId: string | undefined = Cookies.get('id')
  const router = useRouter()

  useEffect(() => {
    const fetchBagItems = async () => {
      if (userId !== undefined) {
        try {
          const response = await axios.get(`/api/bag/getBagItems/?userId=${userId}`);
          setBagData(response.data)
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


  useEffect(() => {
    changePrice(bagData)
  }, [bagData])



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

  const sendRequest = () => {
    if (userId !== undefined) {
      const orderNumber = generateOrderNumber(7);
  
      setReqSended(true)
  
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


  return (  
    <>
    {loaded ? 
      (
        <div className="relative flex flex-col-reverse  lg:grid md:grid-cols-profile gap-4 md:gap-8 lg:gap-12 items-start">
          <div className="">
            {bagData.length > 0 ? 
              (
                <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-col gap-6">
                  {bagData.map(item => (
                    <ProductCardForBag
                      key={item._id}
                      productId={item._id}
                      imageSrc={item.imageSrc[0].data.url}
                      productTitle={item.title}
                      productPrice={item.priceOfProduct}
                      countOfProducts={item.countOfProducts}
                      countInBag={item.productCount}
                      userId={userId}
                      orderLoading={reqSended}

                      updateCount={changeCountOfProduct}
                    />
                  ))}
                </div>
              ) 
              : 
              (
                <EmptyPage title="Корзина пустая"/>
              )
            }
          </div>
          <div 
            className="w-full lg:w-auto relative rounded-xl dark:bg-gray-600 bg-gray-100 p-6 text-2xl font-bold"
          >
            <div className={`${reqSended ? 'block' : 'hidden'} absolute inset-0 z-30 rounded-xl bg-gray-700`}></div>
            <div 
              className={`${orderModal ? 'block' : 'hidden'} z-20 absolute p-4 bg-gray-700 rounded-xl inset-0 flex flex-col items-center justify-center gap-4`}
            >
              <h2 className="">Вы уверены?</h2>
              <div className="flex items-center gap-6 text-medium font-normal">
                <div 
                  onClick={sendRequest}
                  className="hover:underline transition-all"
                >
                  Да
                </div>
                <div 
                  onClick={() => setOrderModal(false)}
                  className="hover:underline transition-all text-gray-400"
                >
                  Нет
                </div>
              </div>
            </div>
            <span className="dark:text-white text-gray-900">
              Итого: {countInfo.totalPrice} руб.
            </span>
            <div 
              onClick={() => {if(countInfo.totalPrice > 0) setOrderModal(true)}}
              className={`
                ${countInfo.totalPrice === 0 && 'opacity-50'}
                ${countInfo.totalPrice > 0 && 'hover:opacity-70'} 
                transition-all
                mt-10
                flex 
                items-center 
                justify-center 
                p-2 
                text-white 
                bg-purple-400 
                rounded-full
              `}
              >
                {countInfo.totalPrice > 0 ? 'Заказать' : 'Товаров нет'}
            </div>
          <div className={`${reqError ? 'block' : 'hidden'} mt-4 text-red-400 text-sm text-light text-center`}>Что-то пошло не так</div>
          </div>
        </div>

      ) 
      : 
      (
        <Loading/>
      ) 
    }
    </>
  )
}
 
export default BagList;