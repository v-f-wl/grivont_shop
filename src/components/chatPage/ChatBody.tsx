import ChatContact from "./ChatContact";
import ChatWindow from "./ChatWindow";

const ChatBody = () => {
  return ( 
    <div className="mt-8 grid grid-cols-chat gap-8 h-[70vh] cursor-pointer">
      <ChatContact/>
      <ChatWindow/>
    </div>
  );
}
 
export default ChatBody;