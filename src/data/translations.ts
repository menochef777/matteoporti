export type Language = "pt" | "en" | "es";

export interface ServiceTranslation {
  number: string;
  name: string;
  description: string;
}

export interface ContentTranslation {
  nav: {
    about: string;
    services: string;
    projects: string;
    contact: string;
  };
  hero: {
    greeting: string;
    subtitle: string;
    contactBtn: string;
    dragHintMobile: string;
    dragHintDesktop: string;
  };
  about: {
    heading: string;
    text: string;
    contactBtn: string;
  };
  services: {
    heading: string;
    items: ServiceTranslation[];
  };
  projects: {
    heading: string;
    liveBtn: string;
    categoryClient: string;
    categoryPersonal: string;
  };
}

export const TRANSLATIONS: Record<Language, ContentTranslation> = {
  pt: {
    nav: {
      about: "Sobre",
      services: "Serviços",
      projects: "Projetos",
      contact: "Contato",
    },
    hero: {
      greeting: "Olá, sou o Matteo",
      subtitle: "um criador de websites focado em criar projetos marcantes e inesquecíveis",
      contactBtn: "Fale Comigo",
      dragHintMobile: "Arraste para girar a cabeça",
      dragHintDesktop: "Mova o cursor para interagir",
    },
    about: {
      heading: "Sobre mim",
      text: "Com mais de 2 anos de experiência em design e desenvolvimento web, meu foco é criar websites modernos, branding e experiências digitais de alto nível. Adoro colaborar com marcas que buscam se destacar e apresentar sua melhor versão no digital. Vamos construir algo incrível juntos!",
      contactBtn: "Fale Comigo",
    },
    services: {
      heading: "Serviços",
      items: [
        {
          number: "01",
          name: "Criação de Websites",
          description:
            "Desenvolvimento de landing pages e sites institucionais de alto impacto visual, máxima performance e focados em conversão.",
        },
        {
          number: "02",
          name: "Websites 3D & Interativos",
          description:
            "Experiências web imersivas com elementos tridimensionais, profundidade e fluidez para marcas que querem se destacar da concorrência.",
        },
        {
          number: "03",
          name: "Motion & Animações",
          description:
            "Animações dinâmicas, microinterações e transições elegantes que conferem vida, sofisticação e ritmo à interface digital.",
        },
        {
          number: "04",
          name: "Branding & Identidade",
          description:
            "Criação de identidades visuais consistentes — do logotipo ao sistema de design completo — comunicando autoridade e exclusividade.",
        },
        {
          number: "05",
          name: "UI/UX & Web Design",
          description:
            "Desenho de interfaces modernas e limpas com atenção minuciosa ao layout, tipografia e navegação sem atrito para o usuário.",
        },
      ],
    },
    projects: {
      heading: "Projetos",
      liveBtn: "Ver Projeto",
      categoryClient: "Cliente",
      categoryPersonal: "Pessoal",
    },
  },
  en: {
    nav: {
      about: "About",
      services: "Services",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I’m Matteo",
      subtitle: "a website creator driven by crafting striking and unforgettable projects",
      contactBtn: "Contact Me",
      dragHintMobile: "Swipe to turn head",
      dragHintDesktop: "Move cursor to interact",
    },
    about: {
      heading: "About me",
      text: "With more than 2 years of experience in design and web development, i focus on branding, high-end websites, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!",
      contactBtn: "Contact Me",
    },
    services: {
      heading: "Services",
      items: [
        {
          number: "01",
          name: "Website Creation",
          description:
            "Designing clean, modern, and conversion-focused websites engineered with bespoke typography, smooth animations, and top performance.",
        },
        {
          number: "02",
          name: "3D & Interactive Web",
          description:
            "Creation of fluid, immersive 3D web experiences tailored for modern brands wanting to make a bold, unforgettable first impression.",
        },
        {
          number: "03",
          name: "Motion Design",
          description:
            "Dynamic animations and motion graphics that add energy, elegance, and storytelling to brands, products, and digital experiences.",
        },
        {
          number: "04",
          name: "Branding",
          description:
            "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.",
        },
        {
          number: "05",
          name: "UI/UX Design",
          description:
            "Designing intuitive, beautiful interfaces with meticulous attention to layout hierarchy, typography, and effortless user experience.",
        },
      ],
    },
    projects: {
      heading: "Project",
      liveBtn: "Live Project",
      categoryClient: "Client",
      categoryPersonal: "Personal",
    },
  },
  es: {
    nav: {
      about: "Sobre mí",
      services: "Servicios",
      projects: "Projetos",
      contact: "Contacto",
    },
    hero: {
      greeting: "Hola, soy Matteo",
      subtitle: "un creador de sitios web enfocado en crear proyectos impactantes e inolvidables",
      contactBtn: "Contáctame",
      dragHintMobile: "Desliza para girar la cabeza",
      dragHintDesktop: "Mueve el cursor para interactuar",
    },
    about: {
      heading: "Sobre mí",
      text: "Con más de 2 años de experiencia en diseño y desarrollo web, me enfoco en branding, sitios web de alta gama y experiencia de usuario. Disfruto trabajar con marcas que buscan destacar y presentar su mejor versión digital. ¡Construyamos algo increíble juntos!",
      contactBtn: "Contáctame",
    },
    services: {
      heading: "Servicios",
      items: [
        {
          number: "01",
          name: "Creación de Sitios Web",
          description:
            "Diseño y desarrollo de sitios web limpios, modernos y orientados a la conversión con tipografía refinada y alto rendimiento.",
        },
        {
          number: "02",
          name: "Web 3D e Interactiva",
          description:
            "Experiencias web tridimensionales e inmersivas con acabados fluidos para marcas que desean dejar una huella memorable.",
        },
        {
          number: "03",
          name: "Diseño de Movimiento",
          description:
            "Animaciones dinámicas y microinteracciones que aportan vitalidad, ritmo y narrativa a productos y experiencias digitales.",
        },
        {
          number: "04",
          name: "Branding e Identidad",
          description:
            "Creación de identidades visuales sólidas — desde logotipos hasta sistemas de diseño integrales — que comunican distinción.",
        },
        {
          number: "05",
          name: "Diseño UI/UX",
          description:
            "Interfaces intuitivas y estéticas con especial atención a la composición, la jerarquía visual y la facilidad de navegación.",
        },
      ],
    },
    projects: {
      heading: "Proyectos",
      liveBtn: "Ver Proyecto",
      categoryClient: "Cliente",
      categoryPersonal: "Personal",
    },
  },
};

