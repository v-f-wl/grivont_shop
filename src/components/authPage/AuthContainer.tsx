import { useEffect, useState } from "react";
import LogIn from "./LogIn";
import SignIn from "./SignIn";
import { useAppSelector } from "@/redux/store"

const AuthContainer = () => {
  const [pageItem, setPageItem] = useState<string>('')
  const page = useAppSelector((state) => state.authSwitch.value)

  useEffect(() => {
    setPageItem(page)
  }, [page]);
  const renderComponent = () => {
    switch(pageItem){
      case 'signin':
        return <SignIn/>
      default:
        return <LogIn/>
    }
  }

  return (  
    <div className="min-h-screen flex items-center justify-center py-24">
      {renderComponent()}
    </div>
  );
}
 
export default AuthContainer;