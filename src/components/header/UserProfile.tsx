'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";

interface UserData{
  name: string,
  imageSrc: string,
  id: string
}
const initialUserData: UserData = {
  name: '',
  imageSrc: '',
  id: ''
};

const UserProfile = () => {
  const [userData, setUserData] = useState<UserData>(initialUserData)
  const [dataLoaded, setDataLoaded] = useState<boolean>(false)
  const userId = Cookies.get("id")
  const token = Cookies.get("token")
  const router = useRouter()

  useEffect(() => {
    if (!router || (!userId || !token)) {
      router.push('/auth');
    } else {
      axios.post('/api/user/checkToken', { userId, token })
        .then(response => {
          const { fullName, _id, img } = response.data.user;
          const userDataObj = {
            name: fullName,
            imageSrc: img,
            id: _id
          };
          setUserData(userDataObj);
          setDataLoaded(true);
        })
        .catch(error => {
          console.log('Error checking token:', error);
          router.push('/auth');
        });
    }
  }, [token, userId, router]);
  

  return (  
    <Link 
      href={dataLoaded ? `/profilepage/?id=${userData.id}` : '/'}
      className={`
        ${dataLoaded && "hover:text-indigo-400"}
        ${dataLoaded && "user-profile"}
        ${dataLoaded && "cursor-pointer"}
        flex 
        justify-items-end 
        items-center 
        gap-3 
        cursor-pointer
        dark:text-gray-100 text-gray-900
        transition-color
      `}
    >
      {dataLoaded ? 
        (
          <span className="hidden lg:block text-inherit font-medium">{userData.name}</span>
        )
        :
        <div className="w-[180px] h-8 dark:bg-gray-600 bg-gray-300 animate-pulse rounded-xl hidden lg:block"></div>
        }
      <div className="w-9 h-9 rounded-full bg-gray-400 overflow-hidden">
        {dataLoaded ? 
        (<img 
          className="w-full h-full object-cover"
          src={userData.imageSrc !== ''  ? userData.imageSrc : 'https://i.pinimg.com/564x/e0/23/84/e0238444ff148e53cb7bdfe8b4efd4e7.jpg'} 
          alt="img" 
        />)
        :
        <div className="w-full h-full dark:bg-gray-600 bg-gray-300 animate-pulse"></div>
        }
      </div>
    </Link>
  );
}
 
export default UserProfile;