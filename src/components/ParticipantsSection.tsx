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
      <div className="hidden md:flex flex-col items-center justify-between py-5 border-r border-[#1A1A1A]/10 w-[80px] 2xl:w-[120px] shrink-0">
        <div className="editorial-vertical-text 2xl:text-[14px]">Авторы Проекта</div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-10 2xl:p-20 relative">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.5 }}
           transition={{ duration: 0.8 }}
           className="w-full max-w-5xl xl:max-w-7xl 2xl:max-w-[100rem]"
        >
          <div className="editorial-badge mb-8 2xl:mb-12 2xl:text-[16px] 2xl:px-4 2xl:py-2">Участники Проекта</div>
          
          <h2 className="text-4xl md:text-[56px] xl:text-[80px] 2xl:text-[120px] leading-[1.1] font-bold text-[#1A1A1A] tracking-[-0.04em] mb-12 2xl:mb-16 uppercase border-b border-[#1A1A1A]/20 pb-6 2xl:pb-10 text-center md:text-left">
            Команда 108-группы <br /> ТАТУ Академик лицейи
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 2xl:gap-16 max-w-4xl xl:max-w-6xl 2xl:max-w-[90rem]">
            {participants.map((p, idx) => (
              <div key={idx} className="flex flex-col border-l-2 border-[#1A1A1A] pl-4 2xl:pl-8">
                <span className="text-[12px] 2xl:text-[18px] uppercase tracking-widest text-[#1A1A1A]/60 font-semibold mb-1 2xl:mb-3">
                  {p.role}
                </span>
                <span className="text-[20px] md:text-[24px] xl:text-[32px] 2xl:text-[48px] font-serif italic text-[#1A1A1A]">
                  {p.name}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-16 2xl:mt-24 text-[#1A1A1A]/50 text-sm 2xl:text-[20px] font-medium w-full md:max-w-2xl 2xl:max-w-5xl leading-relaxed">
            * Данный проект подготовлен учащимися Академического лицея при Ташкентском университете информационных технологий. Наша цель — показать красоту, богатство и многообразие национального состава Узбекистана в современном цифровом формате.
          </div>
        </motion.div>
      </div>
      
      <div className="hidden xl:block border-l border-[#1A1A1A]/10 bg-[#FDFCFB] w-[340px] xl:w-[400px] 2xl:w-[600px] shrink-0 p-8 2xl:p-16"></div>
    </section>
  );
}
