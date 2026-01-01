"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  Code2,
  ExternalLink,
  Monitor,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef } from "react";

interface CaseStudyProps {
  title?: string;
  description?: string;
  client?: string;
  services?: string[];
  appLink?: string;
  websiteLink?: string;
  appScreenshots?: string[];
  crmScreenshot?: string;
}

export default function CaseStudy({
  title = "Zeep Coffee",
  description = "Мы разработали полноценное мобильное приложение для кофейни нового поколения и CRM-систему для управления заказами, аналитики и автоматизации бизнес-процессов.",
  client = "Zeep",
  services = [
    "Разработка мобильных приложений",
    "CRM система",
    "Backend API",
    "UI/UX дизайн",
  ],
  appLink = "https://apps.apple.com/kz/app/zeep/id6751442149",
  websiteLink = "http://zeep.kz",
  appScreenshots = ["/zeep-1.png", "/zeep-2.png", "/zeep-3.png"],
  crmScreenshot = "/zeep-crm.png",
}: CaseStudyProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  ]);

  const iphoneRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const floatingRef1 = useRef<HTMLDivElement>(null);
  const floatingRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // iPhone float animation (упрощено на мобильных)
      gsap.to(iphoneRef.current, {
        y: isMobile ? -10 : -20,
        duration: 2.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Desktop float animation (упрощено на мобильных)
      gsap.to(desktopRef.current, {
        y: isMobile ? -8 : -15,
        duration: 3,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Floating elements (отключено на мобильных)
      if (!isMobile) {
        gsap.to(floatingRef1.current, {
          y: -30,
          x: 20,
          rotation: 360,
          duration: 6,
          ease: "none",
          repeat: -1,
        });

        gsap.to(floatingRef2.current, {
          y: 30,
          x: -20,
          rotation: -360,
          duration: 8,
          ease: "none",
          repeat: -1,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cases"
      className="relative overflow-hidden px-4 py-16 sm:py-20 md:py-24"
    >
      {/* Background */}
      <div className="from-background via-muted/10 to-background pointer-events-none absolute inset-0 bg-gradient-to-b" />

      {/* Floating decoration elements (скрыты на мобильных) */}
      <div
        ref={floatingRef1}
        className="bg-brand/5 absolute top-20 right-20 hidden size-32 rounded-full blur-3xl md:block"
      />
      <div
        ref={floatingRef2}
        className="bg-brand-foreground/5 absolute bottom-20 left-20 hidden size-40 rounded-full blur-3xl md:block"
      />

      <div className="max-w-container relative z-10 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 space-y-4 text-center sm:mb-12 sm:space-y-5 md:mb-16 md:space-y-6"
        >
          <div className="inline-block">
            <span className="glass-4 text-brand rounded-full px-3 py-1.5 text-xs font-medium sm:px-4 sm:py-2 sm:text-sm">
              Кейс
            </span>
          </div>

          <h2 className="mx-auto max-w-4xl px-4 text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="from-foreground to-foreground dark:to-brand bg-linear-to-r bg-clip-text text-transparent drop-shadow-[2px_1px_24px_var(--brand-foreground)]">
              {title}
            </span>
          </h2>

          <p className="text-muted-foreground mx-auto max-w-3xl px-4 text-base leading-relaxed sm:text-lg md:text-xl">
            {description}
          </p>

          {/* Services Tags */}
          <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-2 px-4">
            {services.map((service, index) => (
              <motion.span
                key={service}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="glass-3 text-muted-foreground rounded-full px-3 py-1 text-xs font-medium sm:text-sm"
              >
                {service}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Main Content - Devices Showcase */}
        <div className="mx-auto mb-12 grid max-w-6xl grid-cols-1 items-center gap-8 sm:gap-10 md:mb-16 lg:grid-cols-2 lg:gap-16">
          {/* iPhone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div
              ref={iphoneRef}
              className="relative mx-auto max-w-[280px] sm:max-w-[300px]"
            >
              {/* iPhone Frame */}
              <div className="relative rounded-[2.5rem] bg-black p-1.5 shadow-2xl sm:rounded-[3rem] sm:p-2">
                {/* Dynamic Island */}
                <div className="absolute top-5 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black sm:top-6 sm:h-7 sm:w-28" />

                {/* Screen */}
                <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2rem] bg-white sm:rounded-[2.5rem]">
                  {/* Screenshot Carousel */}
                  <div className="h-full overflow-hidden" ref={emblaRef}>
                    <div className="flex h-full">
                      {appScreenshots.map((screenshot, index) => (
                        <div
                          key={index}
                          className="h-full min-w-0 flex-[0_0_100%]"
                        >
                          <img
                            src={screenshot}
                            alt={`Скрин Zeep ${index + 1}`}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='650'%3E%3Crect fill='%23f0f0f0' width='300' height='650'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='20' font-family='Arial'%3EСкриншот %23" +
                                (index + 1) +
                                "%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Phone buttons */}
                <div className="absolute top-20 -right-[3px] h-10 w-1 rounded-l-lg bg-black sm:top-24 sm:h-12" />
                <div className="absolute top-32 -right-[3px] h-12 w-1 rounded-l-lg bg-black sm:top-40 sm:h-16" />
                <div className="absolute top-24 -left-[3px] h-7 w-1 rounded-r-lg bg-black sm:top-28 sm:h-8" />
              </div>

              {/* Glow effect */}
              <div className="from-brand/30 to-brand-foreground/20 absolute inset-0 -z-10 bg-gradient-to-t via-transparent blur-3xl" />

              {/* Floating icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-4 text-brand absolute -top-6 -right-6 flex size-12 items-center justify-center rounded-xl sm:-top-8 sm:-right-8 sm:size-16 sm:rounded-2xl"
              >
                <Smartphone className="size-6 sm:size-8" />
              </motion.div>
            </div>

            {/* App Store Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 text-center sm:mt-8"
            >
              <a
                href={appLink}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-4 hover:glass-5 group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium transition-all duration-300 sm:px-6 sm:py-3 sm:text-sm"
              >
                <span>Скачать в App Store</span>
                <ExternalLink className="text-brand size-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 sm:size-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* Desktop CRM Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div ref={desktopRef} className="relative">
              {/* Browser Window */}
              <div className="glass-4 overflow-hidden rounded-xl shadow-2xl sm:rounded-2xl">
                {/* Browser Header */}
                <div className="bg-muted/50 border-border/50 flex items-center gap-1.5 border-b px-3 py-2 sm:gap-2 sm:px-4 sm:py-3">
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="size-2.5 rounded-full bg-red-500/50 sm:size-3" />
                    <div className="size-2.5 rounded-full bg-yellow-500/50 sm:size-3" />
                    <div className="size-2.5 rounded-full bg-green-500/50 sm:size-3" />
                  </div>
                  <div className="glass-3 ml-1.5 flex-1 rounded-lg px-2 py-1 sm:ml-2 sm:px-3">
                    <span className="text-muted-foreground text-[9px] sm:text-[10px]">
                      {websiteLink}
                    </span>
                  </div>
                </div>

                {/* CRM Screenshot */}
                <div className="bg-background relative aspect-video">
                  <img
                    src={crmScreenshot}
                    alt="CRM-система Zeep"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'%3E%3Crect fill='%23f0f0f0' width='1200' height='675'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='24' font-family='Arial'%3ECRM%20Скриншот%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>

              {/* Glow effect */}
              <div className="from-brand-foreground/30 to-brand/20 absolute inset-0 -z-10 bg-gradient-to-t via-transparent blur-3xl" />

              {/* Floating icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-4 text-brand absolute -top-6 -left-6 flex size-12 items-center justify-center rounded-xl sm:-top-8 sm:-left-8 sm:size-16 sm:rounded-2xl"
              >
                <Monitor className="size-6 sm:size-8" />
              </motion.div>
            </div>

            {/* Website Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 text-center sm:mt-8"
            >
              <a
                href={websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-4 hover:glass-5 group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium transition-all duration-300 sm:px-6 sm:py-3 sm:text-sm"
              >
                <span>Открыть сайт</span>
                <ExternalLink className="text-brand size-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 sm:size-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6"
        >
          {[
            {
              icon: <Code2 className="size-5 sm:size-6" />,
              title: "Full-Stack разработка",
              description: "Приложение на React Native + backend на Node.js",
            },
            {
              icon: <Zap className="size-5 sm:size-6" />,
              title: "Онлайн-обновления",
              description: "WebSocket для мгновенных заказов",
            },
            {
              icon: <Users className="size-5 sm:size-6" />,
              title: "CRM система",
              description: "Полная аналитика и управление",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-4 hover:glass-5 group rounded-xl p-5 transition-all duration-300 sm:p-6"
            >
              <div className="glass-3 text-brand mb-3 inline-flex size-10 items-center justify-center rounded-lg transition-transform group-hover:scale-110 sm:mb-4 sm:size-12">
                {feature.icon}
              </div>
              <h3 className="mb-1.5 text-base font-semibold sm:mb-2 sm:text-lg">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
