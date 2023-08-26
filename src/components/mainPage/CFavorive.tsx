import Title from "../UI/Title";
import RenderFavorite from "./renderProductCard/RenderFavorite";


const FavoriveContainer = () => {

  return ( 
    <div className="mt-8 mb:mt-10 mb-2 md:mb-4 flex flex-col gap-4">
      <Title title='Товары в избранном'/>
      <RenderFavorite/>
    </div>
  );
}
 
export default FavoriveContainer;