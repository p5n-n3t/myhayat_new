"use client";

import { useEffect, useState, type FormEvent } from "react";
import { X, Mail } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { MyHayatButton } from "@/components/ui/MyHayatButton";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { PrototypeNotice } from "@/components/ui/PrototypeNotice";

export function WaitlistModal() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  useEffect(() => {
    const checkHash = () => setOpen(window.location.hash === "#waitlist-modal");
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  function close() {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    setOpen(false);
    setStatus("idle");
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || status === "sending") return;
    setStatus("sending");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!response.ok) throw new Error("Waitlist API returned " + response.status);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" role="presentation">
      <div className="absolute inset-0 bg-[#130b16]/80 backdrop-blur-md" onClick={close} />
      <section role="dialog" aria-modal="true" aria-labelledby="waitlist-modal-heading"
        className="relative z-10 w-full max-w-md overflow-y-auto max-h-[90dvh] rounded-[2.2rem] border-[3px] border-myhayat-yellow bg-[#292c3a] text-white p-6 sm:p-8 shadow-[7px_8px_0_#F85BAA]">
        <button type="button" aria-label={t("waitlist.modal.close")} onClick={close}
          className="absolute right-4 top-4 rounded-full p-2 border-2 border-myhayat-salmon bg-[#211723] text-myhayat-yellow focus-visible:outline-2 focus-visible:outline-white">
          <X size={20} />
        </button>
        <BrandIcon kind="bloom" size={60} className="mb-3" />
        <h2 id="waitlist-modal-heading" className="font-titan text-3xl text-myhayat-yellow mb-2">{t("waitlist.modal.title")}</h2>
        <p className="text-sm text-white/80 mb-5">{t("waitlist.modal.desc")}</p>
        {status === "success" ? (
          <p role="status" className="font-bold rounded-xl bg-myhayat-pink/20 border-2 border-myhayat-yellow p-4 text-myhayat-yellow">{t("waitlist.success")}</p>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3">
            <label className="text-xs font-bold text-myhayat-yellow" htmlFor="modal-waitlist-email">{t("waitlist.modal.label")}</label>
            <div className="flex items-center gap-2 px-4 rounded-full bg-[#1b1826] border-2 border-myhayat-salmon focus-within:border-myhayat-yellow">
              <Mail size={20} className="text-myhayat-yellow shrink-0" />
              <input id="modal-waitlist-email" autoFocus required type="email" value={email} onChange={event=>setEmail(event.target.value)}
                placeholder={t("waitlist.placeholder")} className="min-w-0 w-full h-12 bg-transparent text-white placeholder:text-white/50 outline-none text-sm"/>
            </div>
            <MyHayatButton type="submit" disabled={status==="sending"} className="w-full">
              {status === "sending" ? t("waitlist.modal.sending") : t("waitlist.button")}
            </MyHayatButton>
            {status === "error" && <p role="alert" className="text-xs text-myhayat-yellow">{t("waitlist.modal.error")}</p>}
          </form>
        )}
        <div className="mt-5"><PrototypeNotice variant="chat" /></div>
      </section>
    </div>
  );
}
