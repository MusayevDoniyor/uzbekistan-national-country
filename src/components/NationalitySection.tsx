import { motion } from "motion/react";
import { NationalityData } from "../data";
import { useTranslation } from "react-i18next";

interface Props {
  data: NationalityData;
  index: number;
}

export default function NationalitySection({ data, index }: Props) {
  const Icon = data.icon;
  const { t } = useTranslation();

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

  const translatedTitle = t(`${data.id}_title`);
  const translatedDialogue = t(`${data.id}_dialogue`);
  const translatedDetail = t(`${data.id}_detail`);

  return (
    <section className="snap-section flex flex-col md:flex-row bg-[#F8F5F2] relative">
      <div className="hidden md:flex flex-col items-center justify-between py-5 border-r border-[#1A1A1A]/10 w-[clamp(80px,5vw,160px)] shrink-0">
         <div className="editorial-vertical-text text-[clamp(10px,0.8vw,16px)]">{t('faces')}</div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-[clamp(24px,5vw,100px)] relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={getVariants()}
          className="w-full max-w-[clamp(800px,70vw,1600px)] mx-auto"
        >
           <div className="editorial-badge mb-[clamp(16px,2vw,40px)] text-[clamp(11px,1vw,18px)] px-[clamp(12px,1vw,24px)] py-[clamp(4px,0.4vw,12px)] self-start inline-block">{String(index + 1).padStart(2, '0')} / 08</div>
           <h2 className="text-[clamp(3.5rem,7vw,10rem)] leading-[0.85] font-bold text-[#1A1A1A] tracking-[-0.04em] mb-[clamp(16px,2vw,40px)] uppercase break-words w-full">
             {translatedTitle}
           </h2>

           <div className="text-[clamp(1.25rem,2.5vw,2.5rem)] font-serif italic text-[#444] leading-[1.4] mt-[clamp(24px,3vw,60px)] border-l-[4px] border-[#1A1A1A] pl-[clamp(20px,2vw,40px)] max-w-full lg:max-w-[85%]">
             « {translatedDialogue} »
           </div>

           <div className="mt-[clamp(32px,4vw,80px)] flex flex-col sm:flex-row gap-[clamp(24px,3vw,60px)] sm:items-center max-w-full">
             <div className="w-[clamp(140px,20vw,350px)] aspect-[3/4] bg-[#DDD] border border-[#1A1A1A] relative overflow-hidden shrink-0 shadow-lg group">
               <img src={data.imageUrl} alt={translatedTitle} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
               <div className="absolute inset-0 bg-black/10"></div>
             </div>
             
             <div className="flex-1 pb-4">
               <div className="editorial-divider mb-[clamp(12px,1.5vw,30px)]"></div>
               <div className="flex justify-between font-bold text-[clamp(10px,1vw,16px)] uppercase mb-[clamp(8px,1vw,20px)] flex-wrap gap-2">
                 <span>{t('culturalCode')}</span>
                 <span>0{index + 1}/08</span>
               </div>
               <p className="text-[clamp(13px,1.4vw,22px)] leading-relaxed text-[#1A1A1A] max-w-full lg:max-w-[90%]">
                 <span className="font-bold uppercase tracking-wide break-words">{translatedDetail.split(':')[0]}:</span> {translatedDetail.split(':')[1]}
               </p>
             </div>
           </div>
        </motion.div>
      </div>

      <div className="hidden xl:flex flex-col border-l border-[#1A1A1A]/10 bg-[#FDFCFB] p-[clamp(32px,3vw,80px)] w-[clamp(340px,25vw,600px)] shrink-0 gap-[clamp(24px,2.5vw,50px)]">
        <h3 className="text-[clamp(14px,1vw,20px)] uppercase tracking-[0.1em] opacity-50 m-0">{t('stats')}</h3>
        
        <div className="p-[clamp(20px,2vw,40px)] border border-[#1A1A1A] bg-white shadow-[clamp(10px,1vw,20px)_clamp(10px,1vw,20px)_0px_rgba(0,0,0,0.05)]">
           <div className="flex justify-between items-start mb-[clamp(8px,1vw,20px)]">
             <div className="text-[clamp(10px,1vw,16px)] opacity-50">{String(index + 1).padStart(2, '0')}</div>
             <Icon className="text-[#1A1A1A]/40 w-[clamp(18px,1.5vw,32px)] h-[clamp(18px,1.5vw,32px)]" />
           </div>
           
           <div className="font-bold text-[clamp(20px,2vw,40px)] mb-[clamp(4px,0.5vw,12px)]">{translatedTitle}</div>
           <div className="text-[clamp(13px,1.2vw,22px)] opacity-80 mt-[clamp(8px,1vw,20px)] font-serif leading-relaxed italic border-l-2 pl-[clamp(8px,1vw,16px)] border-[#1A1A1A]/30">
               {translatedDetail.split(":")[0]} {t('mosaic')}
           </div>
        </div>
      </div>
    </section>
  );
}
