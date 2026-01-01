import { type VariantProps } from "class-variance-authority";
import { ArrowRightIcon, Code2, MessageCircle } from "lucide-react";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "../../ui/badge";
import { Button, buttonVariants } from "../../ui/button";
import Glow from "../../ui/glow";
import { Mockup, MockupFrame } from "../../ui/mockup";
import Screenshot from "../../ui/screenshot";
import { Section } from "../../ui/section";

interface HeroButtonProps {
  text: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
  href?: string;
  target?: string;
}

interface HeroProps {
  title?: string;
  description?: string;
  mockup?: ReactNode | false;
  badge?: ReactNode | false;
  buttons?: HeroButtonProps[] | false;
  className?: string;
}

export default function Hero({
  title = "Создадим цифровое решение для вашего бизнеса",
  description = "Разрабатываем веб-приложения, мобильные приложения, Telegram боты и AI решения. Современный код, быстрая разработка, результат за 2-4 недели.",
  mockup,
  badge = (
    <Badge variant="outline" className="animate-appear">
      <span className="text-muted-foreground">
        ✨ Altai AI — разработка под ключ
      </span>
      <span className="flex items-center gap-1">
        Начать проект
        <ArrowRightIcon className="size-3" />
      </span>
    </Badge>
  ),
  buttons = [
    {
      text: "Связаться в WhatsApp",
      variant: "default",
      href: "https://wa.me/77757200604",
      target: "_blank",
      iconRight: <MessageCircle className="ml-2 size-5" />,
    },
    {
      text: "Посмотреть кейсы",
      variant: "outline",
      href: "#cases",
      iconRight: <Code2 className="ml-2 size-5" />,
    },
  ],
  className,
}: HeroProps) {
  const resolvedMockup =
    mockup === false
      ? false
      : mockup || (
          <Screenshot
            srcLight="/dashboard-light.png"
            srcDark="/dashboard-dark.png"
            alt="Altai AI - современное веб-приложение"
            width={1248}
            height={765}
            className="w-full"
          />
        );

  return (
    <Section
      id="hero"
      className={cn(
        "fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0",
        className,
      )}
    >
      <div className="max-w-container mx-auto flex flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          {badge !== false && badge}

          <h1 className="animate-appear from-foreground to-foreground dark:to-muted-foreground relative z-10 inline-block bg-linear-to-r bg-clip-text text-4xl leading-tight font-semibold text-balance text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight">
            {title}
          </h1>

          <p className="text-md animate-appear text-muted-foreground relative z-10 max-w-[740px] font-medium text-balance opacity-0 delay-100 sm:text-xl">
            {description}
          </p>

          {buttons !== false && buttons.length > 0 && (
            <div className="animate-appear relative z-10 flex flex-col justify-center gap-4 opacity-0 delay-300 sm:flex-row">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant || "default"}
                  size="lg"
                  className="w-full sm:w-auto"
                  asChild={Boolean(button.href)}
                >
                  {button.href ? (
                    <a
                      href={button.href}
                      target={button.target}
                      rel={
                        button.target === "_blank"
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {button.icon}
                      {button.text}
                      {button.iconRight}
                    </a>
                  ) : (
                    <>
                      {button.icon}
                      {button.text}
                      {button.iconRight}
                    </>
                  )}
                </Button>
              ))}
            </div>
          )}

          {resolvedMockup !== false && (
            <div className="relative w-full pt-12">
              <MockupFrame
                className="animate-appear opacity-0 delay-700"
                size="small"
              >
                <Mockup
                  type="responsive"
                  className="bg-background/90 w-full rounded-xl border-0"
                >
                  {resolvedMockup}
                </Mockup>
              </MockupFrame>
              <Glow
                variant="top"
                className="animate-appear-zoom opacity-0 delay-1000"
              />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
