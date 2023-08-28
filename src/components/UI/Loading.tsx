import { VscLoading } from 'react-icons/vsc'

interface LoadingProps{
  isLoaded?: boolean
}
const Loading:React.FC<LoadingProps> = ({isLoaded}) => {
  return ( 
    <div className={`${isLoaded ? 'hidden' : 'flex'} w-full col-span-2 md:col-span-3 lg:col-span-4 flex-col items-center justify-center gap-6 min-h-[15vh] md:min-h-[25vh]`}>
      <VscLoading 
        className='animate-spin text-2xl md:text-3xl lg:text-5xl'
      />
    </div>
  );
}
 
export default Loading;