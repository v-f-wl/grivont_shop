import { ReactNode } from "react";

const InfoList = ({children} : {children: ReactNode}) => {
  return ( 
    <div className="flex-1">
      {children}
    </div>
  );
}
 
export default InfoList;