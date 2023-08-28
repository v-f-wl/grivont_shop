import { ReactNode } from "react";

const COrderItem = ({children}: {children: ReactNode}) => {
  return ( 
    <div className="p-2 py-4 md:p-4 dark:bg-gray-600 bg-gray-100 rounded-xl">
      {children}
    </div>
  );
}
 
export default COrderItem;