
type MyImageData = {url: string}

interface ImageObj{
  data: MyImageData 
}

export interface ProductDataType{
  _id: string,
  title: string,
  priceOfProduct: number,
  countOfProducts: number,
  colorLink: string,
  imageSrc: ImageObj[],
  description: string,
  link: string,
}
