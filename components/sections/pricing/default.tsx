import { User, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

import { PricingColumn, PricingColumnProps } from "../../ui/pricing-column";
import { Section } from "../../ui/section";

interface PricingProps {
  title?: string | false;
  description?: string | false;
  plans?: PricingColumnProps[] | false;
  className?: string;
}

export default function Pricing({
  title = "Создадим ваш лендинг уже сегодня.",
  description = "Пожизненный доступ ко всем компонентам. Без подписок — только прозрачная фиксированная цена.",
  plans = [
    {
      name: "Бесплатно",
      description: "Для старта и проверки идей",
      price: 0,
      priceNote: "Бесплатно и с открытым исходником навсегда.",
      cta: {
        variant: "glow",
        label: "Получить консультацию бесплатно",
      },
      features: [
        "1 шаблон сайта",
        "9 блоков и секций",
        "4 кастомные анимации",
      ],
      variant: "default",
      className: "hidden lg:flex",
    },
    {
      name: "Pro",
      icon: <User className="size-4" />,
      description: "Для фаундеров, соло-разработчиков и небольших команд",
      price: 149,
      priceNote: "Пожизненный доступ. Бесплатные обновления. Без подписки.",
      cta: {
        variant: "default",
        label: "Получить полный доступ",
      },
      features: [
        `${siteConfig.stats.templates} шаблонов`,
        `${siteConfig.stats.sections} блоков и секций`,
        `${siteConfig.stats.illustrations} иллюстраций`,
        `${siteConfig.stats.animations} кастомных анимаций`,
      ],
      variant: "glow-brand",
    },
    {
      name: "Pro для команды",
      icon: <Users className="size-4" />,
      description: "Для студий и команд, которые делают проекты вместе",
      price: 749,
      priceNote: "Пожизненный доступ. Бесплатные обновления. Без подписки.",
      cta: {
        variant: "default",
        label: "Доступ для всей команды",
      },
      features: [
        "Все шаблоны, компоненты и секции для всей команды",
      ],
      variant: "glow",
    },
  ],
  className = "",
}: PricingProps) {
  return (
    <Section id="pricing" className={cn(className)}>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        {(title || description) && (
          <div className="flex flex-col items-center gap-4 px-4 text-center sm:gap-8">
            {title && (
              <h2 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-md text-muted-foreground max-w-[600px] font-medium sm:text-xl">
                {description}
              </p>
            )}
          </div>
        )}
        {plans !== false && plans.length > 0 && (
          <div className="max-w-container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <PricingColumn
                key={plan.name}
                name={plan.name}
                icon={plan.icon}
                description={plan.description}
                price={plan.price}
                priceNote={plan.priceNote}
                cta={plan.cta}
                features={plan.features}
                variant={plan.variant}
                className={plan.className}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
