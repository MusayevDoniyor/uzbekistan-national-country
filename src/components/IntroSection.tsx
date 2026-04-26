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
      <div className="hidden md:flex flex-col items-center justify-between py-5 border-r border-[#1A1A1A]/10 w-[80px] shrink-0">
        <div className="editorial-vertical-text">Введение</div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-10 relative">
        <div className="editorial-badge mb-6">Контекст</div>
        
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: false, amount: 0.5 }}
           className="font-serif text-3xl md:text-[42px] leading-[1.3] text-[#1A1A1A] border-l-[4px] border-[#1A1A1A] pl-8 max-w-4xl"
        >
          <motion.p custom={0} variants={textVariants} className="mb-4">
            {line1}
          </motion.p>
          <motion.p custom={1} variants={textVariants} className="mb-4">
            {line2}
          </motion.p>
          <motion.p custom={2} variants={textVariants} className="font-bold italic mt-4 text-[#444] text-2xl md:text-4xl">
            {line3}
          </motion.p>
        </motion.div>
      </div>

      <div className="hidden xl:block border-l border-[#1A1A1A]/10 bg-[#FDFCFB] p-8 w-[340px] shrink-0"></div>
    </section>
  );
}
