'use client'
import { HiOutlineXMark } from "react-icons/hi2";

import Cookies from "js-cookie";

import { AppDispatch } from "@/redux/store"
import { changeModal } from "@/redux/features/createModalOpen-slice"
import { useDispatch } from "react-redux"

import CreatePostContainet from "./createPostUI/CreatePostContainet";
import Title from "@/components/UI/Title";
import FormPost from "./createPostUI/FormPost";


const CreatePost = () => {  
  const userId = Cookies.get('id')

  const dispatch = useDispatch<AppDispatch>()
  const closePostModal = () => {
    dispatch(changeModal('product'))
  }

  return ( 
    <CreatePostContainet>
      <div className="flex items-center justify-between">
        <Title title="Создать пост"/>
        <HiOutlineXMark 
          onClick={closePostModal}
          className="cursor-pointer text-xl"
        />
      </div>
      <FormPost userId={userId}/>
    </CreatePostContainet>
  );
}
 
export default CreatePost;