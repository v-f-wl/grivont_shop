'use client'
import Compressor from "compressorjs";
import { useState, useEffect } from "react";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";

interface AddImageProps{
  changeCategory: (title: string, value: string) => void
}
const AddImage: React.FC<AddImageProps> = ({changeCategory}) => {
  const [imageSrc, setImageSrc] = useState<string>('')

  useEffect(() => {
    changeCategory('imageSrc', imageSrc)
  }, [imageSrc])

  
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
    <div className="mt-4 flex items-center gap-8">
      <div className={`${imageSrc !== '' ? 'block' : 'hidden'} border border-purple-400 rounded-xl w-[300px] h-[300px] overflow-hidden`}>
        <img src={imageSrc} alt="" className="w-full h-full object-cover object-center"/>
      </div>
        <div 
          className="relative border border-purple-400 rounded-xl flex items-center gap-4 px-5 py-2 cursor-pointer"
        >
          <HiOutlineArrowTopRightOnSquare size={24}/>
          <span className="font-medium text-xl">Добавить фото</span>
          <input type="file" className="cursor-pointer absolute z-10 opacity-0" onChange={handleOnChange}/>
        </div>
      </div>
    </>
  );
}
 
export default AddImage;