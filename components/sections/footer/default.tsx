import { ReactNode } from "react";

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
}

export default function FooterSection({
  logo = <LaunchUI />,
  name = "Altai Ai",
  columns = [
    {
      title: "Продукт",
      links: [{ text: "Изменения" }, { text: "Документация" }],
    },
    {
      title: "Компания",
      links: [{ text: "О нас" }, { text: "Карьера" }, { text: "Блог" }],
    },
    {
      title: "Контакты",
      links: [{ text: "Discord" }, { text: "Twitter" }, { text: "Github" }],
    },
  ],
  copyright = "(c) 2025 Bolatbek Yermekov. Все права защищены",
  policies = [
    { text: "Политика конфиденциальности" },
    { text: "Условия использования" },
  ],
  className,
}: FooterProps) {
  return (
    <footer className={cn("bg-background w-full px-4", className)}>
      <div className="max-w-container mx-auto">
        <Footer>
          <FooterContent>
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                {logo}
                <h3 className="text-xl font-bold">{name}</h3>
              </div>
            </FooterColumn>
            {columns.map((column, index) => (
              <FooterColumn key={index}>
                <h3 className="text-md pt-1 font-semibold">{column.title}</h3>
                {column.links.map((link, linkIndex) => (
                  <span
                    key={linkIndex}
                    className="text-muted-foreground text-sm"
                  >
                    {link.text}
                  </span>
                ))}
              </FooterColumn>
            ))}
          </FooterContent>
          <FooterBottom>
            <div>{copyright}</div>
            <div className="flex items-center gap-4">
              {policies.map((policy, index) => (
                <span key={index}>{policy.text}</span>
              ))}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
