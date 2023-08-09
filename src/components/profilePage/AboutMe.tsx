import AboutInfo from "./aboutMe/AboutInfo";
import AboutWalls from "./aboutMe/AboutWalls";

const AboutMe = () => {
  return ( 
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-profile gap-8 items-start">
      <AboutWalls/>
      <AboutInfo/>
    </div>
  );
}
 
export default AboutMe;