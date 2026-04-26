import { motion } from "motion/react";

export default function FinalSection() {
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
      <div className="flex-1 flex flex-col justify-center items-center text-center p-[clamp(40px,5vw,100px)]">
        <motion.div 
          className="max-w-[clamp(800px,80vw,2000px)] flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          <motion.div variants={itemVariants} className="editorial-badge mb-[clamp(32px,4vw,80px)] text-[clamp(11px,1vw,18px)] px-[clamp(12px,1vw,24px)] py-[clamp(4px,0.4vw,12px)]">Эпилог</motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-[clamp(2.5rem,6vw,10rem)] font-bold text-[#1A1A1A] uppercase tracking-tight leading-[1] mb-[clamp(32px,4vw,80px)]"
          >
            Мы разные, <br/>
            <span className="font-serif italic font-normal">но мы вместе!</span>
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-[clamp(1.125rem,2.5vw,4rem)] font-serif text-[#1A1A1A]/70 mb-[clamp(48px,6vw,120px)] max-w-[clamp(600px,60vw,1600px)]"
          >
            Узбекистан — страна дружбы и единства.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="editorial-divider w-full max-w-[clamp(200px,15vw,600px)] mb-[clamp(32px,4vw,80px)]"
          />

          <motion.div 
            variants={itemVariants}
            className="font-bold text-[clamp(14px,1.5vw,36px)] uppercase tracking-[0.2em] text-[#1A1A1A]"
          >
            В многообразии — наша сила.
          </motion.div>
        </motion.div>
      </div>

      <div className="h-[clamp(60px,5vh,120px)] border-t border-[#1A1A1A]/10 flex items-center justify-between px-[clamp(16px,2vw,80px)] text-[clamp(10px,1vw,18px)] uppercase tracking-[0.05em] font-semibold w-full bg-[#FDFCFB]">
        <div>© 2026 ТАТУ АКАДЕМИК ЛИЦЕЙИ, 108-ГРУППА</div>
        <div className="text-[#C62828] hidden sm:block">● УЧАЩИЕСЯ АКАДЕМИЧЕСКОГО ЛИЦЕЯ ТУИТ</div>
        <div className="hidden md:block">ТАШКЕНТ</div>
      </div>
    </section>
  );
}
