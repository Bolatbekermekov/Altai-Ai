"use client";

import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import {
  ArrowRight,
  Bot,
  Check,
  Code,
  CreditCard,
  Laptop,
  Layout,
  MessageSquare,
  Rocket,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features?: string[];
  demo: React.ReactNode;
}

// E-commerce Demo Component with GSAP
const EcommerceDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Product card slide in
      gsap.from(cartRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Price pulse
      gsap.to(priceRef.current, {
        scale: 1.1,
        duration: 0.6,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Checkout button hover effect
      gsap.to(checkoutRef.current, {
        x: 5,
        duration: 1,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="from-background/50 to-muted/30 border-border/50 relative h-48 w-full overflow-hidden rounded-lg border bg-gradient-to-br p-4"
    >
      <div className="space-y-3">
        {/* Product Card */}
        <div
          ref={cartRef}
          className="glass-3 flex items-center gap-3 rounded-lg p-3"
        >
          <div className="bg-brand/20 flex size-12 items-center justify-center rounded">
            <ShoppingCart className="text-brand size-6" />
          </div>
          <div className="flex-1">
            <div className="bg-foreground/20 mb-1.5 h-2 w-24 rounded" />
            <div className="bg-foreground/10 h-2 w-16 rounded" />
          </div>
          <div ref={priceRef} className="text-brand text-sm font-bold">
            $99
          </div>
        </div>

        {/* Cart Button */}
        <div className="glass-4 flex items-center justify-between rounded-lg p-3">
          <div className="flex items-center gap-2">
            <CreditCard className="text-brand size-5" />
            <span className="text-sm font-medium">Оформить заказ</span>
          </div>
          <div ref={checkoutRef}>
            <ArrowRight className="text-muted-foreground size-4" />
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="bg-brand/10 absolute -top-2 -right-2 size-16 rounded-full blur-xl"
      />
    </div>
  );
};

// Mobile Apps Demo Component with GSAP
const MobileDemo = () => {
  const phoneRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!phoneRef.current) return;

    const ctx = gsap.context(() => {
      // Phone float animation
      gsap.to(phoneRef.current, {
        y: -10,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Screen content fade in
      gsap.from(screenRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.3,
      });

      // Loading bars animation
      barsRef.current.forEach((bar, i) => {
        if (bar) {
          gsap.fromTo(
            bar,
            { scaleX: 0.3 },
            {
              scaleX: 1,
              yoyo: true, // это создаст эффект 0.3 → 1 → 0.3
              repeat: -1,
              duration: 1.5,
              ease: "power1.inOut",
              delay: i * 0.2,
            },
          );
        }
      });
    }, phoneRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative flex h-48 w-full items-center justify-center">
      {/* Phone mockup */}
      <div
        ref={phoneRef}
        className="border-foreground/20 from-background to-muted/50 relative h-44 w-32 rounded-2xl border-4 bg-gradient-to-b p-2 shadow-xl"
      >
        {/* Notch */}
        <div className="bg-foreground/20 absolute top-0 left-1/2 h-4 w-16 -translate-x-1/2 rounded-b-xl" />

        {/* Screen content */}
        <div ref={screenRef} className="mt-4 space-y-2">
          <div className="bg-brand/20 flex h-8 items-center justify-center rounded">
            <Laptop className="text-brand size-4" />
          </div>
          <div className="space-y-1.5">
            <div
              ref={(el) => {
                barsRef.current[0] = el;
              }}
              className="bg-foreground/10 h-1.5 w-full origin-left rounded"
            />
            <div
              ref={(el) => {
                barsRef.current[1] = el;
              }}
              className="bg-foreground/10 h-1.5 w-3/4 origin-left rounded"
            />
            <div
              ref={(el) => {
                barsRef.current[2] = el;
              }}
              className="bg-foreground/10 h-1.5 w-1/2 origin-left rounded"
            />
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="bg-foreground/30 absolute bottom-1 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full" />
      </div>

      {/* Glow */}
      <div className="from-brand/20 absolute inset-0 bg-gradient-to-t via-transparent to-transparent blur-2xl" />
    </div>
  );
};

// CRM Demo Component with GSAP
const CRMDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const chartBarsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Stats cards bounce in
      statsRef.current.forEach((stat, i) => {
        if (stat) {
          gsap.from(stat, {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: i * 0.2,
          });
        }
      });

      // Chart bars animate
      chartBarsRef.current.forEach((bar, i) => {
        if (bar) {
          gsap.fromTo(
            bar,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 0.8,
              ease: "elastic.out(1, 0.5)",
              delay: i * 0.1,
            },
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="from-background/50 to-muted/30 border-border/50 relative h-48 w-full overflow-hidden rounded-lg border bg-gradient-to-br p-4"
    >
      <div className="space-y-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="text-brand size-5" />
            <span className="text-sm font-medium">Панель</span>
          </div>
          <TrendingUp className="size-4 text-green-500" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div
            ref={(el) => {
              statsRef.current[0] = el;
            }}
            className="glass-3 rounded p-2"
          >
            <div className="text-muted-foreground text-xs">Пользователи</div>
            <div className="text-brand text-lg font-bold">1,2K</div>
          </div>
          <div
            ref={(el) => {
              statsRef.current[1] = el;
            }}
            className="glass-3 rounded p-2"
          >
            <div className="text-muted-foreground text-xs">Выручка</div>
            <div className="text-brand text-lg font-bold">$45K</div>
          </div>
        </div>

        {/* Chart simulation */}
        <div className="flex h-16 items-end gap-1">
          {[40, 70, 45, 80, 60, 90, 75].map((height, i) => (
            <div
              key={i}
              ref={(el) => {
                chartBarsRef.current[i] = el;
              }}
              className="bg-brand/30 flex-1 origin-bottom rounded-t"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Chatbot Demo Component with GSAP
const ChatbotDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const userMsgRef = useRef<HTMLDivElement>(null);
  const botMsgRef = useRef<HTMLDivElement>(null);
  const meetCardRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // User message slides in from right
      gsap.from(userMsgRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      // Bot message slides in from left with delay
      gsap.from(botMsgRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.5,
      });

      // Meet card pops in
      gsap.from(meetCardRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "back.out(2)",
        delay: 1,
      });

      // Typing dots animation
      dotsRef.current.forEach((dot, i) => {
        if (dot) {
          gsap.to(dot, {
            y: -3,
            duration: 0.4,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.15,
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="from-background/80 to-muted/50 border-border/50 relative h-48 w-full overflow-hidden rounded-lg border bg-gradient-to-br p-3"
    >
      <div className="space-y-2">
        {/* Header */}
        <div className="border-border/30 flex items-center gap-2 border-b pb-2">
          <div className="bg-brand/20 flex size-6 items-center justify-center rounded-full">
            <Bot className="text-brand size-4" />
          </div>
          <span className="text-xs font-medium">AI-ассистент</span>
          <div className="ml-auto size-2 rounded-full bg-green-500" />
        </div>

        {/* Messages */}
        <div className="space-y-2">
          {/* User message */}
          <div className="flex justify-end">
            <div
              ref={userMsgRef}
              className="glass-3 max-w-[70%] rounded-lg rounded-tr-none px-3 py-1.5"
            >
              <p className="text-xs">Запланируй встречу с Джоном</p>
            </div>
          </div>

          {/* Bot response */}
          <div className="flex gap-2">
            <div className="bg-brand/10 flex size-6 shrink-0 items-center justify-center rounded-full">
              <Bot className="text-brand size-3" />
            </div>
            <div
              ref={botMsgRef}
              className="glass-4 max-w-[80%] rounded-lg rounded-tl-none px-3 py-1.5"
            >
              <p className="mb-2 text-xs">
                Я запланировал встречу в Google Meet с Джоном на завтра, 15:45.
              </p>
              <div
                ref={meetCardRef}
                className="glass-3 flex items-center gap-2 rounded p-2"
              >
                <MessageSquare className="text-brand size-3" />
                <span className="text-[10px]">Google Meet с Джоном</span>
              </div>
            </div>
          </div>

          {/* Typing indicator */}
          <div className="flex items-center gap-2">
            <div className="bg-brand/10 flex size-6 items-center justify-center rounded-full">
              <Bot className="text-brand size-3" />
            </div>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  ref={(el) => {
                    dotsRef.current[i] = el;
                  }}
                  className="bg-brand/40 size-1.5 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SaaS Demo Component with GSAP
const SaaSDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mrrRef = useRef<HTMLDivElement>(null);
  const trendRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<(HTMLDivElement | null)[]>([]);
  const checkmarksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // MRR card scale in
      gsap.from(mrrRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      });

      // Trend arrow bounce
      gsap.to(trendRef.current, {
        y: -3,
        duration: 0.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Metrics slide in
      metricsRef.current.forEach((metric, i) => {
        if (metric) {
          gsap.from(metric, {
            x: -30,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.3 + i * 0.1,
          });
        }
      });

      // Checkmarks pop in
      checkmarksRef.current.forEach((check, i) => {
        if (check) {
          gsap.from(check, {
            scale: 0,
            rotation: -180,
            duration: 0.5,
            ease: "back.out(2)",
            delay: 0.8 + i * 0.1,
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="from-background/50 to-muted/30 border-border/50 relative h-48 w-full overflow-hidden rounded-lg border bg-gradient-to-br p-4"
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="text-brand size-5" />
            <span className="text-sm font-medium">Метрики SaaS</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-2">
          <div
            ref={mrrRef}
            className="glass-3 flex items-center justify-between rounded-lg p-2.5"
          >
            <div>
              <div className="text-muted-foreground text-xs">MRR</div>
              <div className="text-brand text-lg font-bold">$24.5K</div>
            </div>
            <div
              ref={trendRef}
              className="flex items-center gap-1 text-xs font-medium text-green-500"
            >
              <TrendingUp className="size-3" />
              +12%
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div
              ref={(el) => {
                metricsRef.current[0] = el;
              }}
              className="glass-3 rounded p-2"
            >
              <div className="text-muted-foreground text-[10px]">
                Активные пользователи
              </div>
              <div className="text-sm font-bold">845</div>
            </div>
            <div
              ref={(el) => {
                metricsRef.current[1] = el;
              }}
              className="glass-3 rounded p-2"
            >
              <div className="text-muted-foreground text-[10px]">
                Отток
              </div>
              <div className="text-sm font-bold text-green-500">2.3%</div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-1.5 pt-1">
            {["Автоскейлинг", "Мультиарендность"].map((feature, i) => (
              <div key={feature} className="flex items-center gap-2 text-xs">
                <div
                  ref={(el) => {
                    checkmarksRef.current[i] = el;
                  }}
                >
                  <Check className="text-brand size-3" />
                </div>
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Landing Pages Demo Component with GSAP
const LandingDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sparklesRef = useRef<(SVGSVGElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo(
        heroRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power3.out" },
      );

      // CTA button pulse
      gsap.to(ctaRef.current, {
        scale: 1.05,
        duration: 0.8,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Floating elements
      elementsRef.current.forEach((el, i) => {
        if (el) {
          gsap.to(el, {
            y: -15,
            rotation: i % 2 === 0 ? 5 : -5,
            duration: 2 + i * 0.3,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
          });
        }
      });

      // Sparkle effect
      sparklesRef.current.forEach((sparkle, i) => {
        if (sparkle) {
          gsap.fromTo(
            sparkle,
            { scale: 0, opacity: 1 },
            {
              scale: 1.5,
              opacity: 0,
              duration: 1.5,
              ease: "power2.out",
              repeat: -1,
              delay: i * 0.5,
            },
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="from-background/80 via-muted/50 to-background/80 border-border/50 relative h-48 w-full overflow-hidden rounded-lg border bg-gradient-to-br p-4"
    >
      {/* Browser mockup */}
      <div className="glass-3 flex h-full flex-col overflow-hidden rounded-lg">
        {/* Browser bar */}
        <div className="border-border/30 flex items-center gap-1.5 border-b px-2 py-1.5">
          <div className="flex gap-1">
            <div className="size-2 rounded-full bg-red-500/50" />
            <div className="size-2 rounded-full bg-yellow-500/50" />
            <div className="size-2 rounded-full bg-green-500/50" />
          </div>
          <div className="glass-2 text-muted-foreground flex flex-1 items-center gap-1 rounded px-2 py-0.5 text-[8px]">
            <Layout className="size-2" />
            altai.ai
          </div>
        </div>

        {/* Landing content */}
        <div className="relative flex-1 overflow-hidden p-3">
          {/* Hero section */}
          <div ref={heroRef} className="space-y-2 text-center">
            <div className="relative inline-block">
              <h3 className="from-brand via-brand-foreground to-brand bg-gradient-to-r bg-clip-text text-xs font-bold text-transparent">
                Запускайте быстрее
              </h3>
              {/* Sparkles */}
              {[0, 1, 2].map((i) => (
                <Sparkles
                  key={i}
                  ref={(el) => {
                    sparklesRef.current[i] = el;
                  }}
                  className="text-brand absolute -top-1 -right-3 size-3"
                  style={{ opacity: 0 }}
                />
              ))}
            </div>

            <div className="space-y-1">
              <div className="bg-foreground/10 mx-auto h-1 w-20 rounded" />
              <div className="bg-foreground/5 mx-auto h-1 w-16 rounded" />
            </div>

            {/* CTA Button */}
            <div
              ref={ctaRef}
              className="glass-4 mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5"
            >
              <Rocket className="text-brand size-3" />
              <span className="text-[10px] font-medium">Начать</span>
            </div>
          </div>

          {/* Floating elements */}
          <div
            ref={(el) => {
              elementsRef.current[0] = el;
            }}
            className="glass-3 absolute top-2 right-2 flex size-8 items-center justify-center rounded-lg"
          >
            <Code className="text-brand/50 size-4" />
          </div>

          <div
            ref={(el) => {
              elementsRef.current[1] = el;
            }}
            className="glass-3 absolute bottom-2 left-2 flex size-8 items-center justify-center rounded-lg"
          >
            <Zap className="text-brand/50 size-4" />
          </div>

          <div
            ref={(el) => {
              elementsRef.current[2] = el;
            }}
            className="bg-brand/10 absolute top-1/2 left-2 size-6 rounded-full"
          />

          <div
            ref={(el) => {
              elementsRef.current[3] = el;
            }}
            className="bg-brand-foreground/10 absolute top-1/3 right-3 size-4 rounded-full"
          />
        </div>
      </div>

      {/* Glow effect */}
      <div className="from-brand/10 to-brand-foreground/10 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent blur-2xl" />
    </div>
  );
};

const services: Service[] = [
  {
    id: "ecommerce",
    icon: <ShoppingCart className="size-8" />,
    title: "Интернет-магазины",
    description:
      "Онлайн-магазины и маркетплейсы с полным циклом разработки от MVP до масштабируемой платформы",
    features: ["Платежные системы", "Управление товаром", "Аналитика"],
    demo: <EcommerceDemo />,
  },
  {
    id: "landing",
    icon: <Layout className="size-8" />,
    title: "Лендинги",
    description:
      "Конверсионные лендинги с современным дизайном и оптимизацией под высокую конверсию",
    features: ["Высокая конверсия", "SEO-оптимизация", "Готово к A/B-тестам"],
    demo: <LandingDemo />,
  },
  {
    id: "mobile",
    icon: <Laptop className="size-8" />,
    title: "Мобильные приложения",
    description:
      "Нативные и кросс-платформенные приложения для iOS и Android с современным UX",
    features: ["React Native", "iOS/Android", "Push-уведомления"],
    demo: <MobileDemo />,
  },
  {
    id: "crm",
    icon: <Code className="size-8" />,
    title: "CRM и SaaS",
    description:
      "Корпоративные системы управления, CRM и SaaS продукты под ключ с интеграциями",
    features: ["Кастомные процессы", "Интеграции по API", "Облачная архитектура"],
    demo: <CRMDemo />,
  },
  {
    id: "chatbot",
    icon: <Bot className="size-8" />,
    title: "Разработка чат-ботов",
    description:
      "Интеллектуальные чат-боты с AI для автоматизации поддержки и продаж",
    features: ["NLP/AI", "Мультиканальность", "Поддержка 24/7"],
    demo: <ChatbotDemo />,
  },
  {
    id: "saas",
    icon: <Zap className="size-8" />,
    title: "SaaS-продукты",
    description:
      "Разработка SaaS решений с подписочной моделью, аналитикой и масштабированием",
    features: ["Подписочная модель", "Мультиарендность", "Автоскейлинг"],
    demo: <SaaSDemo />,
  },
];

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden px-4 py-24">
      {/* Background gradient */}
      <div className="from-background via-background/50 to-background pointer-events-none absolute inset-0 bg-gradient-to-b" />

      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] bg-[size:24px_24px]" />

      <div className="max-w-container relative z-10 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 space-y-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <span className="glass-4 text-brand rounded-full px-4 py-2 text-sm font-medium">
              Наши услуги
            </span>
          </motion.div>

          <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            Что мы{" "}
            <span className="from-brand via-brand-foreground to-brand bg-gradient-to-r bg-clip-text text-transparent">
              делаем
            </span>
          </h2>

          <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
            Полный цикл разработки от идеи до запуска и поддержки вашего
            продукта
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group relative"
            >
              <motion.div
                whileHover={{
                  scale: 1.02,
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className={cn(
                  "glass-4 relative h-full overflow-hidden rounded-2xl p-6",
                  "transition-all duration-300",
                  "hover:glass-5 hover:shadow-2xl",
                )}
              >
                {/* Glow effect on hover */}
                <div className="from-brand/20 via-brand-foreground/10 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  {/* Demo UI */}
                  <div className="mb-4">{service.demo}</div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="text-brand"
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { type: "spring", stiffness: 400 },
                      }}
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-foreground text-xl font-bold">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  {service.features && (
                    <ul className="space-y-2 pt-2">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-muted-foreground flex items-center gap-2 text-xs"
                        >
                          <div className="bg-brand size-1.5 rounded-full" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Border gradient on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="from-brand/50 to-brand-foreground/50 absolute inset-0 rounded-2xl bg-gradient-to-br via-transparent blur-xl" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
