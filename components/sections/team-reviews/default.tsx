"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, Quote, Star, ThumbsUp } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

interface Review {
  text: string;
  author: {
    name: string;
    role: string;
    company: string;
    avatar: string;
  };
  rating: number;
}

interface TeamMember {
  name: string;
  role: string;
  avatar: string; // cartoon/memoji-like
}

const team: TeamMember[] = [
  {
    name: "Dave Jones",
    role: "Разработчик",
    avatar:
      "https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Dave&radius=50&scale=110",
  },
  {
    name: "Emily Branson",
    role: "CEO",
    avatar:
      "https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Emily&radius=50&scale=110",
  },
  {
    name: "Jason Davis",
    role: "Разработчик",
    avatar:
      "https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Jason&radius=50&scale=110",
  },
  {
    name: "Maria Wilson",
    role: "COO",
    avatar:
      "https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Maria&radius=50&scale=110",
  },
  {
    name: "Robert Chen",
    role: "CTO",
    avatar:
      "https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Robert&radius=50&scale=110",
  },
  {
    name: "Olivia Johnson",
    role: "Продакт",
    avatar:
      "https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Olivia&radius=50&scale=110",
  },
];

const reviews: Review[] = [
  {
    text: "Запустили многофункциональный лендинг для StrategicLaw Group: заявки пошли с первого дня, CRM связали без сбоев.",
    author: {
      name: "Рушанов Жайдар",
      role: "Founder",
      company: "StrategicLaw Group",
      avatar:
        "https://api.dicebear.com/7.x/notionists/svg?seed=Zhaidar&backgroundColor=b6e3f4",
    },
    rating: 5,
  },
  {
    text: "Мобильное приложение и CRM для Zeep Coffee автоматизировали заказы и доставку — клиенты оформляют быстрее, команда успевает больше.",
    author: {
      name: "Асет Акбар",
      role: "CEO",
      company: "Zeep Coffee",
      avatar:
        "https://api.dicebear.com/7.x/notionists/svg?seed=Aset&backgroundColor=c0aede",
    },
    rating: 5,
  },
  {
    text: "Для сети быстрого питания Frito сделали онлайн-меню, оплату и бота. Средний чек вырос, а повторных заказов стало заметно больше.",
    author: {
      name: "Айгерим Касымова",
      role: "CEO",
      company: "Frito",
      avatar:
        "https://api.dicebear.com/7.x/notionists/svg?seed=Aigerim&backgroundColor=d1d4f9",
    },
    rating: 5,
  },
  {
    text: "CRM и чат-боты для AgroTech Solutions автоматизировали продажи агрооборудования и ведение клиентов — команда видит все сделки онлайн.",
    author: {
      name: "Даулет Садыков",
      role: "CTO",
      company: "AgroTech Solutions",
      avatar:
        "https://api.dicebear.com/7.x/notionists/svg?seed=Daulet&backgroundColor=ffd5dc",
    },
    rating: 5,
  },
  {
    text: "В Nova Logistics получаем аналитику в реальном времени, сайт и боты работают стабильно. Ребята быстро реагируют на правки и новые запросы.",
    author: {
      name: "Маргарита Оразова",
      role: "COO",
      company: "Nova Logistics",
      avatar:
        "https://api.dicebear.com/7.x/notionists/svg?seed=Margarita&backgroundColor=ffdfbf",
    },
    rating: 5,
  },
];

// ---------- Team Card (НЕ кликается, чисто UI) ----------
function TeamCard({
  member,
  isActive,
}: {
  member: TeamMember;
  isActive: boolean;
}) {
  const firstName = member.name.split(" ")[0];

  return (
    <div className="group relative select-none">
      {/* pill (не ссылка, не кнопка) */}
        <div
          className={[
            "pointer-events-none absolute -top-4 left-1/2 z-20 -translate-x-1/2",
            "transition-all duration-300",
            isActive ? "opacity-100" : "opacity-0",
            "group-hover:opacity-100",
          ].join(" ")}
        >
          <div className="border-border/40 bg-background/40 text-foreground/80 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs backdrop-blur">
          написать {firstName}
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>

      <div className="glass-4 hover:glass-5 h-full rounded-2xl p-6 transition-all duration-300">
        <div className="border-border/30 bg-muted/10 relative mb-5 flex h-40 items-center justify-center overflow-hidden rounded-2xl border">
          {/* cartoon avatar */}
          <img
            src={member.avatar}
            alt={member.name}
            className="h-28 w-28 object-contain"
            loading="lazy"
            draggable={false}
          />

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-white/5 blur-2xl" />
            <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-black/45 to-transparent" />
          </div>
        </div>

        <p className="text-muted-foreground text-xs">{member.role}</p>
        <h3 className="mt-1 text-xl font-semibold tracking-tight text-white/90">
          {member.name}
        </h3>

        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="from-brand/30 to-brand-foreground/30 absolute inset-0 rounded-2xl bg-gradient-to-br via-transparent blur-xl" />
        </div>
      </div>
    </div>
  );
}

