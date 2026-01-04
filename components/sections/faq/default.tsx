"use client";

import { Fragment, ReactNode, isValidElement } from "react";

import { useI18n } from "@/components/contexts/language-context";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Section } from "../../ui/section";

type FAQAnswerObject = {
  paragraphs?: string[];
  list?: string[];
};

type FAQAnswer = FAQAnswerObject | ReactNode;

interface FAQItemProps {
  question: string;
  answer: FAQAnswer;
  value?: string;
}

interface FAQProps {
  title?: string;
  items?: FAQItemProps[] | false;
  className?: string;
}

export default function FAQ({ title, items, className }: FAQProps) {
  const { t } = useI18n();
  const copy = t.faq;
  const resolvedTitle = title || copy.title;
  const resolvedItems = items === undefined ? (copy.items as FAQItemProps[]) : items;

  const renderAnswer = (answer: FAQAnswer) => {
    if (answer === null || answer === undefined) return null;
    if (isValidElement(answer)) return answer;
    if (typeof answer === "string" || typeof answer === "number") {
      return (
        <p className="text-muted-foreground mb-2 max-w-full text-sm leading-relaxed md:mb-4 md:max-w-[640px] md:text-base">
          {answer}
        </p>
      );
    }

    // If it's iterable (e.g., array of ReactNodes), just render directly
    if (Symbol.iterator in Object(answer)) {
      return <Fragment>{answer as Iterable<ReactNode>}</Fragment>;
    }

    const answerObj = answer as FAQAnswerObject;

    return (
      <Fragment>
        {answerObj.paragraphs?.map((paragraph, idx) => (
          <p
            key={`p-${idx}`}
            className="text-muted-foreground mb-2 max-w-full text-sm leading-relaxed md:mb-4 md:max-w-[640px] md:text-base"
          >
            {paragraph}
          </p>
        ))}
        {answerObj.list && (
          <ul className="text-muted-foreground mb-2 ml-4 max-w-full list-inside list-disc space-y-1 text-sm leading-relaxed md:mb-4 md:max-w-[580px] md:text-base">
            {answerObj.list.map((item, idx) => (
              <li key={`li-${idx}`}>{item}</li>
            ))}
          </ul>
        )}
      </Fragment>
    );
  };

  return (
    <Section id="faq" className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-6 px-4 md:gap-8">
        <h2 className="text-center text-2xl leading-tight font-semibold md:text-4xl lg:text-5xl">
          {resolvedTitle}
        </h2>
        {resolvedItems !== false && resolvedItems.length > 0 && (
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-full md:max-w-[800px]"
          >
            {resolvedItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={item.value || `item-${index + 1}`}
              >
                <AccordionTrigger className="text-left text-sm font-medium md:text-base lg:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base">
                  {renderAnswer(item.answer)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </Section>
  );
}
