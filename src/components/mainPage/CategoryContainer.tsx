import CategoryItem from "./CategoryItem";
import Title from "./Title";
import { HiArrowLongRight } from 'react-icons/hi2'

const CategoryContainer = () => {
  return (  
    <div className="mt-10">
      <Title titleValue="Категории"/>
      <div className="mt-4 flex items-start gap-6 w-full overflow-x-scroll">
        <CategoryItem idLink="vsdv" titleValue="Одежда" />
        <CategoryItem idLink="vsdvsdv" titleValue="Для дома" />
        <CategoryItem idLink="vsvdfvdv" titleValue="Для кухни" />
        <CategoryItem idLink="vsvdfvdv" titleValue="Для кухн ивьа тмдлватм " />
        <CategoryItem idLink="vsdvsdv" titleValue="Для дома" />
        <CategoryItem idLink="vsvdfvdv" titleValue="Для кухни" />
        <CategoryItem idLink="vsvdfvdv" titleValue="Для кухн ивьа тмдлватм " />
        <CategoryItem idLink="vsdvsdv" titleValue="Для дома" />
        <CategoryItem idLink="vsvdfvdv" titleValue="Для кухни" />
        <CategoryItem idLink="vsvdfvdv" titleValue="Для кухн ивьа тмдлватм " />
        <CategoryItem idLink="vsdvsdv" titleValue="Для дома" />
        <CategoryItem idLink="vsvdfvdv" titleValue="Для кухни" />
        <CategoryItem idLink="vsvdfvdv" titleValue="Для кухн ивьа тмдлватм " />
        <CategoryItem idLink="vsdvsdv" titleValue="Для дома" />
        <CategoryItem idLink="vsvdfvdv" titleValue="Для кухни" />
        <CategoryItem idLink="vsvdfvdv" titleValue="Для кухн ивьа тмдлватм " />
        <div className="flex gap-2 items-center rounded-r-xl bg-gray-700 w-24 h-24 p-2 text-gray-100">
          <div className="">Еще</div>
          <HiArrowLongRight size={24}/>
        </div>
      </div>
    </div>
  );
}
 
export default CategoryContainer;