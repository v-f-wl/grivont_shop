import { ReactNode } from "react";

const ProductModal = ({isOpen, children} : {isOpen: boolean, children: ReactNode}) => {
  return ( 
    <div className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 dark:bg-slate-900/70 bg-slate-600/70 z-50 flex items-center justify-center`}>
      <div className="w-full h-screen overflow-y-scroll lg:w-3/4 lg:h-3/4 dark:bg-gray-800 bg-white lg:rounded-xl p-4 lg:p-8 relative">
        <h3 className="text-2xl md:text-4xl font-medium">
          Товары в заказе
        </h3>
        {children}
      </div>
    </div>
  );
}
 
export default ProductModal;