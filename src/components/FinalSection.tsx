import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function FinalSection() {
  const { t } = useTranslation();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section className="snap-section flex flex-col bg-[#F8F5F2] relative">
      <div className="flex-1 flex flex-col justify-center items-center text-center p-[clamp(40px,5vw,100px)] w-full">
        <motion.div 
          className="max-w-[clamp(800px,70vw,1600px)] w-full flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          <motion.div variants={itemVariants} className="editorial-badge mb-[clamp(32px,4vw,80px)] text-[clamp(11px,1vw,18px)] px-[clamp(12px,1vw,24px)] py-[clamp(4px,0.4vw,12px)] inline-block">{t('epilogue')}</motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-[clamp(2.5rem,6vw,10rem)] font-bold text-[#1A1A1A] uppercase tracking-tight leading-[1] mb-[clamp(32px,4vw,80px)] w-full break-words"
          >
            {t('finalTitle1')} <br/>
            <span className="font-serif italic font-normal break-words">{t('finalTitle2')}</span>
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-[clamp(1.125rem,2.5vw,4rem)] font-serif text-[#1A1A1A]/70 mb-[clamp(48px,6vw,120px)] max-w-full lg:max-w-[85%]"
          >
            {t('finalSubtitle')}
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="editorial-divider w-full max-w-[clamp(200px,15vw,600px)] mx-auto mb-[clamp(32px,4vw,80px)]"
          />

          <motion.div 
            variants={itemVariants}
            className="font-bold text-[clamp(14px,1.5vw,36px)] uppercase tracking-[0.2em] text-[#1A1A1A] break-words w-full"
          >
            {t('finalMotto')}
          </motion.div>
        </motion.div>
      </div>

      <div className="h-[clamp(60px,5vh,120px)] border-t border-[#1A1A1A]/10 flex items-center justify-between px-[clamp(16px,2vw,80px)] text-[clamp(10px,1vw,18px)] uppercase tracking-[0.05em] font-semibold w-full bg-[#FDFCFB]">
        <div>{t('footerCopy')}</div>
        <div className="text-[#C62828] hidden sm:block">{t('footerStudents')}</div>
        <div className="hidden md:block">{t('tashkent')}</div>
      </div>
    </section>
  );
}
