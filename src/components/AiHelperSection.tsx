import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Mic, Send, Bot, User, Loader2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { nationalities } from "../data";
import { useTranslation } from "react-i18next";

export default function AiHelperSection() {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = i18n.language === 'en' ? 'en-US' : 'ru-RU';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
           alert(t('micError'));
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [i18n.language, t]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
        alert(t('micNotSupported'));
        return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
        setQuery(""); // Clear input when starting to listen
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = query.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setQuery("");
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set.");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `Ты помощник-гид для презентации "Узбекистан — многонациональная страна".
Твоя задача — отвечать на вопросы жюри или зрителей по теме урока/презентации.
Отвечай коротко, уважительно, на языке вопроса (${i18n.language}) и по сути.
Используй контекст: проект подготовлен 108-группой ТАТУ Академик лицейи.
В Узбекистане проживает более 130 национальностей в мире и согласии.
В проекте упомянуты: ${nationalities.map(n => n.title).join(", ")}.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || "..." }]);
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Error" }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <section className="snap-section flex flex-col md:flex-row bg-[#F8F5F2] relative">
      <div className="hidden md:flex flex-col items-center justify-between py-5 border-r border-[#1A1A1A]/10 w-[80px] 2xl:w-[120px] shrink-0">
        <div className="editorial-vertical-text 2xl:text-[14px]">{t('interactive')}</div>
        <div className="editorial-badge 2xl:text-[16px] 2xl:py-2">AI</div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-[clamp(24px,5vw,80px)] relative">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.5 }}
           transition={{ duration: 0.8 }}
           className="w-full max-w-[clamp(800px,70vw,1400px)] mx-auto flex flex-col h-full max-h-[85vh] 2xl:max-h-[80vh]"
        >
          <div className="editorial-badge mb-[clamp(16px,2vw,32px)] text-[clamp(11px,1vw,16px)] px-[clamp(12px,1vw,24px)] py-[clamp(4px,0.4vw,10px)] self-start inline-block">{t('qa')}</div>
          
          <h2 className="text-[clamp(2.5rem,5vw,7.5rem)] leading-[1.1] font-bold text-[#1A1A1A] tracking-[-0.04em] mb-[clamp(20px,3vw,40px)] uppercase border-b border-[#1A1A1A]/20 pb-[clamp(16px,2vw,32px)] break-words">
            {t('aiTitle1')} <br/> <span className="font-serif font-normal italic text-[#1A1A1A]/60 break-words">{t('aiTitle2')}</span>
          </h2>

          <div ref={scrollContainerRef} className="flex-1 bg-white border border-[#1A1A1A] shadow-[clamp(10px,1vw,20px)_clamp(10px,1vw,20px)_0px_rgba(0,0,0,0.05)] p-[clamp(16px,3vw,40px)] mb-[clamp(16px,2vw,32px)] overflow-y-auto flex flex-col gap-[clamp(16px,2vw,32px)]">
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-[#1A1A1A]/40 font-serif italic max-w-[clamp(300px,60vw,800px)] mx-auto">
                <Bot className="mb-[clamp(16px,2vw,32px)] text-[#1A1A1A]/20 w-[clamp(48px,5vw,80px)] h-[clamp(48px,5vw,80px)]" strokeWidth={1} />
                <p className="text-[clamp(1.25rem,2vw,2.5rem)] leading-relaxed">{t('aiPrompt')}</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-[clamp(12px,2vw,24px)] ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'model' && (
                    <div className="w-[clamp(32px,4vw,56px)] h-[clamp(32px,4vw,56px)] rounded-full bg-[#1A1A1A]/5 flex items-center justify-center shrink-0 border border-[#1A1A1A]/20">
                      <Bot className="text-[#1A1A1A] w-[clamp(16px,2vw,28px)] h-[clamp(16px,2vw,28px)]" />
                    </div>
                  )}
                  <div className={`p-[clamp(16px,3vw,32px)] max-w-[80%] rounded-md ${msg.role === 'user' ? 'bg-[#1A1A1A] text-[#F8F5F2]' : 'bg-[#1A1A1A]/5 text-[#1A1A1A]'}`}>
                    <p className="text-[clamp(14px,1.5vw,24px)] leading-relaxed">{msg.text}</p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-[clamp(32px,4vw,56px)] h-[clamp(32px,4vw,56px)] rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0 border border-[#1A1A1A]">
                      <User className="text-[#F8F5F2] w-[clamp(16px,2vw,28px)] h-[clamp(16px,2vw,28px)]" />
                    </div>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex gap-[clamp(12px,2vw,24px)] justify-start">
                <div className="w-[clamp(32px,4vw,56px)] h-[clamp(32px,4vw,56px)] rounded-full bg-[#1A1A1A]/5 flex items-center justify-center shrink-0 border border-[#1A1A1A]/20">
                  <Bot className="text-[#1A1A1A] w-[clamp(16px,2vw,28px)] h-[clamp(16px,2vw,28px)]" />
                </div>
                <div className="p-[clamp(16px,3vw,32px)] rounded-md bg-[#1A1A1A]/5 text-[#1A1A1A]">
                  <Loader2 className="animate-spin text-[#1A1A1A]/50 w-[clamp(16px,2vw,28px)] h-[clamp(16px,2vw,28px)]" />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-[clamp(8px,1vw,16px)] relative">
            <button
              type="button"
              onClick={toggleListening}
              className={`p-[clamp(16px,2vw,24px)] border shrink-0 transition-colors flex items-center justify-center ${isListening ? 'bg-red-500 border-red-500 text-white animate-pulse' : 'bg-white border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A]/5'}`}
            >
              <Mic className="w-[clamp(24px,2.5vw,36px)] h-[clamp(24px,2.5vw,36px)]" />
            </button>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t('aiPlaceholder')}
              className="flex-1 border border-[#1A1A1A] bg-white p-[clamp(16px,2.5vw,32px)] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20 text-[clamp(16px,1.5vw,24px)]"
              disabled={isLoading || isListening}
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="p-[clamp(16px,2vw,24px)] bg-[#1A1A1A] text-[#F8F5F2] hover:bg-[#1A1A1A]/80 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              <Send className="w-[clamp(24px,2.5vw,36px)] h-[clamp(24px,2.5vw,36px)]" />
            </button>
          </form>
        </motion.div>
      </div>
      
      <div className="hidden xl:flex flex-col border-l border-[#1A1A1A]/10 bg-[#FDFCFB] p-8 2xl:p-16 w-[340px] xl:w-[400px] 2xl:w-[600px] shrink-0 gap-6 2xl:gap-10">
        <h3 className="text-[14px] 2xl:text-[18px] uppercase tracking-[0.1em] opacity-50 m-0">{t('aiWork')}</h3>
        
        <div className="p-5 2xl:p-8 border border-[#1A1A1A] bg-white shadow-[10px_10px_0px_rgba(0,0,0,0.05)] 2xl:shadow-[20px_20px_0px_rgba(0,0,0,0.05)]">
           <div className="font-bold text-[18px] 2xl:text-[28px] mb-2 2xl:mb-4 uppercase">{t('aiTextVoice')}</div>
           <div className="text-[13px] 2xl:text-[20px] opacity-80 font-serif leading-relaxed italic border-l-2 pl-2 2xl:pl-4 border-[#1A1A1A]/30">
               {t('aiDesc')}
           </div>
        </div>
      </div>
    </section>
  );
}
