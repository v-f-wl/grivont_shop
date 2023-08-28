const CDescription = ({description} : {description: string}) => {
  return ( 
    <div 
      className="
        mt-3 md:mt-6 lg:mt-10 mb-3 md:mb-6 lg:mb-20 w-auto md:w-[800px] mx-auto text-sm md:text-lg dark:text-gray-100 text-gray-900
      "
    >
      {description}
    </div>
  );
}
 
export default CDescription;