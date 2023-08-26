import { VscLoading } from 'react-icons/vsc'

interface LoadingProps{
  isLoaded?: boolean
}
const Loading:React.FC<LoadingProps> = ({isLoaded}) => {
  return ( 
    <div className={`${isLoaded ? 'hidden' : 'flex'} col-span-2 md:col-span-3 lg:col-span-4 flex-col items-center justify-center gap-6 min-h-[25vh]`}>
      <VscLoading 
        className='animate-spin'
        size={48}
      />
    </div>
  );
}
 
export default Loading;