"use client";

import { type VariantProps } from "class-variance-authority";
import { ArrowRightIcon, Code2, MessageCircle } from "lucide-react";
import { ReactNode } from "react";

import { useI18n } from "@/components/contexts/language-context";
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
  title,
  description,
  mockup,
  badge,
  buttons,
  className,
}: HeroProps) {
  const { t } = useI18n();
  const copy = t.hero;

  const defaultBadge = (
    <Badge variant="outline" className="animate-appear">
      <span className="text-muted-foreground">{copy.badge.label}</span>
      <span className="flex items-center gap-1">
        {copy.badge.cta}
        <ArrowRightIcon className="size-3" />
      </span>
    </Badge>
  );

  const defaultButtons: HeroButtonProps[] = [
    {
      text: copy.buttons.primary.text,
      variant: "default",
      href: copy.buttons.primary.href,
      target: "_blank",
      iconRight: <MessageCircle className="ml-2 size-5" />,
    },
    {
      text: copy.buttons.secondary.text,
      variant: "outline",
      href: copy.buttons.secondary.href,
      iconRight: <Code2 className="ml-2 size-5" />,
    },
  ];

  const resolvedBadge = badge === undefined ? defaultBadge : badge;
  const resolvedButtons = buttons === undefined ? defaultButtons : buttons;

  const resolvedMockup =
    mockup === false
      ? false
      : mockup || (
          <Screenshot
            srcLight="/dashboard-light.png"
            srcDark="/dashboard-dark.png"
            alt={copy.mockupAlt}
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
          {resolvedBadge !== false && resolvedBadge}

          <h1 className="animate-appear from-foreground to-foreground dark:to-muted-foreground relative z-10 inline-block bg-linear-to-r bg-clip-text text-4xl leading-tight font-semibold text-balance text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight">
            {title || copy.title}
          </h1>

          <p className="text-md animate-appear text-muted-foreground relative z-10 max-w-[740px] font-medium text-balance opacity-0 delay-100 sm:text-xl">
            {description || copy.description}
          </p>

          {resolvedButtons !== false && resolvedButtons.length > 0 && (
            <div className="animate-appear relative z-10 flex flex-col justify-center gap-4 opacity-0 delay-300 sm:flex-row">
              {resolvedButtons.map((button, index) => (
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
