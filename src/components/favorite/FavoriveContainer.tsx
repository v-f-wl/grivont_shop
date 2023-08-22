
import FavoriteList from "./FavoriteList";
import Title from "../UI/Title";

const FavoriveContainer = () => {
  return ( 
    <div className="mt-[80px] md:mt-[120px] h-full">
      <Title title="Избранное"/>
      <div className=" mb-4">
        <FavoriteList/>
      </div>
    </div>
  );
}
 
export default FavoriveContainer;