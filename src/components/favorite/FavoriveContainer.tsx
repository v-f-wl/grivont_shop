import { useEffect, useState } from "react";
import Loading from "../UI/Loading";
import EmptyPage from "../UI/EmptyPage";
import FavoriteList from "./FavoriteList";
import Title from "../UI/Title";

const FavoriveContainer = () => {
  const[isEmpty, setIsEmpty] = useState<string>('none')

  useEffect(() => {
    const updateStateWithTimeout = () => {
      setTimeout(() => {
        setIsEmpty('list');
      }, 1000);
    };
    updateStateWithTimeout();
  }, []);


  const renderComponent = () => {
    switch(isEmpty){
      case 'none':
        return <Loading/>
      case 'empty':
        return <EmptyPage title="Вы ничего не добавляли в закладки"/>
      case 'list':
        return <FavoriteList/>
      default:
        return <EmptyPage title="Вы ничего не добавляли в закладки"/>
    }
  }
  return ( 
    <div className="mt-[120px]">
      <Title title="Избранное"/>
      <div className="mt-8 mb-4">
        {renderComponent()}
      </div>
    </div>
  );
}
 
export default FavoriveContainer;