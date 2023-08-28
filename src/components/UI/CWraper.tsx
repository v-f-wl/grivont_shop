import { ReactNode } from 'react';

type MyComponentProps = {
  children: ReactNode;
};

const CWraper:React.FC<MyComponentProps> = ({children}) => {
  return ( 
    <div className="mt-[64px] md:mt-[80px] lg:mt-[120px] h-full">
      {children}
    </div>
  );
}
 
export default CWraper;