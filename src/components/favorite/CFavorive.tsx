
import FavoriteList from "./FavoriteList";
import Title from "../UI/Title";
import CWraper from "../UI/CWraper";

const CFavorive = () => {
  return ( 
    <CWraper>
      <Title title="Избранное"/>
      <div className="mb-4">
        <FavoriteList/>
      </div>
    </CWraper>
  );
}
 
export default CFavorive;