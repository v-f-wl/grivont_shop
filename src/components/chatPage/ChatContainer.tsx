import { useEffect, useState } from "react";
import ChatContact from "./ChatContact";
import Loading from "../UI/Loading";
import EmptyPage from "../UI/EmptyPage";
import ChatBody from "./ChatBody";

const ChatContainer = () => {
  const [isLoading, setIsLoading] = useState<string>('list')

  const renderChat = () => {
    switch(isLoading){
      case 'none': 
        return <Loading/>
      case 'empty': 
        return <EmptyPage title="Чатов нет"/>
      case 'list': 
        return <ChatBody />
    }
  }
  return ( 
    <div className="mt-[120px] h-[80vh]">
      <h3 className="font-bold text-4xl">
        Чаты
      </h3>
      {renderChat()}
    </div>
  );
}
 
export default ChatContainer;