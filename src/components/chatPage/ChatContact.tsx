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
    <div className="py-8 px-6 flex flex-col gap-6 bg-slate-700 rounded-xl">
      <h3 className="font-bold text-4xl">
        Чаты
      </h3>
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