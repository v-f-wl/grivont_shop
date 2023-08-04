const ChatContact = () => {

  const Contact = () => {
    return (
      <div className="flex items-center gap-4 relative">
        <div className="w-12 h-12 rounded-full bg-gray-600">

        </div>
        <div className="">Kim Valentin</div>
      </div>
    )
  }
  return (  
    <div className="p-4 flex flex-col gap-6 border">
      <Contact/>
      <Contact/>
      <Contact/>
      <Contact/>
      <Contact/>
      <Contact/>
    </div>
  );
}
 
export default ChatContact;