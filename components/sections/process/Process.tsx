"use client";

import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { 
  ArrowUpRight,
  CheckCircle2,
  Code2, 
  LineChart, 
  Rocket, 
  Settings, 
  Sparkles, 
  TrendingUp 
} from "lucide-react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

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

// Analyze Visual
const AnalyzeVisual = () => {
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const centerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Center icon pulse
      gsap.to(centerRef.current, {
        scale: 1.1,
        duration: 1.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Surrounding icons orbit
      iconsRef.current.forEach((icon, i) => {
        if (icon) {
          gsap.to(icon, {
            rotation: 360,
            duration: 8 + i,
            ease: "none",
            repeat: -1,
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const surroundingIcons = [
    { Icon: Settings, position: "top-4 left-4" },
    { Icon: Code2, position: "top-4 right-4" },
    { Icon: LineChart, position: "bottom-4 left-4" },
    { Icon: TrendingUp, position: "bottom-4 right-4" },
  ];

  return (
    <div className="relative h-48 w-full flex items-center justify-center">
      {/* Center icon */}
      <div
        ref={centerRef}
        className="glass-4 size-20 rounded-2xl flex items-center justify-center relative z-10"
      >
        <Sparkles className="size-10 text-brand" />
      </div>

      {/* Surrounding icons */}
      {surroundingIcons.map(({ Icon, position }, i) => (
        <div
          key={i}
          ref={(el) => { iconsRef.current[i] = el; }}
          className={cn(
            "absolute glass-3 size-12 rounded-xl flex items-center justify-center",
            position
          )}
        >
          <Icon className="size-6 text-brand/70" />
        </div>
      ))}

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand/20 via-transparent to-brand-foreground/10 blur-3xl" />
    </div>
  );
};

// Build Visual (Code Editor)
const BuildVisual = () => {
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Code lines typing effect
      linesRef.current.forEach((line, i) => {
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              delay: i * 0.3,
              repeat: -1,
              repeatDelay: 2,
            }
          );
        }
      });

      // Cursor blink
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative h-48 w-full rounded-lg overflow-hidden">
      {/* Code editor mockup */}
      <div className="glass-3 h-full rounded-lg p-4">
        {/* Editor header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/30">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-red-500/50" />
            <div className="size-2.5 rounded-full bg-yellow-500/50" />
            <div className="size-2.5 rounded-full bg-green-500/50" />
          </div>
          <div className="flex gap-2 ml-2">
            <span className="glass-2 px-2 py-0.5 rounded text-[10px] text-brand">HTML</span>
            <span className="glass-2 px-2 py-0.5 rounded text-[10px] text-muted-foreground">React</span>
            <span className="glass-2 px-2 py-0.5 rounded text-[10px] text-muted-foreground">CSS</span>
          </div>
        </div>

        {/* Code lines */}
        <div className="space-y-2 font-mono text-[10px]">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">1</span>
            <div
              ref={(el) => { linesRef.current[0] = el; }}
              className="h-2 bg-brand/30 rounded origin-left"
              style={{ width: "60%" }}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">2</span>
            <div
              ref={(el) => { linesRef.current[1] = el; }}
              className="h-2 bg-brand/20 rounded origin-left"
              style={{ width: "80%" }}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">3</span>
            <div
              ref={(el) => { linesRef.current[2] = el; }}
              className="h-2 bg-brand/30 rounded origin-left flex items-center"
              style={{ width: "45%" }}
            >
              <div
                ref={cursorRef}
                className="h-3 w-0.5 bg-brand ml-auto"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">4</span>
            <div
              ref={(el) => { linesRef.current[3] = el; }}
              className="h-2 bg-brand/20 rounded origin-left"
              style={{ width: "70%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Maintain Visual (Dashboard)
const MaintainVisual = () => {
  const metricsRef = useRef<(HTMLDivElement | null)[]>([]);
  const updateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Metrics count up animation
      metricsRef.current.forEach((metric, i) => {
        if (metric) {
          gsap.fromTo(
            metric,
            { scale: 0.5, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: "back.out(2)",
              delay: i * 0.2,
            }
          );
        }
      });

      // Update button pulse
      gsap.to(updateRef.current, {
        scale: 1.05,
        duration: 1,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => ctx.revert();
  }, []);

  const metrics = [
    { label: "Скорость продукта", value: "+38%" },
    { label: "Эффективность процессов", value: "+25%" },
    { label: "Операционные затраты", value: "-11%" },
  ];

  return (
    <div className="relative h-48 w-full rounded-lg overflow-hidden">
      <div className="glass-3 h-full rounded-lg p-4 space-y-3">
        {/* Metrics */}
        {metrics.map((metric, i) => (
          <div
            key={i}
            ref={(el) => { metricsRef.current[i] = el; }}
            className="glass-2 rounded-lg p-3 flex items-center justify-between"
          >
            <span className="text-xs text-muted-foreground">{metric.label}</span>
            <span className="text-sm font-bold text-brand">{metric.value}</span>
          </div>
        ))}

        {/* Update available */}
        <div
          ref={updateRef}
          className="glass-4 rounded-lg p-3 flex items-center justify-between"
        >
          <span className="text-xs font-medium">Доступно обновление</span>
          <div className="glass-2 px-2 py-1 rounded flex items-center gap-1">
            <span className="text-[10px] font-medium text-brand">Обновить</span>
            <ArrowUpRight className="size-3 text-brand" />
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
    value: "93+",
    description: "Успешно реализовали 93 проекта.",
    icon: <Rocket className="size-6 text-brand" />,
  },
  {
    label: "Довольные клиенты",
    value: "100%",
    description: "Стремимся к 100% удовлетворённости клиентов.",
    icon: <CheckCircle2 className="size-6 text-brand" />,
  },
  {
    label: "Часов экономии в день",
    value: "3 ч",
    description: "В среднем экономим клиентам 3 часа работы ежедневно.",
    icon: <TrendingUp className="size-6 text-brand" />,
  },
  {
    label: "Экономия в месяц",
    value: "80 тыс.",
    description: "В среднем экономим около $80 000 в месяц.",
    icon: <LineChart className="size-6 text-brand" />,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const statVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "backOut",
    },
  },
};

export default function Process() {
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      numberRefs.current.forEach((num) => {
        if (num) {
          gsap.from(num, {
            textContent: 0,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: num,
              start: "top 80%",
            },
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background pointer-events-none" />

      <div className="max-w-container mx-auto relative z-10 space-y-24">
        {/* Process Section */}
        <div>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Наш{" "}
              <span className="bg-gradient-to-r from-brand via-brand-foreground to-brand bg-clip-text text-transparent">
                процесс
              </span>
            </h2>
          </motion.div>

          {/* Process Steps */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative group"
              >
                <div className="glass-4 rounded-2xl p-6 h-full hover:glass-5 transition-all duration-300">
                  {/* Visual */}
                  <div className="mb-6">{step.visual}</div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-brand text-lg font-bold">
                        {step.number}
                      </span>
                      <h3 className="text-2xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/30 via-transparent to-brand-foreground/30 blur-xl" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Statistics Section */}
        <div>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Наши{" "}
              <span className="bg-gradient-to-r from-brand via-brand-foreground to-brand bg-clip-text text-transparent">
                результаты
              </span>
            </h2>
          </motion.div>

          {/* Statistics Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {statistics.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={statVariants}
                className="relative group"
              >
                <div className="glass-4 rounded-2xl p-6 h-full hover:glass-5 transition-all duration-300">
                  {/* Icon */}
                  <div className="mb-4">{stat.icon}</div>

                  {/* Label */}
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    {stat.label}
                  </h3>

                  {/* Value */}
                  <div
                    ref={(el) => { numberRefs.current[index] = el; }}
                    className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-brand to-brand-foreground bg-clip-text text-transparent"
                  >
                    {stat.value}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed border-t border-border/30 pt-4">
                    {stat.description}
                  </p>

                  {/* Dot indicator */}
                  <div className="absolute top-6 right-6 size-2 rounded-full bg-brand/50" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
