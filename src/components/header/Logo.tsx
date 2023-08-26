'use client'
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter()
  return ( 
    <div 
      onClick={() => router.push('/')}
      className="hidden lg:block dark:text-gray-100 text-gray-900 font-bold text-4xl cursor-pointer"
    >
      Grivont
    </div>
  );
}
 
export default Logo;