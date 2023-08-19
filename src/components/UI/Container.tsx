import React, { ReactNode } from "react";
import { ThemeProvider } from "../themeProvider/ThemProvider";

interface ContainerProps {
  children: ReactNode
}

const Container: React.FC<ContainerProps> = ({children}) => {
  return ( 
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <div className="lg:max-w-[850px] xl:max-w-[1100px] 2xl:max-w-[1280px] mx-auto mb-8 md:mb-0 lg:max-h-[100vh] overflow-y-scroll px-2 dark:bg-gray-900 bg-white">
        {children}
      </div>

    </ThemeProvider> 
  );
}
 
export default Container;