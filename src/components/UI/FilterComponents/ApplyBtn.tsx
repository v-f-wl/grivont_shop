interface ApplyBtnProps{
  clickBtn: () => void
}
const ApplyBtn:React.FC<ApplyBtnProps> = ({clickBtn}) => {
  return (  
    <div 
      onClick={clickBtn}
      className="py-2 border border-purple-400 rounded-xl text-center cursor-pointer"
    >
        Применить
    </div>
  );
}
 
export default ApplyBtn;