'use client'
import { useState, useEffect } from "react";

import Compressor from "compressorjs";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";

interface AddImageProps{
  changeCategory: (title: string, value: string) => void,
  handleError: boolean
}



const AddImage: React.FC<AddImageProps> = ({changeCategory, handleError}) => {
  const [imageSrc, setImageSrc] = useState<string>('')

  // ПРИ ДОБАВЛЕНИЯ КАРТИНКИ ДОБАВЛЯЕТСЯ В CreateContainer
  useEffect(() => {
    changeCategory('imageSrc', imageSrc)
  }, [imageSrc])

  // ФУНКЦИЯ СЖАТИЯ ИЗОБРАДЕНИЕ ДО 1Mb
  async function handleOnChange(changeEvent: React.ChangeEvent<HTMLInputElement> ) {
    const files = changeEvent.target.files;
    if (files && files.length > 0) {
      const imageFile = files[0];
      try {
        const maxSizeMB = 1
        const compressedFile = await new Promise((resolve, reject) => {
          new Compressor(imageFile, {
            quality: 0.95,
            maxWidth: 900,
            maxHeight: 900,
            success(result) {
              if (result.size <= maxSizeMB * 1024 * 1024) {
                const reader = new FileReader()
                reader.onload = function (e: ProgressEvent<FileReader>) {
                  const result = e.target?.result as string | undefined;
                  if (result) {
                    const base64Image = result;
                    setImageSrc(base64Image);
                  }
                }
                reader.onerror = function (error) {
                  reject(error)
                }
                reader.readAsDataURL(result)
              } else {
                console.log('error')
              }
            },
            error(error) {
              reject(error)
            },
          })
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
  return ( 
    <>
    <div className="mt-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full">
      {/* ДОБАВЛЕНОЕ ИЗОБРАЖЕНИЕ */}
      <div className={`${imageSrc !== '' ? 'block' : 'hidden'} ${handleError ? 'border-red-400' : 'border-purple-400'} border  rounded-xl w-[250px] h-[250px] md:w-[300px] md:h-[300px] overflow-hidden`}>
        <img src={imageSrc} alt="" className="w-full h-full object-cover object-center"/>
      </div>
      {/* КНОПКА ДОБАВЛЕНИЯ ИЗОБРАЖЕНИЯ */}
        <div 
          className={`${handleError ? 'border-red-400' : 'border-purple-400'} relative border rounded-xl flex items-center gap-4 px-5 py-2 cursor-pointer`}
        >
          <HiOutlineArrowTopRightOnSquare size={24}/>
          <span className="font-medium text-lg md;text-xl">Добавить фото</span>
          <input type="file" className="cursor-pointer absolute inset-0 z-10 opacity-0" onChange={handleOnChange}/>
        </div>
      </div>
    </>
  );
}
 
export default AddImage;