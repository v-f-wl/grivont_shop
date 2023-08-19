import AboutInfo from "./aboutMe/AboutInfo";
import PostWalls from "./aboutMe/PostWalls";

// ОКНО ПОСТОВ
const PostContainer = () => {
  return ( 
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-profile gap-8 items-start">
      <PostWalls/>
      <AboutInfo/>
    </div>
  );
}
 
export default PostContainer;