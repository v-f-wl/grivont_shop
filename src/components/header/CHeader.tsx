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
        2xl:max-w-[1280px] 
        flex 
        items-center
        dark:bg-gray-900 bg-white
      "
    >
      <Logo/>
      <NavHeader/>
      <UserProfile/>
    </div>
  );
}
 
export default CHeader;