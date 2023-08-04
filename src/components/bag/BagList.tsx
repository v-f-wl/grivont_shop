import BagItem from "./BagItem";

const BagList = () => {
  return (  
    <div className="relative grid grid-cols-profile gap-12 items-start">
      <div className="flex flex-col gap-6">
        <BagItem/>
        <BagItem/>
        <BagItem/>
        <BagItem/>
        <BagItem/>
      </div>
      <div className="rounded-xl bg-gray-600 right-0 h-[300px] p-6 ">
        Итоговое окно
      </div>
    </div>
  );
}
 
export default BagList;