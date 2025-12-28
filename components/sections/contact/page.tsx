"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle,
  Mail,
  MessageCircle,
  MessageSquare,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const schema = yup
  .object({
    name: yup.string().required("Имя обязательно"),
    email: yup.string().email("Неверный email").required("Email обязателен"),
    message: yup
      .string()
      .min(10, "Сообщение должно содержать минимум 10 символов")
      .required("Сообщение обязательно"),
  })
  .required();

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // ✅ Формируем WhatsApp ссылку с текстом
  const whatsappNumber = "77757200604";
  const getWhatsAppUrl = () => {
    const name = watch("name") || "";
    const email = watch("email") || "";
    const message = watch("message") || "";

    const text = `Здравствуйте! Хочу обсудить проект с Altai AI.

👥 Меня зовут: ${name || "…"}
📧 Email: ${email || "—"}

💼 Задача:
${message || "Опишите, что нужно сделать"}

Спасибо! Жду вашего ответа от команды Altai AI 🙌`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const onSubmit = (data: FormData) => {
    // Открываем WhatsApp с готовым текстом
    window.open(getWhatsAppUrl(), "_blank");

    // Показываем success экран
    setIsSubmitted(true);
    reset();
  };

  return (
    <div id="contact" className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-20 md:pb-32">
        <div className="from-background via-muted/20 to-background absolute inset-0 bg-gradient-to-b" />

        <div className="max-w-container relative z-10 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center"
          >
            <span className="glass-4 inline-block rounded-full px-6 py-2 text-sm font-medium">
              Команда Altai AI
            </span>
            <h1 className="mx-auto max-w-4xl text-4xl leading-tight font-bold md:text-6xl lg:text-7xl">
              <span className="from-foreground to-foreground dark:to-brand bg-linear-to-r bg-clip-text text-transparent drop-shadow-[2px_1px_24px_var(--brand-foreground)]">
                Готовы начать ваш проект?
              </span>
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl md:text-2xl">
              Наша команда разработчиков свяжется с вами в WhatsApp в течение
              часа
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 pb-24 lg:grid-cols-2 lg:gap-24">
        {/* Contact Info - Altai AI Team */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8 lg:max-w-lg"
        >
          <div className="space-y-4">
            <h2 className="from-foreground to-brand bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
              Altai AI
            </h2>
            <div className="text-muted-foreground flex items-center gap-3 text-lg">
              <Users className="size-8" />
              <span>Команда разработчиков</span>
            </div>
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed">
            Full-stack команда с опытом создания сложных веб-приложений,
            мобильных приложений, Telegram ботов и AI систем для бизнеса.
          </p>

          {/* WhatsApp Direct Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-4 hover:glass-5 group rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4"
            >
              <div className="glass-3 flex size-16 items-center justify-center rounded-2xl bg-green-500/10 text-green-600 transition-transform group-hover:scale-110">
                <MessageCircle className="size-8" />
              </div>
              <div className="flex-1">
                <p className="text-xl font-bold">+7 (775) 720-06-04</p>
                <p className="text-muted-foreground text-sm">
                  Написать команде Altai AI
                </p>
              </div>
              <ArrowUpRight className="ml-auto size-6 text-green-600 opacity-0 transition-all group-hover:opacity-100" />
            </a>
          </motion.div>

          {/* Telegram */}
          <a
            href="https://t.me/bolatbekermeko_v"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-4 hover:glass-5 group flex items-center gap-4 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="glass-3 text-brand flex size-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
              <MessageSquare className="size-7" />
            </div>
            <div>
              <p className="text-lg font-medium">@bolatbekermeko_v</p>
              <p className="text-muted-foreground text-sm">Основной контакт</p>
            </div>
            <ArrowUpRight className="text-brand ml-auto size-5 opacity-0 transition-all group-hover:opacity-100" />
          </a>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-3 rounded-2xl p-6"
          >
            <h4 className="mb-4 flex items-center gap-2 font-semibold">
              <Sparkles className="text-brand size-5" />
              Наши услуги
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button className="glass-4 hover:glass-5 rounded-xl px-4 py-2 font-medium transition-all">
                Веб-приложения
              </button>
              <button className="glass-4 hover:glass-5 rounded-xl px-4 py-2 font-medium transition-all">
                Мобильные apps
              </button>
              <button className="glass-4 hover:glass-5 rounded-xl px-4 py-2 font-medium transition-all">
                AI решения
              </button>
              <button className="glass-4 hover:glass-5 rounded-xl px-4 py-2 font-medium transition-all">
                Telegram боты
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="glass-4 rounded-2xl p-8">
            <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold">
              <Users className="text-brand size-8" />
              Обсудить проект с Altai AI
            </h3>

            {isSubmitted ? (
              <motion.div
                className="success-message flex flex-col items-center space-y-4 rounded-2xl border-2 border-green-500/20 bg-green-500/5 p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle className="size-16 text-green-500" />
                <h4 className="text-2xl font-bold text-green-600">
                  Сообщение отправлено!
                </h4>
                <p className="text-muted-foreground">
                  Открывается WhatsApp с готовым текстом для команды Altai AI
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="glass-4 hover:glass-5 rounded-full px-6 py-3 font-medium transition-all"
                >
                  Заполнить ещё раз
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block font-medium">Ваше имя</label>
                    <div className="relative">
                      <User className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2" />
                      <input
                        {...register("name")}
                        className="glass-3 placeholder:text-muted-foreground focus:border-brand/50 w-full rounded-xl border-2 border-transparent px-12 py-4 pl-12 text-lg transition-all focus:outline-none"
                        placeholder="Иван Иванов"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block font-medium">Email</label>
                    <div className="relative">
                      <Mail className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2" />
                      <input
                        {...register("email")}
                        type="email"
                        className="glass-3 placeholder:text-muted-foreground focus:border-brand/50 w-full rounded-xl border-2 border-transparent px-12 py-4 pl-12 text-lg transition-all focus:outline-none"
                        placeholder="name@company.kz"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block font-medium">
                      Описание проекта
                    </label>
                    <div className="relative">
                      <MessageSquare className="text-muted-foreground absolute top-4 left-3 size-5" />
                      <textarea
                        {...register("message")}
                        rows={5}
                        className="glass-3 placeholder:text-muted-foreground focus:border-brand/50 w-full resize-none rounded-xl border-2 border-transparent px-12 py-4 pl-12 text-lg transition-all focus:outline-none"
                        placeholder="Расскажите о вашем проекте, задачах и сроках..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.message.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="glass-4 hover:glass-5 group flex w-full items-center justify-center gap-3 rounded-2xl border border-green-500/20 bg-gradient-to-r from-green-500/10 to-green-600/10 px-8 py-6 text-lg font-semibold transition-all duration-300 hover:border-green-500/40"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="size-7 text-green-600 transition-transform group-hover:translate-x-1" />
                  Написать в WhatsApp
                </motion.button>
              </form>
            )}
          </div>

          {/* WhatsApp Preview */}
          {!isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-2 text-muted-foreground rounded-xl p-4 text-xs"
            >
              <div className="mb-2 flex items-center gap-2">
                <MessageCircle className="size-4 text-green-500" />
                <span>Все заявки обрабатывает команда Altai AI</span>
              </div>
              <p className="text-[10px] opacity-75">
                Данные защищены • Ответ в течение часа
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
