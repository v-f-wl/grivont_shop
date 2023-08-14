'use client'
import { AppDispatch } from "@/redux/store"
import { changeAuth } from "@/redux/features/authSwitch-slice"
import { useDispatch } from "react-redux"
import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"
import { isValidNick, isValidPassword } from "./validations"
import { Button, Input, ErrorTitle, SubTitle, Title } from "./AuthUI"


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
  const [responsIsFaled, setRespontIsFaled] = useState<boolean>(false)

  const handeChange = (label: string, value: string) => {
    setUserData(prev => {
      return {...prev, [label]: value}
    })
  }
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const validValue = (callback: ValidationCallback) => {
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
  const login = () => {
    setNotValidField([])
    validValue(() => {
      if(notValidField.length === 0){
        axios.post('/api/user/login', userData)
        .then(res => {
          Cookies.set('id', res.data._id)
          Cookies.set('token', res.data.token)
          router.push('/')
        })
        .catch(() => setRespontIsFaled(true))
      }else{
        return
      }
    })
  }

  return ( 
    <div 
      className="px-8 md:px-0 w-full md:w-1/2 h-3/4 flex flex-col gap-6 md:gap-8 items-center"
    >
      <div className="flex flex-col gap-4 items-center">
        <Title title="Войти"/>
        <SubTitle title="Добро пожаловать в Grivont"/>
      </div>
      {responsIsFaled && (
        <ErrorTitle title="Пожалуйста, убедитесь, что вы ввели свой никнейм и пароль верно"/>
      )}
      <div className="flex flex-col gap-3 w-full md:w-2/3">
        <Input id='nickname' inputType="text" changeValue={handeChange} palceHolder="Введите ник" errorField={notValidField.indexOf('nickname') === -1}/>
        <Input id='password' inputType="password" changeValue={handeChange} palceHolder="Введите пароль" errorField={notValidField.indexOf('password') === -1}/>
        <Button title="Войти" handleClick={login}/>
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