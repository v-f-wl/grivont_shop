import OrderCard from "../orderUI/OrderCard";

interface Items{
  productId: string,
  image: string,
  title: string
}

interface RenderModalProsuctsProps{
  orderItems: Items[]
}
const RenderModalProsucts:React.FC<RenderModalProsuctsProps> = ({orderItems}) => {
  return (  
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {orderItems.map(item => (
        <OrderCard
          key={item.productId}
          productId={item.productId}
          imageSrc={item.image}
          title={item.title}
        />
      ))}
    </div>

  );
}
 
export default RenderModalProsucts;