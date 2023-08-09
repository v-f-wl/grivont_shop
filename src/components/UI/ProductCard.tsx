import Link from 'next/link'
interface ProductCardProps{
  link: string,
  title: string,
  description: string,
  imageSrc: string,
  price: number
}
const ProductCard:React.FC<ProductCardProps> = ({
  link,
  title,
  description,
  imageSrc,
  price
}) => {
  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div 
        className="
          absolute 
          py-1
          px-2
          rounded-full
          top-4 
          right-4 
          bg-purple-400 
          text-sm
        "
      >
        {price} p
      </div>
      <div className="w-full aspect-square xl:max-h-[220px] rounded-xl bg-gray-700 overflow-hidden">
        <img 
          src={imageSrc || 'https://i.pinimg.com/564x/d5/44/76/d5447631608c69c3452d486193a79de8.jpg'}
          alt="" 
          className="w-full h-full object-cover" 
        />
      </div>
      <h3 className="text-xl font-medium clamped-text">{title}</h3>
      <div className="font-light text-sm clamped-text-3 text-purple-300">{description}</div>
      <div className="flex items-center gap-6 justify-self-end">
        <Link href={`/productpage/?id=${link}`} className="border rounded-full py-2 px-4 hover:border-indigo-400 hover:text-indigo-400 transition-all cursor-pointer">Подробнее</Link>
      </div>
    </div>
  );
}
 
export default ProductCard;