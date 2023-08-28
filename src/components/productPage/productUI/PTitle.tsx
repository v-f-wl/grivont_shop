const PTitle = ({title} : {title: string}) => {
  return (  
    <h2 className="mt-4 text-xl md:text-2xl lg:text-4xl dark:text-purple-400 text-gray-800 font-bold">
      {title}
    </h2>
  );
}
 
export default PTitle;