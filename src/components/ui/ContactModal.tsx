"use client";

import React, { useState, useEffect } from "react";
import { X, Send } from "lucide-react";
import { MyHayatButton } from "./MyHayatButton";
import { useTranslation } from "@/lib/i18n";

export function ContactModal() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", category: "General", message: "" });

  useEffect(() => {
    const check = () => setIsOpen(window.location.hash === "#contact-modal");
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  const closeModal = () => {
    history.replaceState(null, "", window.location.pathname + window.location.search);
    setIsOpen(false);
    setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", category: "General", message: "" });
        setTimeout(closeModal, 3500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  const inputCls = "w-full h-10 px-3 rounded-xl border-2 border-myhayat-salmon/25 dark:border-myhayat-pink/20 bg-white dark:bg-[#251320] text-sm focus:border-myhayat-pink focus:outline-none transition-colors";
  const labelCls = "block text-xs font-bold mb-1 text-gray-500 dark:text-gray-400 uppercase tracking-wide";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border-4 border-myhayat-salmon dark:border-myhayat-pink/50 bg-myhayat-offwhite dark:bg-[#1a0a14] shadow-[8px_8px_0px_#F98181] dark:shadow-[8px_8px_0px_#F85BAA55] animate-in fade-in zoom-in-95 duration-200 overflow-hidden">

        {/* Title row */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <img src="/decor_heart.svg" alt="" className="w-5 h-5 shrink-0" />
            <h2 className="font-titan text-xl leading-none">
              <span className="text-gray-500 dark:text-gray-400">{t("contact.title")}&nbsp;</span>
              <span className="bg-gradient-to-r from-myhayat-pink to-myhayat-salmon bg-clip-text text-transparent">
                {t("contact.titleHighlight")}
              </span>
            </h2>
            <img src="/decor_twinkle_pink.svg" alt="" className="w-4 h-4 shrink-0 opacity-80" />
          </div>
          <button
            onClick={closeModal}
            aria-label="Close"
            className="p-1.5 rounded-full hover:bg-myhayat-salmon/15 dark:hover:bg-myhayat-pink/15 text-gray-400 hover:text-myhayat-salmon dark:hover:text-myhayat-pink transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-myhayat-salmon/20 dark:bg-myhayat-pink/15 mx-6" />

        {/* Body */}
        <div className="px-6 py-4">
          {status === "success" ? (
            <div className="flex flex-col items-center py-6 text-center gap-3 animate-in fade-in">
              <div className="text-3xl">🌸</div>
              <p className="font-titan text-lg text-myhayat-pink">{t("contact.form.success")}</p>
              <p className="text-sm text-gray-400">Check your inbox for a confirmation.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name + Email side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>{t("contact.form.name")}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>{t("contact.form.email")}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className={labelCls}>{t("contact.form.category")}</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
                  className={`${inputCls} appearance-none`}
                >
                  <option>{t("contact.form.categories.general")}</option>
                  <option>{t("contact.form.categories.partnership")}</option>
                  <option>{t("contact.form.categories.support")}</option>
                  <option>{t("contact.form.categories.media")}</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className={labelCls}>{t("contact.form.message")}</label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-myhayat-salmon/25 dark:border-myhayat-pink/20 bg-white dark:bg-[#251320] text-sm focus:border-myhayat-pink focus:outline-none transition-colors resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-xs font-semibold">Something went wrong — please try again.</p>
              )}

              <MyHayatButton
                className="w-full flex items-center justify-center gap-2 !py-2.5 mt-1"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    {t("contact.form.send")}
                  </>
                )}
              </MyHayatButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
