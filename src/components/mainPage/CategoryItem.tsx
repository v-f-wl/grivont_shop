import Link from "next/link";

interface CategoryItemProps{
  titleValue: string,
  idLink: string,
  imgSrc?: string
}


const CategoryItem:React.FC<CategoryItemProps> = ({titleValue, idLink,imgSrc}) => {
  return (  
    <Link 
      href={`/productofcategory/?id=${idLink}`} 
      className="category-item flex flex-col items-center justify-center gap-2 w-full max-w-[105px] "
    >
      <div className="category-item__img w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-full bg-gray-800 border-2 border-purple-700 transition-all">
        <img src={imgSrc || ''} alt="" className="w-full h-full object-cover"/>
      </div>
      <div className="text-sm md:text-base font-light clamped-text text-center">{titleValue}</div>
    </Link>
  );
}
 
export default CategoryItem;