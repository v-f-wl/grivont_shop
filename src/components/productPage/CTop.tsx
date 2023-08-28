import { ReactNode } from "react";

const CTop = ({children} : {children: ReactNode}) => {
  return ( 
    <div className="flex flex-col lg:flex-row lg:grid lg:grid-cols-chat lg:gap-8">
      {children}
    </div>
  );
}
 
export default CTop;