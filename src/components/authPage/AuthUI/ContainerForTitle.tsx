import { ReactNode } from 'react';

type MyComponentProps = {
  children: ReactNode;
};

const ContainerForTitle = ({ children }: MyComponentProps) => {
  return ( 
    <div className="flex flex-col gap-4 items-center">
      {children}
    </div>
  );
}

export default ContainerForTitle
 