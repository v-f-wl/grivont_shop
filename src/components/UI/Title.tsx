const Title = ({title}: {title: string}) => {
  return ( 
    <h2 className="font-bold text-xl md:text-3xl lg:text-4xl dark:text-white text-gray-900">
      {title}
    </h2>
  );
}
 
export default Title;