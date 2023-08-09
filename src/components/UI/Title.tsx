const Title = ({title}: {title: string}) => {
  return ( 
    <h2 className="font-bold text-3xl md:text-4xl">
      {title}
    </h2>
  );
}
 
export default Title;