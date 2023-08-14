'use client'
import { useEffect, useState } from "react";
import WallsCard from "./WallsCard";
import Cookies from "js-cookie";
import axios from "axios";
import Loading from "@/components/UI/Loading";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";

interface PostsObj{
  userRef: string,
  _id: string,
  likeCollection: string[],
  commentCollection: Object[],
  title: string,
  createdAt: string
}

const AboutWalls = () => {
  const [posts, setPosts] = useState<PostsObj[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)
  const [authtorName, setAuthtorName] = useState<string>('')
  const router = useRouter()
  const userID = router.query.id
  const isUser = useAppSelector((state) => state.isPerson.value) 


  useEffect(() => {
    if(userID !== undefined){
      axios.get(`/api/post/getPosts/?id=${userID}`)
      .then(res => {
        setPosts(res.data.posts.reverse())
        setLoaded(true)
      })
      .catch(() => console.log())
      axios.get(`/api/user/getNameOfPost/?id=${userID}`)
      .then(res => {
        setAuthtorName(res.data.name)
      })
      .catch(() => console.log())

    }
  }, [userID])
  return ( 
    <div className="">
      {loaded ? 
        (
          <div className="flex flex-col gap-6">
            {posts.length > 0 ? 
            (
              posts.map(item => (
                <WallsCard 
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  time={item.createdAt}
                  isUser={isUser}
                  name={authtorName}
                  likeCollection={item.likeCollection}
                  commentCollection={item.commentCollection}
                />
              ))
            )
            :
            (
              <div className="mt-8 text-center text-2xl ">
                У вас пока нет постов
              </div>
            )
            }
          </div>
        )
        :
        (
          <Loading/>
        )
      }
    </div>
  );
}
 
export default AboutWalls;