export function detectUserLanguage(): Language {
  if (typeof window === "undefined") return "pt";

  // 1. Check user preference stored in localStorage
  try {
    const saved = localStorage.getItem("matteo_portfolio_lang") as Language;
    if (saved && (saved === "pt" || saved === "en" || saved === "es")) {
      return saved;
    }
  } catch {
    // ignore
  }

  // 2. Check browser navigator language
  const browserLang = (
    navigator.language ||
    (navigator as any).userLanguage ||
    ""
  ).toLowerCase();

  if (browserLang.startsWith("pt")) return "pt";
  if (browserLang.startsWith("es")) return "es";

  // 3. Detect timezone for Latin America, Spain, Portugal, Brazil
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (
      timeZone.includes("Sao_Paulo") ||
      timeZone.includes("Bahia") ||
      timeZone.includes("Fortaleza") ||
      timeZone.includes("Recife") ||
      timeZone.includes("Manaus") ||
      timeZone.includes("Belem") ||
      timeZone.includes("Cuiaba") ||
      timeZone.includes("Porto_Velho") ||
      timeZone.includes("Lisbon")
    ) {
      return "pt";
    }

    if (
      timeZone.includes("Madrid") ||
      timeZone.includes("Buenos_Aires") ||
      timeZone.includes("Santiago") ||
      timeZone.includes("Bogota") ||
      timeZone.includes("Mexico") ||
      timeZone.includes("Lima") ||
      timeZone.includes("Caracas") ||
      timeZone.includes("Montevideo")
    ) {
      return "es";
    }
  } catch {
    // ignore
  }

  // Default to English for all other countries
  return "en";
}
