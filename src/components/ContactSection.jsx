import { useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import { User, Mail, MessageSquareText, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

function ContactSection() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(null);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.send(
        "service_ti94dir",
        "template_x7wy2mp",
        { from_name: form.name, reply_to: form.email, message: form.message },
        { publicKey: "YtwiYl7hC9JHIUDYY" }
      );
      setOk(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setOk(false);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-16 px-4 md:px-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        {t("contact.title")}
      </h2>

      <form
        onSubmit={onSubmit}
        className="max-w-xl mx-auto bg-white/80 dark:bg-white/5 border border-gray-200/70 dark:border-white/10 rounded-2xl p-5 md:p-6 shadow-sm space-y-4"
      >
        <div className="grid grid-cols-1 gap-3">
          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-xs font-medium text-gray-700 dark:text-gray-200">
              {t("contact.form.name")}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                required
                placeholder={t("contact.form.namePh")}
                className="w-full rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600/60 dark:focus:ring-violet-500/60"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 dark:text-gray-200">
              {t("contact.form.email")}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                required
                placeholder={t("contact.form.emailPh")}
                className="w-full rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600/60 dark:focus:ring-violet-500/60"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="message" className="block text-xs font-medium text-gray-700 dark:text-gray-200">
            {t("contact.form.message")}
          </label>
          <div className="relative">
            <MessageSquareText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={onChange}
              required
              rows={4}
              placeholder={t("contact.form.messagePh")}
              className="w-full rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600/60 dark:focus:ring-violet-500/60"
            />
          </div>
        </div>

        <div className="space-y-2">
          <button
            type="submit"
            disabled={sending}
            className="w-full h-11 inline-flex items-center justify-center gap-2 bg-violet-600 dark:bg-violet-500 text-white px-4 rounded-lg shadow transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-md"
          >
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("contact.form.sending", "Envoi...")}
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                {t("contact.form.send")}
              </>
            )}
          </button>

          <div className="min-h-[1.5rem]" aria-live="polite">
            {ok === true && (
              <div className="text-green-600 dark:text-green-400 text-sm">
                <CheckCircle2 className="h-4 w-4 mb-1" />
                <p>{t("contact.form.success", "Message envoyé.")}</p>
              </div>
            )}
            {ok === false && (
              <div className="text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 mb-1" />
                <p>{t("contact.form.error", "Échec de l’envoi. Réessaie.")}</p>
              </div>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}

export default ContactSection;
