import { VscLoading } from 'react-icons/vsc'
const Loading = () => {
  return ( 
    <div className="flex flex-col items-center justify-center gap-6 min-h-[25vh]">
      <VscLoading 
        className='animate-spin'
        size={48}
      />
    </div>
  );
}
 
export default Loading;