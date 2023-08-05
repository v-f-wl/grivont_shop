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
      <div className="category-item__img w-24 h-24 overflow-hidden rounded-full bg-gray-800 border-2 border-purple-700 transition-all">
        <img src="https://i.pinimg.com/564x/c5/60/6d/c5606db430634d19ec1c3e2143bc88ef.jpg" alt="" className="w-full h-full object-fill"/>
      </div>
      <div className="font-light clamped-text text-center">{titleValue}</div>
    </Link>
  );
}
 
export default CategoryItem;