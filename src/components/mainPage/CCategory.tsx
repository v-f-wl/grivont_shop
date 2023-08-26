import Title from "../UI/Title";
import RenderCategory from "./categoryUI/RenderCategory";

const CategoryContainer = () => {
  return (  
    <div className="mt-10">
      <Title title="Категории"/>
      <RenderCategory/>
    </div>
  );
}
 
export default CategoryContainer;