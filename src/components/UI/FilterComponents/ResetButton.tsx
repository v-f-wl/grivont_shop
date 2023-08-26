interface ResetButtonProps{
  clickBtn: () => void
}
const ResetButton:React.FC<ResetButtonProps> = ({clickBtn}) => {
  return ( 
    <div 
      onClick={clickBtn}
      className="py-2 text-center underline text-gray-200 text-base"
    >
      Сбросить
    </div>
  );
}
 
export default ResetButton;