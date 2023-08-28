'use client'
import { useState } from "react";

import axios from "axios";

import Loading from "@/components/UI/Loading";

const FormPost = ({userId} : {userId: string | undefined}) => {
  const [postCreating, setPostCreating] = useState(false)
  const [postText, setPostText] = useState('')

  const createPost = () => {
    setPostCreating(true)
    if(userId === undefined) return
    if(postText.trim().length < 5){
      setPostCreating(false)
      return false
    }else(
      axios.post('/api/post/createPost', {userId, postText})
      .then(() => {
        setPostCreating(false)
        setPostText('')
      })
      .catch(() => {
        setPostCreating(false)
      })
    )
  }
  return (  
    <div className="">
      {postCreating ?
        (
          <Loading/>
        ) : (
          
          <>
          <textarea 
            onChange={(e) => setPostText(e.target.value)}
            className='
              w-full h-[80px] 
              mt-4 md:mt-8
              border 
              resize-none  outline-none
              border-purple-400 bg-inherit
              rounded-xl  p-2
            dark:text-white text-gray-900
              text-lg
            '
            placeholder='Введите текст'
          >
          </textarea>
          <div 
            onClick={() => createPost()}
            className="
              mt-2 md:mt-4 p-2 
              flex items-center justify-center 
              text-base 
              border dark:border-white border-purple-400
              rounded-xl 
              cursor-pointer hover:opacity-40 transition-all
            "
          >
            Отправить
          </div></>
        )
      }
    </div>
  );
}
 
export default FormPost;