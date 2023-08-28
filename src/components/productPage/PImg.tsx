const PImg = ({imageUrl} : {imageUrl: string}) => {
  return ( 
    <div className="h-[230px] md:h-auto aspect-square rounded-xl overflow-hidden flex justify-center">
      <img 
        className="max-w-full max-h-full object-cover rounded-xl overflow-hidden"
        src={imageUrl}
        alt="img" 
      />
    </div>
  );
}
 
export default PImg;