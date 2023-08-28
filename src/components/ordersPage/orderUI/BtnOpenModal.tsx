const BtnOpenModal = ({clickBtn} : {clickBtn: () => void}) => {
  return ( 
    <div className="flex flex-wrap items-center mt-4 md:mt-6">
      <div 
        onClick={clickBtn}
        className="py-2 px-4 md:px-4  text-md border dark:border-white border-black rounded-full cursor-pointer"
        >
        Просмотреть товары
      </div>
    </div>
  );
}
 
export default BtnOpenModal;