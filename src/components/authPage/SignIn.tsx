'use client'
import { useState } from "react";
import Cookies from "js-cookie";

import axios from "axios";
import { useRouter } from "next/router";
import { isValidName, isValidNick, isValidPassword } from "./validations";

import { Button, ErrorTitle, Input, SubTitle, SwitchWindow, Title } from "./AuthUI/AuthUI";
import ContainerForForm from "./AuthUI/ContainerForForm";
import ContainerForTitle from "./AuthUI/ContainerForTitle";
import PasswordRules from "./AuthUI/PasswordRules";
import ContainerForWindow from "./AuthUI/ContainerForWindow";

// ДАННЫЕ С ПОЛЯ РЕГИСТРАЦИИ
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
  const [userData, setUserData] = useState<UserData>(initialUserData)
  const [requestSend, setRequestSend] = useState<boolean>(false)
  const [notValidField, setNotValidField] = useState<string[]>([])
  const [notValidNick, setNotValidNick] = useState<boolean>(false)
  const router = useRouter()

  // ФУНКЦИЯ КОТОРАЯ ОБНОВЛЯЕТ ЗНАЧЕНИЯ В userData ИЗ КОМПОНЕНТОВ AuthUI
  const handeChange = (label: string, value: string) => {
    setUserData(prev => {
      return {...prev, [label]: value}
    })
  }


  // ФУНКЦИЯ ВАЛИДАЦИИ ПОЛЕЙ С ПОСЛЕДУЮЩИМ ВЫЗОВОМ CALlBACK
  const checkValidValue = (callback: ValidationCallback) => {
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

    // ВКЛЮЧЕНИЕ ЛОАДЕРА ДЛЯ КНОПКИ
    setRequestSend(true)

    // ОБНУЛЯЕТ СПИСОК НЕВАЛИДНЫХ ПОЛЕЙ
    setNotValidField([])
    
    // ОБНУЛЯЕТ state ОТВЕЧАЮЩИЙ ЗА УНИКАЛЬНОСТЬ НИКНЕЙМА
    setNotValidNick(false)

    checkValidValue(() => {
      if(notValidField.length === 0){
        const data = {
          fullName: `${userData.firstName} ${userData.secondName}`,
          nickname: userData.nickname,
          password: userData.password
    
        }
        axios.post('/api/user/createAccount', data)
        .then(res => {
          Cookies.set('id', res.data._doc._id)
          Cookies.set('token', res.data.token)
          router.push('/')
        })
        // ЕСЛИ ПРИ СОЗДАНИИ АККАУНТА БЫЛ ВВЕДЕН НЕ УНИКАЛЬНЫЙ НИК - state 
        // ПРИНИМАЕТ ЗНАЧЕНИЕ true
        .catch((res) => {
          setNotValidNick(true)
          setRequestSend(false)
        })
      }else{
        return
      }
    })
  }

  return (
    <ContainerForWindow>
      <ContainerForTitle>
        <Title title="Регистрация"/>
        <SubTitle title="Добро пожаловать в Grivont"/>
      </ContainerForTitle>

      {/* В СЛУЧАЕ ОШИБКИ ПОЯВЛЯЕТСЯ БЛОК */}
      <ErrorTitle title="Ник уже занят" show={notValidNick}/>
      <ContainerForForm>
        <Input id='firstName' inputType="text" changeValue={handeChange} palceHolder="Введите имя" errorField={notValidField.indexOf('firstName') === -1}/>
        <Input id='secondName' inputType="text" changeValue={handeChange} palceHolder="Введите фамилию" errorField={notValidField.indexOf('secondName') === -1}/>
        <Input id='nickname' inputType="text" changeValue={handeChange} palceHolder="Придумайте ник" errorField={notValidField.indexOf('nickname') === -1}/>
        <PasswordRules/>
        <Input id='password' inputType="password" changeValue={handeChange} palceHolder="Введите пароль" errorField={notValidField.indexOf('password') === -1}/>
        <Button title="Создать аккаунт" handleClick={createUser} isLoading={requestSend}/>
      </ContainerForForm>

      {/* ПЕРЕКЛЮЧЕНИЕ К КОМПОНЕНТУ LogIn */}
      <SwitchWindow labelWindow="login" hidden={requestSend} buttonTitle="Войти"/>
    </ContainerForWindow>
  );
}

export default SignIn;