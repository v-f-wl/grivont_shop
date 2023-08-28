'use client'
import { 
  HiOutlineSquaresPlus,
   HiOutlineTag, 
   HiOutlineCalendarDays, 
   HiOutlineHashtag  
} from 'react-icons/hi2'

import { AppDispatch, useAppSelector } from "@/redux/store"
import { changeModal } from "@/redux/features/createModalOpen-slice"
import { useDispatch } from "react-redux"

import CreatePost from './CreatePost';
import ItemContainer from './CreateItemMenu';
import CreateModal from './CreateModal';
import Title from '@/components/UI/Title';


const Create = () => {
  const modalLavbel = useAppSelector(store => store.createModal.openModal)
  const dispatch = useDispatch<AppDispatch>()

  // ЗАГОЛОВОК ДЛЯ ЭЛЕМЕНТОВ МЕНЮ
  const LabelTitle = ({title} : {title: string}) => {
    return <span>{title}</span>
  }

  // ОТКРЫТИЕ ОСНОВНОГО ОКНА
  const openCreateModal = () => {
    dispatch(changeModal('product'))
  }

  const openCreateProduct = () => {
    dispatch(changeModal(''))
  }
  // ОТКРЫТИЕ МОДАЛЬНОГО ОКНА ПОСТОВ
  const openPostCreate = () => {
    dispatch(changeModal('post'))
  }

  return (  
    <div 
      className="md:relative"
    >
      {/* ИКОНКА ОТКРЫТИЯ МЕНЮ СОЗДАНИЯ */}
      <HiOutlineSquaresPlus
        onClick={openCreateModal}
        className={`${modalLavbel === 'product' && 'text-indigo-400'} hover:text-indigo-400 transition-colors`}
      />

      {/* МЕНЮ СОЗДАНИЯ */}
      <CreateModal>
        <Title title='Добавить'/>
        <div className="mt-6 flex flex-col gap-4 text-base">
          <ItemContainer handleFunction={() => openCreateProduct()} link='/productcreate'>
            <HiOutlineTag size={26}/>
            <LabelTitle title="Добавить Товар"/>
          </ItemContainer>
          <ItemContainer handleFunction={openPostCreate} link=''>
            <HiOutlineHashtag size={26}/>
            <LabelTitle title="Добавить Пост"/>
          </ItemContainer>
          <ItemContainer mute={true} link=''>
            <HiOutlineCalendarDays size={26}/>
            <LabelTitle title="Добавить Событие"/>
          </ItemContainer>
        </div>
      </CreateModal>

      {/* МОДАЛЬНОЕ ОКНО СОЗДАНИЯ ПОСТА */}
      <CreatePost/>
    </div>
  );
}
 
export default Create;