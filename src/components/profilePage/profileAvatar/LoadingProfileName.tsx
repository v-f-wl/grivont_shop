const LoadingProfileName = () => {
  return ( 
    <div className='flex flex-col gap-5'>
      <div className="flex items-center gap-2 md:gap-6">

        {/* LOADER IMAGE*/}
        <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14  rounded-full dark:bg-gray-600 bg-gray-300 animate-pulse overflow-hidden">
        </div>

        {/* URES NAME LOADER */}
        <div className="font-bold w-[140px] md:w-[200px] lg:w-[270px] h-[34px] rounded-xl dark:bg-gray-600 bg-gray-300 animate-pulse">
        </div>
      </div>
      
      {/* NICKNAME LOADER */}
      <div className="w-[80px] md:w-[100px] h-[26px]  rounded-xl dark:bg-gray-600 bg-gray-300 animate-pulse">
      </div>
    </div>
  );
}
 
export default LoadingProfileName;