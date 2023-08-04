'use client'
import { useState } from "react";
import Cookies from "js-cookie";

import Input from "./Input";
import axios from "axios";
import { useRouter } from "next/router";

import { AppDispatch } from "@/redux/store"
import { changeAuth } from "@/redux/features/authSwitch-slice"
import { useDispatch } from "react-redux"

interface UserData {
  firstName: string;
  secondName: string;
  nickname: string;
  password: string;
}

const initialUserData: UserData = {
  firstName: '',
  secondName: '',
  nickname: '',
  password: ''
};


const SignIn = () => {
  const [modalRules, setModalRules] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserData>(initialUserData)
  const handeChange = (label: string, value: string) => {
    setUserData(prev => {
      return {...prev, [label]: value}
    })
  }
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()


  const createUser = () => {
    const data = {
      fullName: `${userData.firstName} ${userData.secondName}`,
      nickname: userData.nickname,
      password: userData.password

    }
    axios.post('/api/createAccount', data)
    .then(res => {
      Cookies.set('id', res.data._doc._id)
      Cookies.set('token', res.data.token)
      router.push('/')
    })
  }

  return (
    <div className="w-1/2 h-3/4 flex flex-col gap-8 items-center">
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-purple-400 font-bold text-4xl">Регистрация </h2>
        <div className="text-xl text-gray-300">Добро подаловать в Grivont</div>
      </div>
      <form className="flex flex-col gap-3 w-2/3">
        <Input id='firstName' inputType="text" changeValue={handeChange} palceHolder="Введите имя"/>
        <Input id='secondName' inputType="text" changeValue={handeChange} palceHolder="Введите фамилию"/>
        <Input id='nickname' inputType="text" changeValue={handeChange} palceHolder="Придумайте ник"/>
        <div 
          onClick={() => setModalRules(prev => !prev)}
          className="
            cursor-pointer 
            p-2 
            rounded-md 
            bg-purple-400 bg-opacity-20
            text-sm font-light
          "
        >
          Подробнее о создании ника
        </div>
        <div 
          className={`
            ${modalRules ? '' : '-translate-y-6'}
            ${modalRules ? '' : 'h-0'} 
            overflow-hidden transition-all duration-300
          `}
        >
          <ul className="list-disc list-inside text-gray-600">
            <li>Используйте только латинские буквы и цифры.</li>
            <li>Длина ника должна быть от 4 до 20 символов.</li>
            <li>Вы можете использовать символы "_", "-", и "/".</li>
            <li>Ник должен быть уникальным.</li>
          </ul>
        </div>
        <Input id='password' inputType="password" changeValue={handeChange} palceHolder="Введите пароль"/>
        <div 
          onClick={createUser}
          className="
            border 
            p-3 
            rounded-md 
            flex 
            items-center mt-4
            justify-center text-xl cursor-pointer
          "
        >
          Создать аккаунт
        </div>
      </form>
      <div 
        onClick={() => dispatch(changeAuth('login'))}
        className="cursor-pointer"
      >
        Войти
      </div>
    </div>
  );
}

export default SignIn;