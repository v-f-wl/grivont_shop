import Container from "@/components/UI/Container";
import LeftMenu from "@/components/UI/LeftMenu";
import HeaderContainer from "@/components/header/CHeader";
import CMain from "@/components/mainPage/CMain";


export default function Home() {
  return (
    <div 
      className="
        relative
        h-screen 
      dark:bg-gray-900 bg-white
        overflow-y-scroll 
      "
    >
      <Container>
        <LeftMenu/>
        <HeaderContainer/>
        <CMain/>
      </Container>
    </div>
  )
}
