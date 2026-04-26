import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Mic, Send, Bot, User, Loader2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { nationalities } from "../data";

export default function AiHelperSection() {
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
      recognition.lang = 'ru-RU';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
           alert("Пожалуйста, разрешите доступ к микрофону в браузере.");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
        alert("Голосовой ввод не поддерживается в вашем браузере. Пожалуйста, используйте текстовый ввод.");
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
Отвечай коротко, уважительно, на русском языке и по сути.
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

      setMessages(prev => [...prev, { role: 'model', text: response.text || "Извините, не удалось ответить." }]);
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Произошла ошибка при обращении к ИИ." }]);
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
        <div className="editorial-vertical-text 2xl:text-[14px]">Интерактив</div>
        <div className="editorial-badge 2xl:text-[16px] 2xl:py-2">AI</div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-6 md:p-10 2xl:p-20 relative">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.5 }}
           transition={{ duration: 0.8 }}
           className="w-full max-w-5xl xl:max-w-7xl 2xl:max-w-[100rem] mx-auto flex flex-col h-full max-h-[85vh] 2xl:max-h-[80vh]"
        >
          <div className="editorial-badge mb-4 2xl:mb-8 2xl:text-[16px] 2xl:px-4 2xl:py-2 self-start">Вопросы и Ответы</div>
          
          <h2 className="text-4xl md:text-[56px] xl:text-[80px] 2xl:text-[120px] leading-[1.1] font-bold text-[#1A1A1A] tracking-[-0.04em] mb-6 2xl:mb-10 uppercase border-b border-[#1A1A1A]/20 pb-4 2xl:pb-8">
            AI помощник <br/> <span className="font-serif font-normal italic text-[#1A1A1A]/60">для жюри и зрителей</span>
          </h2>

          <div ref={scrollContainerRef} className="flex-1 bg-white border border-[#1A1A1A] shadow-[10px_10px_0px_rgba(0,0,0,0.05)] 2xl:shadow-[20px_20px_0px_rgba(0,0,0,0.05)] p-4 md:p-6 2xl:p-10 mb-6 overflow-y-auto flex flex-col gap-4 2xl:gap-8">
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-[#1A1A1A]/40 font-serif italic max-w-lg 2xl:max-w-3xl mx-auto">
                <Bot className="mb-4 text-[#1A1A1A]/20 w-[48px] h-[48px] 2xl:w-[80px] 2xl:h-[80px]" strokeWidth={1} />
                <p className="text-xl 2xl:text-3xl leading-relaxed">Есть вопросы о нашей многонациональной семье? Спросите, или используйте микрофон.</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 2xl:gap-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 2xl:w-14 2xl:h-14 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center shrink-0 border border-[#1A1A1A]/20">
                      <Bot className="text-[#1A1A1A] w-[16px] h-[16px] 2xl:w-[28px] 2xl:h-[28px]" />
                    </div>
                  )}
                  <div className={`p-4 2xl:p-8 max-w-[80%] rounded-md ${msg.role === 'user' ? 'bg-[#1A1A1A] text-[#F8F5F2]' : 'bg-[#1A1A1A]/5 text-[#1A1A1A]'}`}>
                    <p className="text-[14px] md:text-[15px] xl:text-[18px] 2xl:text-[24px] leading-relaxed">{msg.text}</p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 2xl:w-14 2xl:h-14 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0 border border-[#1A1A1A]">
                      <User className="text-[#F8F5F2] w-[16px] h-[16px] 2xl:w-[28px] 2xl:h-[28px]" />
                    </div>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex gap-3 2xl:gap-6 justify-start">
                <div className="w-8 h-8 2xl:w-14 2xl:h-14 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center shrink-0 border border-[#1A1A1A]/20">
                  <Bot className="text-[#1A1A1A] w-[16px] h-[16px] 2xl:w-[28px] 2xl:h-[28px]" />
                </div>
                <div className="p-4 2xl:p-8 rounded-md bg-[#1A1A1A]/5 text-[#1A1A1A]">
                  <Loader2 className="animate-spin text-[#1A1A1A]/50 w-[16px] h-[16px] 2xl:w-[28px] 2xl:h-[28px]" />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 2xl:gap-4 relative">
            <button
              type="button"
              onClick={toggleListening}
              className={`p-4 2xl:p-6 border shrink-0 transition-colors ${isListening ? 'bg-red-500 border-red-500 text-white animate-pulse' : 'bg-white border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A]/5'}`}
            >
              <Mic className="w-[24px] h-[24px] 2xl:w-[36px] 2xl:h-[36px]" />
            </button>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Задайте ваш вопрос..."
              className="flex-1 border border-[#1A1A1A] bg-white p-4 2xl:p-8 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20 text-[16px] 2xl:text-[24px]"
              disabled={isLoading || isListening}
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="p-4 2xl:p-6 bg-[#1A1A1A] text-[#F8F5F2] hover:bg-[#1A1A1A]/80 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              <Send className="w-[24px] h-[24px] 2xl:w-[36px] 2xl:h-[36px]" />
            </button>
          </form>
        </motion.div>
      </div>
      
      <div className="hidden xl:flex flex-col border-l border-[#1A1A1A]/10 bg-[#FDFCFB] p-8 2xl:p-16 w-[340px] xl:w-[400px] 2xl:w-[600px] shrink-0 gap-6 2xl:gap-10">
        <h3 className="text-[14px] 2xl:text-[18px] uppercase tracking-[0.1em] opacity-50 m-0">Как работает AI?</h3>
        
        <div className="p-5 2xl:p-8 border border-[#1A1A1A] bg-white shadow-[10px_10px_0px_rgba(0,0,0,0.05)] 2xl:shadow-[20px_20px_0px_rgba(0,0,0,0.05)]">
           <div className="font-bold text-[18px] 2xl:text-[28px] mb-2 2xl:mb-4 uppercase">Текст и Голос</div>
           <div className="text-[13px] 2xl:text-[20px] opacity-80 font-serif leading-relaxed italic border-l-2 pl-2 2xl:pl-4 border-[#1A1A1A]/30">
               Вы можете как напечатать вопрос, так и произнести его вслух (STT). Искусственный интеллект обучен на материалах нашего проекта.
           </div>
        </div>
      </div>
    </section>
  );
}
