'use client'
import { useState } from 'react';
import { HiXMark } from 'react-icons/hi2'


const BagItem = () => {
  const [deleted, setDeleted] = useState<boolean>(false)


  return (  
    <div className={`${deleted && 'opacity-30'} rounded-xl bg-gray-700 p-4 flex items-center gap-4`}>
      <div className="min-w-[150px] h-[150px] rounded-xl overflow-hidden">
        <img 
          src="https://i.pinimg.com/564x/f3/ab/6a/f3ab6a3d7b11543b9a64ad0d5ce7126e.jpg"
          className="w-full h-full object-cover" alt="img" 
        />
      </div>
      <div className="w-auto">
        <h3 className="clamped-text text-purple-600 text-2xl font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia nulla tempore molestias.</h3>
        <div className="mt-4 clamped-text-3 text-sm font-light text-gray-300">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur expedita, molestias error corrupti beatae nihil magni minus officiis suscipit praesentium exercitationem placeat in.
        </div>
        <div className="mt-6 flex items-center gap-4">
          <div className="text-xl text-bold">1 290p.</div>
          <div 
            onClick={() => setDeleted(true)}
            className="flex gap-2 items-center border py-1 px-2 text-sm rounded-full cursor-pointer"
          >
            <HiXMark size={16}/>
            <span className="">Удалить</span>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default BagItem;