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
      <div className="hidden md:flex flex-col items-center justify-between py-5 border-r border-[#1A1A1A]/10 w-[clamp(80px,5vw,160px)] shrink-0">
        <div className="editorial-vertical-text text-[clamp(10px,0.8vw,16px)]">Введение</div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-[clamp(40px,5vw,100px)] relative">
        <div className="editorial-badge mb-[clamp(24px,3vw,60px)] text-[clamp(11px,1vw,18px)] px-[clamp(12px,1vw,24px)] py-[clamp(4px,0.4vw,12px)] self-start">Контекст</div>
        
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: false, amount: 0.5 }}
           className="font-serif text-[clamp(2rem,4vw,6rem)] leading-[1.3] text-[#1A1A1A] border-l-[4px] border-[#1A1A1A] pl-[clamp(32px,4vw,80px)] max-w-[clamp(800px,80vw,1600px)]"
        >
          <motion.p custom={0} variants={textVariants} className="mb-[clamp(16px,2vw,40px)]">
            {line1}
          </motion.p>
          <motion.p custom={1} variants={textVariants} className="mb-[clamp(16px,2vw,40px)]">
            {line2}
          </motion.p>
          <motion.p custom={2} variants={textVariants} className="font-bold italic mt-[clamp(24px,3vw,60px)] text-[#444] text-[clamp(1.5rem,3.5vw,5rem)]">
            {line3}
          </motion.p>
        </motion.div>
      </div>
      
      <div className="hidden xl:block border-l border-[#1A1A1A]/10 bg-[#FDFCFB] w-[clamp(340px,25vw,600px)] shrink-0"></div>
    </section>
  );
}
