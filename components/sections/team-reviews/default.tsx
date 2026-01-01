"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
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
  avatar: string;
}

// Hook для определения мобильного устройства
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

const team: TeamMember[] = [
  {
    name: "Bolatbek Yermekov",
    role: "Основатель",
    avatar: "/team-members/Bolatbek_Yeremkov.png",
  },
  {
    name: "Ramazan Seiitbek",
    role: "Разработчик",
    avatar: "/team-members/Ramazan_Seiitbek.png",
  },
  {
    name: "Diar Begisbyaev",
    role: "CEO",
    avatar: "/team-members/Diar_Begisbyaev.png",
  },
  {
    name: "Ilya Shelestov",
    role: "Разработчик",
    avatar: "/team-members/Ilya_Shelestov.png",
  },
];

const reviews: Review[] = [
  {
    text: "Запустили многофункциональный лендинг для StrategicLaw Group: заявки пошли с первого дня, CRM связали без сбоев.",
    author: {
      name: "Zhaidar Rushanov",
      role: "Founder",
      company: "StrategicLaw Group",
      avatar: "/review/Рушанов_Жайдар.png",
    },
    rating: 5,
  },
  {
    text: "Мобильное приложение и CRM для Zeep Coffee автоматизировали заказы и доставку — клиенты оформляют быстрее, команда успевает больше.",
    author: {
      name: "Aset Akbar",
      role: "CEO",
      company: "Zeep Coffee",
      avatar: "/review/Асет_Акбар.png",
    },
    rating: 5,
  },
  {
    text: "Для сети быстрого питания Frito сделали онлайн-меню, оплату и бота. Средний чек вырос, а повторных заказов стало заметно больше.",
    author: {
      name: "Nurmukhametov Dias Otegenuly",
      role: "General Director",
      company: "Frito",
      avatar: "/review/frito.png",
    },
    rating: 5,
  },
  {
    text: "CRM и чат-боты для AGRO SOLUTIONS LTD (Астана, ba.prg.kz) автоматизировали продажи агрооборудования и ведение клиентов - команда видит все сделки онлайн.",
    author: {
      name: "Mautzhanov Birzhan Galymzhanuly",
      role: "Director",
      company: "AGRO SOLUTIONS LTD",
      avatar: "/review/agro.png",
    },
    rating: 5,
  },
];

// Team Card - оптимизирован для мобильных
function TeamCard({
  member,
  isActive,
}: {
  member: TeamMember;
  isActive: boolean;
}) {
  const firstName = member.name.split(" ")[0];
  const isMobile = useIsMobile();

  return (
    <div className="group relative select-none">
      <div
        className={[
          "pointer-events-none absolute -top-3 left-1/2 z-20 -translate-x-1/2 md:-top-4",
          "transition-all duration-300",
          isActive ? "opacity-100" : "opacity-0",
          "group-hover:opacity-100",
        ].join(" ")}
      >
        <div className="border-border/40 bg-background/40 text-foreground/80 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] backdrop-blur md:gap-2 md:px-3 md:py-1 md:text-xs">
          написать {firstName}
          <ArrowRight className="h-2.5 w-2.5 md:h-3 md:w-3" />
        </div>
      </div>

      <div className="glass-4 hover:glass-5 h-full rounded-xl p-4 transition-all duration-300 md:rounded-2xl md:p-6">
        <div className="relative mb-4 flex h-32 items-center justify-center overflow-hidden rounded-xl md:mb-5 md:h-44 md:rounded-2xl">
          <img
            src={member.avatar}
            alt={member.name}
            className="h-36 w-36 object-contain md:h-50 md:w-50"
            loading="lazy"
            draggable={false}
          />
        </div>

        <p className="text-muted-foreground text-[10px] md:text-xs">
          {member.role}
        </p>
        <h3 className="mt-1 text-base font-semibold tracking-tight text-white/90 md:text-xl">
          {member.name}
        </h3>

        {!isMobile && (
          <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:rounded-2xl">
            <div className="from-brand/30 to-brand-foreground/30 absolute inset-0 rounded-xl bg-gradient-to-br via-transparent blur-xl md:rounded-2xl" />
          </div>
        )}
      </div>
    </div>
  );
}

