'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

import axios from "axios"

import Cookies from "js-cookie";

import { isValidNick, isValidPassword } from "./validations"
import { Button, Input, ErrorTitle, SubTitle, Title, SwitchWindow } from "./AuthUI/AuthUI"
import ContainerForTitle from "./AuthUI/ContainerForTitle"
import ContainerForWindow from "./AuthUI/ContainerForWindow"
import ContainerForForm from "./AuthUI/ContainerForForm"


interface UserData {
  nickname: string;
  password: string;
}
type ValidationCallback = () => void;

const initialUserData: UserData = {
  nickname: '',
  password: ''
};


const LogIn = () => {
  const [userData, setUserData] = useState<UserData>(initialUserData)
  const [notValidField, setNotValidField] = useState<string[]>([])

  const [requestSend, setRequestSend] = useState<boolean>(false)
  const [responsIsFaled, setRespontIsFaled] = useState<boolean>(false)
  
  const router = useRouter()

  // ФУНКЦИЯ КОТОРАЯ ОБНОВЛЯЕТ ЗНАЧЕНИЯ В userData ИЗ КОМПОНЕНТОВ AuthUI
  const handeChange = (label: string, value: string) => {
    setUserData(prev => {
      return {...prev, [label]: value}
    })
  }


  // ФУНКЦИЯ ВАЛИДАЦИИ ПОЛЕЙ С ПОСЛЕДУЮЩИМ ВЫЗОВОМ CALlBACK
  const checkValidValue = (callback: ValidationCallback) => {
    let nickname = userData.nickname
    let password = userData.password
    const notValidFields = []

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

  //ВЫЗОВ ФУНКЦИИ ВАЛИДАЦИИ ПОЛЕЙ И ПОСЛЕДУЮЩАЯ ОТПРАВКА ДАННЫХ НА СЕРВЕР
  const loginRequest = () => {

    // ВКЛЮЧЕНИЕ ЛОАДЕРА ДЛЯ КНОПКИ
    setRequestSend(true)

    // ОЧИЩАЕТ СПИСОК НЕВАЛИДНЫХ ПОЛЕЙ 
    setNotValidField([])
    
    checkValidValue(() => {
      if(notValidField.length === 0){
        axios.post('/api/user/login', userData)
        .then(res => {
          Cookies.set('id', res.data._id)
          Cookies.set('token', res.data.token)
          router.push('/')
        })
        .catch(() => {
          setRespontIsFaled(true)
          setRequestSend(false)
        })
      }
      return
    })
  }

  return ( 
    <ContainerForWindow>
      <ContainerForTitle>
        <Title title="Войти"/>
        <SubTitle title="Добро пожаловать в Grivont"/>
      </ContainerForTitle>

      {/* В СЛУЧАЕ НЕВАЛИДНЫХ ДАННЫХ ПОЯВИЛСЯ ЭТОТ БЛОК */}
      <ErrorTitle title="Пожалуйста, убедитесь, что вы ввели свой никнейм и пароль верно" show={responsIsFaled}/>

      {/* ПОЛЯ ВВОДА */}
      <ContainerForForm>
        <Input id='nickname' inputType="text" changeValue={handeChange} palceHolder="Введите ник" errorField={notValidField.indexOf('nickname') === -1}/>
        <Input id='password' inputType="password" changeValue={handeChange} palceHolder="Введите пароль" errorField={notValidField.indexOf('password') === -1}/>
        <Button title="Войти" handleClick={loginRequest} isLoading={requestSend}/>
      </ContainerForForm>
      {/* КНОПКА СМЕНЫ СТРАНИЦЫ НА SignIn */}
      <SwitchWindow labelWindow="signin" hidden={requestSend} buttonTitle="Регистрация"/>
    </ContainerForWindow>
  );
}
 
export default LogIn;