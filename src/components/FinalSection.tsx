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
      <div className="flex-1 flex flex-col justify-center items-center text-center p-10">
        <motion.div 
          className="max-w-4xl flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          <motion.div variants={itemVariants} className="editorial-badge mb-8">Эпилог</motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-[40px] md:text-[64px] font-bold text-[#1A1A1A] uppercase tracking-tight leading-[1] mb-8"
          >
            Мы разные, <br/>
            <span className="font-serif italic font-normal">но мы вместе!</span>
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-[18px] md:text-[24px] font-serif text-[#1A1A1A]/70 mb-12 max-w-2xl"
          >
            Узбекистан — страна дружбы и единства.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="editorial-divider max-w-[200px] mb-8"
          />

          <motion.div 
            variants={itemVariants}
            className="font-bold text-[14px] md:text-[18px] uppercase tracking-[0.2em] text-[#1A1A1A]"
          >
            В многообразии — наша сила.
          </motion.div>
        </motion.div>
      </div>

      <div className="h-[60px] border-t border-[#1A1A1A]/10 flex items-center justify-between px-4 md:px-10 text-[10px] md:text-[12px] uppercase tracking-[0.05em] font-semibold w-full bg-[#FDFCFB]">
        <div>© 2026 ТАТУ АКАДЕМИК ЛИЦЕЙИ, 108-ГРУППА</div>
        <div className="text-[#C62828]">● УЧАЩИЕСЯ АКАДЕМИЧЕСКОГО ЛИЦЕЯ ТУИТ</div>
        <div className="hidden md:block">ТАШКЕНТ</div>
      </div>
    </section>
  );
}
