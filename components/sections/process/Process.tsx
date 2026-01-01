"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import gsap from "gsap";
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  LineChart,
  Rocket,
  Settings,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

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

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  visual: React.ReactNode;
}

interface Statistic {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

// Упрощенный Analyze Visual для мобильных
const AnalyzeVisual = () => {
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const centerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Отключаем сложные анимации на мобильных или при prefersReducedMotion
    if (prefersReducedMotion || isMobile) return;

    const ctx = gsap.context(() => {
      gsap.to(centerRef.current, {
        scale: 1.05,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      iconsRef.current.forEach((icon, i) => {
        if (icon) {
          gsap.to(icon, {
            rotation: 360,
            duration: 12 + i * 2,
            ease: "none",
            repeat: -1,
          });
        }
      });
    });

    return () => ctx.revert();
  }, [isMobile, prefersReducedMotion]);

  const surroundingIcons = [
    { Icon: Settings, position: "top-2 left-2 md:top-4 md:left-4" },
    { Icon: Code2, position: "top-2 right-2 md:top-4 md:right-4" },
    { Icon: LineChart, position: "bottom-2 left-2 md:bottom-4 md:left-4" },
    { Icon: TrendingUp, position: "bottom-2 right-2 md:bottom-4 md:right-4" },
  ];

  return (
    <div className="relative flex h-32 w-full items-center justify-center md:h-48">
      <div
        ref={centerRef}
        className="glass-4 relative z-10 flex size-14 items-center justify-center rounded-xl md:size-20 md:rounded-2xl"
      >
        <Sparkles className="text-brand size-7 md:size-10" />
      </div>

      {surroundingIcons.map(({ Icon, position }, i) => (
        <div
          key={i}
          ref={(el) => {
            iconsRef.current[i] = el;
          }}
          className={cn(
            "glass-3 absolute flex size-8 items-center justify-center rounded-lg md:size-12 md:rounded-xl",
            position,
          )}
        >
          <Icon className="text-brand/70 size-4 md:size-6" />
        </div>
      ))}

      <div className="from-brand/20 to-brand-foreground/10 absolute inset-0 bg-gradient-to-t via-transparent blur-2xl md:blur-3xl" />
    </div>
  );
};

// Упрощенный Build Visual
const BuildVisual = () => {
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      linesRef.current.forEach((line, i) => {
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              duration: isMobile ? 1 : 0.8,
              ease: "power2.out",
              delay: i * (isMobile ? 0.4 : 0.3),
              repeat: -1,
              repeatDelay: isMobile ? 3 : 2,
            },
          );
        }
      });

      if (!isMobile) {
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    });

    return () => ctx.revert();
  }, [isMobile, prefersReducedMotion]);

  return (
    <div className="relative h-32 w-full overflow-hidden rounded-lg md:h-48">
      <div className="glass-3 h-full rounded-lg p-3 md:p-4">
        <div className="border-border/30 mb-3 flex items-center gap-1.5 border-b pb-2 md:mb-4 md:gap-2 md:pb-3">
          <div className="flex gap-1 md:gap-1.5">
            <div className="size-1.5 rounded-full bg-red-500/50 md:size-2.5" />
            <div className="size-1.5 rounded-full bg-yellow-500/50 md:size-2.5" />
            <div className="size-1.5 rounded-full bg-green-500/50 md:size-2.5" />
          </div>
          <div className="ml-1 flex gap-1.5 md:ml-2 md:gap-2">
            <span className="glass-2 text-brand rounded px-1.5 py-0.5 text-[8px] md:px-2 md:text-[10px]">
              HTML
            </span>
            <span className="glass-2 text-muted-foreground rounded px-1.5 py-0.5 text-[8px] md:px-2 md:text-[10px]">
              React
            </span>
            <span className="glass-2 text-muted-foreground hidden rounded px-2 py-0.5 text-[10px] md:inline">
              CSS
            </span>
          </div>
        </div>

        <div className="space-y-1.5 font-mono text-[8px] md:space-y-2 md:text-[10px]">
          {[60, 80, 45, 70].map((width, i) => (
            <div key={i} className="flex items-center gap-1.5 md:gap-2">
              <span className="text-muted-foreground w-3 md:w-auto">
                {i + 1}
              </span>
              <div
                ref={(el) => {
                  linesRef.current[i] = el;
                }}
                className={cn(
                  "h-1.5 origin-left rounded md:h-2",
                  i % 2 === 0 ? "bg-brand/30" : "bg-brand/20",
                )}
                style={{ width: `${width}%` }}
              >
                {i === 2 && !isMobile && (
                  <div
                    ref={cursorRef}
                    className="bg-brand ml-auto h-2.5 w-0.5 md:h-3"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Упрощенный Maintain Visual
const MaintainVisual = () => {
  const metricsRef = useRef<(HTMLDivElement | null)[]>([]);
  const updateRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      metricsRef.current.forEach((metric, i) => {
        if (metric) {
          gsap.fromTo(
            metric,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(1.5)",
              delay: i * 0.15,
            },
          );
        }
      });

      if (!isMobile) {
        gsap.to(updateRef.current, {
          scale: 1.03,
          duration: 1.2,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    });

    return () => ctx.revert();
  }, [isMobile, prefersReducedMotion]);

  const metrics = [
    { label: "Скорость", value: "+38%" },
    { label: "Эффективность", value: "+25%" },
    { label: "Затраты", value: "-11%" },
  ];

  return (
    <div className="relative h-32 w-full overflow-hidden rounded-lg md:h-48">
      <div className="glass-3 h-full space-y-2 rounded-lg p-3 md:space-y-3 md:p-4">
        {metrics.map((metric, i) => (
          <div
            key={i}
            ref={(el) => {
              metricsRef.current[i] = el;
            }}
            className="glass-2 flex items-center justify-between rounded-lg p-2 md:p-3"
          >
            <span className="text-muted-foreground text-[10px] md:text-xs">
              {metric.label}
            </span>
            <span className="text-brand text-xs font-bold md:text-sm">
              {metric.value}
            </span>
          </div>
        ))}

        <div
          ref={updateRef}
          className="glass-4 flex items-center justify-between rounded-lg p-2 md:p-3"
        >
          <span className="text-[10px] font-medium md:text-xs">Обновление</span>
          <div className="glass-2 flex items-center gap-1 rounded px-1.5 py-0.5 md:px-2 md:py-1">
            <span className="text-brand text-[9px] font-medium md:text-[10px]">
              Обновить
            </span>
            <ArrowUpRight className="text-brand size-2.5 md:size-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Анализ",
    description:
      "Начинаем с глубокого анализа текущих процессов, чтобы понять, где AI даст максимальный эффект.",
    visual: <AnalyzeVisual />,
  },
  {
    number: "02",
    title: "Разработка и внедрение",
    description:
      "Создаём кастомное AI-решение для вашей компании, соблюдая качество и безопасность на каждом этапе.",
    visual: <BuildVisual />,
  },
  {
    number: "03",
    title: "Поддержка и развитие",
    description:
      "После запуска поддерживаем и улучшаем решение, чтобы оно продолжало приносить результат.",
    visual: <MaintainVisual />,
  },
];

const statistics: Statistic[] = [
  {
    label: "Проектов завершено",
    value: "5",
    description: "Первые лендинги, боты и CRM запущены в 2024–2025.",
    icon: <Rocket className="text-brand size-5 md:size-6" />,
  },
  {
    label: "Коммерческих клиентов",
    value: "4",
    description: "Пилоты и запуски с реальными референсами.",
    icon: <CheckCircle2 className="text-brand size-5 md:size-6" />,
  },
  {
    label: "Экономия времени в день",
    value: "4",
    description: "Сокращаем рутину примерно на 2 часа в день.",
    icon: <TrendingUp className="text-brand size-5 md:size-6" />,
  },
  {
    label: "Экономия в месяц, $",
    value: "5000",
    description: "По оценке клиентов после автоматизации.",
    icon: <LineChart className="text-brand size-5 md:size-6" />,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const statVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "backOut",
    },
  },
};

export default function Process() {
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      numberRefs.current.forEach((num) => {
        if (num) {
          gsap.from(num, {
            textContent: 0,
            duration: isMobile ? 1.5 : 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: num,
              start: "top 85%",
            },
          });
        }
      });
    });

    return () => ctx.revert();
  }, [isMobile, prefersReducedMotion]);

  return (
    <section
      id="process"
      className="relative overflow-hidden px-4 py-12 md:py-24"
    >
      <div className="from-background via-muted/20 to-background pointer-events-none absolute inset-0 bg-gradient-to-b" />

      <div className="max-w-container relative z-10 mx-auto space-y-12 md:space-y-24">
        {/* Process Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 md:mb-16"
          >
            <h2 className="mb-3 text-3xl font-bold md:mb-4 md:text-5xl lg:text-6xl">
              Наш{" "}
              <span className="from-brand via-brand-foreground to-brand bg-gradient-to-r bg-clip-text text-transparent">
                процесс
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
          >
            {processSteps.map((step) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="group relative"
              >
                <div className="glass-4 hover:glass-5 h-full rounded-xl p-4 transition-all duration-300 md:rounded-2xl md:p-6">
                  <div className="mb-4 md:mb-6">{step.visual}</div>

                  <div className="space-y-2 md:space-y-3">
                    <div className="flex items-center gap-2 md:gap-3">
                      <span className="text-brand text-base font-bold md:text-lg">
                        {step.number}
                      </span>
                      <h3 className="text-xl font-bold md:text-2xl">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed md:text-sm">
                      {step.description}
                    </p>
                  </div>

                  <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:rounded-2xl">
                    <div className="from-brand/20 to-brand-foreground/20 absolute inset-0 rounded-xl bg-gradient-to-br via-transparent blur-xl md:rounded-2xl" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Statistics Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 md:mb-16"
          >
            <h2 className="text-3xl font-bold md:text-5xl lg:text-6xl">
              Наши{" "}
              <span className="from-brand via-brand-foreground to-brand bg-gradient-to-r bg-clip-text text-transparent">
                результаты
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4"
          >
            {statistics.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={statVariants}
                className="group relative"
              >
                <div className="glass-4 hover:glass-5 h-full rounded-xl p-4 transition-all duration-300 md:rounded-2xl md:p-6">
                  <div className="mb-2 md:mb-4">{stat.icon}</div>

                  <h3 className="text-muted-foreground mb-2 text-[10px] font-medium md:mb-3 md:text-sm">
                    {stat.label}
                  </h3>

                  <div
                    ref={(el) => {
                      numberRefs.current[index] = el;
                    }}
                    className="from-brand to-brand-foreground mb-2 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent md:mb-4 md:text-5xl lg:text-6xl"
                  >
                    {stat.value}
                  </div>

                  <p className="text-muted-foreground border-border/30 border-t pt-2 text-[9px] leading-relaxed md:pt-4 md:text-xs">
                    {stat.description}
                  </p>

                  <div className="bg-brand/50 absolute top-4 right-4 size-1.5 rounded-full md:top-6 md:right-6 md:size-2" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
