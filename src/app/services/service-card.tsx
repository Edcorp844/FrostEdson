import Image from 'next/image';

export default function ServiceCard() {
  return (
    <div className="w-100 h-96 border border-separator rounded-2xl shadow-2xl bg-backgroundLayer1 overflow-hidden relative group">

      {/* Background Image 
      <div className="absolute inset-0">
        <Image
          src="/images/gaming.png"
          alt="Game Center"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
*/}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      >
        <source src="https://www.pexels.com/download/video/8128414/" type="video/mp4" />
      </video>

      {/* Blur Mask */}
      <div className="absolute inset-0 image-blur backdrop-blur-lg" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h2 className="text-2xl font-bold mb-1">Game Center</h2>
        <p className="text-labelSecondary text-sm">A platform to play free online games. A free service impelemented for gamers</p>

        <div className="flex items-center justify-between mt-4">
          <div className='flex items-center justify-center gap-2'>
            <div className='rounded-lg bg-backgroundLayer2 p-1'>
              <img src="/svgs/game-center-logo.svg" alt="Icon" width={38} height={38} />
            </div>

            <span className="text-sm font-bold text-gray-300">Frost Games</span>
          </div>

          <button className="px-4 py-2 rounded-full text-sm font-medium bg-systemBlue hover:bg-systemBlue/70 shadow-lg">
            Visit
          </button>
        </div>
      </div>

    </div>
  );
}
