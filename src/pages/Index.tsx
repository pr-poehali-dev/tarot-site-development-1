import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/dcc07699-698f-4c75-8dca-b4ccfdc98ed3/files/a97aaff0-c64b-476e-b9a1-bcfb144ba0f6.jpg";

const SERVICES = [
  {
    title: "Расклад на ситуацию",
    subtitle: "Глубокий анализ",
    price: "2 500 ₽",
    duration: "60 мин",
    description: "Полный расклад Таро для понимания текущей ситуации, скрытых факторов и возможных исходов.",
    icon: "Layers",
  },
  {
    title: "Расклад на отношения",
    subtitle: "Любовь и партнёрство",
    price: "3 000 ₽",
    duration: "75 мин",
    description: "Анализ отношений между двумя людьми, динамика, препятствия и потенциал союза.",
    icon: "Heart",
  },
  {
    title: "Годовой прогноз",
    subtitle: "Путь на 12 месяцев",
    price: "4 500 ₽",
    duration: "90 мин",
    description: "Расклад на каждый месяц года, ключевые события и рекомендации для каждого периода.",
    icon: "Star",
  },
  {
    title: "Карта судьбы",
    subtitle: "Нумерология + Таро",
    price: "5 000 ₽",
    duration: "120 мин",
    description: "Комплексный анализ личности через нумерологию и Таро. Ваше предназначение и жизненный путь.",
    icon: "Compass",
  },
  {
    title: "Срочная консультация",
    subtitle: "Ответ на один вопрос",
    price: "1 200 ₽",
    duration: "30 мин",
    description: "Быстрый расклад из 3 карт на конкретный вопрос. Ответ и рекомендации в течение 24 часов.",
    icon: "Zap",
  },
  {
    title: "VIP сопровождение",
    subtitle: "Месяц поддержки",
    price: "15 000 ₽",
    duration: "1 месяц",
    description: "Четыре консультации в месяц, ответы на срочные вопросы, персональные аффирмации и медитации.",
    icon: "Crown",
  },
];

const PORTFOLIO = [
  { title: "Кельтский крест", cards: "10 карт", theme: "Полный анализ ситуации" },
  { title: "Расклад Тота", cards: "7 карт", theme: "Духовное развитие" },
  { title: "Колесо года", cards: "12 карт", theme: "Годовой прогноз" },
  { title: "Зеркало судьбы", cards: "5 карт", theme: "Отношения и любовь" },
  { title: "Три мира", cards: "9 карт", theme: "Прошлое, настоящее, будущее" },
  { title: "Звёздный путь", cards: "8 карт", theme: "Предназначение" },
];

const REVIEWS = [
  {
    name: "Екатерина М.",
    date: "март 2024",
    text: "Консультация изменила моё восприятие ситуации. Всё, что было сказано о предстоящих событиях — сбылось с удивительной точностью.",
    rating: 5,
  },
  {
    name: "Ольга В.",
    date: "февраль 2024",
    text: "Обратилась с вопросом об отношениях. Мастер увидела то, о чём я никому не рассказывала. Теперь я понимаю, какой путь выбрать.",
    rating: 5,
  },
  {
    name: "Анастасия К.",
    date: "январь 2024",
    text: "Годовой прогноз поразил точностью. Уже прошло полгода — всё идёт именно так, как было описано. Записалась снова.",
    rating: 5,
  },
  {
    name: "Марина Т.",
    date: "декабрь 2023",
    text: "Очень деликатный и профессиональный подход. Чувствуется глубокое понимание Таро и искреннее желание помочь.",
    rating: 5,
  },
];

const SCHEDULE = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const TIMES = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00", "20:30"];

type Section = "home" | "about" | "services" | "portfolio" | "reviews" | "contact" | "cabinet" | "free";

const PAST_CARDS = [
  {
    name: "Луна",
    symbol: "☽",
    meaning: "Скрытые страхи и иллюзии",
    description: "В вашем прошлом присутствовали периоды неопределённости и самообмана. Что-то важное оставалось в тени — возможно, вы сами не хотели видеть правду. Луна указывает на подавленные эмоции и интуицию, которую вы игнорировали.",
    advice: "Признайте то, что долго скрывали от себя.",
  },
  {
    name: "Колесо Фортуны",
    symbol: "☸",
    meaning: "Переломный момент судьбы",
    description: "Прошлое было насыщено переменами — взлётами и падениями, которые казались неподвластными вам. Эти циклы привели вас именно туда, где вы находитесь сейчас. Ничто не случайно.",
    advice: "Каждый поворот колеса вёл вас к нынешней точке.",
  },
  {
    name: "Звезда",
    symbol: "✦",
    meaning: "Исцеление и надежда",
    description: "Среди трудностей прошлого была искра света — моменты подлинной надежды и восстановления. Звезда говорит о том, что вы пережили тёмные периоды и сохранили веру в лучшее.",
    advice: "Ваша стойкость в прошлом — ваша сила в настоящем.",
  },
  {
    name: "Отшельник",
    symbol: "🕯",
    meaning: "Путь внутреннего поиска",
    description: "Вы проходили через периоды одиночества и уединения. Это было необходимо для глубокого самопознания. Отшельник в прошлом — признак мудрости, накопленной в тишине.",
    advice: "Знания, найденные в уединении, принадлежат только вам.",
  },
  {
    name: "Сила",
    symbol: "∞",
    meaning: "Внутренняя мощь и терпение",
    description: "Прошлое требовало от вас огромной внутренней силы. Вы справлялись с ситуациями, которые казались непосильными. Эта карта — свидетельство вашего мужества.",
    advice: "Вы сильнее, чем думаете — прошлое это доказало.",
  },
  {
    name: "Жрица",
    symbol: "𑁍",
    meaning: "Тайное знание и интуиция",
    description: "В прошлом вы обладали глубокой интуицией, которую, возможно, не всегда слушали. Жрица хранит тайны — некоторые события были важнее, чем казались на поверхности.",
    advice: "Вернитесь к тому, что ощущали, но не высказывали.",
  },
];

