"use client";

import { ChevronDown, Minus, Plus } from "lucide-react";
import { ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

import LaunchUI from "../../logos/launch-ui";
import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "../../ui/footer";

interface FooterLink {
  text: string;
  href?: string;
  external?: boolean;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: ReactNode;
  name?: string;
  columns?: FooterColumnProps[];
  copyright?: string;
  policies?: FooterLink[];
  className?: string;
  iconStyle?: "chevron" | "plus-minus"; // Выбор стиля иконки
}

function AccordionColumn({
  column,
  index,
  iconStyle = "chevron",
}: {
  column: FooterColumnProps;
  index: number;
  iconStyle?: "chevron" | "plus-minus";
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-border border-b last:border-b-0 md:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between py-4 text-left transition-colors hover:opacity-80 md:pointer-events-none md:cursor-default md:pb-0"
        aria-expanded={isOpen}
        aria-label={`${isOpen ? "Свернуть" : "Развернуть"} ${column.title}`}
      >
        <span className="text-foreground text-sm font-semibold">
          {column.title}
        </span>
        <span
          className="text-muted-foreground group-hover:text-foreground flex h-10 w-10 items-center justify-center transition-colors md:hidden"
          aria-hidden="true"
        >
          {iconStyle === "chevron" ? (
            <ChevronDown
              className={cn(
                "h-5 w-5 transition-transform duration-300 ease-out",
                isOpen && "rotate-180",
              )}
            />
          ) : isOpen ? (
            <Minus className="h-5 w-5 transition-all duration-200" />
          ) : (
            <Plus className="h-5 w-5 transition-all duration-200" />
          )}
        </span>
      </button>
      <nav
        className={cn(
          "grid overflow-hidden transition-all duration-300 ease-in-out md:grid-rows-[1fr] md:opacity-100",
          isOpen
            ? "grid-rows-[1fr] pb-4 opacity-100"
            : "grid-rows-[0fr] opacity-0 md:opacity-100",
        )}
      >
        <div className="min-h-0">
          <div className="flex flex-col gap-0.5 pt-1 md:pt-3">
            {column.links.map((link, linkIndex) =>
              link.href ? (
                <a
                  key={linkIndex}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="text-muted-foreground hover:text-foreground active:text-foreground inline-block py-2 text-sm transition-colors"
                >
                  {link.text}
                </a>
              ) : (
                <span
                  key={linkIndex}
                  className="text-muted-foreground inline-block py-2 text-sm"
                >
                  {link.text}
                </span>
              ),
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default function FooterSection({
  logo = <LaunchUI />,
  name = "Altai Ai",
  columns = [
    {
      title: "Продукт",
      links: [
        { text: "Услуги", href: "#services" },
        { text: "Кейсы", href: "#cases" },
        { text: "Процесс", href: "#process" },
      ],
    },
    {
      title: "Компания",
      links: [
        { text: "Главная", href: "/" },
        { text: "Telegram-боты", href: "#telegram" },
        { text: "Отзывы", href: "#reviews" },
      ],
    },
    {
      title: "Контакты",
      links: [
        {
          text: "WhatsApp",
          href: "https://wa.me/77757200604",
          external: true,
        },
        {
          text: "Telegram",
          href: "https://t.me/bolatbekermeko_v",
          external: true,
        },
        { text: "Связаться", href: "#contact" },
      ],
    },
  ],
  copyright = "(c) 2025 Bolatbek Yermekov. Все права защищены",
  policies = [
    { text: "Политика конфиденциальности", href: "#" },
    { text: "Условия использования", href: "#" },
  ],
  className,
  iconStyle = "chevron", // По умолчанию chevron
}: FooterProps) {
  return (
    <footer
      className={cn(
        "bg-background w-full px-5 pt-8 pb-6 sm:px-6 md:pt-12 md:pb-8",
        className,
      )}
    >
      <div className="max-w-container mx-auto">
        <Footer className="pt-0">
          <FooterContent className="gap-y-0 md:gap-y-12">
            {/* Брендовый блок */}
            <FooterColumn className="border-border col-span-1 gap-4 border-b pb-6 md:col-span-2 md:border-0 md:pb-0">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">{logo}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold sm:text-xl">{name}</h3>
                  <p className="text-muted-foreground mt-2 max-w-xs text-sm leading-relaxed">
                    Разрабатываем умные продукты: чат-боты, веб‑сервисы и
                    мобильные приложения под ваши бизнес‑задачи.
                  </p>
                </div>
              </div>
            </FooterColumn>

            {/* Аккордеон колонки */}
            {columns.map((column, index) => (
              <AccordionColumn
                key={index}
                column={column}
                index={index}
                iconStyle={iconStyle}
              />
            ))}
          </FooterContent>

          <FooterBottom className="mt-8 gap-4 pt-6 md:mt-10">
            <div className="text-muted-foreground text-xs leading-relaxed">
              {copyright}
            </div>
            <nav className="flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:gap-5">
              {policies.map((policy, index) =>
                policy.href ? (
                  <a
                    key={index}
                    href={policy.href}
                    className="text-muted-foreground hover:text-foreground active:text-foreground inline-block py-1 transition-colors"
                  >
                    {policy.text}
                  </a>
                ) : (
                  <span
                    key={index}
                    className="text-muted-foreground inline-block py-1"
                  >
                    {policy.text}
                  </span>
                ),
              )}
            </nav>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
