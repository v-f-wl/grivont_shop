interface TitleProps{
  titleValue: string
}

const Title:React.FC<TitleProps> = ({titleValue}) => {
  return ( 
    <h2 className="dark:text-gray-100 text-gray-900 font-medium text-3xl ">{titleValue}</h2>
  );
}
 
export default Title;