const CARD_BACKS = ["I", "II", "III"];

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<"select" | "success">("select");
  const [cabinetTab, setCabinetTab] = useState<"history" | "upcoming">("upcoming");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", phone: "", comment: "" });
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  // Free reading state
  const [freeStep, setFreeStep] = useState<"intro" | "shuffle" | "pick" | "reveal">("intro");
  const [shuffling, setShuffling] = useState(false);
  const [pickedCards, setPickedCards] = useState<number[]>([]);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false]);
  const [drawnCards, setDrawnCards] = useState<typeof PAST_CARDS>([]);

  const shuffleDeck = () => {
    setShuffling(true);
    setTimeout(() => {
      setShuffling(false);
      const shuffled = [...PAST_CARDS].sort(() => Math.random() - 0.5).slice(0, 3);
      setDrawnCards(shuffled);
      setFreeStep("pick");
      setPickedCards([]);
      setFlippedCards([false, false, false]);
    }, 1800);
  };

  const flipCard = (idx: number) => {
    if (flippedCards[idx]) return;
    const next = [...flippedCards];
    next[idx] = true;
    setFlippedCards(next);
    if (next.filter(Boolean).length === 3) {
      setTimeout(() => setFreeStep("reveal"), 400);
    }
  };

  const resetFree = () => {
    setFreeStep("intro");
    setShuffling(false);
    setPickedCards([]);
    setFlippedCards([false, false, false]);
    setDrawnCards([]);
  };

  const navItems: { id: Section; label: string }[] = [
    { id: "home", label: "Главная" },
    { id: "about", label: "О мне" },
    { id: "services", label: "Услуги" },
    { id: "free", label: "Бесплатный расклад" },
    { id: "portfolio", label: "Портфолио" },
    { id: "reviews", label: "Отзывы" },
    { id: "contact", label: "Контакты" },
    { id: "cabinet", label: "Кабинет" },
  ];

  const navigate = (section: Section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookingSubmit = () => {
    if (selectedDay && selectedTime && selectedService && bookingForm.name && bookingForm.email) {
      setBookingStep("success");
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--dark-bg)", color: "var(--cream)" }}>

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5"
        style={{
          backgroundColor: "rgba(14,11,8,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--dark-border)",
        }}
      >
        <button
          onClick={() => navigate("home")}
          className="font-cormorant text-xl tracking-widest"
          style={{ color: "var(--gold)", letterSpacing: "0.2em", background: "none", border: "none", cursor: "pointer" }}
        >
          ✦ ARCANA
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className="nav-link"
              style={{
                color: activeSection === item.id ? "var(--gold)" : "var(--cream-dim)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          className="md:hidden"
          style={{ color: "var(--gold)", background: "none", border: "none", cursor: "pointer" }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
        </button>
      </nav>

      {mobileMenuOpen && (
        <div
          className="fixed top-16 left-0 right-0 z-40 py-6"
          style={{ backgroundColor: "rgba(14,11,8,0.97)", borderBottom: "1px solid var(--dark-border)" }}
        >
          <div className="flex flex-col items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className="nav-link"
                style={{
                  color: activeSection === item.id ? "var(--gold)" : "var(--cream-dim)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── HOME ─── */}
      {activeSection === "home" && (
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${HERO_IMAGE})`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              filter: "brightness(0.22)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(14,11,8,0.97) 45%, rgba(14,11,8,0.4) 100%)" }}
          />

          <div className="relative z-10 container mx-auto px-6 md:px-12 pt-24">
            <div className="max-w-2xl">
              <p className="star-deco mb-6 animate-fade-in" style={{ animationDelay: "0.1s", opacity: 0 }}>
                ✦ ✦ ✦
              </p>
              <p className="nav-link mb-4 animate-fade-up" style={{ color: "var(--gold)", opacity: 0, animationDelay: "0.2s" }}>
                Профессиональный таролог
              </p>
              <h1
                className="font-cormorant text-6xl md:text-8xl font-light leading-none mb-6 animate-fade-up"
                style={{ opacity: 0, animationDelay: "0.3s" }}
              >
                Откройте<br />
                <em className="gold-shimmer">тайны</em><br />
                своей судьбы
              </h1>
              <div className="gold-line-left mb-6 animate-fade-up" style={{ opacity: 0, animationDelay: "0.4s" }} />
              <p
                className="font-montserrat text-sm leading-relaxed mb-10 max-w-md animate-fade-up"
                style={{ color: "var(--cream-dim)", opacity: 0, animationDelay: "0.5s", fontWeight: 300 }}
              >
                Более 10 лет практики. Индивидуальные консультации, которые помогают найти ответы на важнейшие жизненные вопросы.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-up" style={{ opacity: 0, animationDelay: "0.6s" }}>
                <button className="btn-gold-fill" onClick={() => navigate("contact")}>
                  Записаться на консультацию
                </button>
                <button className="btn-gold" onClick={() => navigate("services")}>
                  Узнать об услугах
                </button>
              </div>

              <div
                className="flex gap-12 mt-16 pt-8 animate-fade-up"
                style={{ opacity: 0, animationDelay: "0.7s", borderTop: "1px solid var(--dark-border)" }}
              >
                {[
                  { num: "10+", label: "лет практики" },
                  { num: "500+", label: "консультаций" },
                  { num: "98%", label: "довольных клиентов" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-cormorant text-3xl" style={{ color: "var(--gold)" }}>{s.num}</p>
                    <p className="font-montserrat text-xs mt-1" style={{ color: "var(--cream-dim)", letterSpacing: "0.1em" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
            <p className="nav-link" style={{ fontSize: "10px" }}>прокрутите</p>
            <Icon name="ChevronDown" size={16} style={{ color: "var(--gold)" }} />
          </div>
        </section>
      )}

      {/* ─── ABOUT ─── */}
      {activeSection === "about" && (
        <section className="min-h-screen pt-24 pb-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-16 items-center min-h-[80vh]">
              <div className="relative animate-fade-in">
                <div
                  className="absolute -inset-4 opacity-20"
                  style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }}
                />
                <img
                  src={HERO_IMAGE}
                  alt="Таролог Александра"
                  className="relative w-full object-cover"
                  style={{ height: "580px", filter: "sepia(20%) brightness(0.8)" }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/3"
                  style={{ background: "linear-gradient(to top, var(--dark-bg), transparent)" }}
                />
                <div
                  className="absolute top-4 left-4 w-16 h-16"
                  style={{ borderTop: "1px solid var(--gold)", borderLeft: "1px solid var(--gold)" }}
                />
                <div
                  className="absolute bottom-8 right-4 w-16 h-16"
                  style={{ borderBottom: "1px solid var(--gold)", borderRight: "1px solid var(--gold)" }}
                />
              </div>

              <div className="animate-fade-up">
                <p className="nav-link mb-4" style={{ color: "var(--gold)" }}>Обо мне</p>
                <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-6">
                  Меня зовут<br />
                  <em style={{ color: "var(--gold)" }}>Александра</em>
                </h2>
                <div className="gold-line-left mb-8" />
                <p className="font-montserrat text-sm leading-relaxed mb-6" style={{ color: "var(--cream-dim)", fontWeight: 300 }}>
                  Более десяти лет я изучаю Таро как систему символов, отражающих глубинные архетипы человеческой психики. Моя практика объединяет классические традиции колоды Уэйта с психологическим подходом Юнга.
                </p>
                <p className="font-montserrat text-sm leading-relaxed mb-10" style={{ color: "var(--cream-dim)", fontWeight: 300 }}>
                  Каждая консультация — это диалог между вашим подсознанием и символическим языком карт. Я не предсказываю будущее — я помогаю вам увидеть скрытые возможности и найти свой путь.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    "Сертифицированный специалист по картам Таро Уэйта",
                    "Курс аналитической психологии К.Г. Юнга",
                    "Профессиональная нумерология и астрология",
                  ].map((cert) => (
                    <div key={cert} className="flex items-start gap-3">
                      <span style={{ color: "var(--gold)", marginTop: "2px", flexShrink: 0 }}>✦</span>
                      <p className="font-montserrat text-xs" style={{ color: "var(--cream-dim)", letterSpacing: "0.05em" }}>{cert}</p>
                    </div>
                  ))}
                </div>

                <button className="btn-gold" onClick={() => navigate("services")}>
                  Мои услуги
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── SERVICES ─── */}
      {activeSection === "services" && (
        <section className="min-h-screen pt-24 pb-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16 animate-fade-up">
              <p className="nav-link mb-4" style={{ color: "var(--gold)" }}>Услуги и цены</p>
              <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-4">Форматы консультаций</h2>
              <div className="gold-line mb-6" />
              <p className="font-montserrat text-sm max-w-md mx-auto" style={{ color: "var(--cream-dim)", fontWeight: 300 }}>
                Каждый расклад создаётся индивидуально под ваш запрос
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service, i) => (
                <div
                  key={service.title}
                  className="card-mystical p-8 animate-fade-up"
                  style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-10 h-10 flex items-center justify-center"
                      style={{ border: "1px solid var(--dark-border)" }}
                    >
                      <Icon name={service.icon} size={18} style={{ color: "var(--gold)" }} />
                    </div>
                    <div className="text-right">
                      <p className="font-cormorant text-2xl" style={{ color: "var(--gold)" }}>{service.price}</p>
                      <p className="font-montserrat text-xs mt-1" style={{ color: "var(--cream-dim)" }}>{service.duration}</p>
                    </div>
                  </div>
                  <p className="font-montserrat mb-2" style={{ color: "var(--gold-dim)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    {service.subtitle}
                  </p>
                  <h3 className="font-cormorant text-2xl font-light mb-4">{service.title}</h3>
                  <div className="gold-line-left mb-4" style={{ width: "30px" }} />
                  <p className="font-montserrat text-xs leading-relaxed" style={{ color: "var(--cream-dim)", fontWeight: 300 }}>
                    {service.description}
                  </p>
                  <button
                    className="btn-gold mt-6"
                    style={{ width: "100%", display: "block", textAlign: "center" }}
                    onClick={() => { setSelectedService(service.title); navigate("contact"); }}
                  >
                    Записаться
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── PORTFOLIO ─── */}
      {activeSection === "portfolio" && (
        <section className="min-h-screen pt-24 pb-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16 animate-fade-up">
              <p className="nav-link mb-4" style={{ color: "var(--gold)" }}>Портфолио</p>
              <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-4">Виды раскладов</h2>
              <div className="gold-line mb-6" />
              <p className="font-montserrat text-sm max-w-md mx-auto" style={{ color: "var(--cream-dim)", fontWeight: 300 }}>
                Авторские и классические системы, которые я использую в работе
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
              {PORTFOLIO.map((item, i) => (
                <div
                  key={item.title}
                  className="relative overflow-hidden group cursor-pointer animate-fade-up"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    opacity: 0,
                    height: "280px",
                    background: "linear-gradient(135deg, var(--dark-card) 0%, #1a1410 100%)",
                    border: "1px solid var(--dark-border)",
                    transition: "border-color 0.4s ease",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(circle at center, rgba(201,168,76,0.06) 0%, transparent 70%)" }}
                  />
                  <div
                    className="absolute top-6 right-6 font-cormorant text-6xl font-light opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ color: "var(--gold)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute top-6 left-6 text-xs opacity-40" style={{ color: "var(--gold)", letterSpacing: "6px" }}>
                    ✦ ✦
                  </div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="font-montserrat text-xs mb-3" style={{ color: "var(--gold)", letterSpacing: "0.12em" }}>
                      {item.cards}
                    </p>
                    <h3 className="font-cormorant text-3xl font-light mb-2">{item.title}</h3>
                    <div className="gold-line-left mb-3" style={{ width: "24px" }} />
                    <p className="font-montserrat text-xs" style={{ color: "var(--cream-dim)" }}>{item.theme}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="btn-gold" onClick={() => navigate("contact")}>
                Задать вопрос о раскладе
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ─── REVIEWS ─── */}
      {activeSection === "reviews" && (
        <section className="min-h-screen pt-24 pb-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16 animate-fade-up">
              <p className="nav-link mb-4" style={{ color: "var(--gold)" }}>Отзывы</p>
              <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-4">Слова клиентов</h2>
              <div className="gold-line mb-6" />
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {REVIEWS.map((review, i) => (
                <div
                  key={review.name}
                  className="card-mystical p-8 animate-fade-up"
                  style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }}
                >
                  <div className="flex items-center gap-1 mb-6">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <span key={j} style={{ color: "var(--gold)", fontSize: "12px" }}>✦</span>
                    ))}
                  </div>
                  <p className="font-cormorant text-xl italic leading-relaxed mb-8" style={{ color: "var(--cream)", fontWeight: 300 }}>
                    «{review.text}»
                  </p>
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--dark-border)" }}>
                    <p className="font-montserrat text-sm font-medium">{review.name}</p>
                    <p className="font-montserrat text-xs" style={{ color: "var(--cream-dim)" }}>{review.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-16 p-12 text-center max-w-2xl mx-auto animate-fade-up"
              style={{ border: "1px solid var(--dark-border)" }}
            >
              <span className="star-deco block mb-4">✦ ✦ ✦</span>
              <h3 className="font-cormorant text-4xl font-light mb-4">Готовы узнать свой путь?</h3>
              <p className="font-montserrat text-xs mb-8" style={{ color: "var(--cream-dim)" }}>
                Первая консультация — шаг к ясности и пониманию
              </p>
              <button className="btn-gold-fill" onClick={() => navigate("contact")}>
                Записаться сейчас
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ─── CONTACT / BOOKING ─── */}
      {activeSection === "contact" && (
        <section className="min-h-screen pt-24 pb-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16 animate-fade-up">
              <p className="nav-link mb-4" style={{ color: "var(--gold)" }}>Запись</p>
              <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-4">Начните свой путь</h2>
              <div className="gold-line mb-6" />
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Booking */}
              <div className="animate-fade-up">
                {bookingStep === "success" ? (
                  <div className="text-center py-16">
                    <div className="text-4xl mb-6" style={{ color: "var(--gold)" }}>✦</div>
                    <h3 className="font-cormorant text-4xl font-light mb-4">Запись принята</h3>
                    <p className="font-montserrat text-xs mb-8" style={{ color: "var(--cream-dim)" }}>
                      Я свяжусь с вами в течение часа для подтверждения
                    </p>
                    <button
                      className="btn-gold"
                      onClick={() => { setBookingStep("select"); setSelectedDay(null); setSelectedTime(null); setBookingForm({ name: "", email: "", phone: "", comment: "" }); }}
                    >
                      Записаться ещё раз
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-cormorant text-2xl font-light mb-8">Выберите дату и время</h3>

                    <div className="mb-6">
                      <p className="font-montserrat text-xs mb-4" style={{ color: "var(--cream-dim)", letterSpacing: "0.1em" }}>ДЕНЬ НЕДЕЛИ</p>
                      <div className="flex flex-wrap gap-2">
                        {SCHEDULE.map((day) => (
                          <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className="px-4 py-2 font-montserrat text-xs transition-all duration-300"
                            style={{
                              border: `1px solid ${selectedDay === day ? "var(--gold)" : "var(--dark-border)"}`,
                              background: selectedDay === day ? "var(--gold)" : "transparent",
                              color: selectedDay === day ? "var(--dark-bg)" : "var(--cream-dim)",
                              letterSpacing: "0.05em",
                              cursor: "pointer",
                            }}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <p className="font-montserrat text-xs mb-4" style={{ color: "var(--cream-dim)", letterSpacing: "0.1em" }}>ВРЕМЯ</p>
                      <div className="grid grid-cols-4 gap-2">
                        {TIMES.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className="py-2 font-montserrat text-xs transition-all duration-300"
                            style={{
                              border: `1px solid ${selectedTime === time ? "var(--gold)" : "var(--dark-border)"}`,
                              background: selectedTime === time ? "var(--gold)" : "transparent",
                              color: selectedTime === time ? "var(--dark-bg)" : "var(--cream-dim)",
                              cursor: "pointer",
                            }}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <p className="font-montserrat text-xs mb-4" style={{ color: "var(--cream-dim)", letterSpacing: "0.1em" }}>УСЛУГА</p>
                      <select
                        className="input-mystical"
                        value={selectedService || ""}
                        onChange={(e) => setSelectedService(e.target.value)}
                        style={{ background: "transparent", cursor: "pointer" }}
                      >
                        <option value="" disabled style={{ background: "var(--dark-bg)" }}>Выберите тип консультации</option>
                        {SERVICES.map((s) => (
                          <option key={s.title} value={s.title} style={{ background: "var(--dark-bg)" }}>
                            {s.title} — {s.price}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-6 mb-8">
                      <input className="input-mystical" placeholder="Ваше имя" value={bookingForm.name} onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })} />
                      <input className="input-mystical" placeholder="Email" type="email" value={bookingForm.email} onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })} />
                      <input className="input-mystical" placeholder="Телефон" value={bookingForm.phone} onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })} />
                      <textarea
                        className="input-mystical"
                        placeholder="Ваш вопрос или пожелание"
                        rows={3}
                        value={bookingForm.comment}
                        onChange={(e) => setBookingForm({ ...bookingForm, comment: e.target.value })}
                        style={{ resize: "none" }}
                      />
                    </div>

                    <button className="btn-gold-fill" style={{ width: "100%" }} onClick={handleBookingSubmit}>
                      Подтвердить запись
                    </button>
                  </>
                )}
              </div>

              {/* Contact info + quick message */}
              <div className="animate-fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
                <h3 className="font-cormorant text-2xl font-light mb-8">Контактная информация</h3>
                <div className="space-y-8 mb-12">
                  {[
                    { icon: "MessageCircle", label: "Telegram", value: "@arcana_tarot" },
                    { icon: "Phone", label: "WhatsApp", value: "+7 (900) 000-00-00" },
                    { icon: "Mail", label: "Email", value: "hello@arcana.ru" },
                    { icon: "Instagram", label: "Instagram", value: "@arcana.tarot" },
                  ].map((contact) => (
                    <div key={contact.label} className="flex items-center gap-4">
                      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ border: "1px solid var(--dark-border)" }}>
                        <Icon name={contact.icon} size={16} style={{ color: "var(--gold)" }} />
                      </div>
                      <div>
                        <p className="font-montserrat text-xs mb-1" style={{ color: "var(--cream-dim)", letterSpacing: "0.1em" }}>
                          {contact.label.toUpperCase()}
                        </p>
                        <p className="font-montserrat text-sm">{contact.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6" style={{ border: "1px solid var(--dark-border)" }}>
                  <h4 className="font-cormorant text-xl font-light mb-6">Быстрое сообщение</h4>
                  <div className="space-y-4 mb-6">
                    <input className="input-mystical" placeholder="Имя" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} />
                    <input className="input-mystical" placeholder="Email" type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} />
                    <textarea className="input-mystical" placeholder="Сообщение" rows={3} value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} style={{ resize: "none" }} />
                  </div>
                  <button className="btn-gold" style={{ width: "100%", display: "block", textAlign: "center" }}>
                    Отправить
  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── FREE READING ─── */}
      {activeSection === "free" && (
        <section className="min-h-screen pt-24 pb-20">
          <div className="container mx-auto px-6 md:px-12 max-w-4xl">

            {/* Header */}
            <div className="text-center mb-16 animate-fade-up">
              <p className="nav-link mb-4" style={{ color: "var(--gold)" }}>Бесплатно</p>
              <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-4">
                Расклад на прошлое
              </h2>
              <div className="gold-line mb-6" />
              <p className="font-montserrat text-sm max-w-lg mx-auto" style={{ color: "var(--cream-dim)", fontWeight: 300 }}>
                Три карты откроют тайны вашего прошлого — скрытые силы, уроки и события, которые сформировали вас
              </p>
            </div>

            {/* INTRO */}
            {freeStep === "intro" && (
              <div className="text-center animate-fade-up">
                <div
                  className="inline-block p-12 mb-10"
                  style={{ border: "1px solid var(--dark-border)" }}
                >
                  {/* Decorative cards stack */}
                  <div className="relative w-32 h-44 mx-auto mb-8">
                    {[2, 1, 0].map((i) => (
                      <div
                        key={i}
                        className="absolute inset-0 flex items-center justify-center font-cormorant text-3xl"
                        style={{
                          border: "1px solid var(--gold-dim)",
                          background: "var(--dark-card)",
                          transform: `rotate(${(i - 1) * 5}deg) translateY(${i * -4}px)`,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                          color: "var(--gold-dim)",
                        }}
                      >
                        ✦
                      </div>
                    ))}
                  </div>
                  <h3 className="font-cormorant text-2xl font-light mb-4">Как это работает</h3>
                  <div className="space-y-3 text-left max-w-xs mx-auto mb-8">
                    {[
                      "Сосредоточьтесь на своём прошлом",
                      "Перетасуйте колоду мысленно",
                      "Выберите три карты",
                      "Получите послание",
                    ].map((step, i) => (
                      <div key={step} className="flex items-center gap-3">
                        <span className="font-cormorant text-lg" style={{ color: "var(--gold)", minWidth: "20px" }}>{i + 1}</span>
                        <p className="font-montserrat text-xs" style={{ color: "var(--cream-dim)" }}>{step}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn-gold-fill"
                    onClick={() => setFreeStep("shuffle")}
                  >
                    Начать расклад
                  </button>
                </div>
              </div>
            )}

            {/* SHUFFLE */}
            {freeStep === "shuffle" && (
              <div className="text-center animate-fade-up">
                <p className="font-cormorant text-xl italic mb-10" style={{ color: "var(--cream-dim)" }}>
                  Закройте глаза. Думайте о своём прошлом...
                </p>
                <div className="relative w-40 h-56 mx-auto mb-10" style={{ perspective: "600px" }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="absolute inset-0 flex items-center justify-center font-cormorant text-4xl"
                      style={{
                        border: "1px solid var(--gold-dim)",
                        background: "linear-gradient(135deg, var(--dark-card), #1a1410)",
                        color: "var(--gold-dim)",
                        transform: shuffling
                          ? `rotate(${(i - 2) * 15 + Math.sin(i) * 20}deg) translateX(${Math.cos(i) * 30}px) translateY(${Math.sin(i * 2) * 20}px)`
                          : `rotate(${(i - 2) * 3}deg)`,
                        transition: shuffling ? `transform ${0.3 + i * 0.1}s ease ${i * 0.05}s` : "transform 0.5s ease",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
                      }}
                    >
                      ✦
                    </div>
                  ))}
                </div>
                <button
                  className="btn-gold-fill"
                  onClick={shuffleDeck}
                  disabled={shuffling}
                  style={{ opacity: shuffling ? 0.5 : 1 }}
                >
                  {shuffling ? "Тасуется..." : "Перетасовать колоду"}
                </button>
                {shuffling && (
                  <p className="font-montserrat text-xs mt-4 animate-fade-in" style={{ color: "var(--gold)", letterSpacing: "0.15em" }}>
                    КОЛОДА ТАСУЕТСЯ...
                  </p>
                )}
              </div>
            )}

            {/* PICK */}
            {freeStep === "pick" && (
              <div className="animate-fade-up">
                <p className="font-cormorant text-2xl italic text-center mb-2" style={{ color: "var(--cream-dim)" }}>
                  Переверните три карты
                </p>
                <p className="font-montserrat text-xs text-center mb-12" style={{ color: "var(--cream-dim)", opacity: 0.6 }}>
                  Нажмите на карту, чтобы открыть её
                </p>

                <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
                  {CARD_BACKS.map((label, idx) => {
                    const card = drawnCards[idx];
                    const isFlipped = flippedCards[idx];
                    return (
                      <div
                        key={idx}
                        onClick={() => flipCard(idx)}
                        className="cursor-pointer"
                        style={{ perspective: "800px" }}
                      >
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            paddingBottom: "150%",
                            transformStyle: "preserve-3d",
                            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                            transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                        >
                          {/* Back */}
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              backfaceVisibility: "hidden",
                              WebkitBackfaceVisibility: "hidden",
                              border: "1px solid var(--gold-dim)",
                              background: "linear-gradient(135deg, #1a1410 0%, #0e0b08 100%)",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "8px",
                              boxShadow: isFlipped ? "none" : "0 0 20px rgba(201,168,76,0.1)",
                            }}
                          >
                            <span className="font-cormorant text-4xl" style={{ color: "var(--gold-dim)" }}>✦</span>
                            <span className="font-cormorant text-lg" style={{ color: "var(--gold-dim)" }}>{label}</span>
                            <div style={{ width: "30px", height: "1px", background: "var(--gold-dim)", opacity: 0.4 }} />
                            <span className="font-montserrat text-xs" style={{ color: "var(--cream-dim)", opacity: 0.4, letterSpacing: "0.1em" }}>
                              {idx === 0 ? "ПРОШЛОЕ" : idx === 1 ? "ВЛИЯНИЕ" : "УРОК"}
                            </span>
                          </div>
                          {/* Front */}
                          {card && (
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                                transform: "rotateY(180deg)",
                                border: "1px solid var(--gold)",
                                background: "linear-gradient(160deg, #1e1810 0%, #0e0b08 100%)",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "16px 12px",
                                gap: "8px",
                                boxShadow: "0 0 30px rgba(201,168,76,0.15)",
                              }}
                            >
                              <span style={{ fontSize: "28px", color: "var(--gold)" }}>{card.symbol}</span>
                              <div style={{ width: "24px", height: "1px", background: "var(--gold)", opacity: 0.6 }} />
                              <span className="font-cormorant text-base text-center" style={{ color: "var(--cream)" }}>{card.name}</span>
                              <span className="font-montserrat text-center" style={{ color: "var(--gold)", fontSize: "9px", letterSpacing: "0.1em" }}>
                                {idx === 0 ? "ПРОШЛОЕ" : idx === 1 ? "ВЛИЯНИЕ" : "УРОК"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* REVEAL */}
            {freeStep === "reveal" && drawnCards.length === 3 && (
              <div className="animate-fade-up">
                <p className="font-cormorant text-3xl italic text-center mb-12" style={{ color: "var(--cream-dim)" }}>
                  Послание карт
                </p>

                <div className="space-y-6">
                  {drawnCards.map((card, idx) => (
                    <div
                      key={idx}
                      className="card-mystical p-6 md:p-8 animate-fade-up"
                      style={{ animationDelay: `${idx * 0.2}s`, opacity: 0 }}
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        {/* Card mini */}
                        <div
                          className="flex-shrink-0 w-16 h-24 flex flex-col items-center justify-center gap-1"
                          style={{ border: "1px solid var(--gold)", background: "linear-gradient(135deg, #1e1810, #0e0b08)" }}
                        >
                          <span style={{ fontSize: "20px", color: "var(--gold)" }}>{card.symbol}</span>
                          <span className="font-cormorant text-xs text-center" style={{ color: "var(--cream)", padding: "0 4px" }}>{card.name}</span>
                        </div>
                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="font-montserrat text-xs" style={{ color: "var(--gold)", letterSpacing: "0.12em" }}>
                              {idx === 0 ? "ПРОШЛОЕ" : idx === 1 ? "СКРЫТОЕ ВЛИЯНИЕ" : "УРОК"}
                            </span>
                            <div style={{ flex: 1, height: "1px", background: "var(--dark-border)" }} />
                          </div>
                          <h3 className="font-cormorant text-2xl font-light mb-1">{card.name}</h3>
                          <p className="font-montserrat text-xs mb-4" style={{ color: "var(--gold-dim)", letterSpacing: "0.08em" }}>
                            {card.meaning}
                          </p>
                          <p className="font-montserrat text-sm leading-relaxed mb-4" style={{ color: "var(--cream-dim)", fontWeight: 300 }}>
                            {card.description}
                          </p>
                          <div className="flex items-start gap-2 pt-4" style={{ borderTop: "1px solid var(--dark-border)" }}>
                            <span style={{ color: "var(--gold)", fontSize: "10px", marginTop: "2px", flexShrink: 0 }}>✦</span>
                            <p className="font-cormorant text-base italic" style={{ color: "var(--cream)" }}>
                              {card.advice}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA block */}
                <div
                  className="mt-12 p-8 text-center animate-fade-up"
                  style={{ border: "1px solid var(--dark-border)", animationDelay: "0.7s", opacity: 0 }}
                >
                  <span className="star-deco block mb-4">✦ ✦ ✦</span>
                  <h3 className="font-cormorant text-3xl font-light mb-3">
                    Хотите узнать больше?
                  </h3>
                  <p className="font-montserrat text-xs mb-8 max-w-sm mx-auto" style={{ color: "var(--cream-dim)" }}>
                    Полная консультация раскроет детали, которые бесплатный расклад лишь наметил
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button className="btn-gold-fill" onClick={() => navigate("contact")}>
                      Записаться на полный расклад
                    </button>
                    <button className="btn-gold" onClick={resetFree}>
                      Сделать новый расклад
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>
      )}

      {/* ─── CABINET ─── */}
      {activeSection === "cabinet" && (
        <section className="min-h-screen pt-24 pb-20">
          <div className="container mx-auto px-6 md:px-12 max-w-3xl">
            {!isLoggedIn ? (
              <div className="flex items-center justify-center min-h-[70vh]">
                <div className="w-full max-w-md p-10 animate-fade-up" style={{ border: "1px solid var(--dark-border)" }}>
                  <div className="text-center mb-10">
                    <span className="block text-2xl mb-4" style={{ color: "var(--gold)" }}>✦</span>
                    <h2 className="font-cormorant text-4xl font-light mb-2">Личный кабинет</h2>
                    <p className="font-montserrat text-xs" style={{ color: "var(--cream-dim)" }}>
                      Войдите, чтобы просмотреть историю консультаций
                    </p>
                  </div>

                  <div className="space-y-6 mb-8">
                    <input className="input-mystical" placeholder="Email" type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} />
                    <input className="input-mystical" placeholder="Пароль" type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
                  </div>

                  <button className="btn-gold-fill" style={{ width: "100%" }} onClick={() => { if (loginForm.email && loginForm.password) setIsLoggedIn(true); }}>
                    Войти
                  </button>
                  <p className="font-montserrat text-xs text-center mt-4" style={{ color: "var(--cream-dim)" }}>
                    Нет аккаунта?{" "}
                    <button style={{ color: "var(--gold)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit" }}>
                      Зарегистрироваться
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <div className="animate-fade-up">
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <p className="nav-link mb-1" style={{ color: "var(--gold)" }}>Добро пожаловать</p>
                    <h2 className="font-cormorant text-4xl font-light">{loginForm.email}</h2>
                  </div>
                  <button className="btn-gold" onClick={() => { setIsLoggedIn(false); setLoginForm({ email: "", password: "" }); }}>
                    Выйти
                  </button>
                </div>

                <div className="flex gap-0 mb-8" style={{ borderBottom: "1px solid var(--dark-border)" }}>
                  {[
                    { id: "upcoming", label: "Предстоящие" },
                    { id: "history", label: "История" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setCabinetTab(tab.id as "upcoming" | "history")}
                      className="font-montserrat text-xs py-4 px-6 transition-all duration-300"
                      style={{
                        letterSpacing: "0.1em",
                        color: cabinetTab === tab.id ? "var(--gold)" : "var(--cream-dim)",
                        borderBottom: cabinetTab === tab.id ? "2px solid var(--gold)" : "2px solid transparent",
                        marginBottom: "-1px",
                        background: "none",
                        border: "none",
                        borderBottom: cabinetTab === tab.id ? "2px solid var(--gold)" : "2px solid transparent",
                        cursor: "pointer",
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {cabinetTab === "upcoming" ? (
                  <div className="space-y-4">
                    <div className="card-mystical p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-cormorant text-xl mb-1">Расклад на ситуацию</p>
                          <p className="font-montserrat text-xs" style={{ color: "var(--cream-dim)" }}>
                            Пятница, 24 мая 2024 • 14:30
                          </p>
                        </div>
                        <span className="font-montserrat text-xs px-3 py-1" style={{ border: "1px solid var(--gold)", color: "var(--gold)" }}>
                          Подтверждено
                        </span>
                      </div>
                      <div className="gold-line-left mb-4" style={{ width: "24px" }} />
                      <p className="font-montserrat text-xs" style={{ color: "var(--cream-dim)" }}>
                        Онлайн-консультация через видеосвязь. Ссылка придёт на почту за 15 минут до начала.
                      </p>
                    </div>
                    <button className="btn-gold" style={{ width: "100%", display: "block", textAlign: "center", marginTop: "16px" }} onClick={() => navigate("contact")}>
                      Записаться на новую консультацию
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {[
                      { title: "Годовой прогноз", date: "15 января 2024", price: "4 500 ₽" },
                      { title: "Расклад на отношения", date: "03 ноября 2023", price: "3 000 ₽" },
                      { title: "Расклад на ситуацию", date: "12 сентября 2023", price: "2 500 ₽" },
                    ].map((session) => (
                      <div key={session.date} className="card-mystical p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-cormorant text-xl mb-1">{session.title}</p>
                            <p className="font-montserrat text-xs" style={{ color: "var(--cream-dim)" }}>{session.date}</p>
                          </div>
                          <p className="font-cormorant text-xl" style={{ color: "var(--gold)" }}>{session.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12" style={{ borderTop: "1px solid var(--dark-border)" }}>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-cormorant text-xl tracking-widest mb-2" style={{ color: "var(--gold)" }}>✦ ARCANA</p>
            <p className="font-montserrat text-xs" style={{ color: "var(--cream-dim)" }}>Профессиональный таролог</p>
          </div>
          <div className="hidden md:flex gap-6">
            {navItems.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className="nav-link"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="font-montserrat text-xs" style={{ color: "var(--cream-dim)" }}>
            © 2024 Arcana. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;