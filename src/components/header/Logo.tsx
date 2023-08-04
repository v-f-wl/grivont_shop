'use client'
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter()
  return ( 
    <div 
      onClick={() => router.push('/')}
      className="text-gray-100 font-bold text-4xl cursor-pointer"
    >
      Grivont
    </div>
  );
}
 
export default Logo;