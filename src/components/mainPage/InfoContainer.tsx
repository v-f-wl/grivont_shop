import InfoCard from "./InfoCard";
import Title from "./Title";

const InfoContainer = () => {
  return ( 
    <div className="">
      <div className="flex items-center justify-between">
        <Title titleValue="Полезная информация"/>
      </div>
      <div className="mt-8 flex justify-between gap-14">
        <InfoCard 
          idValue="for_per" 
          titleValue="Как вести аккаунт" 
          descriptionValue="Статья поожет вам понять главные принципы работы данного сайта"
        />
        <InfoCard 
          idValue="for_per" 
          titleValue="Правила безопасности" 
          descriptionValue="Безопасность является важным элементом нашей жизни - данные правила помогут вам обезопасить себя"
        />
      </div>
    </div>
  );
}
 
export default InfoContainer;