// Review Card - оптимизирован для мобильных
function ReviewCard({ review, index }: { review: Review; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Отключаем hover анимации на мобильных и при prefersReducedMotion
    if (isMobile || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const card = cardRef.current;
      if (!card) return;

      const onEnter = () => {
        gsap.to(quoteRef.current, {
          scale: 1.15,
          rotation: -5,
          duration: 0.3,
          ease: "back.out(1.7)",
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
  }, [isMobile, prefersReducedMotion]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative"
    >
      <div className="glass-4 hover:glass-5 h-full rounded-xl p-4 transition-all duration-300 md:rounded-2xl md:p-6">
        <div ref={quoteRef} className="mb-3 md:mb-4">
          <Quote className="text-brand/50 size-6 md:size-8" />
        </div>

        <p className="text-muted-foreground mb-4 min-h-[60px] text-xs leading-relaxed md:mb-6 md:min-h-[80px] md:text-sm">
          "{review.text}"
        </p>

        <div className="border-border/30 flex items-center gap-2 border-t pt-3 md:gap-3 md:pt-4">
          <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] p-0.5 md:size-12">
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
            <h4 className="truncate text-xs font-semibold text-white/90 md:text-sm">
              {review.author.name}
            </h4>
            <p className="text-muted-foreground truncate text-[10px] md:text-xs">
              {review.author.role} - {review.author.company}
            </p>
          </div>
        </div>

        <div className="mt-2 flex gap-0.5 md:mt-3 md:gap-1">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star
              key={i}
              className="fill-brand text-brand size-2.5 md:size-3"
            />
          ))}
        </div>

        {!isMobile && (
          <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:rounded-2xl">
            <div className="from-brand/40 to-brand-foreground/40 absolute inset-0 rounded-xl bg-gradient-to-br via-transparent blur-xl md:rounded-2xl" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export default function TeamReviews() {
  const isMobile = useIsMobile();

  // Автоскролл, который НИКОГДА не останавливается
  const autoScroll = useMemo(
    () =>
      AutoScroll({
        speed: isMobile ? 1 : 1.25,
        stopOnInteraction: false, // НЕ останавливается при взаимодействии
        stopOnMouseEnter: false, // НЕ останавливается при наведении
        stopOnFocusIn: false, // НЕ останавливается при фокусе
        playOnInit: true, // Начинает сразу
      }),
    [isMobile],
  );

  const [teamEmblaRef, teamEmblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: isMobile ? "center" : "start",
      dragFree: false, // Отключаем свободное перетаскивание
      containScroll: "keepSnaps",
      skipSnaps: false,
      duration: isMobile ? 30 : 25,
      watchDrag: false, // Отключаем возможность перетаскивания
    },
    [autoScroll],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const teamSlides = [...team, ...team, ...team]; // Больше дубликатов для более плавного скролла

  useEffect(() => {
    if (!teamEmblaApi) return;

    // Принудительно запускаем и следим за автоскроллом
    const autoScrollPlugin = teamEmblaApi.plugins()?.autoScroll;
    autoScrollPlugin?.play?.();

    let raf = 0;
    const sync = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setActiveIndex(teamEmblaApi.selectedScrollSnap());
      });
    };

    // Принудительно перезапускаем автоскролл при любом событии
    const restartAutoScroll = () => {
      autoScrollPlugin?.play?.();
    };

    teamEmblaApi.on("select", sync);
    teamEmblaApi.on("scroll", sync);
    teamEmblaApi.on("settle", restartAutoScroll);
    teamEmblaApi.on("pointerUp", restartAutoScroll);

    sync();

    return () => {
      cancelAnimationFrame(raf);
      teamEmblaApi.off("select", sync);
      teamEmblaApi.off("scroll", sync);
      teamEmblaApi.off("settle", restartAutoScroll);
      teamEmblaApi.off("pointerUp", restartAutoScroll);
    };
  }, [teamEmblaApi]);

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-black py-12 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_40%,transparent_100%)] bg-[size:24px_24px] md:bg-[size:32px_32px]" />

      <div className="relative z-10 space-y-16 md:space-y-28">
        {/* Team */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-container mx-auto mb-6 px-4 md:mb-10"
          >
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl xl:text-6xl">
              Познакомьтесь с нашей{" "}
              <span className="from-brand via-brand-foreground to-brand bg-gradient-to-r bg-clip-text text-transparent">
                командой
              </span>
            </h2>
          </motion.div>

          <div className="max-w-container mx-auto px-4">
            <div className="relative overflow-hidden">
              {/* Градиенты по краям - адаптивные */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-black via-black/70 to-transparent md:w-24" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-black via-black/70 to-transparent md:w-24" />

              <div
                ref={teamEmblaRef}
                className="overflow-hidden"
                style={{
                  cursor: "default",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                }}
              >
                <div className="pointer-events-none -ml-3 flex select-none md:-ml-4">
                  {teamSlides.map((member, idx) => (
                    <div
                      key={`${member.name}-${idx}`}
                      className="xs:flex-[0_0_75%] flex-[0_0_85%] pl-3 sm:flex-[0_0_320px] md:flex-[0_0_340px] md:pl-4"
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
              transition={{ duration: 0.5 }}
              className="mb-8 md:mb-16"
            >
              <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="from-brand via-brand-foreground to-brand bg-gradient-to-r bg-clip-text text-transparent">
                  Отзывы
                </span>
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
            >
              {reviews.map((review, index) => (
                <ReviewCard key={index} review={review} index={index} />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 text-center md:mt-12"
            >
              <a
                href="#contact"
                className="glass-4 hover:glass-5 group inline-flex touch-manipulation items-center gap-2 rounded-full px-5 py-2.5 transition-all duration-300 md:px-6 md:py-3"
                style={{ minHeight: "44px", minWidth: "44px" }}
              >
                <ThumbsUp className="text-brand size-4 transition-transform group-hover:scale-110 md:size-5" />
                <span className="text-xs font-medium text-white/90 md:text-sm">
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
