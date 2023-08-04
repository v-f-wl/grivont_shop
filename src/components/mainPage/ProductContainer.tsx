import ProductCard from "../UI/ProductCard";
import Title from "./Title";

interface ProductContainerProps{
  label: string,
  title: string,
  hasItems: boolean
}
const ProductContainer:React.FC<ProductContainerProps> = ({label, title, hasItems}) => {
  return ( 
    <div className="mt-10 mb-4">
      <div className="flex items-center justify-between">
        <Title titleValue={title}/>
        <div className="cursor-pointer hover:underline hover:text-indigo-400 transition-all">Больше</div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-14">
        <ProductCard link="sdf" title="Держатель для ножей" description="fmkvldfmv" imageSrc="dfvd"/>
        <ProductCard link="sdf" title="Вывеска на стену Подвеска в виде луны на жею жеснская Подвеска в виде луны на жею жеснская" description="fmkvldfmv Подвеска в виде луны на жею жеснская Подвеска в виде луны на жею жеснскаяПодвеска в виде луны на жею жеснскаяПодвеска в виде луны на жею жеснскаяПодвеска в виде луны на жею жеснскаяПодвеска в виде луны на жею жеснская" imageSrc="dfvd"/>
        <ProductCard link="sdf" title="Подвеска в виде луны на жею жеснская" description="fmkvldfmv" imageSrc="dfvd"/> 
      </div>
    </div>
  );
}
 
export default ProductContainer;