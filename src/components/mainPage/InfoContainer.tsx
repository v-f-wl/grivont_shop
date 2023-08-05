import InfoCard from "./InfoCard";
import Title from "./Title";

const InfoContainer = () => {

  const info: string = 'Добро пожаловать в наш бюджетный мир покупок! Здесь могла быть информация о том, как управлять аккаунтом, но пока у нас бюджет проект. Мы постараемся поделиться полезными советами в ближайшем будущем. Следите за обновлениями и оставайтесь с нами!'
  const sec: string = `Приветствуем вас! Здесь, в идеальном мире, могла бы располагаться ценнейшая информация о том, как обеспечить безопасность ваших покупок. Но, у нас, к сожалению, бюджетный проект, и пока наши силы и ресурсы сосредоточены на других аспектах. Мы обязательно постараемся вернуться с полезными советами и инсайтами о безопасности, когда наш бюджет позволит. А пока - держитесь и продолжайте делать умные выборы!`
  return ( 
    <div className="">
      <div className="flex items-center justify-between">
        <Title titleValue="Полезная информация"/>
      </div>
      <div className="mt-8 flex justify-between gap-14">
        <InfoCard 
          idValue="for_per" 
          titleValue="Как вести аккаунт" 
          descriptionPrev="Статья поможет вам понять главные принципы работы данного сайта"
          descriptionValue={info}
        />
        <InfoCard 
          idValue="for_per" 
          titleValue="Правила безопасности" 
          descriptionPrev = 'Статья поожет вам понять главные принципы работы данного сайта'
          descriptionValue={sec}
        />
      </div>
    </div>
  );
}
 
export default InfoContainer;