import { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Section } from "../../ui/section";

interface FAQItemProps {
  question: string;
  answer: ReactNode;
  value?: string;
}

interface FAQProps {
  title?: string;
  items?: FAQItemProps[] | false;
  className?: string;
}

export default function FAQ({
  title = "Часто задаваемые вопросы",
  items = [
    {
      question: "Что вы можете разработать для моего бизнеса?",
      answer: (
        <>
          <p className="text-muted-foreground mb-3 max-w-full text-sm leading-relaxed md:mb-4 md:max-w-[640px] md:text-base">
            Разрабатываем <strong>веб-приложения</strong>,{" "}
            <strong>мобильные приложения</strong>,{" "}
            <strong>Telegram боты</strong> и <strong>AI решения</strong> любой
            сложности.
          </p>
          <p className="text-muted-foreground mb-3 max-w-full text-sm leading-relaxed md:mb-4 md:max-w-[640px] md:text-base">
            От простых лендингов до сложных CRM систем с аналитикой и
            автоматизацией.
          </p>
        </>
      ),
    },
    {
      question: "Сколько времени занимает разработка?",
      answer: (
        <>
          <p className="text-muted-foreground mb-2 max-w-full text-sm leading-relaxed md:mb-4 md:max-w-[600px] md:text-base">
            <strong>Простые проекты</strong> (лендинги, боты): 1-3 недели
          </p>
          <p className="text-muted-foreground mb-2 max-w-full text-sm leading-relaxed md:mb-4 md:max-w-[600px] md:text-base">
            <strong>Средние проекты</strong> (веб-приложения, мобильные apps):
            1-2 месяца
          </p>
          <p className="text-muted-foreground mb-2 max-w-full text-sm leading-relaxed md:mb-4 md:max-w-[600px] md:text-base">
            <strong>Сложные системы</strong> (CRM, AI решения): 2-4 месяца
          </p>
          <p className="text-muted-foreground mb-2 max-w-full text-sm leading-relaxed md:mb-4 md:max-w-[600px] md:text-base">
            Точные сроки обсуждаем после технического задания.
          </p>
        </>
      ),
    },
    {
      question: "Какие технологии вы используете?",
      answer: (
        <>
          <p className="text-muted-foreground mb-2 max-w-full text-sm leading-relaxed md:mb-4 md:max-w-[580px] md:text-base">
            <strong>Frontend:</strong> React, Next.js, Vue, React Native,
            Tanstack, Tailwind CSS
          </p>
          <p className="text-muted-foreground mb-2 max-w-full text-sm leading-relaxed md:mb-4 md:max-w-[580px] md:text-base">
            <strong>Backend:</strong> Node.js, NestJS, Python (FastAPI), Go
            (Gin), PostgreSQL, MongoDB
          </p>
          <p className="text-muted-foreground mb-2 max-w-full text-sm leading-relaxed md:mb-4 md:max-w-[580px] md:text-base">
            <strong>AI/ML:</strong> Python, TensorFlow, OpenAI API, RAG, Qdrant,
            Pgvector, Modal
          </p>
          <p className="text-muted-foreground mb-2 max-w-full text-sm leading-relaxed md:mb-4 md:max-w-[640px] md:text-base">
            <strong>Инфраструктура:</strong> Docker, AWS, Docker-Compose, CI/CD
          </p>
        </>
      ),
    },
    {
      question: "Сколько это будет стоить?",
      answer: (
        <>
          <p className="text-muted-foreground mb-2 max-w-full text-sm leading-relaxed md:mb-4 md:max-w-[580px] md:text-base">
            Стоимость зависит от сложности проекта и ваших требований:
          </p>
          <p className="text-muted-foreground mb-2 max-w-full text-sm leading-relaxed md:mb-4 md:max-w-[580px] md:text-base">
            Точную стоимость считаем после обсуждения проекта.
          </p>
        </>
      ),
    },
    {
      question: "Работаете ли вы с предоплатой?",
      answer: (
        <p className="text-muted-foreground mb-2 max-w-full text-sm leading-relaxed md:mb-4 md:max-w-[580px] md:text-base">
          Да, работаем по договору с поэтапной оплатой:
          <br />
          <strong>30% аванс → 40% после прототипа → 30% после сдачи</strong>
          <br />
          Гарантия качества и сроков по договору.
        </p>
      ),
    },
    {
      question: "Что входит в поддержку после запуска?",
      answer: (
        <>
          <p className="text-muted-foreground mb-2 max-w-full text-sm leading-relaxed md:mb-4 md:max-w-[580px] md:text-base">
            <strong>Бесплатная поддержка:</strong> 14 дней после запуска
          </p>
          <p className="text-muted-foreground mb-2 max-w-full text-sm leading-relaxed md:mb-4 md:max-w-[580px] md:text-base">
            <strong>Дополнительная поддержка:</strong> от 100 000 ₸/месяц
          </p>
          <ul className="text-muted-foreground mb-2 ml-4 max-w-full list-inside list-disc space-y-1 text-sm leading-relaxed md:mb-4 md:max-w-[580px] md:text-base">
            <li>Обновления и исправления</li>
            <li>Добавление новых функций</li>
            <li>Мониторинг и аналитика</li>
            <li>Хостинг и бэкапы</li>
          </ul>
        </>
      ),
    },
    {
      question: "Можно ли посмотреть ваши работы?",
      answer: (
        <>
          <p className="text-muted-foreground mb-2 max-w-full text-sm leading-relaxed md:mb-4 md:max-w-[580px] md:text-base">
            Конечно! Наши кейсы:
          </p>
          <ul className="text-muted-foreground mb-2 ml-4 max-w-full list-inside list-disc space-y-1.5 text-sm leading-relaxed md:mb-4 md:max-w-[580px] md:space-y-2 md:text-base">
            <li>
              <strong>Zeep Coffee</strong> - мобильное приложение + CRM система
            </li>
            <li>
              <strong>StrategicLaw Group</strong> - многофункциональный лендинг
            </li>
            <li>
              <strong>Корпоративные сайты</strong> и многофункциональный
              Telegram бот для бизнеса
            </li>
          </ul>
          <p className="text-muted-foreground max-w-full text-sm leading-relaxed md:max-w-[580px] md:text-base">
            Подробности обсудим при встрече.
          </p>
        </>
      ),
    },
  ],
  className,
}: FAQProps) {
  return (
    <Section id="faq" className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-6 px-4 md:gap-8">
        <h2 className="text-center text-2xl leading-tight font-semibold md:text-4xl lg:text-5xl">
          {title}
        </h2>
        {items !== false && items.length > 0 && (
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-full md:max-w-[800px]"
          >
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={item.value || `item-${index + 1}`}
              >
                <AccordionTrigger className="text-left text-sm font-medium md:text-base lg:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </Section>
  );
}
