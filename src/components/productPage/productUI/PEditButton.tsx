const PEditButton = ({title, clickBtn, loading} : {title: string, clickBtn: () => void, loading?: boolean}) => {
  return ( 
    <div 
      onClick={clickBtn}
      className={`${loading && 'opacity-60'} text-sm md:text-base cursor-pointer underline`}
    >
      {title}
    </div>
  );
}
 
export default PEditButton;