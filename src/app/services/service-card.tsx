
interface ServiceCardProps {
  title: string,
  description: string,
  video: string,
  logo: string,
  serviceName: string,
}


const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, video, logo, serviceName}) =>{
  return (
    <div className="w-full h-80 aspect-[3/3] md:aspect-[3/3] md:h-[350px] lg:h-96  border border-separator rounded-3xl shadow-3xl bg-backgroundLayer1 overflow-hidden relative group">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-150"
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Blur Mask */}
      <div className="absolute inset-0 image-blur backdrop-blur-2xl" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 bg-backdrop border border-separator p-2 m-2 rounded-2xl shadow-3xl">
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        <p className="text-labelSecondary  text-sm">{description}</p>

        <div className="flex items-center justify-between mt-4 ">
          <div className='flex items-center justify-center gap-2 shadow-3xl'>
            <div className='rounded-lg bg-backgroundLayer2 p-1'>
              <img src={logo} alt="Icon" width={38} height={38} />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-bold">{serviceName}</span>
              <span className="text-sm text-labelSecondary">Its working</span>
            </div>
          </div>

          <button className="px-4 py-2 rounded-full text-sm font-medium bg-systemPink text-background hover:bg-systemPink/70 shadow-lg">
            Visit
          </button>
        </div>
      </div>

    </div>
  );
  
}

export default ServiceCard;
