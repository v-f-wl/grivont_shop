import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store"

import LogIn from "./LogIn";
import SignIn from "./SignIn";

const AuthContainer = () => {
  const [pageItem, setPageItem] = useState<string>('')
  const page = useAppSelector((state) => state.authSwitch.value)

  // получает значение: string ('signin' || 'login') из redux и отрисовывает компонент  в функции renderComponent
  useEffect(() => {
    setPageItem(page)
  }, [page])

  
  const renderComponent = () => {
    switch(pageItem){
      case 'signin':
        return <SignIn/>
      default:
        return <LogIn/>
    }
  }

  return (  
    <div className="min-h-screen flex items-center justify-center py-12 md:py-24">
      {renderComponent()}
    </div>
  );
}
 
export default AuthContainer;