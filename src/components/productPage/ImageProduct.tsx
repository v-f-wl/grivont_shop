'use client'

import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Cookies from 'js-cookie'
import axios from 'axios'

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiCheck } from 'react-icons/hi2'
import { colorsPallet } from '../../../utils/colors'
import NumberInput from '../productCreate/NumberInput'

interface ImageProductProps{
  productId: string
  productTitle: string,
  category: string,
  price: number,
  countOfProducts: number,
  colorInfo?: string,
  userRef: string,
  imageUrl: string,
  imgId: string
}
const ImageProduct:React.FC<ImageProductProps> = ({
  productId,
  productTitle,
  price,
  category,
  colorInfo,
  userRef,
  countOfProducts,
  imageUrl,
  imgId
}) => {
  const [loaded, setLoaded] = useState<boolean>(false)
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


  // ЯВЛЯЕТСЯ ЛИ ПОЛЬЗОВАТЕЛЬ АВТОРОМ ТОВАРА
  useEffect(() => {
    setIsAuthtor(userRef === userId)
  }, [userRef, userId])


  // ПОЛУЧЕНИЕ ДАННЫХ О ТОВАРЕ
  useEffect(() => {
    const fetchData = async () => {
      if (productId !== undefined && userId !== undefined) {
        try {
          await axios.get(`/api/bag/checkProductInBag/?userId=${userId}&productId=${productId}`)
            .then(res => {
              setInBag(res.data.result);
            })
            .then(() => {
              setLoaded(true)
            })

          const favoriteResponse = await axios.get(`/api/favorite/checkProductInFavorite/?userId=${userId}&productId=${productId}`);
          setInFavorite(favoriteResponse.data.result);
          setLoadedFavorite(true);
        } catch (error) {
          setErrorButton(true);
        }
      }
    };

    fetchData();
  }, [productId, userId]);


  // ПОЛУЧЕНИЕ ССЫЛКИ НА АВТОРА ТОВАРА ИЗ НИКНЕЙМА
  useEffect(() => {
    const fetchAuthorNick = async () => {
      if (userRef !== undefined) {
        try {
          const profileNameResponse = await axios.get(`/api/user/getProfileName/?id=${userRef}&onlyNick=true`);
          setAuthtorNick(profileNameResponse.data.nickname);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchAuthorNick();
  }, [userRef]);

  // ОКТРЫТИЕ БЛОКА ИЗМЕНЕНИЧ КОЛИЧЕСТВА ТОВАРА
  const openCountModal = () => {
    setCOuntModal(prev => {
      if(prev === 'close'){
        return 'open'
      }else{
        return 'close'
      }
    })
  }

  // ФУНКЦИЯ ИЗМЕНЕНИЯ КОЛИЧЕСТВА ТОВАРА
  const changeValueComponent = (label: string, value: number) => {
    setNewCount(value)
  }

  // ИЗМЕНЕНИЕ КОЛИЧЕСТВА ТОВАРА В БАЗЕ ДАННЫХ
  const changeCountRequest = () => {
    // ВКЛЮЧЕНИЕ LOADER ДЛЯ КНОПКИ 
    setChangeLoadCount(true)
    if(loadChangeCount === true){
      return
    }else{
      axios.patch('/api/product/changeCountOfProduct', {productId, count: newCount})
        .then(res => setChangeLoadCount(false))
        .then(() => {
          const currentURL = window.location.href;
          const newURL = currentURL
          window.location.href = newURL;

        })
        .catch(error => {
          setErrorChangeCount(true)
          setChangeLoadCount(false)
        })
    }
  }

  // ДОБАВЛЕНИЕ ТОВАРА В КОРЗИНУ 
  const addToBag = async () => {
    if (productId !== undefined && userId !== undefined && !inBag && loaded === true) {
      console.log(loaded === true, productId !== undefined, userId !== undefined)
      try {
        await axios.post('/api/bag/addToBag', { userId, productId });
        setInBag(true);
      } catch (error) {
        console.log(error, 'error');
      }
    }
  }

  // ДОБАВЛЕНИЕ ЛИБО УДАЛЕНИЕ ТОВАРА ИЗ ИЗБРАННОГО
  const changeFavorite = async () => {
    if (productId !== undefined && userId !== undefined && loadedFavorite === true) {
      setLoadedFavorite(false);
      try {
        if (!inFavorite) {
          await axios.post('/api/favorite/addToFavorite', { userId, productId });
        } else {
          await axios.patch('/api/favorite/deleteFavoriteItem', { userId, productId });
        }
        setInFavorite(!inFavorite);
        setLoadedFavorite(true);
      } catch (error) {
        console.log(error, 'error');
      }
    }
  }

  // УДАЛИТЬ ТОВАР
  const deleteProduct = () => {
    if(productId === undefined || imgId === undefined){
      return
    }
    axios.delete(`/api/product/deleteProduct/?productId=${productId}&imgId=${imgId}`)
      .then((res) => {
        router.push('/')
      })
      .catch(error => console.log(error))
  }
  return (  
    <div className="flex flex-col lg:flex-row lg:grid lg:grid-cols-chat lg:gap-8">


      {/* БЛОК С ИЗОБРАЖЕНИЕМ ТОВАРА */}
      <div className="h-[230px] md:h-auto aspect-square rounded-xl overflow-hidden flex justify-center">
        <img 
          className="max-w-full max-h-full object-cover rounded-xl overflow-hidden"
          src={imageUrl}
          alt="img" 
        />
      </div>


      {/* БЛОК С ОПИСАНИЕМ ТОВАРА */}
      <div className="flex-1">


        {/* ЗАГОЛОВОК ТОВАРА */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl dark:text-purple-400 text-gray-800 font-bold">
          {productTitle}
        </h2>


        {/* ИНФОРМАЦИЯ О ТОВАРЕ */}
        <div className="mt-4 lg:mt-8 inline-flex flex-col gap-1 md:gap-2 dark:text-gray-300 text-gray-700 text-sm md:text-base">
          <div className="text-lg font-light">
            <span className='text-purple-400'>Категория: </span><span className="capitalize">{category}</span>
          </div>
          <Link href={`/profilepage/?id=${userRef}`} className="text-lg font-light cursor-pointer">
            <span className='text-purple-400'>Автор: </span><span className="capitalize underline">@{authtorNick}</span>
          </Link>
          <div className="text-lg font-light">
            <span className='text-purple-400'>Цвет: </span><span className="capitalize">{colorInfo ? colorsPallet[colorInfo].value : '-'}</span>
          </div>
          <div className="text-lg font-light">
            <span className='text-purple-400'>В наличии: </span><span className="capitalize">{countOfProducts}</span>
          </div>
        </div>


        {/* ЦЕНА ТОВАРА */}
        <div className="mt-5 dark:text-gray-300 text-purple-400 text-2xl font-medium">
          {price} руб
        </div>

        {/* ПРОВЕРКА НА ТО ЯВЛЯЕТСЯ ЛИ ПОЛЬЗОВАТЕЛЕМ АВТОРОМ ЭТОГО ТОВАРА */}
        <div className="mt-8">
          {isAuthtor ? 
            (

              // АВТОР ТОВАРА
              <div className="flex flex-col gap-4">
                
                {/* ИЗМЕНЕНИЕ КОЛИЧЕСТВА ТОВАРА */}
                <div className="flex flex-col gap-2">
                  <span 
                    onClick={() => openCountModal()}
                    className="cursor-pointer underline"
                  >
                    Изменить Количество
                  </span>
                  <form 
                    className={`
                      h-0
                      ${countModal === 'open' && 'h-auto'} 
                      overflow-hidden transition-all
                      flex items-center gap-4
                    `}
                  >
                    <NumberInput 
                      changePrice={changeValueComponent} 
                      handleError={errorChangeCount} 
                      placeholderValue='Новое колличество'
                      context='' 
                      label={'count'}
                    />
                    <div 
                      onClick={changeCountRequest}
                      className="border border-purple-400 rounded-lg py-3 md:py-4 px-3 mt-4 text-lg cursor-pointer"
                    >
                      {loadChangeCount ? 
                        (
                          <AiOutlineLoading3Quarters size={24} className="mx-3 animate-spin"/>
                        ) 
                        : 
                        <HiCheck size={24}/>
                      }
                    </div>
                  </form>
                </div>


                {/* УДАЛЕНИЕ ТОВАРА */}
                <div 
                  onClick={deleteProduct}
                  className="cursor-pointer dark:text-gray-200 text-gray-800 underline"
                >
                  Удалить
                </div>
              </div>
            ) 
            : 
            (
              <Fragment>
                {/* ПРОВЕРКА НА ТО ЕСТЬ ЛИ ТОВАР В НАЛИЧИИ*/}
                {countOfProducts > 0 ? (
                  
                  <div className={`${errorButton ? 'hidden' : 'block'} mt-8 lg:mt-16 flex flex-col lg:flex-row flex-wrap items-start gap-4 lg:gap-6`}>
                    
                    
                    {/* 
                        КНОПКА ДОБАВЛЕНИЯ В КОРЗИНУ 
                        false - отправлен запрос на сервер для проверки есть ли товар в корзине, включен loader
                        true - ответ получен
                    */}
                    {loaded ? 
                      (
                        <div 
                          onClick={() => addToBag()}
                          className={`
                            ${inBag ? 'opacity-40' : ''}
                            ${inBag ? 'cursor-default' : 'cursor-pointer'}
                            ${inBag ? '' : 'hover:opacity-80'}
                            ${inBag ? 'bg-gray-600' : 'bg-purple-400'}
                            md:py-2 py-1 px-3 md:px-4 
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
                            md:py-2 py-1 px-3 md:px-4 
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


                    {/* 
                        КНОПКА ЗАКЛАДКИ 
                        false - отправлен запрос на сервер для проверки есть ли товар в избранном, включен loader
                        true - ответ получен
                    */}
                    {loadedFavorite ?
                    (
                      <div 
                        onClick={changeFavorite}
                        className={`
                          ${errorButton ? 'hidden' : 'block'}
                          md:py-2 py-1 px-3 md:px-4 
                          border border-purple-400
                          rounded-full 
                          dark:text-white text-gray-900
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
                          md:py-2 py-1 px-3 md:px-4 
                          border border-purple-400
                          rounded-full 
                          dark:text-white text-gray-900 
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