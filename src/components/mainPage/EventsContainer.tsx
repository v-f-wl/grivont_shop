import Title from "./Title";

const EventsContainer = () => {
  return (  
    <div className="mt-10 mb-4">
      <div className="flex items-center justify-between">
        <Title titleValue={'События'}/>
      </div>
      <div className="mt-4 h-[100px] flex items-center justify-center gap-14 text-2xl font-bold">
          В разработке
      </div>
    </div>
  );
}
 
export default EventsContainer;