import { type VariantProps } from "class-variance-authority";
import { Menu } from "lucide-react";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import LaunchUI from "../../logos/launch-ui";
import { Button, buttonVariants } from "../../ui/button";
import {
  NavbarCenter,
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import Navigation from "../../ui/navigation";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";

interface NavbarLink {
  text: string;
  href?: string;
}

interface NavbarActionProps {
  text: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
  isButton?: boolean;
  href?: string;
}

interface NavbarProps {
  logo?: ReactNode;
  name?: string;
  mobileLinks?: NavbarLink[];
  actions?: NavbarActionProps[];
  showNavigation?: boolean;
  customNavigation?: ReactNode;
  className?: string;
}

export default function Navbar({
  logo = <LaunchUI />,
  name = "Altai Ai",
  mobileLinks = [
    { text: "Услуги", href: "#services" },
    { text: "Кейсы", href: "#cases" },
    { text: "Процесс", href: "#process" },
    { text: "Отзывы", href: "#reviews" },
    { text: "Контакты", href: "#contact" },
  ],
  actions = [
    {
      text: "Получить консультацию",
      isButton: true,
      variant: "default",
      href: "#contact",
    },
  ],
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  return (
    <header className={cn("sticky top-0 z-50 -mb-4 px-4 pb-4", className)}>
      <div className="fade-bottom bg-background/15 absolute left-0 h-24 w-full backdrop-blur-lg"></div>
      <div className="max-w-container relative mx-auto">
        <NavbarComponent>
          <NavbarLeft>
            <a
              href="/"
              className="flex items-center gap-2 text-xl font-bold transition-opacity hover:opacity-80"
              aria-label="Altai AI"
            >
              {logo}
              {name}
            </a>
          </NavbarLeft>

          <NavbarCenter>
            {showNavigation && (customNavigation || <Navigation />)}
          </NavbarCenter>

          <NavbarRight>
            {actions.map((action, index) =>
              action.isButton ? (
                <Button
                  key={index}
                  variant={action.variant || "default"}
                  className="hidden md:flex"
                  asChild={Boolean(action.href)}
                >
                  {action.href ? (
                    <a href={action.href}>
                      {action.icon}
                      {action.text}
                      {action.iconRight}
                    </a>
                  ) : (
                    <>
                      {action.icon}
                      {action.text}
                      {action.iconRight}
                    </>
                  )}
                </Button>
              ) : (
                <a
                  key={index}
                  href={action.href}
                  className="hidden text-sm md:block hover:text-foreground text-muted-foreground transition-colors"
                >
                  {action.text}
                </a>
              ),
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Открыть меню</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium">
                  <a
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold"
                    aria-label="Altai AI"
                  >
                    {logo}
                    <span>{name}</span>
                  </a>
                  {mobileLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.text}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
