import Link from "next/link";
import Title from "../mainPage/Title";

const ServiceContainer = () => {
  return (  
    <div className="mt-[120px]">
      <Title titleValue="Сервисы"/>
      <div className="mt-8 flex flex-col gap-8">
        <Link href="https://flumpf.vercel.app/">
          <span className="text-2xl font-bold text-purple-400">Flumpf</span>
          <span className=""> - социальная сеть</span>
        </Link>
        <Link href='https://glotz.vercel.app/'>
          <span className="text-2xl font-bold text-purple-400">Glotz</span>
          <span className=""> - сервис по созданию и прохождению тестов</span>
        </Link>
      </div>
    </div>
  );
}
 
export default ServiceContainer;