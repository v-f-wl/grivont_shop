
import FavoriteList from "./FavoriteList";
import Title from "../UI/Title";

const FavoriveContainer = () => {
  return ( 
    <div className="mt-[120px]">
      <Title title="Избранное"/>
      <div className="mt-8 mb-4">
        <FavoriteList/>
      </div>
    </div>
  );
}
 
export default FavoriveContainer;