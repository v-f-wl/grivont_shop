import { ReactNode } from "react";
import BagBtn from "./productUI/BagBtn";

const AddToCartBookmarkButtons = ({isAuthtor, children} : {isAuthtor: boolean, children: ReactNode}) => {
  return (  
    <div className={`${isAuthtor ? 'block' : 'hidden'} mt-3 md:mt-8 lg:mt-16 flex flex-col lg:flex-row flex-wrap items-start gap-4 lg:gap-6`}>
      {children}
    </div>
  );
}
 
export default AddToCartBookmarkButtons;