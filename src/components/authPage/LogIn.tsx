'use client'
import { AppDispatch } from "@/redux/store"
import { changeAuth } from "@/redux/features/authSwitch-slice"
import { useDispatch } from "react-redux"
import Input from "./Input"
import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"


interface UserData {
  nickname: string;
  password: string;
}

const initialUserData: UserData = {
  nickname: '',
  password: ''
};


const LogIn = () => {
  const [userData, setUserData] = useState<UserData>(initialUserData)
  const handeChange = (label: string, value: string) => {
    setUserData(prev => {
      return {...prev, [label]: value}
    })
  }
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const login = () => {
    axios.post('/api/login', userData)
    .then(res => {
      Cookies.set('id', res.data._id)
      Cookies.set('token', res.data.token)
      router.push('/')
    })
  }
  return ( 
    <div 
      className="w-1/2 h-3/4 flex flex-col gap-8 items-center"
    >
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-purple-400 font-bold text-4xl">Войти </h2>
        <div className="text-xl text-gray-300">Добро подаловать в Grivont</div>
      </div>
      <div className="flex flex-col gap-3 w-2/3">
        <Input id='nickname' inputType="text" changeValue={handeChange} palceHolder="Введите ник"/>
        <Input id='password' inputType="text" changeValue={handeChange} palceHolder="Введите пароль"/>
        <div 
          onClick={() => login()}
          className="border p-3 rounded-md flex items-center justify-center text-xl"
        >
          Войти
        </div>
      </div>
      <div 
        onClick={() => dispatch(changeAuth('signin'))}
        className="cursor-pointer"
      >
        Регистрация
      </div>
    </div>
  );
}
 
export default LogIn;