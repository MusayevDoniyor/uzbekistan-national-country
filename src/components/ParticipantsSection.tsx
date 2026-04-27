import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function ParticipantsSection() {
  const { t } = useTranslation();
  
  // Note: Names might not change between languages, but roles could
  const participants = [
    { name: "Имя Фамилия 1", role: t('managerRole') },
    { name: "Имя Фамилия 2", role: t('contentRole') },
    { name: "Имя Фамилия 3", role: t('managerRole') }, // Just use similar roles as placeholders
    { name: "Имя Фамилия 4", role: t('contentRole') },
    { name: "Имя Фамилия 5", role: t('managerRole') },
  ];

  return (
    <section className="snap-section flex flex-col md:flex-row bg-[#F8F5F2] relative">
      <div className="hidden md:flex flex-col items-center justify-between py-5 border-r border-[#1A1A1A]/10 w-[clamp(80px,5vw,160px)] shrink-0">
        <div className="editorial-vertical-text text-[clamp(10px,0.8vw,16px)]">{t('authors')}</div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-[clamp(40px,5vw,100px)] relative">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.5 }}
           transition={{ duration: 0.8 }}
           className="w-full max-w-[clamp(800px,70vw,1600px)] mx-auto flex flex-col"
        >
          <div className="editorial-badge mb-[clamp(32px,4vw,80px)] text-[clamp(11px,1vw,18px)] px-[clamp(12px,1vw,24px)] py-[clamp(4px,0.4vw,12px)] self-start inline-block">{t('participantsBadge')}</div>
          
          <h2 
            className="text-[clamp(2.5rem,5vw,8rem)] leading-[1.1] font-bold text-[#1A1A1A] tracking-[-0.04em] mb-[clamp(40px,5vw,100px)] uppercase border-b border-[#1A1A1A]/20 pb-[clamp(24px,3vw,60px)] text-center md:text-left break-words w-full"
            dangerouslySetInnerHTML={{ __html: t('team') }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(24px,3vw,80px)] w-full">
            {participants.map((p, idx) => (
              <div key={idx} className="flex flex-col border-l-2 border-[#1A1A1A] pl-[clamp(16px,2vw,40px)]">
                <span className="text-[clamp(11px,1vw,18px)] uppercase tracking-widest text-[#1A1A1A]/60 font-semibold mb-[clamp(4px,0.5vw,12px)] break-words">
                  {p.role}
                </span>
                <span className="text-[clamp(1.5rem,2vw,3rem)] font-serif italic text-[#1A1A1A] break-words">
                  {p.name}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-[clamp(64px,8vw,120px)] text-[#1A1A1A]/50 text-[clamp(13px,1.2vw,20px)] font-medium w-full max-w-full lg:max-w-[85%] leading-relaxed">
            {t('disclaimer')}
          </div>
        </motion.div>
      </div>
      
      <div className="hidden xl:block border-l border-[#1A1A1A]/10 bg-[#FDFCFB] w-[clamp(340px,25vw,600px)] shrink-0 p-[clamp(32px,4vw,80px)]"></div>
    </section>
  );
}
