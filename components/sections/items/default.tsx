"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ArrowUpRight, BarChart3, Clock, DollarSign, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useI18n } from "@/components/contexts/language-context";

interface BenefitItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  stat?: string;
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

// Benefit Card Component - оптимизирован для мобильных
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
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Отключаем сложные hover анимации на мобильных и при prefersReducedMotion
    if (isMobile || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const card = cardRef.current;
      if (card) {
        card.addEventListener("mouseenter", () => {
          // Icon background expand
          gsap.to(iconBgRef.current, {
            scale: 1.1,
            duration: 0.3,
            ease: "back.out(1.5)",
          });

          // Icon rotate
          gsap.to(iconRef.current, {
            rotation: 10,
            scale: 1.05,
            duration: 0.25,
            ease: "power2.out",
          });

          // Arrow slide in
          gsap.to(arrowRef.current, {
            x: 0,
            opacity: 1,
            duration: 0.25,
            ease: "power2.out",
          });

          // Glow effect
          gsap.to(glowRef.current, {
            opacity: 0.5,
            scale: 1.15,
            duration: 0.3,
            ease: "power2.out",
          });

          // Stat pulse
          gsap.to(statRef.current, {
            scale: 1.08,
            duration: 0.25,
            ease: "back.out(1.7)",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(iconBgRef.current, {
            scale: 1,
            duration: 0.25,
            ease: "power2.out",
          });

          gsap.to(iconRef.current, {
            rotation: 0,
            scale: 1,
            duration: 0.25,
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
            duration: 0.25,
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
  }, [isMobile, prefersReducedMotion]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative cursor-pointer"
    >
      {/* Glow effect background - отключен на мобильных для производительности */}
      {!isMobile && (
        <div
          ref={glowRef}
          className="from-brand/20 via-brand-foreground/10 absolute inset-0 -z-10 rounded-lg bg-gradient-to-r to-transparent opacity-0 blur-xl md:rounded-xl"
        />
      )}

      {/* Card */}
      <div className="border-border/50 hover:border-brand/50 bg-background/50 relative flex items-start gap-4 overflow-hidden rounded-lg border p-4 backdrop-blur-sm transition-all duration-300 md:gap-6 md:rounded-xl md:p-6">
        {/* Number badge */}
        <div className="text-muted-foreground/40 absolute top-3 right-3 font-mono text-[9px] md:top-4 md:right-4 md:text-[10px]">
          0{index + 1}
        </div>

        {/* Icon Container */}
        <div className="relative shrink-0">
          <div
            ref={iconBgRef}
            className="relative flex size-12 items-center justify-center overflow-hidden rounded-lg md:size-14 md:rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(var(--brand-rgb), 0.1) 0%, rgba(var(--brand-rgb), 0.05) 100%)",
            }}
          >
            {/* Icon */}
            <div ref={iconRef} className="text-brand relative z-10">
              {benefit.icon}
            </div>

            {/* Rotating border effect - только на десктопе */}
            {!isMobile && (
              <div className="border-brand/20 absolute inset-0 rounded-lg border-2 opacity-0 transition-opacity group-hover:opacity-100 md:rounded-xl" />
            )}
          </div>

          {/* Stat badge */}
          {benefit.stat && (
            <div
              ref={statRef}
              className="glass-4 text-brand border-brand/20 absolute -right-1.5 -bottom-1.5 rounded-full border px-1.5 py-0.5 text-[9px] font-bold md:-right-2 md:-bottom-2 md:px-2 md:text-[10px]"
            >
              {benefit.stat}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-1.5 pt-0.5 md:space-y-2 md:pt-1">
          <div className="flex items-center gap-1.5 md:gap-2">
            <h3 className="text-foreground group-hover:text-brand text-base font-semibold transition-colors md:text-lg">
              {benefit.title}
            </h3>

            {/* Arrow indicator - только на десктопе */}
            {!isMobile && (
              <div ref={arrowRef} className="-translate-x-2 opacity-0">
                <ArrowUpRight className="text-brand size-4" />
              </div>
            )}
          </div>

          <p className="text-muted-foreground text-xs leading-relaxed md:text-sm">
            {benefit.description}
          </p>

          {/* Progress bar indicator */}
          <div className="relative pt-1.5 md:pt-2">
            <div className="bg-muted/30 h-0.5 w-full overflow-hidden rounded-full md:h-1">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.08 + 0.2,
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
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export default function Items() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { t } = useI18n();
  const copy = t.benefits;
  const benefits = copy.items;
  const benefitIcons = [
    <Zap className="size-5 md:size-6" />,
    <Clock className="size-5 md:size-6" />,
    <DollarSign className="size-5 md:size-6" />,
    <BarChart3 className="size-5 md:size-6" />,
  ];

  useEffect(() => {
    // Отключаем анимацию текста на мобильных и при prefersReducedMotion
    if (!titleRef.current || isMobile || prefersReducedMotion) return;

    gsap.fromTo(
      titleRef.current,
      {
        backgroundPosition: "0% 50%",
      },
      {
        backgroundPosition: "100% 50%",
        duration: 4,
        ease: "none",
        repeat: -1,
        yoyo: true,
      },
    );
  }, [isMobile, prefersReducedMotion]);

  return (
    <section
      id="benefits"
      className="relative overflow-hidden px-4 py-12 md:py-24"
    >
      {/* Animated background gradient */}
      <div className="from-background via-muted/10 to-background pointer-events-none absolute inset-0 bg-gradient-to-b" />

      {/* Radial gradient spotlight - уменьшен на мобильных */}
      <div className="bg-gradient-radial from-brand/5 pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 via-transparent to-transparent blur-2xl md:h-[800px] md:w-[800px] md:blur-3xl" />

      <div className="max-w-container relative z-10 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 space-y-4 text-center md:mb-16 md:space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-block"
          >
            <span className="glass-4 from-foreground to-brand rounded-full bg-linear-to-r bg-clip-text px-3 py-1.5 text-xs font-medium text-transparent md:px-4 md:py-2 md:text-sm">
              {copy.tag}
            </span>
          </motion.div>

          <h2
            ref={titleRef}
            className="from-foreground to-foreground dark:to-brand mx-auto max-w-4xl bg-linear-to-r bg-clip-text text-3xl leading-tight font-bold text-transparent transition-all duration-300 md:text-4xl lg:text-5xl xl:text-6xl"
            style={{
              backgroundSize: "200% 100%",
              filter: isMobile
                ? "none"
                : "drop-shadow(2px 1px 24px var(--brand-foreground))",
            }}
          >
            {copy.title}
          </h2>

          <p className="text-muted-foreground mx-auto max-w-3xl text-base font-semibold md:text-lg lg:text-xl">
            {copy.subtitle}
          </p>
        </motion.div>

        {/* Benefits List - ОДНА ВЕРСИЯ без дублирования */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mx-auto max-w-4xl space-y-3 md:space-y-4"
        >
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={`${benefit.title}-${index}`}
              benefit={{
                ...benefit,
                icon:
                  benefitIcons[index] ||
                  benefitIcons[benefitIcons.length - 1] ||
                  null,
              }}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
