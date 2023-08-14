'use client'
import { Fragment, useEffect, useState } from 'react'
import NumberInput from '../productCreate/NumberInput'
import Cookies from 'js-cookie'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ImageProductProps{
  productId: string
  productTitle: string,
  category: string,
  price: number,
  countOfProducts: number,
  city: string,
  userRef: string,
  imageUrl: string,
  imgId: string
}
const ImageProduct:React.FC<ImageProductProps> = ({
  productId,
  productTitle,
  price,
  category,
  userRef,
  countOfProducts,
  city,
  imageUrl,
  imgId
}) => {
  const [loaded, setLoaded] = useState<boolean>()
  const [loadChangeCount, setChangeLoadCount] = useState<boolean>(false)
  const [loadedFavorite, setLoadedFavorite] = useState<boolean>(false)

  const [inBag, setInBag] = useState<boolean>(false)
  const [isAuthtor, setIsAuthtor] = useState<boolean>(false)
  const [inFavorite, setInFavorite] = useState<boolean>(false)


  const [authtorNick, setAuthtorNick] = useState<string>('')
  const [countModal, setCOuntModal] = useState<string>('close')
  const [newCount, setNewCount] = useState(0)

  const [errorButton, setErrorButton] = useState<boolean>(false)
  const [errorChangeCount, setErrorChangeCount] = useState<boolean>(false)

  const userId = Cookies.get('id')
  const router = useRouter()

  useEffect(() => {
    setNewCount(countOfProducts)
  }, [countOfProducts])

  useEffect(() => {
    setIsAuthtor(userRef === userId)
  }, [userRef, userId])


  useEffect(() => {
    const fetchData = async () => {
      if (productId !== undefined && userId !== undefined) {
        try {
          const bagResponse = await axios.get(`/api/checkProductInBag/?userId=${userId}&productId=${productId}`);
          setInBag(bagResponse.data.result);
          setLoaded(true);

          const favoriteResponse = await axios.get(`/api/checkProductInFavorite/?userId=${userId}&productId=${productId}`);
          setInFavorite(favoriteResponse.data.result);
          setLoadedFavorite(true);
        } catch (error) {
          setErrorButton(true);
        }
      }
    };

    fetchData();
  }, [productId, userId]);


  useEffect(() => {
    const fetchAuthorNick = async () => {
      if (userRef !== undefined) {
        try {
          const profileNameResponse = await axios.get(`/api/getProfileName/?id=${userRef}&onlyNick=true`);
          setAuthtorNick(profileNameResponse.data.nickname);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchAuthorNick();
  }, [userRef]);

  const openCountModal = () => {
    setCOuntModal(prev => {
      if(prev === 'close'){
        return 'open'
      }else{
        return 'close'
      }
    })
  }

  const changeValueComponent = (label: string, value: number) => {
    setNewCount(value)
  }

  const changeCountReq = () => {
    setChangeLoadCount(true)
    if(newCount < 1 || loadChangeCount === true){
      return
    }else{
      axios.patch('/api/changeCountOfProduct', {productId, count: newCount})
        .then(res => setChangeLoadCount(false))
        .catch(error => {
          setErrorChangeCount(true)
          setChangeLoadCount(false)
        })
    }
  }

  const addToBag = async () => {
    if (productId !== undefined && userId !== undefined && !inBag) {
      try {
        await axios.post('/api/addToBag', { userId, productId });
        setInBag(true);
      } catch (error) {
        console.log(error, 'error');
      }
    }
  }

  const changeFavorite = async () => {
    if (productId !== undefined && userId !== undefined) {
      setLoadedFavorite(false);
      try {
        if (!inFavorite) {
          await axios.post('/api/addToFavorite', { userId, productId });
        } else {
          await axios.patch('/api/deleteFavoriteItem', { userId, productId });
        }
        setInFavorite(!inFavorite);
        setLoadedFavorite(true);
      } catch (error) {
        console.log(error, 'error');
      }
    }
  }

  const deleteProduct = () => {
    if(productId === undefined || imgId === undefined){
      return
    }
    axios.delete(`/api/deleteProduct/?productId=${productId}&imgId=${imgId}`)
      .then((res) => {
        router.push('/')
      })
      .catch(error => console.log(error))
  }
  return (  
    <div className="flex flex-col lg:flex-row lg:grid lg:grid-cols-chat lg:gap-8">
      <div className="h-[230px] md:h-auto aspect-square rounded-xl overflow-hidden flex justify-center">
        <img 
          className="max-w-full max-h-full object-cover rounded-xl overflow-hidden"
          src={imageUrl}
          alt="img" 
        />
      </div>
      <div className="flex-1">
        <h2 
          className="text-2xl md:text-3xl lg:text-4xl text-purple-400 font-bold clamped-text"
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
          <div className="text-lg font-light">
            <span className='text-purple-400'>В наличии: </span><span className="capitalize">{countOfProducts}</span>
          </div>
        </div>
        <div className="mt-5 text-gray-400 text-2xl font-medium">
          {price} руб
        </div>
        <div className="mt-8">
          {isAuthtor ? 
            (
              <div className="flex flex-col gap-4">
                
                <div className="flex flex-col gap-2">
                  <span 
                    onClick={() => openCountModal()}
                    className="cursor-pointer underline"
                  >
                    Изменить Количество
                  </span>
                  <div 
                    className={`
                      h-0
                      ${countModal === 'open' && 'h-auto'} 
                      overflow-hidden transition-all
                      inline-flex items-center gap-4
                    `}
                  >
                    <NumberInput 
                      changePrice={changeValueComponent} 
                      handleError={errorChangeCount} 
                      placeholderValue='Новое колличество'
                      label='' 
                      argument={'count'}
                    />
                    <div 
                      onClick={changeCountReq}
                      className="border border-purple-400 rounded-lg py-4 px-3 mt-4 text-lg cursor-pointer"
                    >
                      {loadChangeCount ? 
                        (
                          <AiOutlineLoading3Quarters size={24} className="mx-3 animate-spin"/>
                        ) 
                        : 
                        'Сохранить'
                      }
                    </div>
                  </div>
                </div>
                <div 
                  onClick={deleteProduct}
                  className="cursor-pointer text-gray-300 underline"
                >
                  Удалить
                </div>
              </div>
            ) 
            : 
            (
              <Fragment>
                {countOfProducts > 0 ? (
                  <div className={`${errorButton ? 'hidden' : 'block'} mt-8 lg:mt-16 flex flex-col lg:flex-row flex-wrap items-start gap-4 lg:gap-6`}>
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
                          ${errorButton ? 'hidden' : 'block'}
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
        
                ) : 
                (
                  <div className=" text-xl text-gray-600">
                    Товара нет в наличии
                  </div>
                )
                }
              </Fragment>
            )
          }
        </div>
      </div>
    </div>
  );
}
 
export default ImageProduct;