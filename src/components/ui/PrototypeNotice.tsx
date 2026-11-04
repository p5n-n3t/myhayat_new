"use client";

import { useTranslation } from "@/lib/i18n";

type NoticeVariant = "modal" | "chat" | "footer";

const COPY_KEYS = {
  modal: "prototype.disclaimerFull",
  chat: "prototype.disclaimerChat",
  footer: "prototype.disclaimerFooter",
} as const;

/** Visible, reusable non-medical notice: keeps prototype status clear everywhere. */
export function PrototypeNotice({ variant = "modal" }: { variant?: NoticeVariant }) {
  const { t } = useTranslation();
  return (
    <p
      role="note"
      className={
        "relative z-10 rounded-2xl border border-myhayat-yellow/55 bg-[#292c3a] text-myhayat-yellow " +
        (variant === "footer"
          ? "max-w-3xl mx-auto px-4 py-2 text-[10px] sm:text-xs leading-relaxed text-center"
          : variant === "chat"
            ? "px-3 sm:px-4 py-2 text-[11px] sm:text-xs leading-snug text-center"
            : "px-3 py-2 text-[11px] sm:text-xs leading-relaxed mt-3 text-left")
      }
    >
      <strong className="font-extrabold">{t("prototype.badge")}</strong>{" "}
      {t(COPY_KEYS[variant])}
    </p>
  );
}
