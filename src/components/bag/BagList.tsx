'use client'
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import EmptyPage from "../UI/EmptyPage";
import Loading from "../UI/Loading";
import ProductCardForBag from "../UI/ProductCardForBag"
import { generateOrderNumber } from "../../../utils/generationOrder"
import { useRouter } from "next/navigation";


type ImageData = {url: string}

interface ImageObj{
  data: ImageData 
}

interface initialStateProps {
  _id: string,
  title: string,
  description: string,
  imageSrc: ImageObj[],
  priceOfProduct: number
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

  const userId: string | undefined = Cookies.get('id')
  const router = useRouter()

  useEffect(() => {
    if(userId !== undefined){
      axios.get(`/api/getBagItems/?userId=${userId}`)
      .then(res => {
        setBagData(res.data)
        return res.data
      })
      .then((data) => {
        let handler: number = 0
        let count = 0
        for(let item of data){
          count++
          handler = handler + item.priceOfProduct
        }
        setCountInfo(prev => ({ ...prev, totalPrice: handler }))
        setCountInfo(prev => ({ ...prev, totalCount: count }))
      })
      .then(() => {
        setLoaded(true)
      })
      .catch(error => console.log(error))
    }
  }, [userId])

  const changeCount = (value: number) => {
    setCountInfo(prev => {
      const obj = {...prev }
      obj.totalPrice = prev.totalPrice - Math.abs(value)
      obj.totalCount = prev.totalCount - 1
      return obj
    })
  }

  const sendRequest = () => {
    const orderNumber =  generateOrderNumber(7)
    if(userId !== undefined){
      setReqSended(true)
      const objForRequest: objForRequest = {
        orderNumber: orderNumber,
        totalPrice: countInfo.totalPrice,
        totalCount: countInfo.totalCount,
        items:[]
      }
  
      for(const item of bagData){
        const obj = {
          productId: item._id,
          image: item.imageSrc[0].data.url,
          title: item.title
        }
        objForRequest.items.push(obj)
      }
      axios.post(`/api/createOrder/?userId=${userId}`, objForRequest)
      .then(res => {
        setReqSended(false)
        router.push('/orderspage')
      })
      .catch(error => console.log(error))
    }
  }


  return (  
    <>
    {loaded ? 
      (
        <div className="relative flex flex-col-reverse  lg:grid md:grid-cols-profile gap-4 md:gap-8 lg:gap-12 items-start">
          <div className="">
            {bagData.length > 0 ? 
              (
                <div className="flex flex-col gap-6">
                  {bagData.map(item => (
                    <ProductCardForBag
                      key={item._id}
                      productId={item._id}
                      imageSrc={item.imageSrc[0].data.url}
                      productTitle={item.title}
                      productDescription={item.description}
                      productPrice={item.priceOfProduct}
                      wasDeleted={changeCount}
                      userId={userId}
                      orderLoading={reqSended}
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
            className="w-full lg:w-auto relative rounded-xl bg-gray-600 p-6 text-2xl font-bold"
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
            <span>
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
          </div>
        </div>

      ) 
      : 
      (
        <Loading/>
      ) 
    }
    </>
  );
}
 
export default BagList;