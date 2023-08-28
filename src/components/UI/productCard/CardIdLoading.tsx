const CardIdLoading = () => {
  return (  
    <div className="w-full flex flex-col gap-2 relative">

      {/* Image */}
      <div className="w-full aspect-square rounded-xl dark:bg-gray-400 bg-gray-200 animate-pulse"></div>

      {/* Title */}
      <div className="w-full h-[30px] dark:bg-gray-400 bg-gray-200 animate-pulse rounded-xl"></div>

      {/* description */}
      <div className="w-full h-[40px] dark:bg-gray-400 bg-gray-200 animate-pulse rounded-xl"></div>
    </div>
  );
}
 
export default CardIdLoading;