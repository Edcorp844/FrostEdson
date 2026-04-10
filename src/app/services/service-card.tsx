
interface ServiceCardProps {
  title: string,
  description: string,
  video: string,
  logo: string,
  serviceName: string,
}


const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, video, logo, serviceName}) =>{
  return (
    <div className="w-full h-96 aspect-[3/3] md:aspect-auto md:h-[450px] md:w-[350px] lg:h-96 lg:w-[450px] border border-separator rounded-2xl shadow-2xl bg-backgroundLayer1 overflow-hidden relative group">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Blur Mask */}
      <div className="absolute inset-0 image-blur backdrop-blur-lg" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        <p className="text-gray3 dark:text-labelSecondary  text-sm">{description}</p>

        <div className="flex items-center justify-between mt-4">
          <div className='flex items-center justify-center gap-2'>
            <div className='rounded-lg bg-backgroundLayer2 p-1'>
              <img src={logo} alt="Icon" width={38} height={38} />
            </div>

            <span className="text-sm font-bold text-gray-300">{serviceName}</span>
          </div>

          <button className="px-4 py-2 rounded-full text-sm font-medium bg-systemBlue hover:bg-systemBlue/70 shadow-lg">
            Visit
          </button>
        </div>
      </div>

    </div>
  );
  
}

export default ServiceCard;
