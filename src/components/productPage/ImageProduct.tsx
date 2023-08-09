'use client'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import Link from 'next/link'

interface ImageProductProps{
  productId: string
  productTitle: string,
  category: string,
  price: number,
  city: string,
  userRef: string,
  imageUrl: string
}
const ImageProduct:React.FC<ImageProductProps> = ({
  productId,
  productTitle,
  price,
  category,
  userRef,
  city,
  imageUrl
}) => {
  const [loaded, setLoaded] = useState<boolean>()
  const [loadedFavorite, setLoadedFavorite] = useState<boolean>(false)
  const [inBag, setInBag] = useState<boolean>(false)
  const [authtorNick, setAuthtorNick] = useState<string>('')
  const [inFavorite, setInFfavorite] = useState<boolean>(false)
  const userId = Cookies.get('id')

  useEffect(() => {
    if(productId !== undefined && userId !== undefined){
      axios.post('/api/checkProductInBag', {userId, productId})
      .then(res => {
        setInBag(res.data.result)
        setLoaded(true)
      })
      .catch(error => console.log(error))
      axios.post('/api/checkProductInFavorite', {userId, productId})
      .then(res => {
        setInFfavorite(res.data.result)
        setLoadedFavorite(true)
      })
      .catch(error => console.log(error))
    }
  }, [productId, userId]);

  useEffect(() => {
    if(userRef !== undefined){
      axios.get(`/api/getProfileName/?id=${userRef}&onlyNick=${true}`)
      .then(res => setAuthtorNick(res.data.nickname))
      .catch(error => console.log(error))
    }
    
  }, [userRef]);

  const addToBag = () => {
    if(productId !== undefined && userId !== undefined && inBag === false){
      axios.post('/api/addToBag', {userId, productId})
      .then(() => setInBag(true))
      .catch((error) => console.log(error,'error'))
    }
  }
  const changeFavorite = () => {
    if(productId !== undefined && userId !== undefined){
      setLoadedFavorite(false)
      if(inFavorite === false){
        axios.post('/api/addToFavorite', {userId, productId})
        .then(() => {
          setInFfavorite(true)
          setLoadedFavorite(true)
        })
        .catch((error) => console.log(error,'error'))
      }else{
        axios.patch('/api/deleteFavoriteItem', {userId, productId})
          .then(() => {
            setInFfavorite(false)
            setLoadedFavorite(true)
          })
          .catch((error) => console.log(error,'error'))
      }
    }
  }

  return (  
    <div className="flex flex-col lg:flex-row lg:grid lg:grid-cols-chat lg:gap-8">
      <div className="h-[230px] md:h-auto aspect-square rounded-xl overflow-hidden flex justify-center">
        <img 
          className="max-w-full max-h-full object-contain rounded-xl overflow-hidden"
          src={imageUrl}
          alt="img" 
        />
      </div>
      <div className="">
        <h2 
          className="text-2xl md:text-3xl lg:text-5xl text-purple-400 font-bold clamped-text"
        >
          {productTitle}
        </h2>
        <div className="mt-4 lg:mt-8 inline-flex flex-col gap-1 md:gap-2 text-gray-500 text-sm md:text-base">
          <div className="text-lg font-light">
            <span className='text-purple-400'>Город: </span><span className="capitalize"> {city}</span>
          </div>
          <Link href={`/profilepage/?id=${userRef}`} className="text-lg font-light cursor-pointer">
            <span className='text-purple-400'>Автор: </span><span className="capitalize underline">@{authtorNick}</span>
          </Link>
          <div className="text-lg font-light">
            <span className='text-purple-400'>Категория: </span><span className="capitalize">{category}</span>
          </div>
        </div>
        <div className="mt-5 text-gray-400 text-2xl font-medium">
          {price} руб
        </div>
        <div className="mt-8 lg:mt-16 flex flex-col lg:flex-row flex-wrap items-start gap-4 lg:gap-6">
          {loaded ? 
            (
              <div 
                onClick={() => addToBag()}
                className={`
                  ${inBag ? 'opacity-40' : ''}
                  ${inBag ? 'cursor-default' : 'cursor-pointer'}
                  ${inBag ? '' : 'hover:opacity-80'}
                  ${inBag ? 'bg-gray-600' : 'bg-purple-400'}
                  md:py-3 py-2 px-4 md:px-5 
                  rounded-full 
                  text-white 
                  text-bold 
                  text-xl 
                  transition-all
                `}
              >
                {inBag ? 'В корзине' : 'Добавить в корзину'}
              </div>
            )
            :
            (
              <div 
                className={`
                  md:py-3 py-2 px-4 md:px-5
                  bg-purple-400 
                  rounded-full 
                  text-white 
                  text-bold 
                  text-xl 
                  opacity-60
                `}
              >
                Загрузка...
              </div>
            )
          }
          {loadedFavorite ?
          (
            <div 
              onClick={changeFavorite}
              className={`
                md:py-3 py-2 px-4 md:px-5
                border border-purple-400
                rounded-full 
                text-white 
                text-bold 
                text-xl
                cursor-pointer hover:opacity-80 transition-all
              `}
            >
              {inFavorite ? 'Удалить из закладок' : 'Добавить в закладки'}
            </div>
          )
          :
          (
            <div 
              className="
                md:py-3 py-2 px-4 md:px-5
                border border-purple-400
                rounded-full 
                text-white 
                text-bold 
                text-xl
                cursor-pointer hover:opacity-60 transition-all
                opacity-60
              "
            >
              Загрузка...
            </div>
          )
          }
        {/* <div className=""> */}
          {/* <div className="flex lg:inline-flex gap-3 items-center md:py-3 py-2 px-4 md:px-5 border text-bold rounded-full text-xl cursor-pointer hover:opacity-60 transition-all">
            <span className="">
              <HiOutlineChatBubbleOvalLeft size={24}/>
            </span>
            <span className="">Связаться с автором</span>
          </div> */}
        {/* </div> */}
        </div>
      </div>
    </div>
  );
}
 
export default ImageProduct;