// ---------- Review Card ----------
function ReviewCard({ review, index }: { review: Review; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const card = cardRef.current;
      if (!card) return;

      const onEnter = () => {
        gsap.to(quoteRef.current, {
          scale: 1.2,
          rotation: -5,
          duration: 0.3,
          ease: "back.out(2)",
        });
      };

      const onLeave = () => {
        gsap.to(quoteRef.current, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);

      return () => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      };
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="glass-4 hover:glass-5 h-full rounded-2xl p-6 transition-all duration-300">
        <div ref={quoteRef} className="mb-4">
          <Quote className="text-brand/50 size-8" />
        </div>

        <p className="text-muted-foreground mb-6 min-h-[80px] text-sm leading-relaxed">
          "{review.text}"
        </p>

        <div className="border-border/30 flex items-center gap-3 border-t pt-4">
          <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] p-0.5">
            <div className="bg-background h-full w-full overflow-hidden rounded-full p-0.5">
              <img
                src={review.author.avatar}
                alt={review.author.name}
                className="h-full w-full scale-110 rounded-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="truncate text-sm font-semibold text-white/90">
              {review.author.name}
            </h4>
            <p className="text-muted-foreground truncate text-xs">
              {review.author.role} - {review.author.company}
            </p>
          </div>
        </div>

        <div className="mt-3 flex gap-1">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="fill-brand text-brand size-3" />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="from-brand/40 to-brand-foreground/40 absolute inset-0 rounded-2xl bg-gradient-to-br via-transparent blur-xl" />
        </div>
      </div>
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export default function TeamReviews() {
  // бесконечный автоскролл (марки)
  const autoScroll = useMemo(
    () =>
      AutoScroll({
        speed: 1.25,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        playOnInit: true,
      }),
    [],
  );

  const [teamEmblaRef, teamEmblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
      containScroll: false,
      skipSnaps: true,
    },
    [autoScroll],
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const resumeAuto = () => {
    // у плагина есть play/stop, типы иногда не подтягиваются
    // @ts-expect-error
    autoScroll?.play?.();
  };

  // активный слайд + подстраховка автоскролла
  useEffect(() => {
    if (!teamEmblaApi) return;

    let raf = 0;
    const sync = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setActiveIndex(teamEmblaApi.selectedScrollSnap());
      });
    };

    teamEmblaApi.on("select", sync);
    teamEmblaApi.on("scroll", sync);

    sync();
    resumeAuto();

    return () => {
      cancelAnimationFrame(raf);
      teamEmblaApi.off("select", sync);
      teamEmblaApi.off("scroll", sync);
    };
  }, [teamEmblaApi]);

  // полностью глотаем любые нажатия, чтобы Embla НЕ воспринимал как interaction
  const swallowPointer = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    resumeAuto();
  };

  return (
    <section id="reviews" className="relative overflow-hidden bg-black py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_40%,transparent_100%)] bg-[size:32px_32px]" />

      <div className="relative z-10 space-y-28">
        {/* Team */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-container mx-auto mb-10 px-4"
          >
            <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Познакомьтесь с нашей{" "}
              <span className="from-brand via-brand-foreground to-brand bg-gradient-to-r bg-clip-text text-transparent">
                командой
              </span>
            </h2>
          </motion.div>

          {/* ограничение ширины + чёрный обрыв */}
          <div className="max-w-container mx-auto px-4">
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-black via-black/70 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-black via-black/70 to-transparent" />

              <div
                ref={teamEmblaRef}
                className="overflow-hidden"
                // ВАЖНО: глотаем всё, чтобы карусель не “останавливалась” при клике/тапе
                onPointerDownCapture={swallowPointer}
                onPointerUpCapture={swallowPointer}
                onClickCapture={swallowPointer}
                onTouchStartCapture={swallowPointer}
                onMouseDownCapture={swallowPointer}
              >
                <div className="-ml-4 flex select-none">
                  {team.map((member, idx) => (
                    <div
                      key={member.name}
                      className="flex-[0_0_78%] pl-4 sm:flex-[0_0_320px] md:flex-[0_0_340px]"
                    >
                      <TeamCard
                        member={member}
                        isActive={idx === activeIndex}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="px-4">
          <div className="max-w-container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
              <span className="from-brand via-brand-foreground to-brand bg-gradient-to-r bg-clip-text text-transparent">
                Отзывы
              </span>
            </h2>
          </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {reviews.map((review, index) => (
                <ReviewCard key={index} review={review} index={index} />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <a
                href="#contact"
                className="glass-4 hover:glass-5 group inline-flex items-center gap-2 rounded-full px-6 py-3 transition-all duration-300"
              >
                <ThumbsUp className="text-brand size-5 transition-transform group-hover:scale-110" />
                <span className="text-sm font-medium text-white/90">
                  Присоединиться к нашим довольным клиентам
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
