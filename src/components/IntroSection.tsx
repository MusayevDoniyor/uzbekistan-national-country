import { motion } from "motion/react";

export default function IntroSection() {
  const line1 = "Узбекистан — это не просто государство на карте.";
  const line2 = "Это древний перекресток Великого шелкового пути, где веками встречались цивилизации. Сегодня здесь проживают представители 130+ национальностей.";
  const line3 = "Разные языки и обычаи — но одна общая земля.";
  
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
      <div className="hidden md:flex flex-col items-center justify-between py-5 border-r border-[#1A1A1A]/10 w-[80px] 2xl:w-[120px] shrink-0">
        <div className="editorial-vertical-text 2xl:text-[14px]">Введение</div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-10 2xl:p-20 relative">
        <div className="editorial-badge mb-6 2xl:mb-10 2xl:text-[16px] 2xl:px-4 2xl:py-2">Контекст</div>
        
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: false, amount: 0.5 }}
           className="font-serif text-3xl md:text-[42px] xl:text-[56px] 2xl:text-[72px] leading-[1.3] text-[#1A1A1A] border-l-[4px] border-[#1A1A1A] pl-8 2xl:pl-12 max-w-4xl xl:max-w-6xl 2xl:max-w-7xl"
        >
          <motion.p custom={0} variants={textVariants} className="mb-4 2xl:mb-8">
            {line1}
          </motion.p>
          <motion.p custom={1} variants={textVariants} className="mb-4 2xl:mb-8">
            {line2}
          </motion.p>
          <motion.p custom={2} variants={textVariants} className="font-bold italic mt-4 2xl:mt-8 text-[#444] text-2xl md:text-4xl xl:text-[48px] 2xl:text-[64px]">
            {line3}
          </motion.p>
        </motion.div>
      </div>

      <div className="hidden xl:block border-l border-[#1A1A1A]/10 bg-[#FDFCFB] w-[340px] 2xl:w-[600px] shrink-0"></div>
    </section>
  );
}
