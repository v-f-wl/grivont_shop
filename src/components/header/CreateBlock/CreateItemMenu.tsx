import { ReactNode } from "react"
import Link from "next/link"

interface ItemContainerProps {
  children: ReactNode,
  link: string,
  mute?: boolean,
  handleFunction?:() => void
}

const ItemContainer:React.FC<ItemContainerProps> = ({
  children, 
  link, 
  mute, 
  handleFunction
}) => {
  return (
    <Link href={link}
      onClick={handleFunction}
      className={`
        ${mute && 'opacity-20'}
        ${mute ? '' : 'dark:hover:border-purple-400 hover:border-purple-500'}
        ${mute ? 'cursor-default' : 'cursor-pointer'}
        flex gap-4 items-center md:border dark:border-white border-gray-800
        md:p-4 rounded-xl  transition-all
      `}
    >
      {children}
    </Link>
  )
}

export default ItemContainer