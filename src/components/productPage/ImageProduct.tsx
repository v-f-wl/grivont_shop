import { HiOutlineMapPin } from 'react-icons/hi2'

const ImageProduct = () => {
  return (  
    <div className="grid grid-cols-chat gap-8">
      <div className="aspect-square rounded-xl overflow-hidden bg-gray-700">
        <img 
          className="object-cover"
          src="https://i.pinimg.com/564x/d6/71/bd/d671bd8588d82ea4d300eaf1cee92abd.jpg" 
          alt="img" 
        />
      </div>
      <div className="">
        <h2 
          className="text-5xl text-purple-400 font-bold clamped-text
          "
        >
          Lorem ipsum dolor sit, amet consectetur
          {/* sit, amet consectetur adipisicing elit. At, autem? */}
        </h2>
        <div className="mt-8 flex items-center gap-4 text-gray-500">
          <HiOutlineMapPin size={24}/>
          <div className="text-lg font-light">
            г. Санкт-Петербург
          </div>
        </div>
        <div className="mt-5 text-gray-400 text-2xl font-medium">
          1200 руб
        </div>
        <div className="mt-16 flex gap-6">
          <div 
            className="
              py-3 
              px-5
              bg-purple-400 
              rounded-full 
              text-white 
              text-bold 
              text-xl 
              cursor-pointer hover:opacity-60 transition-all
            "
          >
            Добавить в корзину
          </div>
          <div 
            className="
              py-3 
              px-5 
              border border-purple-400
              rounded-full 
              text-white 
              text-bold 
              text-xl
              cursor-pointer hover:opacity-60 transition-all
            "
          >
            Добавить в избранное
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default ImageProduct;