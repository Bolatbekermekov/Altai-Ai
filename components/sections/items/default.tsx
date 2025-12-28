"use client";

import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ArrowUpRight, BarChart3, Clock, DollarSign, Zap } from "lucide-react";
import { useEffect, useRef } from "react";

interface BenefitItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  stat?: string;
}

const benefits: BenefitItem[] = [
  {
    title: "Рост продуктивности",
    description:
      "Получайте практичные инсайты на основе AI-аналитики, чтобы быстрее принимать решения.",
    icon: <Zap className="size-6" />,
    stat: "+45%",
  },
  {
    title: "Доступность 24/7",
    description:
      "AI-системы работают круглосуточно и обеспечивают поддержку без простоев.",
    icon: <Clock className="size-6" />,
    stat: "24/7",
  },
  {
    title: "Снижение затрат",
    description:
      "Автоматизация сокращает ручные задачи, снижает операционные расходы и оптимизирует ресурсы.",
    icon: <DollarSign className="size-6" />,
    stat: "-30%",
  },
  {
    title: "Аналитика на данных",
    description:
      "Используйте AI для анализа больших данных, поиска трендов и точных бизнес-решений.",
    icon: <BarChart3 className="size-6" />,
    stat: "100%",
  },
];

// Benefit Card Component - IMPROVED
const BenefitCard = ({
  benefit,
  index,
}: {
  benefit: BenefitItem;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconBgRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const card = cardRef.current;
      if (card) {
        card.addEventListener("mouseenter", () => {
          // Icon background expand
          gsap.to(iconBgRef.current, {
            scale: 1.15,
            duration: 0.4,
            ease: "back.out(1.7)",
          });

          // Icon rotate
          gsap.to(iconRef.current, {
            rotation: 15,
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
          });

          // Arrow slide in
          gsap.to(arrowRef.current, {
            x: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });

          // Glow effect
          gsap.to(glowRef.current, {
            opacity: 0.6,
            scale: 1.2,
            duration: 0.4,
            ease: "power2.out",
          });

          // Stat pulse
          gsap.to(statRef.current, {
            scale: 1.1,
            duration: 0.3,
            ease: "back.out(2)",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(iconBgRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(iconRef.current, {
            rotation: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(arrowRef.current, {
            x: -10,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
          });

          gsap.to(glowRef.current, {
            opacity: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.in",
          });

          gsap.to(statRef.current, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          });
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative cursor-pointer"
    >
      {/* Glow effect background */}
      <div
        ref={glowRef}
        className="from-brand/20 via-brand-foreground/10 absolute inset-0 -z-10 rounded-xl bg-gradient-to-r to-transparent opacity-0 blur-xl"
      />

      {/* Card */}
      <div className="border-border/50 hover:border-brand/50 bg-background/50 relative flex items-start gap-6 overflow-hidden rounded-xl border p-6 backdrop-blur-sm transition-all duration-300">
        {/* Number badge */}
        <div className="text-muted-foreground/40 absolute top-4 right-4 font-mono text-[10px]">
          0{index + 1}
        </div>

        {/* Icon Container */}
        <div className="relative shrink-0">
          <div
            ref={iconBgRef}
            className="relative flex size-14 items-center justify-center overflow-hidden rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(var(--brand-rgb), 0.1) 0%, rgba(var(--brand-rgb), 0.05) 100%)",
            }}
          >
            {/* Icon */}
            <div ref={iconRef} className="text-brand relative z-10">
              {benefit.icon}
            </div>

            {/* Rotating border effect */}
            <div className="border-brand/20 absolute inset-0 rounded-xl border-2 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          {/* Stat badge */}
          {benefit.stat && (
            <div
              ref={statRef}
              className="glass-4 text-brand border-brand/20 absolute -right-2 -bottom-2 rounded-full border px-2 py-0.5 text-[10px] font-bold"
            >
              {benefit.stat}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2 pt-1">
          <div className="flex items-center gap-2">
            <h3 className="text-foreground group-hover:text-brand text-lg font-semibold transition-colors">
              {benefit.title}
            </h3>

            {/* Arrow indicator */}
            <div ref={arrowRef} className="-translate-x-2 opacity-0">
              <ArrowUpRight className="text-brand size-4" />
            </div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed">
            {benefit.description}
          </p>

          {/* Progress bar indicator */}
          <div className="relative pt-2">
            <div className="bg-muted/30 h-1 w-full overflow-hidden rounded-full">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: index * 0.1 + 0.3,
                  ease: "easeOut",
                }}
                className="from-brand to-brand-foreground h-full rounded-full bg-gradient-to-r"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export default function Items() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      {
        backgroundPosition: "0% 50%",
      },
      {
        backgroundPosition: "100% 50%",
        duration: 3,
        ease: "none",
        repeat: -1,
        yoyo: true,
      },
    );
  }, []);

  return (
    <section id="benefits" className="relative overflow-hidden px-4 py-24">
      {/* Animated background gradient */}
      <div className="from-background via-muted/10 to-background pointer-events-none absolute inset-0 bg-gradient-to-b" />

      {/* Radial gradient spotlight */}
      <div className="bg-gradient-radial from-brand/5 pointer-events-none absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 via-transparent to-transparent blur-3xl" />

      <div className="max-w-container relative z-10 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 space-y-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <span className="glass-4 from-foreground to-brand rounded-full bg-linear-to-r bg-clip-text px-4 py-2 text-sm font-medium text-transparent">
              Почему мы
            </span>
          </motion.div>

          <h2
            ref={titleRef}
            className="from-foreground to-foreground dark:to-brand mx-auto max-w-4xl bg-linear-to-r bg-clip-text text-4xl leading-tight font-bold text-transparent drop-shadow-[2px_1px_24px_var(--brand-foreground)] transition-all duration-300 md:text-5xl lg:text-6xl"
            style={{
              backgroundSize: "200% 100%",
            }}
          >
            Преобразуйте бизнес с Altai.ai
          </h2>

          <p className="text-muted-foreground mx-auto max-w-3xl text-lg font-semibold md:text-xl">
            Современные AI-решения, которые дают измеримый результат
          </p>
        </motion.div>

        {/* Benefits List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-4xl space-y-4"
        >
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </motion.div>

        {/* Benefits List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-4xl space-y-4"
        >
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
