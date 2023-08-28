interface ResetButtonProps{
  clickBtn: () => void
}
const ResetButton:React.FC<ResetButtonProps> = ({clickBtn}) => {
  return ( 
    <div 
      onClick={clickBtn}
      className="py-2 text-center underline dark:text-gray-200 text-gray-700 text-base"
    >
      Сбросить
    </div>
  );
}
 
export default ResetButton;