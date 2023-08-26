import Link from "next/link"
import { ReactNode } from "react"

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
        ${mute ? '' : 'cursor-pointer'}
        flex gap-4 items-center border 
        p-4 rounded-xl  transition-all
      `}
    >
      {children}
    </Link>
  )
}

export default ItemContainer