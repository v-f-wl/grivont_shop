'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const CSearch = () => {
  const [ searchValue, setSearchValue] = useState('')
  const router = useRouter()

  const changeValue = (e: string) => {
    setSearchValue(e)
  }

  const openSearchPage= () => {
    router.push(`/searchpage/?search=${searchValue}`)
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      openSearchPage();
    }
  }
  return ( 
    <div className="ml-12 lg:ml-0 w-[300px] border-b border-purple-400 hidden md:flex items-center justify-between gap-4 px-2">
      <input 
        type="text" 
        className="bg-inherit outline-none h-[32px] py-1 w-full "
        placeholder="Поиск товаров"
        onChange={(e) => changeValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        onClick={openSearchPage}
      >
        <HiOutlineMagnifyingGlass 
          className='text-2xl cursor-pointer'
        />
      </button>
    </div>
  );
}
 
export default CSearch;