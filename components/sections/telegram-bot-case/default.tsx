"use client";

import { motion } from "framer-motion";
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
import { useEffect, useRef } from "react";

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // iPhone float animation
      gsap.to(iphoneRef.current, {
        y: -20,
        rotation: -2,
        duration: 3,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Floating elements
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="telegram" className="relative overflow-hidden px-4 py-24">
      {/* Background */}
      <div className="from-background via-muted/10 to-background pointer-events-none absolute inset-0 bg-gradient-to-b" />

      {/* Floating decoration elements */}
      <div
        ref={floatingRef1}
        className="bg-brand/10 absolute top-20 right-20 size-40 rounded-full blur-3xl"
      />
      <div
        ref={floatingRef2}
        className="bg-brand-foreground/5 absolute bottom-20 left-20 size-48 rounded-full blur-3xl"
      />
      <div
        ref={floatingRef3}
        className="bg-brand/5 absolute top-1/2 left-1/2 size-32 rounded-full blur-2xl"
      />

      <div className="max-w-container relative z-10 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 space-y-6 text-center"
        >
          <div className="inline-block">
            <span className="glass-4 text-brand rounded-full px-4 py-2 text-sm font-medium">
              Наши решения
            </span>
          </div>

          <h2 className="mx-auto max-w-4xl text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
            <span className="from-foreground to-foreground dark:to-brand bg-linear-to-r bg-clip-text text-transparent drop-shadow-[2px_1px_24px_var(--brand-foreground)]">
              {title}
            </span>
          </h2>

          <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">
            {description}
          </p>
        </motion.div>

        {/* Main Content - iPhone + Capabilities */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* iPhone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div ref={iphoneRef} className="relative mx-auto max-w-[320px]">
              {/* iPhone Frame */}
              <div className="relative rounded-[3rem] bg-gradient-to-br from-gray-800 to-black p-3 shadow-2xl">
                {/* Dynamic Island */}
                <div className="absolute top-6 left-1/2 z-10 h-7 w-32 -translate-x-1/2 rounded-full bg-black" />

                {/* Screen */}
                <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.5rem] bg-white">
                  {/* Single Screenshot */}
                  <img
                    src={screenshot}
                    alt="Интерфейс Telegram-бота"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='650'%3E%3Crect fill='%23f0f0f0' width='300' height='650'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='16' font-family='Arial'%3EИнтерфейс%20Telegram-бота%3C/text%3E%3C/svg%3E";
                    }}
                  />

                  {/* Brand Gradient Overlay */}
                  <div className="from-brand/5 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                </div>

                {/* Phone buttons */}
                <div className="absolute top-24 -right-[3px] h-12 w-1.5 rounded-l-lg bg-gray-700" />
                <div className="absolute top-40 -right-[3px] h-16 w-1.5 rounded-l-lg bg-gray-700" />
                <div className="absolute top-32 -left-[3px] h-10 w-1.5 rounded-r-lg bg-gray-700" />
              </div>

              {/* Glow effect */}
              <div className="from-brand/30 to-brand-foreground/20 absolute inset-0 -z-10 bg-gradient-to-t via-transparent blur-3xl" />

              {/* Floating Bot icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: "backOut" }}
                className="glass-4 text-brand absolute -top-8 -right-8 flex size-20 items-center justify-center rounded-2xl"
              >
                <Bot className="size-10" />
              </motion.div>

              {/* Floating MessageSquare icon */}
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: "backOut" }}
                className="glass-4 text-brand absolute -bottom-8 -left-8 flex size-16 items-center justify-center rounded-2xl"
              >
                <MessageSquare className="size-8" />
              </motion.div>
            </div>
          </motion.div>

          {/* Capabilities List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 space-y-6 lg:order-2"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold md:text-3xl">
                Что мы можем сделать
              </h3>
              <p className="text-muted-foreground text-lg">
                Полный спектр решений для Telegram
              </p>
            </div>

            {/* Capability Cards */}
            <div className="space-y-4">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={capability}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-4 hover:glass-5 group flex items-start gap-4 rounded-xl p-5 transition-all duration-300"
                >
                  <div className="glass-3 text-brand flex size-10 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110">
                    <CheckCircle className="size-5" />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="leading-relaxed font-medium">{capability}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-4"
            >
              <button className="glass-4 hover:glass-5 group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-medium transition-all duration-300">
                <span className="from-foreground to-foreground dark:to-brand bg-linear-to-r bg-clip-text text-transparent">
                  Обсудить проект
                </span>
                <ArrowUpRight className="text-brand size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3"
        >
          {[
            {
              icon: <Zap className="size-6" />,
              title: "Быстрая разработка",
              description: "От идеи до запуска за 2-4 недели",
            },
            {
              icon: <Shield className="size-6" />,
              title: "Надёжность",
              description: "99.9% аптайм и защита данных",
            },
            {
              icon: <Clock className="size-6" />,
              title: "Поддержка 24/7",
              description: "Всегда на связи для вас",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-4 hover:glass-5 group rounded-xl p-6 text-center transition-all duration-300"
            >
              <div className="glass-3 text-brand mx-auto mb-4 flex size-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                {feature.icon}
              </div>
              <h4 className="mb-2 text-lg font-semibold">{feature.title}</h4>
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
