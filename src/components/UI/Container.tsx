import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode
}

const Container: React.FC<ContainerProps> = ({children}) => {
  return (  
    <div className="lg:max-w-[1100px] mx-auto max-h-[100vh] overflow-y-scroll px-2">
      {children}
    </div>
  );
}
 
export default Container;