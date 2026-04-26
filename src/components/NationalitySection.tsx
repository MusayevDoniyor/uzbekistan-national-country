import { motion } from "motion/react";
import { NationalityData } from "../data";

interface Props {
  data: NationalityData;
  index: number;
}

export default function NationalitySection({ data, index }: Props) {
  const Icon = data.icon;

  const getVariants = () => {
    switch (data.animation) {
      case "slide-left":
        return {
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } }
        };
      case "slide-right":
        return {
          hidden: { opacity: 0, x: 100 },
          visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } }
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } }
        };
      case "parallax":
        return {
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
        };
      case "fade":
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 1.2, ease: "easeInOut" } }
        };
    }
  };

  return (
    <section className="snap-section flex flex-col md:flex-row bg-[#F8F5F2] relative">
      <div className="hidden md:flex flex-col items-center justify-between py-5 border-r border-[#1A1A1A]/10 w-[80px] 2xl:w-[120px] shrink-0">
         <div className="editorial-vertical-text 2xl:text-[14px]">Лица народа</div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-6 md:p-10 2xl:p-20 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={getVariants()}
          className="w-full max-w-5xl xl:max-w-7xl 2xl:max-w-[100rem]"
        >
           <div className="editorial-badge mb-4 md:mb-6 2xl:mb-10 2xl:text-[16px] 2xl:px-4 2xl:py-2">{String(index + 1).padStart(2, '0')} / 08</div>
           <h2 className="text-5xl md:text-[80px] xl:text-[100px] 2xl:text-[140px] leading-[0.85] font-bold text-[#1A1A1A] tracking-[-0.04em] mb-4 2xl:mb-8 uppercase">
             {data.title}
           </h2>

           <div className="text-[20px] md:text-[24px] xl:text-[32px] 2xl:text-[40px] font-serif italic text-[#444] leading-[1.4] mt-6 md:mt-8 2xl:mt-12 border-l-[4px] border-[#1A1A1A] pl-5 md:pl-6 max-w-3xl xl:max-w-5xl 2xl:max-w-6xl">
             « {data.dialogue} »
           </div>

           <div className="mt-8 md:mt-12 2xl:mt-16 flex flex-col sm:flex-row gap-6 sm:gap-8 2xl:gap-12 sm:items-center max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
             <div className="w-[140px] h-[180px] md:w-[180px] md:h-[240px] xl:w-[240px] xl:h-[320px] 2xl:w-[320px] 2xl:h-[420px] bg-[#DDD] border border-[#1A1A1A] relative overflow-hidden shrink-0 shadow-lg group">
               <img src={data.imageUrl} alt={data.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
               <div className="absolute inset-0 bg-black/10"></div>
             </div>
             
             <div className="flex-1 pb-4">
               <div className="editorial-divider mb-3 2xl:mb-6"></div>
               <div className="flex justify-between font-bold text-[10px] 2xl:text-[14px] uppercase mb-2 2xl:mb-4">
                 <span>КУЛЬТУРНЫЙ КОД</span>
                 <span>0{index + 1}/08</span>
               </div>
               <p className="text-[13px] md:text-[14px] xl:text-[18px] 2xl:text-[22px] leading-relaxed text-[#1A1A1A] max-w-lg xl:max-w-2xl 2xl:max-w-4xl">
                 <span className="font-bold uppercase tracking-wide">{data.detail.split(':')[0]}:</span> {data.detail.split(':')[1]}
               </p>
             </div>
           </div>
        </motion.div>
      </div>

      <div className="hidden xl:flex flex-col border-l border-[#1A1A1A]/10 bg-[#FDFCFB] p-8 2xl:p-16 w-[340px] xl:w-[400px] 2xl:w-[600px] shrink-0 gap-6 2xl:gap-10">
        <h3 className="text-[14px] 2xl:text-[18px] uppercase tracking-[0.1em] opacity-50 m-0">Статистика & Факты</h3>
        
        <div className="p-5 2xl:p-8 border border-[#1A1A1A] bg-white shadow-[10px_10px_0px_rgba(0,0,0,0.05)] 2xl:shadow-[20px_20px_0px_rgba(0,0,0,0.05)]">
           <div className="flex justify-between items-start mb-2 2xl:mb-4">
             <div className="text-[10px] 2xl:text-[14px] opacity-50">{String(index + 1).padStart(2, '0')}</div>
             <Icon className="text-[#1A1A1A]/40 w-[18px] h-[18px] 2xl:w-[24px] 2xl:h-[24px]" />
           </div>
           
           <div className="font-bold text-[20px] 2xl:text-[32px] mb-1 2xl:mb-3">{data.title}</div>
           <div className="text-[13px] 2xl:text-[18px] opacity-80 mt-2 2xl:mt-4 font-serif leading-relaxed italic border-l-2 pl-2 2xl:pl-4 border-[#1A1A1A]/30">
               {data.detail.split(":")[0]} — часть нашей общей мозаики и огромной истории региона.
           </div>
        </div>
      </div>
    </section>
  );
}
