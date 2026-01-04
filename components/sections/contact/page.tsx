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
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useI18n } from "@/components/contexts/language-context";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const { t, language } = useI18n();
  const copy = t.contact;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = useMemo(
    () =>
      yup
        .object({
          name: yup.string().required(copy.form.validation.nameRequired),
          email: yup
            .string()
            .email(copy.form.validation.emailInvalid)
            .required(copy.form.validation.emailRequired),
          message: yup
            .string()
            .min(10, copy.form.validation.messageMin)
            .required(copy.form.validation.messageRequired),
        })
        .required(),
    [copy.form.validation],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    trigger,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (Object.keys(errors).length) {
      trigger();
    }
  }, [errors, language, trigger]);

  const whatsappNumber = copy.whatsappNumber;
  const getWhatsAppUrl = () => {
    const name = watch("name") || "";
    const email = watch("email") || "";
    const message = watch("message") || "";

    const text = `${copy.whatsappTemplate.greeting}

${copy.whatsappTemplate.nameLabel}: ${name || "-"}
${copy.whatsappTemplate.emailLabel}: ${email || "-"}

${copy.whatsappTemplate.taskLabel}:
${message || copy.whatsappTemplate.defaultTask}

${copy.whatsappTemplate.thanks}`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const telegramLink = copy.telegram.username.startsWith("@")
    ? `https://t.me/${copy.telegram.username.slice(1)}`
    : copy.telegram.username;

  const onSubmit = (_data: FormData) => {
    window.open(getWhatsAppUrl(), "_blank");
    setIsSubmitted(true);
    reset();
  };

  return (
    <div id="contact" className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-16 pb-12 md:pt-24 md:pb-20 lg:pb-32">
        <div className="from-background via-muted/20 to-background absolute inset-0 bg-gradient-to-b" />

        <div className="max-w-container relative z-10 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 text-center md:space-y-6"
          >
            <span className="glass-4 inline-block rounded-full px-4 py-1.5 text-xs font-medium md:px-6 md:py-2 md:text-sm">
              {copy.tag}
            </span>
            <h1 className="mx-auto max-w-4xl text-3xl leading-tight font-bold md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="from-foreground to-foreground dark:to-brand bg-linear-to-r bg-clip-text text-transparent drop-shadow-[2px_1px_24px_var(--brand-foreground)]">
                {copy.title}
              </span>
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-base md:text-xl lg:text-2xl">
              {copy.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 pb-16 md:gap-12 md:pb-24 lg:grid-cols-2 lg:gap-24">
        {/* Contact Info - Altai AI Team */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-8 lg:max-w-lg"
        >
          <div className="space-y-3 md:space-y-4">
            <h2 className="from-foreground to-brand bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
              {copy.teamName}
            </h2>
            <div className="text-muted-foreground flex items-center gap-2 text-base md:gap-3 md:text-lg">
              <Users className="size-6 md:size-8" />
              <span>{copy.teamRole}</span>
            </div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed md:text-base lg:text-lg">
            {copy.teamAbout}
          </p>

          {/* WhatsApp Direct Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-4 hover:glass-5 group rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl md:rounded-2xl md:p-6"
          >
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 md:gap-4"
            >
              <div className="glass-3 flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-600 transition-transform group-hover:scale-110 md:size-16 md:rounded-2xl">
                <MessageCircle className="size-6 md:size-8" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-bold md:text-xl">
                  {copy.whatsapp.label}
                </p>
                <p className="text-muted-foreground truncate text-xs md:text-sm">
                  {copy.whatsapp.caption}
                </p>
              </div>
              <ArrowUpRight className="ml-auto size-5 shrink-0 text-green-600 opacity-0 transition-all group-hover:opacity-100 md:size-6" />
            </a>
          </motion.div>

          {/* Telegram */}
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-4 hover:glass-5 group flex items-center gap-3 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl md:gap-4 md:rounded-2xl md:p-6"
          >
            <div className="glass-3 text-brand flex size-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110 md:size-14">
              <MessageSquare className="size-6 md:size-7" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium md:text-lg">
                {copy.telegram.username}
              </p>
              <p className="text-muted-foreground truncate text-xs md:text-sm">
                {copy.telegram.caption}
              </p>
            </div>
            <ArrowUpRight className="text-brand ml-auto size-4 shrink-0 opacity-0 transition-all group-hover:opacity-100 md:size-5" />
          </a>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-3 rounded-xl p-4 md:rounded-2xl md:p-6"
          >
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold md:mb-4 md:text-base">
              <Sparkles className="text-brand size-4 md:size-5" />
              {copy.shortcuts.title}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
              {copy.shortcuts.items.map((item) => (
                <button
                  key={item}
                  className="glass-4 hover:glass-5 rounded-lg px-3 py-2 font-medium transition-all md:rounded-xl md:px-4"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4 md:space-y-6"
        >
          <div className="glass-4 rounded-xl p-5 md:rounded-2xl md:p-8">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold md:mb-6 md:gap-3 md:text-2xl">
              <Users className="text-brand size-6 md:size-8" />
              {copy.form.title}
            </h3>

            {isSubmitted ? (
              <motion.div
                className="success-message flex flex-col items-center space-y-3 rounded-xl border-2 border-green-500/20 bg-green-500/5 p-6 text-center md:space-y-4 md:rounded-2xl md:p-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle className="size-12 text-green-500 md:size-16" />
                <h4 className="text-xl font-bold text-green-600 md:text-2xl">
                  {copy.form.successTitle}
                </h4>
                <p className="text-muted-foreground text-sm md:text-base">
                  {copy.form.successSubtitle}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="glass-4 hover:glass-5 rounded-full px-5 py-2.5 text-sm font-medium transition-all md:px-6 md:py-3 md:text-base"
                >
                  {copy.form.successCta}
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium md:mb-2 md:text-base">
                      {copy.form.fields.name.label}
                    </label>
                    <div className="relative">
                      <User className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 md:size-5" />
                      <input
                        {...register("name")}
                        className="glass-3 placeholder:text-muted-foreground focus:border-brand/50 w-full rounded-lg border-2 border-transparent py-3 pr-4 pl-10 text-sm transition-all focus:outline-none md:rounded-xl md:py-4 md:pl-12 md:text-base"
                        placeholder={copy.form.fields.name.placeholder}
                        style={{ minHeight: "48px" }}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500 md:text-sm">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium md:mb-2 md:text-base">
                      {copy.form.fields.email.label}
                    </label>
                    <div className="relative">
                      <Mail className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 md:size-5" />
                      <input
                        {...register("email")}
                        type="email"
                        className="glass-3 placeholder:text-muted-foreground focus:border-brand/50 w-full rounded-lg border-2 border-transparent py-3 pr-4 pl-10 text-sm transition-all focus:outline-none md:rounded-xl md:py-4 md:pl-12 md:text-base"
                        placeholder={copy.form.fields.email.placeholder}
                        style={{ minHeight: "48px" }}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500 md:text-sm">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium md:mb-2 md:text-base">
                      {copy.form.fields.message.label}
                    </label>
                    <div className="relative">
                      <MessageSquare className="text-muted-foreground absolute top-3 left-3 size-4 md:top-4 md:size-5" />
                      <textarea
                        {...register("message")}
                        rows={4}
                        className="glass-3 placeholder:text-muted-foreground focus:border-brand/50 w-full resize-none rounded-lg border-2 border-transparent py-3 pr-4 pl-10 text-sm transition-all focus:outline-none md:rounded-xl md:py-4 md:pl-12 md:text-base"
                        placeholder={copy.form.fields.message.placeholder}
                        style={{ minHeight: "120px" }}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-red-500 md:text-sm">
                          {errors.message.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="glass-4 hover:glass-5 group flex w-full items-center justify-center gap-2 rounded-xl border border-green-500/20 bg-gradient-to-r from-green-500/10 to-green-600/10 px-6 py-4 text-base font-semibold transition-all duration-300 hover:border-green-500/40 md:gap-3 md:rounded-2xl md:px-8 md:py-6 md:text-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ minHeight: "56px" }}
                >
                  <MessageCircle className="size-5 text-green-600 transition-transform group-hover:translate-x-1 md:size-7" />
                  {copy.whatsapp.sendButton}
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
              className="glass-2 text-muted-foreground rounded-lg p-3 text-xs md:rounded-xl md:p-4"
            >
              <div className="mb-1.5 flex items-center gap-2 md:mb-2">
                <MessageCircle className="size-3.5 text-green-500 md:size-4" />
                <span className="text-xs md:text-sm">
                  {copy.preview.handledBy}
                </span>
              </div>
              <p className="text-[10px] opacity-75 md:text-xs">
                {copy.preview.privacy}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
