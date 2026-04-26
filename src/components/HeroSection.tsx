import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="snap-section flex flex-col md:flex-row bg-[#F8F5F2] relative">
      {/* Editorial Navigation Col */}
      <div className="hidden md:flex flex-col items-center justify-between py-5 border-r border-[#1A1A1A]/10 w-[clamp(80px,5vw,160px)] shrink-0">
        <div className="editorial-vertical-text text-[clamp(10px,0.8vw,16px)]">Экспедиция 2024</div>
        <div className="editorial-badge text-[clamp(11px,1vw,18px)] px-[clamp(12px,1vw,24px)] py-[clamp(4px,0.4vw,12px)]">130+</div>
        <div className="editorial-vertical-text text-[clamp(10px,0.8vw,16px)]">Узбекистан — Наш дом</div>
      </div>

      <div className="flex-1 p-[clamp(40px,5vw,100px)] flex flex-col items-start justify-center relative">
        <div className="editorial-badge mb-[clamp(24px,3vw,60px)] text-[clamp(11px,1vw,18px)] px-[clamp(12px,1vw,24px)] py-[clamp(4px,0.4vw,12px)]">Остановка №1: Ташкент</div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: false }}
          className="text-[clamp(4rem,8vw,12rem)] leading-[0.85] font-bold text-[#1A1A1A] tracking-[-0.04em] mb-[clamp(24px,3vw,60px)] uppercase"
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
          className="font-serif text-[clamp(1.125rem,2vw,3rem)] leading-snug opacity-70 max-w-[clamp(500px,50vw,1200px)]"
        >
          Путешествие по стране, где границы между культурами превращаются в мосты дружбы и общего будущего.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-[clamp(40px,5vw,100px)] left-[clamp(40px,5vw,100px)] flex flex-col items-center text-[#1A1A1A] opacity-50 hidden md:flex"
        >
          <span className="text-[clamp(10px,1vw,16px)] uppercase tracking-wider mb-2 font-medium">СКРОЛЛНИТЕ ВНИЗ</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-[clamp(20px,2vw,40px)] h-[clamp(20px,2vw,40px)]" />
          </motion.div>
        </motion.div>
      </div>

      {/* Optional right sidebar for aesthetics */}
      <div className="hidden xl:block border-l border-[#1A1A1A]/10 bg-[#FDFCFB] w-[clamp(400px,30vw,800px)] shrink-0 relative overflow-hidden">
        <img src="https://cdn.gamma.app/42u3h7cbf21y1ql/generated-images/WdaxBN6mUTfWorRIo2-c0.jpg" alt="Узбекистан — многонациональная страна" className="w-full h-full object-cover" />
      </div>
    </section>
  );
}
