import { useState } from "react";

const PasswordRules = () => {
  const [modalRules, setModalRules] = useState<boolean>(false)
  return (
    <div className="">
      <div 
        onClick={() => setModalRules(prev => !prev)}
        className="
          cursor-pointer 
          p-2 
          rounded-md 
        bg-purple-400
          dark:bg-opacity-20 bg-opacity-70 text-gray-800 dark:text-gray-100
          text-sm font-light
        "
      >
        Подробнее о создании ника
      </div>
      {/* ТЕЛО АККОРДЕОНА С ИНФОРМАЦИЕЙ О ПРАВИЛАХ СОЗДАНИЯ НИКНЕЙМА*/}
      <div 
        className={`
          ${modalRules ? '' : '-translate-y-6'}
          ${modalRules ? '' : 'h-0'} 
          overflow-hidden transition-all duration-300
        `}
      >
        <ul className="text-sm md:text-base list-disc list-inside text-gray-600">
          <li>Используйте только латинские буквы и цифры.</li>
          <li>Длина ника должна быть от 4 до 20 символов.</li>
          <li>Вы можете использовать символы &quot;_&quot;, &quot;-&quot;, и &quot;/&quot;.</li>
          <li>Ник должен быть уникальным.</li>
        </ul>
      </div>
    </div>
  );
}
 
export default PasswordRules;