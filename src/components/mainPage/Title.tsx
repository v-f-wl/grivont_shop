interface TitleProps{
  titleValue: string
}

const Title:React.FC<TitleProps> = ({titleValue}) => {
  return ( 
    <h2 className="text-gray-100 font-medium text-3xl ">{titleValue}</h2>
  );
}
 
export default Title;