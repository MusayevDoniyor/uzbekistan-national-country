import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function IntroSection() {
  const { t } = useTranslation();

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.4,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="snap-section flex flex-col md:flex-row bg-[#F8F5F2] relative">
      <div className="hidden md:flex flex-col items-center justify-between py-5 border-r border-[#1A1A1A]/10 w-[clamp(80px,5vw,160px)] shrink-0">
        <div className="editorial-vertical-text text-[clamp(10px,0.8vw,16px)]">{t('introTitle')}</div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-[clamp(40px,5vw,100px)] relative">
        <div className="w-full max-w-[clamp(800px,70vw,1600px)] mx-auto">
          <div className="editorial-badge mb-[clamp(24px,3vw,60px)] text-[clamp(11px,1vw,18px)] px-[clamp(12px,1vw,24px)] py-[clamp(4px,0.4vw,12px)] self-start inline-block">{t('context')}</div>
          
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: false, amount: 0.5 }}
             className="font-serif text-[clamp(1.75rem,3.5vw,4.5rem)] leading-[1.3] text-[#1A1A1A] border-l-[4px] border-[#1A1A1A] pl-[clamp(20px,4vw,60px)] max-w-full"
          >
            <motion.p custom={0} variants={textVariants} className="mb-[clamp(16px,2vw,40px)]">
              {t('introLine1')}
            </motion.p>
            <motion.p custom={1} variants={textVariants} className="mb-[clamp(16px,2vw,40px)]">
              {t('introLine2')}
            </motion.p>
            <motion.p custom={2} variants={textVariants} className="font-bold italic mt-[clamp(24px,3vw,60px)] text-[#444] text-[clamp(1.5rem,3vw,4rem)]">
              {t('introLine3')}
            </motion.p>
          </motion.div>
        </div>
      </div>
      
      <div className="hidden xl:block border-l border-[#1A1A1A]/10 bg-[#FDFCFB] w-[clamp(340px,25vw,600px)] shrink-0"></div>
    </section>
  );
}
