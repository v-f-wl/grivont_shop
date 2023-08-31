import CSearch from "./CSearch";
import Logo from "./Logo";
import NavHeader from "./NavHeader";
import UserProfile from "./UserProfile";

const CHeader = () => {
  return ( 
    <div 
      className="
        fixed 
        px-4
        lg:px-0
        w-full
        max-w-[full]
        z-30
        right-0
        lg:right-auto
        top-0
        pt-0
        lg:pt-3
        h-[60px] 
        md:h-[76px] 
        lg:max-w-[850px]   
        xl:max-w-[1100px]   
        2xl:max-w-[1380px] 
        flex gap-4 md:gap-6 justify-between
        items-center
        dark:bg-gray-900 bg-white
      "
    >
      <Logo/>
      <CSearch/>
      <NavHeader/>
      <UserProfile/>
    </div>
  );
}
 
export default CHeader;