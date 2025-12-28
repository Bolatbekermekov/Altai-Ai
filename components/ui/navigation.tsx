"use client";

import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import LaunchUI from "../logos/launch-ui";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu";

interface ComponentItem {
  title: string;
  description: string;
}

interface MenuItem {
  title: string;
  href?: string;
  content?: ReactNode;
}

interface NavigationProps {
  menuItems?: MenuItem[];
  components?: ComponentItem[];
  logo?: ReactNode;
  logoTitle?: string;
  logoDescription?: string;
  introItems?: {
    title: string;
    description: string;
  }[];
}

export default function Navigation({
  menuItems = [
    {
      title: "Услуги",
      href: "#services",
    },
    {
      title: "Кейсы",
      href: "#cases",
    },
    {
      title: "Процесс",
      href: "#process",
    },
    {
      title: "Отзывы",
      href: "#reviews",
    },
  ],
  components = [
    {
      title: "Alert Dialog",
      description:
        "Модальное окно с важным сообщением, требующее ответа пользователя.",
    },
    {
      title: "Hover Card",
      description:
        "Превью контента по наведению на ссылку или элемент.",
    },
    {
      title: "Progress",
      description:
        "Индикатор выполнения задачи, чаще всего в виде прогресс-бара.",
    },
    {
      title: "Scroll-area",
      description: "Область со скроллом для длинного контента.",
    },
    {
      title: "Tabs",
      description:
        "Набор вкладок, показывающих разные панели контента по очереди.",
    },
    {
      title: "Tooltip",
      description:
        "Подсказка, появляющаяся при фокусе клавиатурой или наведении мыши.",
    },
  ],
  logo = <LaunchUI />,
  logoTitle = "Altai Ai",
  logoDescription = "Шаблон лендинга на React, Shadcn/ui и Tailwind, который можно быстро адаптировать под проект.",
  introItems = [
    {
      title: "FAQ",
      description: "Ответы на частые вопросы и условия работы.",
    },
  ],
}: NavigationProps) {
  return (
    <NavigationMenu className="hidden md:flex" delayDuration={0}>
      <NavigationMenuList>
        {menuItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.content ? (
              <>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {item.content === "default" ? (
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <div className="from-muted/30 to-muted/10 flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md">
                          {logo}
                          <div className="mt-4 mb-2 text-lg font-medium">
                            {logoTitle}
                          </div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            {logoDescription}
                          </p>
                        </div>
                      </li>
                      {introItems.map((intro, i) => (
                        <ListItem key={i} title={intro.title}>
                          {intro.description}
                        </ListItem>
                      ))}
                    </ul>
                  ) : item.content === "components" ? (
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {components.map((component) => (
                        <ListItem key={component.title} title={component.title}>
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  ) : (
                    item.content
                  )}
                </NavigationMenuContent>
              </>
            ) : (
              <a href={item.href} className={navigationMenuTriggerStyle()}>
                {item.title}
              </a>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  className,
  title,
  children,
}: {
  className?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <li>
      <div
        data-slot="list-item"
        className={cn(
          "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none",
          className,
        )}
      >
        <div className="text-sm leading-none font-medium">{title}</div>
        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
          {children}
        </p>
      </div>
    </li>
  );
}
