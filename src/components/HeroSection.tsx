import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="snap-section flex flex-col md:flex-row bg-[#F8F5F2] relative">
      {/* Editorial Navigation Col */}
      <div className="hidden md:flex flex-col items-center justify-between py-5 border-r border-[#1A1A1A]/10 w-[80px] 2xl:w-[120px] shrink-0">
        <div className="editorial-vertical-text 2xl:text-[14px]">Экспедиция 2024</div>
        <div className="editorial-badge 2xl:text-[16px] 2xl:py-2">130+</div>
        <div className="editorial-vertical-text 2xl:text-[14px]">Узбекистан — Наш дом</div>
      </div>

      <div className="flex-1 p-10 2xl:p-20 flex flex-col items-start justify-center relative">
        <div className="editorial-badge mb-6 2xl:mb-10 2xl:text-[16px] 2xl:px-4 2xl:py-2">Остановка №1: Ташкент</div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: false }}
          className="text-6xl md:text-[92px] xl:text-[120px] 2xl:text-[160px] leading-[0.85] font-bold text-[#1A1A1A] tracking-[-0.04em] mb-6 2xl:mb-12 uppercase"
        >
          Узбекистан — <br className="hidden md:block"/>
          <span className="font-serif font-normal text-[#1A1A1A]">Много-</span><br />
          Национальная
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: false }}
          className="font-serif text-[18px] xl:text-[24px] 2xl:text-[32px] 2xl:leading-relaxed opacity-70 max-w-[500px] xl:max-w-[700px] 2xl:max-w-[900px]"
        >
          Путешествие по стране, где границы между культурами превращаются в мосты дружбы и общего будущего.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-10 2xl:bottom-20 2xl:left-20 flex flex-col items-center text-[#1A1A1A] opacity-50 hidden md:flex"
        >
          <span className="text-[10px] 2xl:text-[14px] uppercase tracking-wider mb-2 font-medium">СКРОЛЛНИТЕ ВНИЗ</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-[20px] h-[20px] 2xl:w-[32px] 2xl:h-[32px]" />
          </motion.div>
        </motion.div>
      </div>

      {/* Optional right sidebar for aesthetics */}
      <div className="hidden xl:block border-l border-[#1A1A1A]/10 bg-[#FDFCFB] w-[400px] 2xl:w-[600px] shrink-0 relative overflow-hidden">
        <img src="https://cdn.gamma.app/42u3h7cbf21y1ql/generated-images/WdaxBN6mUTfWorRIo2-c0.jpg" alt="Узбекистан — многонациональная страна" className="w-full h-full object-cover" />
      </div>
    </section>
  );
}
