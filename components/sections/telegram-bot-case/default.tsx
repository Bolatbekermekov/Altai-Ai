"use client";

import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import {
  ArrowUpRight,
  Bot,
  CheckCircle,
  Clock,
  MessageSquare,
  Shield,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TelegramBotSolutionProps {
  title?: string;
  description?: string;
  capabilities?: string[];
  screenshot?: string;
}

export default function TelegramBotSolution({
  title = "Решения для Telegram-ботов",
  description = "Разрабатываем умные Telegram боты для автоматизации вашего бизнеса. От простых чат-ботов до сложных систем с интеграциями, платежами и аналитикой.",
  capabilities = [
    "Чат-боты с AI и обработкой естественного языка",
    "Интеграция с CRM, платежными системами и API",
    "Админ-панели для управления ботом",
    "Автоматизация бизнес-процессов и уведомлений",
    "Аналитика и отчетность в реальном времени",
  ],
  screenshot = "/telegram-bot-screenshot.png",
}: TelegramBotSolutionProps) {
  const iphoneRef = useRef<HTMLDivElement>(null);
  const floatingRef1 = useRef<HTMLDivElement>(null);
  const floatingRef2 = useRef<HTMLDivElement>(null);
  const floatingRef3 = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Определение мобильного устройства
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // iPhone анимация одинаковая везде (как на десктопе)
      gsap.to(iphoneRef.current, {
        y: -20,
        rotation: -2,
        duration: 3,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Floating элементы только на десктопе
      if (!isMobile && !prefersReducedMotion) {
        gsap.to(floatingRef1.current, {
          y: -40,
          x: 30,
          rotation: 360,
          duration: 8,
          ease: "none",
          repeat: -1,
        });

        gsap.to(floatingRef2.current, {
          y: 40,
          x: -30,
          rotation: -360,
          duration: 10,
          ease: "none",
          repeat: -1,
        });

        gsap.to(floatingRef3.current, {
          y: -30,
          x: -20,
          scale: 1.2,
          duration: 5,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    });

    return () => ctx.revert();
  }, [isMobile, prefersReducedMotion]);

  return (
    <section
      id="telegram"
      className="relative overflow-hidden px-4 py-16 md:py-24"
    >
      {/* Background */}
      <div className="from-background via-muted/10 to-background pointer-events-none absolute inset-0 bg-gradient-to-b" />

      {/* Floating decoration elements - скрыты на мобильных */}
      <div
        ref={floatingRef1}
        className="bg-brand/10 absolute top-20 right-10 size-32 rounded-full opacity-0 blur-3xl md:right-20 md:size-40 md:opacity-100"
      />
      <div
        ref={floatingRef2}
        className="bg-brand-foreground/5 absolute bottom-20 left-10 size-36 rounded-full opacity-0 blur-3xl md:left-20 md:size-48 md:opacity-100"
      />
      <div
        ref={floatingRef3}
        className="bg-brand/5 absolute top-1/2 left-1/2 size-24 rounded-full opacity-0 blur-2xl md:size-32 md:opacity-50"
      />

      <div className="max-w-container relative z-10 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 space-y-4 text-center md:mb-16 md:space-y-6"
        >
          <div className="inline-block">
            <span className="glass-4 text-brand rounded-full px-3 py-1.5 text-xs font-medium md:px-4 md:py-2 md:text-sm">
              Наши решения
            </span>
          </div>

          <h2 className="mx-auto max-w-4xl px-4 text-3xl leading-tight font-bold md:text-4xl lg:text-5xl xl:text-6xl">
            <span className="from-foreground to-foreground dark:to-brand bg-linear-to-r bg-clip-text text-transparent drop-shadow-[2px_1px_24px_var(--brand-foreground)]">
              {title}
            </span>
          </h2>

          <p className="text-muted-foreground mx-auto max-w-3xl px-4 text-base md:text-lg lg:text-xl">
            {description}
          </p>
        </motion.div>

        {/* Main Content - iPhone + Capabilities */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* iPhone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div
              ref={iphoneRef}
              className="relative mx-auto max-w-[280px] md:max-w-[320px]"
            >
              {/* iPhone Frame */}
              <div className="relative rounded-[2.5rem] bg-gradient-to-br from-gray-800 to-black p-2.5 shadow-2xl md:rounded-[3rem] md:p-3">
                {/* Dynamic Island */}
                <div className="absolute top-5 left-1/2 z-10 h-6 w-28 -translate-x-1/2 rounded-full bg-black md:top-6 md:h-7 md:w-32" />

                {/* Screen */}
                <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2rem] bg-white md:rounded-[2.5rem]">
                  {/* Single Screenshot */}
                  <img
                    src={screenshot}
                    alt="Интерфейс Telegram-бота"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='650'%3E%3Crect fill='%23f0f0f0' width='300' height='650'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='16' font-family='Arial'%3EИнтерфейс%20Telegram-бота%3C/text%3E%3C/svg%3E";
                    }}
                  />

                  {/* Brand Gradient Overlay */}
                  <div className="from-brand/5 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                </div>

                {/* Phone buttons */}
                <div className="absolute top-20 -right-[3px] h-10 w-1 rounded-l-lg bg-gray-700 md:top-24 md:h-12 md:w-1.5" />
                <div className="absolute top-32 -right-[3px] h-12 w-1 rounded-l-lg bg-gray-700 md:top-40 md:h-16 md:w-1.5" />
                <div className="absolute top-28 -left-[3px] h-8 w-1 rounded-r-lg bg-gray-700 md:top-32 md:h-10 md:w-1.5" />
              </div>

              {/* Glow effect - уменьшен на мобильных */}
              <div className="from-brand/20 md:from-brand/30 to-brand-foreground/10 md:to-brand-foreground/20 absolute inset-0 -z-10 bg-gradient-to-t via-transparent blur-2xl md:blur-3xl" />

              {/* Floating Bot icon - адаптирован для мобильных */}
              <motion.div
                initial={{ scale: 0, rotate: isMobile ? 0 : -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: "backOut" }}
                className="glass-4 text-brand absolute -top-6 -right-6 flex size-16 items-center justify-center rounded-xl md:-top-8 md:-right-8 md:size-20 md:rounded-2xl"
              >
                <Bot className="size-8 md:size-10" />
              </motion.div>

              {/* Floating MessageSquare icon - адаптирован для мобильных */}
              <motion.div
                initial={{ scale: 0, rotate: isMobile ? 0 : 180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease: "backOut" }}
                className="glass-4 text-brand absolute -bottom-6 -left-6 flex size-14 items-center justify-center rounded-xl md:-bottom-8 md:-left-8 md:size-16 md:rounded-2xl"
              >
                <MessageSquare className="size-7 md:size-8" />
              </motion.div>
            </div>
          </motion.div>

          {/* Capabilities List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="order-1 space-y-6 lg:order-2"
          >
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-xl font-bold md:text-2xl lg:text-3xl">
                Что мы можем сделать
              </h3>
              <p className="text-muted-foreground text-base md:text-lg">
                Полный спектр решений для Telegram
              </p>
            </div>

            {/* Capability Cards */}
            <div className="space-y-3 md:space-y-4">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={capability}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.4,
                    delay: isMobile ? 0 : index * 0.08,
                  }}
                  whileTap={isMobile ? { scale: 0.98 } : undefined}
                  className="glass-4 hover:glass-5 group flex items-start gap-3 rounded-lg p-4 transition-all duration-300 md:gap-4 md:rounded-xl md:p-5"
                >
                  <div className="glass-3 text-brand flex size-9 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110 md:size-10">
                    <CheckCircle className="size-4 md:size-5" />
                  </div>
                  <div className="flex-1 pt-0.5 md:pt-1">
                    <p className="text-sm leading-relaxed font-medium md:text-base">
                      {capability}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="pt-2 md:pt-4"
            >
              <a
                href="#contact"
                className="glass-4 hover:glass-5 group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 active:scale-95 md:gap-3 md:px-8 md:py-4"
                aria-label="Обсудить проект"
              >
                <span className="from-foreground to-foreground dark:to-brand bg-linear-to-r bg-clip-text text-transparent">
                  Обсудить проект
                </span>
                <ArrowUpRight className="text-brand size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 md:size-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3 md:mt-20 md:gap-6"
        >
          {[
            {
              icon: <Zap className="size-5 md:size-6" />,
              title: "Быстрая разработка",
              description: "От идеи до запуска за 2-4 недели",
            },
            {
              icon: <Shield className="size-5 md:size-6" />,
              title: "Надёжность",
              description: "99.9% аптайм и защита данных",
            },
            {
              icon: <Clock className="size-5 md:size-6" />,
              title: "Поддержка 24/7",
              description: "Всегда на связи для вас",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: isMobile ? 0 : index * 0.08 }}
              whileTap={isMobile ? { scale: 0.97 } : undefined}
              className="glass-4 hover:glass-5 group rounded-lg p-5 text-center transition-all duration-300 md:rounded-xl md:p-6"
            >
              <div className="glass-3 text-brand mx-auto mb-3 flex size-12 items-center justify-center rounded-lg transition-transform group-hover:scale-110 md:mb-4 md:size-14 md:rounded-xl">
                {feature.icon}
              </div>
              <h4 className="mb-2 text-base font-semibold md:text-lg">
                {feature.title}
              </h4>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
