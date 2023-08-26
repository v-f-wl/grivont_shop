'use client'
import CModal from "../CModal";
import ColorResetBtn from "./ColorResetBtn";
import { colorsPallet } from "../../../../../utils/colors";
import ColorItem from "./ColorItem";
import ModalTitle from "../ModalTitle";

const ColorModal = () => {
  return ( 
    <CModal label='color'>
      <ColorResetBtn/>
      <ModalTitle title="Выберете цвет"/>
      {Object.keys(colorsPallet).map((colorName) => (
        <ColorItem 
          key={colorName} 
          label={colorName} 
          color={colorsPallet[colorName].color} 
          title={colorsPallet[colorName].value}
        />
      ))}
    </CModal>
  );
}
 
export default ColorModal;