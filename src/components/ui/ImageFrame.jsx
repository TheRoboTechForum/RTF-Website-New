export default function ImageFrame({ imageSrc, alt = "Showcase image" }) {
  return (
    <section className="relative w-full py-20 px-4 md:px-8 flex items-center justify-center overflow-hidden">
      {/* Frame Container */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto">
        {/* Outer Frame - Light color to match reference */}
        <div className="bg-[#dfdfdf] p-2 md:p-3 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-gray-400">
          {/* Inner Image Container */}
          <div className="relative w-full aspect-[16/9] border border-gray-500 overflow-hidden group bg-black">
            <img 
              src={imageSrc} 
              alt={alt} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
