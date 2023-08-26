import { ReactNode } from 'react';

type MyComponentProps = {
  children: ReactNode;
};

const CWraper:React.FC<MyComponentProps> = ({children}) => {
  return ( 
    <div className="mt-[80px] md:mt-[120px] h-full">
      {children}
    </div>
  );
}
 
export default CWraper;