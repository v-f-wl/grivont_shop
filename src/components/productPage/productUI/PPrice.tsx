const PPrice = ({price} : {price: number}) => {
  return ( 
    <div className="mt-5 dark:text-gray-300 text-purple-400 text-xl md:text-2xl font-medium">
      {price} руб
    </div>
  );
}
 
export default PPrice;