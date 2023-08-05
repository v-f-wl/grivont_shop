interface AboutProductProps{
  description: string
}

const AboutProduct:React.FC<AboutProductProps> = ({description}) => {
  return (  
    <div 
      className="
        mt-12 mb-24  w-[800px] mx-auto text-lg text-gray-200
      "
    >
      {description}
    </div>
  );
}
 
export default AboutProduct;