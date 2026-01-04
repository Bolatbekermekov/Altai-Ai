"use client";

import { type VariantProps } from "class-variance-authority";
import { Menu } from "lucide-react";
import { ReactNode } from "react";

import {
  Language,
  useI18n,
} from "@/components/contexts/language-context";
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

interface LocalizedNavbarAction {
  text: string;
  href?: string;
  isButton?: boolean;
}

type NavbarActionInput = NavbarActionProps | LocalizedNavbarAction;

interface NavbarProps {
  logo?: ReactNode;
  name?: string;
  mobileLinks?: NavbarLink[];
  actions?: NavbarActionInput[];
  showNavigation?: boolean;
  customNavigation?: ReactNode;
  className?: string;
}

export default function Navbar({
  logo = <LaunchUI />,
  name = "Altai Ai",
  mobileLinks,
  actions,
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  const { t, language, setLanguage, labels } = useI18n();
  const navCopy = t.navbar;

  const resolvedName = name || navCopy.brand;
  const resolvedMobileLinks = mobileLinks ?? navCopy.menuItems;
  const resolvedActions: NavbarActionProps[] = (actions ?? navCopy.actions).map(
    (action) => ({
      isButton: action.isButton ?? true,
      href: action.href,
      text: action.text,
      variant: (action as NavbarActionProps).variant || "default",
      icon: (action as NavbarActionProps).icon,
      iconRight: (action as NavbarActionProps).iconRight,
    }),
  );
  const resolvedNavigation =
    customNavigation || <Navigation menuItems={navCopy.menuItems} />;

  const languageOptions: Language[] = ["ru", "en"];

  const renderLanguageSwitch = (variant: "desktop" | "mobile" = "desktop") => (
    <div
      className={cn(
        "glass-3 inline-flex items-center gap-1 rounded-full border border-border/60 p-1 text-xs shadow-sm",
        variant === "mobile" && "justify-center md:hidden",
        variant === "desktop" && "hidden md:inline-flex",
      )}
      aria-label={labels[language].switchLabel}
    >
      {languageOptions.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          className={cn(
            "rounded-full px-3 py-1 font-semibold transition-colors",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
            language === code
              ? "bg-foreground text-background shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-pressed={language === code}
          aria-label={`${labels[code].switchLabel}: ${labels[code].label}`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <header className={cn("sticky top-0 z-50 -mb-4 px-4 pb-4", className)}>
      <div className="fade-bottom bg-background/15 absolute left-0 h-24 w-full backdrop-blur-lg"></div>
      <div className="max-w-container relative mx-auto">
        <NavbarComponent>
          <NavbarLeft>
            <a
              href="/"
              className="flex items-center gap-2 text-xl font-bold transition-opacity hover:opacity-80"
              aria-label={navCopy.brand}
            >
              {logo}
              {resolvedName}
            </a>
          </NavbarLeft>

          <NavbarCenter>
            {showNavigation && resolvedNavigation}
          </NavbarCenter>

          <NavbarRight>
            {renderLanguageSwitch("desktop")}
            <div className="mr-1 md:hidden">{renderLanguageSwitch("mobile")}</div>
            {resolvedActions.map((action, index) =>
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
                  <span className="sr-only">{navCopy.openMenu}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium">
                  <a
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold"
                    aria-label={navCopy.brand}
                  >
                    {logo}
                    <span>{resolvedName}</span>
                  </a>
                  {resolvedMobileLinks.map((link, index) => (
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
