import { ReactNode } from 'react';

type MyComponentProps = {
  children: ReactNode;
};

const ContainerForWindow = ({ children }: MyComponentProps) => {
  return ( 
    <div className="px-8 md:px-0 w-full md:w-1/2 h-3/4 flex flex-col gap-6 md:gap-8 items-center">
      {children}
    </div>
  );
}

export default ContainerForWindow
 