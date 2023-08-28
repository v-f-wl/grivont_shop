const Title = ({title}: {title: string}) => {
  return ( 
    <h2 className="font-bold text-lg md:text-2xl lg:text-4xl dark:text-white text-gray-900">
      {title}
    </h2>
  );
}
 
export default Title;