import Link from "next/link"

interface OrderCardProps{
  title: string,
  imageSrc: string,
  productId: string
}

const OrderCard:React.FC<OrderCardProps> = ({title, imageSrc, productId}) => {
  return (
    <div className="border p-4 border-gray-600 rounded-xl flex flex-col gap-4">
      <img src={imageSrc} alt="#" className="aspect-square object-cover object-center rounded-xl"/>
      <h3 className="clamped-text-2 h-[46px]">{title}</h3>
      <Link
        href={`/productpage/?id=${productId}`}
        className="py-1 text-lg font-medium cursor-pointer border dark:border-white border-gray-600 rounded-full flex items-center justify-center"
      >
        О товаре
      </Link>
    </div>
  )
}

export default OrderCard