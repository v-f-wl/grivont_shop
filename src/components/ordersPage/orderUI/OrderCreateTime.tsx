import { format } from "date-fns"
import ruLocale from 'date-fns/locale/ru'

const OrderCreateTime = ({dataValue} : {dataValue: string}) => {
  function formatDateToDMY(inputDate: string): string {
    const date = new Date(inputDate);
    return format(date, 'dd MMMM yyyy',  { locale: ruLocale })
  }
  return ( 
    <span className="block text-sm md:text-base">Создан: {formatDateToDMY(dataValue)}</span>
  )
}
 
export default OrderCreateTime;