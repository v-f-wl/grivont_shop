import Link from "next/link";

interface EmptyPageProps{
  title: string
}
const EmptyPage:React.FC<EmptyPageProps> = ({title}) => {
  return ( 
    <div className="flex flex-col items-center justify-center gap-6 min-h-[30vh]">
        <h3 className="font-menium text-4xl text-gray-300">{title}</h3>
        <Link href='/' className="text-purple-400 p-4">Вернуться на главную</Link>
      </div>
  );
}
 
export default EmptyPage;