import Link from "next/link";

interface EmptyPageProps{
  title: string,
  isLoaded?: boolean,
}
const EmptyPage:React.FC<EmptyPageProps> = ({title, isLoaded}) => {
  return ( 
    <div className={`${isLoaded ? 'flex' : 'hidden'} col-span-2 md:col-span-3 lg:col-span-4 flex-col w-full md:w-auto items-center justify-center gap-6 min-h-[40vh]`}>
        <h3 className="font-menium text-2xl md:text-4xl dark:text-gray-200 text-gray-900 text-center">{title}</h3>
        <Link href='/' className="text-purple-400 p-4">Вернуться на главную</Link>
      </div>
  );
}
 
export default EmptyPage;