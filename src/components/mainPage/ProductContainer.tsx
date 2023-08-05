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
        <ProductCard price={2342} link="sdf" title="Держатель для ножей" description="fmkvldfmv" imageSrc="https://i.pinimg.com/564x/94/27/e6/9427e63578c6bbb9b7bab2b6c16ccb86.jpg"/>
        <ProductCard price={2342} link="sdf" title="Вывеска на стену Подвеска в виде луны на жею жеснская Подвеска в виде луны на жею жеснская" description="fmkvldfmv Подвеска в виде луны на жею жеснская Подвеска в виде луны на жею жеснскаяПодвеска в виде луны на жею жеснскаяПодвеска в виде луны на жею жеснскаяПодвеска в виде луны на жею жеснскаяПодвеска в виде луны на жею жеснская" imageSrc="https://i.pinimg.com/564x/94/27/e6/9427e63578c6bbb9b7bab2b6c16ccb86.jpg"/>
        <ProductCard price={2342} link="sdf" title="Подвеска в виде луны на жею жеснская" description="fmkvldfmv" imageSrc="https://i.pinimg.com/564x/94/27/e6/9427e63578c6bbb9b7bab2b6c16ccb86.jpg"/> 
      </div>
    </div>
  );
}
 
export default ProductContainer;