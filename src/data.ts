import { ReactNode } from "react";
import { User, Globe, Coffee, BookOpen, Utensils, Zap, Music, Star, Smile, Camera } from "lucide-react";

export type AnimationType = "slide-left" | "slide-right" | "fade" | "scale" | "parallax";

export interface NationalityData {
  id: string;
  title: string;
  dialogue: string;
  detail: string;
  animation: AnimationType;
  color: string;
  icon: any;
  imageUrl: string;
}

export const nationalities: NationalityData[] = [
  {
    id: "uzbeks",
    title: "Узбеки",
    dialogue: "Я узбек. Гостеприимство — это не просто правило нашего быта, это состояние души. Мы верим, что гость в доме — это радость, посланная свыше.",
    detail: "Традиция: Махалля — уникальный институт соседства, где радость и горе делятся поровну между всеми. И конечно, легендарный плов, объединяющий за одним дастарханом.",
    animation: "fade",
    color: "#E8F0FE",
    icon: User,
    imageUrl: "https://cdn.gamma.app/42u3h7cbf21y1ql/generated-images/JBw26_VTPnHn5fptYVTcm.jpg",
  },
  {
    id: "russians",
    title: "Русские",
    dialogue: "Я русская. Наши судьбы тесно переплелись с историей этого края еще в позапрошлом веке. Мы привезли сюда свою литературу, а взамен получили солнце и тепло сердец.",
    detail: "Традиция: Интеллигенция, наука и вклад в развитие архитектуры больших городов. Широкая Масленица празднуется здесь бок о бок с Наврузом.",
    animation: "slide-left",
    color: "#FCE8E6",
    icon: BookOpen,
    imageUrl: "https://cdn.gamma.app/42u3h7cbf21y1ql/generated-images/rl1XgxTjcCMwfzJziHNC2.jpg",
  },
  {
    id: "koreans",
    title: "Корейцы",
    dialogue: "Я кореец. Дальневосточные переселенцы обрели здесь свою вторую родину. Узбекская земля приняла нас, а мы ответили трудолюбием и верностью.",
    detail: "Культура: Уникальный сплав традиций. Знаменитые корейские салаты (например, морковча) и кукси стали неотъемлемой частью узбекской гастрономии.",
    animation: "slide-right",
    color: "#E6F4EA",
    icon: Utensils,
    imageUrl: "https://cdn.gamma.app/42u3h7cbf21y1ql/generated-images/jGq-rbbbq7TbmFVOrTTDn.jpg",
  },
  {
    id: "kazakhs",
    title: "Казахи",
    dialogue: "Я казах. Мы — братские народы, чья история делится не границами, а бесконечными степями и общими предками. Свобода в нашей крови.",
    detail: "Традиция: Юрты, любовь к лошадям, древние традиции кочевников и знаменитый бешбармак, который мы с радостью делим с соседями.",
    animation: "scale",
    color: "#FFF0E5",
    icon: Globe,
    imageUrl: "https://cdn.gamma.app/42u3h7cbf21y1ql/generated-images/tAGJZwBMKjYEq887VJQTL.jpg",
  },
  {
    id: "tajiks",
    title: "Таджики",
    dialogue: "Я таджик. Самарканд и Бухара всегда звучали на двух языках. Наши культуры переплетены так сильно, что мы читаем одних и тех же поэтов.",
    detail: "Культура: Поэзия Фирдоуси и Хайяма, древние традиции ремесел, шелковые ткани и классическая музыка шашмаком.",
    animation: "parallax",
    color: "#F3E5F5",
    icon: Music,
    imageUrl: "https://cdn.gamma.app/42u3h7cbf21y1ql/generated-images/O0v9eV6NBRjr7xNS8QuRy.jpg",
  },
  {
    id: "turks",
    title: "Турки",
    dialogue: "Я турок. Нас связывают единые тюркские корни. Здесь я чувствую себя как дома — те же ритмы жизни, те же восточные базары.",
    detail: "Бизнес и Культура: Открытие новых технологий и текстильного сотрудничества. Общая любовь к сладостям вроде пахлавы и крепкому чаю.",
    animation: "slide-left",
    color: "#E0F2F1",
    icon: Coffee,
    imageUrl: "https://cdn.gamma.app/42u3h7cbf21y1ql/generated-images/ZQO57BnARf9IJ0fVgF1dp.jpg",
  },
  {
    id: "japanese",
    title: "Японцы",
    dialogue: "Я японец. У нас с Узбекистаном глубокая духовная связь. Цветение урюка весной напоминает мне нашу сакуру. Мы уважаем трудолюбие и память этого народа.",
    detail: "Связь: Исторический Театр Навои, в строительстве которого принимали участие японцы. Современное сотрудничество в сфере высоких технологий и образования.",
    animation: "parallax",
    color: "#FFF4EF",
    icon: Camera,
    imageUrl: "https://cdn.gamma.app/42u3h7cbf21y1ql/generated-images/0sz9Uzv6R2_Z_SKXK5ClI.jpg",
  },
  {
    id: "americans",
    title: "Американцы",
    dialogue: "Я американец-экспат. Приехал сюда работать и преподавать. И знаете что? Местный плов оказался в миллион раз круче любых бургеров! Я просто влюбился в этот ритм.",
    detail: "Особенность: Привнесение глобализации, английского языка и западных образовательных стандартов, с глубоким уважением к местному гостеприимству.",
    animation: "scale",
    color: "#E8EAF6",
    icon: Smile,
    imageUrl: "https://cdn.gamma.app/42u3h7cbf21y1ql/generated-images/sRnZNB3gNxlmezKEOURWw.jpg",
  }
];
