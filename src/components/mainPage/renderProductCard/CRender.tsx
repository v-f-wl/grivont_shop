import { ReactNode } from "react";

interface RenderContainerProps{
  children: ReactNode
}

const RenderContainer:React.FC<RenderContainerProps> = ({children}) => {
  return ( 
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-8">
      {children}
    </div>
  );
}
 
export default RenderContainer;