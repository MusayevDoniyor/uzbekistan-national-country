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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
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
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <section className="snap-section flex flex-col md:flex-row bg-[#F8F5F2] relative">
      <div className="hidden md:flex flex-col items-center justify-between py-5 border-r border-[#1A1A1A]/10 w-[80px] shrink-0">
        <div className="editorial-vertical-text">Интерактив</div>
        <div className="editorial-badge">AI</div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-6 md:p-10 relative">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.5 }}
           transition={{ duration: 0.8 }}
           className="w-full max-w-5xl mx-auto flex flex-col h-full max-h-[85vh]"
        >
          <div className="editorial-badge mb-4">Вопросы и Ответы</div>
          
          <h2 className="text-4xl md:text-[56px] leading-[1.1] font-bold text-[#1A1A1A] tracking-[-0.04em] mb-6 uppercase border-b border-[#1A1A1A]/20 pb-4">
            AI помощник <br/> <span className="font-serif font-normal italic text-[#1A1A1A]/60">для жюри и зрителей</span>
          </h2>

          <div className="flex-1 bg-white border border-[#1A1A1A] shadow-[10px_10px_0px_rgba(0,0,0,0.05)] p-4 md:p-6 mb-6 overflow-y-auto flex flex-col gap-4">
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-[#1A1A1A]/40 font-serif italic max-w-lg mx-auto">
                <Bot size={48} strokeWidth={1} className="mb-4 text-[#1A1A1A]/20" />
                <p className="text-xl">Есть вопросы о нашей многонациональной семье? Спросите, или используйте микрофон.</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center shrink-0 border border-[#1A1A1A]/20">
                      <Bot size={16} className="text-[#1A1A1A]" />
                    </div>
                  )}
                  <div className={`p-4 max-w-[80%] rounded-md ${msg.role === 'user' ? 'bg-[#1A1A1A] text-[#F8F5F2]' : 'bg-[#1A1A1A]/5 text-[#1A1A1A]'}`}>
                    <p className="text-[14px] md:text-[15px] leading-relaxed">{msg.text}</p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0 border border-[#1A1A1A]">
                      <User size={16} className="text-[#F8F5F2]" />
                    </div>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center shrink-0 border border-[#1A1A1A]/20">
                  <Bot size={16} className="text-[#1A1A1A]" />
                </div>
                <div className="p-4 rounded-md bg-[#1A1A1A]/5 text-[#1A1A1A]">
                  <Loader2 size={16} className="animate-spin text-[#1A1A1A]/50" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 relative">
            <button
              type="button"
              onClick={toggleListening}
              className={`p-4 border shrink-0 transition-colors ${isListening ? 'bg-red-500 border-red-500 text-white animate-pulse' : 'bg-white border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A]/5'}`}
            >
              <Mic size={24} />
            </button>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Задайте ваш вопрос..."
              className="flex-1 border border-[#1A1A1A] bg-white p-4 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20 text-[16px]"
              disabled={isLoading || isListening}
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="p-4 bg-[#1A1A1A] text-[#F8F5F2] hover:bg-[#1A1A1A]/80 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              <Send size={24} />
            </button>
          </form>
        </motion.div>
      </div>
      
      <div className="hidden xl:flex flex-col border-l border-[#1A1A1A]/10 bg-[#FDFCFB] p-8 w-[340px] shrink-0 gap-6">
        <h3 className="text-[14px] uppercase tracking-[0.1em] opacity-50 m-0">Как работает AI?</h3>
        
        <div className="p-5 border border-[#1A1A1A] bg-white shadow-[10px_10px_0px_rgba(0,0,0,0.05)]">
           <div className="font-bold text-[18px] mb-2 uppercase">Текст и Голос</div>
           <div className="text-[13px] opacity-80 font-serif leading-relaxed italic">
               Вы можете как напечатать вопрос, так и произнести его вслух (STT). Искусственный интеллект обучен на материалах нашего проекта.
           </div>
        </div>
      </div>
    </section>
  );
}
