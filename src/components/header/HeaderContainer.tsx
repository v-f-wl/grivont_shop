import Logo from "./Logo";
import NavHeader from "./NavHeader";
import UserProfile from "./UserProfile";

const HeaderContainer = () => {
  return ( 
    <div 
      className="
        fixed 
        w-full 
        z-30
        top-0
        pt-3
        h-[76px] 
        lg:max-w-[1100px]   
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