import { useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";

function ContactSection() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(null);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

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
    <section id="contact" className="py-20 px-6 md:px-20">
      <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
        {t("contact.title")}
      </h2>

      <form
        onSubmit={onSubmit}
        className="max-w-3xl mx-auto bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-6 hover:shadow-xl transition-all duration-300"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200"
          >
            {t("contact.form.name")}
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            required
            placeholder={t("contact.form.namePh")}
            className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-600 dark:focus:ring-violet-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200"
          >
            {t("contact.form.email")}
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
            placeholder={t("contact.form.emailPh")}
            className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-600 dark:focus:ring-violet-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200"
          >
            {t("contact.form.message")}
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={onChange}
            required
            rows={5}
            placeholder={t("contact.form.messagePh")}
            className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-600 dark:focus:ring-violet-500"
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="w-full bg-violet-600 dark:bg-violet-500 text-white px-4 py-2 rounded-xl shadow transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-[2px] hover:shadow-lg"
        >
          {sending ? t("contact.form.sending", "Envoi...") : t("contact.form.send")}
        </button>

        <div className="min-h-[1.25rem]" aria-live="polite">
          {ok === true && (
            <p className="text-green-600 dark:text-green-400 text-sm mt-3">
              {t("contact.form.success", "Message envoyé.")}
            </p>
          )}
          {ok === false && (
            <p className="text-red-600 dark:text-red-400 text-sm mt-3">
              {t("contact.form.error", "Échec de l’envoi. Réessaie.")}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}

export default ContactSection;
