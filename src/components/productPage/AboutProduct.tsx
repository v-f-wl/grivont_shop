interface AboutProductProps{
  description: string
}

const AboutProduct:React.FC<AboutProductProps> = ({description}) => {
  return (  
    <div 
      className="
        mt-4 lg:mt-12 mb-6 md:mb-24 w-auto md:w-[800px] mx-auto text-sm md:text-lg dark:text-gray-100 text-gray-900
      "
    >
      {description}
    </div>
  );
}
 
export default AboutProduct;