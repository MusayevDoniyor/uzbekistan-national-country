import { motion } from "motion/react";

export default function ParticipantsSection() {
  const participants = [
    { name: "Имя Фамилия 1", role: "Редактор / Исследователь" },
    { name: "Имя Фамилия 2", role: "Дизайнер / Разработчик" },
    { name: "Имя Фамилия 3", role: "Копирайтер" },
    { name: "Имя Фамилия 4", role: "Контент-менеджер" },
    { name: "Имя Фамилия 5", role: "Историк-консультант" },
  ];

  return (
    <section className="snap-section flex flex-col md:flex-row bg-[#F8F5F2] relative">
      <div className="hidden md:flex flex-col items-center justify-between py-5 border-r border-[#1A1A1A]/10 w-[clamp(80px,5vw,160px)] shrink-0">
        <div className="editorial-vertical-text text-[clamp(10px,0.8vw,16px)]">Авторы Проекта</div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-[clamp(40px,5vw,100px)] relative">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.5 }}
           transition={{ duration: 0.8 }}
           className="w-full max-w-[clamp(800px,80vw,2000px)]"
        >
          <div className="editorial-badge mb-[clamp(32px,4vw,80px)] text-[clamp(11px,1vw,18px)] px-[clamp(12px,1vw,24px)] py-[clamp(4px,0.4vw,12px)] self-start">Участники Проекта</div>
          
          <h2 className="text-[clamp(2.5rem,5.5vw,9rem)] leading-[1.1] font-bold text-[#1A1A1A] tracking-[-0.04em] mb-[clamp(48px,6vw,120px)] uppercase border-b border-[#1A1A1A]/20 pb-[clamp(24px,3vw,60px)] text-center md:text-left">
            Команда 108-группы <br /> ТАТУ Академик лицейи
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(32px,4vw,100px)] max-w-[clamp(800px,70vw,1600px)]">
            {participants.map((p, idx) => (
              <div key={idx} className="flex flex-col border-l-2 border-[#1A1A1A] pl-[clamp(16px,2vw,40px)]">
                <span className="text-[clamp(12px,1vw,22px)] uppercase tracking-widest text-[#1A1A1A]/60 font-semibold mb-[clamp(4px,0.5vw,12px)]">
                  {p.role}
                </span>
                <span className="text-[clamp(20px,2vw,48px)] font-serif italic text-[#1A1A1A]">
                  {p.name}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-[clamp(64px,8vw,160px)] text-[#1A1A1A]/50 text-[clamp(14px,1.2vw,24px)] font-medium w-full max-w-[clamp(600px,60vw,1400px)] leading-relaxed">
            * Данный проект подготовлен учащимися Академического лицея при Ташкентском университете информационных технологий. Наша цель — показать красоту, богатство и многообразие национального состава Узбекистана в современном цифровом формате.
          </div>
        </motion.div>
      </div>
      
      <div className="hidden xl:block border-l border-[#1A1A1A]/10 bg-[#FDFCFB] w-[clamp(340px,25vw,600px)] shrink-0 p-[clamp(32px,4vw,80px)]"></div>
    </section>
  );
}
