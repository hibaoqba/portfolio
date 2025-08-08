import { useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";

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
    <section id="contact" className="py-20 px-6 md:px-20 ">
      <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">{t("contact.title")}</h2>
      <form onSubmit={onSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">{t("contact.form.name")}</label>
          <input type="text" name="name" value={form.name} onChange={onChange} required className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder={t("contact.form.namePh")} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">{t("contact.form.email")}</label>
          <input type="email" name="email" value={form.email} onChange={onChange} required className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder={t("contact.form.emailPh")} />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">{t("contact.form.message")}</label>
          <textarea name="message" value={form.message} onChange={onChange} required rows={5} className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder={t("contact.form.messagePh")} />
        </div>
        <button type="submit" disabled={sending} className="w-full bg-purple-600 text-white px-4 py-2 rounded-xl shadow hover:-translate-y-[2px] transition disabled:opacity-60">
          {sending ? "Envoi..." : t("contact.form.send")}
        </button>
        {ok === true && <p className="text-green-600 text-sm mt-3">Message envoyé.</p>}
        {ok === false && <p className="text-red-600 text-sm mt-3">Échec de l’envoi. Réessaie.</p>}
      </form>
    </section>
  );
}

export default ContactSection;
