import { ReactNode } from 'react';

type MyComponentProps = {
  children: ReactNode;
};

const ContainerForForm = ({ children }: MyComponentProps) => {
  return ( 
    <div className="flex flex-col gap-3 w-full md:w-2/3">
      {children}
    </div>
  );
}

export default ContainerForForm
 