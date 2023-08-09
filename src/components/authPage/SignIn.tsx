'use client'
import { useState } from "react";
import Cookies from "js-cookie";

import axios from "axios";
import { useRouter } from "next/router";

import { AppDispatch } from "@/redux/store"
import { changeAuth } from "@/redux/features/authSwitch-slice"
import { useDispatch } from "react-redux"
import { isValidName, isValidNick, isValidPassword } from "./validations";
import { Button, ErrorTitle, Input, SubTitle, Title } from "./AuthUI";


interface UserData {
  firstName: string;
  secondName: string;
  nickname: string;
  password: string;
}
type ValidationCallback = () => void;

const initialUserData: UserData = {
  firstName: '',
  secondName: '',
  nickname: '',
  password: ''
};


const SignIn = () => {
  const [modalRules, setModalRules] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserData>(initialUserData)
  const [notValidField, setNotValidField] = useState<string[]>([])
  const [notValidNick, setNotValidNick] = useState<boolean>(false)
  const handeChange = (label: string, value: string) => {
    setUserData(prev => {
      return {...prev, [label]: value}
    })
  }

  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  
  const validValue = (callback: ValidationCallback) => {
    let firstName = userData.firstName
    let secondName = userData.secondName
    let nickname = userData.nickname
    let password = userData.password


    const notValidFields = []

    if(firstName.trim().length < 2 || isValidName(firstName) === false){
      notValidFields.push('firstName')
    }

    if(secondName.trim().length < 2 || isValidName(secondName) === false){
      notValidFields.push('secondName')
    }

    if(isValidNick(nickname) === false || nickname.length < 4){
      notValidFields.push('nickname')
    }

    if(isValidPassword(password) === false || password.length < 5){
      notValidFields.push('password')
    }
    setNotValidField(notValidFields)

    if (notValidFields.length === 0) {
      callback()
    }
  }

  const createUser = () => {
    setNotValidField([])
    setNotValidNick(false)
    validValue(() => {
      if(notValidField.length === 0){
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
        .catch((res) => setNotValidNick(true))
      }else{
        return
      }
    })
  }

  return (
    <div className="w-full px-8 md:px-0 md:w-1/2 h-3/4 flex flex-col gap-8 items-center">
      <div className="flex flex-col gap-4 items-center">
        <Title title="Регистрация"/>
        <SubTitle title="Добро пожаловать в Grivont"/>
      </div>
      {notValidNick && (
        <ErrorTitle title="Ник уже занят"/>
      )}
      <form className="flex flex-col gap-3 w-full md:w-2/3">
        <Input id='firstName' inputType="text" changeValue={handeChange} palceHolder="Введите имя" errorField={notValidField.indexOf('firstName') === -1}/>
        <Input id='secondName' inputType="text" changeValue={handeChange} palceHolder="Введите фамилию" errorField={notValidField.indexOf('secondName') === -1}/>
        <Input id='nickname' inputType="text" changeValue={handeChange} palceHolder="Придумайте ник" errorField={notValidField.indexOf('nickname') === -1}/>
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
          <ul className="text-sm md:text-base list-disc list-inside text-gray-600">
            <li>Используйте только латинские буквы и цифры.</li>
            <li>Длина ника должна быть от 4 до 20 символов.</li>
            <li>Вы можете использовать символы &quot;_&quot;, &quot;-&quot;, и &quot;/&quot;.</li>
            <li>Ник должен быть уникальным.</li>
          </ul>
        </div>
        <Input id='password' inputType="password" changeValue={handeChange} palceHolder="Введите пароль" errorField={notValidField.indexOf('password') === -1}/>
        <Button title="Создать аккаунт" handleClick={createUser}/>
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