import ProductCard from "../UI/ProductCard";

const CategoryContainer = () => {

  return (  
    <div className="mt-[120px]">
      <h2 className="font-bold text-4xl">
        Категория
      </h2>
      <div className="mt-8 grid grid-cols-3 gap-8">
        <ProductCard 
          title="wdfsd fsdfs dfs" 
          description="dfvsdfvsdfbsfgb dfvsdf dfsb dsfb sdfb sdfb"
          link="dfvdfv"
          imageSrc="dfvdf"
        />
        <ProductCard 
          title="wdfsd fsdfs dfs" 
          description="dfvsdfvsdfbsfgb dfvsdf dfsb dsfb sdfb sdfb"
          link="dfvdfv"
          imageSrc="dfvdf"
        />
        <ProductCard 
          title="wdfsd fsdfs dfs" 
          description="dfvsdfvsdfbsfgb dfvsdf dfsb dsfb sdfb sdfb"
          link="dfvdfv"
          imageSrc="dfvdf"
        />
        <ProductCard 
          title="wdfsd fsdfs dfs" 
          description="dfvsdfvsdfbsfgb dfvsdf dfsb dsfb sdfb sdfb"
          link="dfvdfv"
          imageSrc="dfvdf"
        />
        <ProductCard 
          title="wdfsd fsdfs dfs" 
          description="dfvsdfvsdfbsfgb dfvsdf dfsb dsfb sdfb sdfb"
          link="dfvdfv"
          imageSrc="dfvdf"
        />
      </div>
    </div>
  );
}
 
export default CategoryContainer;