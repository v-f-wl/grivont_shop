import { ReactNode } from "react";

const BagWrapper = ({children} : {children: ReactNode}) => {
  return ( 
    <div className="relative flex flex-col-reverse  lg:grid md:grid-cols-profile gap-3 md:gap-5 lg:gap-12 items-start">
      {children}
    </div>
  );
}
 
export default BagWrapper;