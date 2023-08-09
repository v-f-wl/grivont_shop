import Logo from "./Logo";
import NavHeader from "./NavHeader";
import UserProfile from "./UserProfile";

const HeaderContainer = () => {
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
        flex 
        items-center
        bg-gray-900
      "
    >
      <Logo/>
      <NavHeader/>
      <UserProfile/>
    </div>
  );
}
 
export default HeaderContainer;