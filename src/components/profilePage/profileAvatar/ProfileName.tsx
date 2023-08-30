interface ProfileNameProps{
  imageUrl: string,
  fullName: string,
  nickName: string
}

const ProfileName:React.FC<ProfileNameProps> = ({
  imageUrl,
  fullName,
  nickName
}) => {
  return ( 
    <div className='flex flex-col gap-3 lg:gap-5'>
      <div className="flex items-center gap-2 md:gap-6">

        {/* ФОТОГРАФИЯ АВТОРА */}
        <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 bg-gray-700 rounded-full overflow-hidden">
          <img 
            className="w-full h-full object-cover"
            src='https://i.pinimg.com/564x/e0/23/84/e0238444ff148e53cb7bdfe8b4efd4e7.jpg'  alt=" " />
        </div>
        
        {/* ИМЯ АВТОРА */}

        <div className="font-bold text-lg md:text-xl lg:text-4xl dark:text-gray-100 text-gray-900">
          {fullName}
        </div>
      </div>
      {/* НИКНЕЙМ АВТОРА */}
      <div className="text-sm md:text-base lg:text-lg font-medium">
        @{nickName}
      </div>
    </div>
  );
}
 
export default ProfileName;