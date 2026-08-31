"use client";

import { useEffect, useState } from "react";
import { KeyRound, Loader2, X } from "lucide-react";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  currentKey: string;
  onSave: (key: string) => Promise<boolean>;
  error?: string | null;
}

export default function SettingsModal({
  open,
  onClose,
  currentKey,
  onSave,
  error,
}: SettingsModalProps) {
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Sync input value whenever modal opens or currentKey changes.
  useEffect(() => {
    if (open) {
      setValue(currentKey);
      setSaved(false);
      setLocalError(null);
    }
  }, [open, currentKey]);

  if (!open) return null;

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setLocalError(null);
    const ok = await onSave(value.trim());
    setSaving(false);
    if (ok) {
      setSaved(true);
    } else {
      setLocalError("Gagal menyimpan. Coba lagi.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-sm border border-line bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-line bg-surface2">
              <KeyRound className="h-4 w-4 text-forest" />
            </div>
            <h2 className="font-serif text-base font-medium tracking-tight text-ink">
              Gemini API Key
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm p-1 text-inkmute transition-colors hover:bg-surface2 hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mb-4 text-xs leading-relaxed text-inksoft">
          Setiap user menggunakan Gemini API key sendiri. Dapatkan key gratis di{" "}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-ink underline underline-offset-2"
          >
            Google AI Studio
          </a>
          . Key tersimpan aman di akun Anda dan hanya dipakai saat memproses
          kalender.
        </p>

        <details className="mb-4 rounded-sm border border-line bg-surface2 px-3 py-2">
          <summary className="cursor-pointer text-xs font-medium text-inksoft">
            Cara mendapatkan API key (klik untuk tutorial)
          </summary>
          <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs leading-relaxed text-inkmute">
            <li>
              Buka{" "}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-ink underline underline-offset-2"
              >
                aistudio.google.com/app/apikey
              </a>{" "}
              dan login dengan akun Google.
            </li>
            <li>Klik tombol <strong>Create API key</strong>.</li>
            <li>
              Copy key yang muncul (formatnya{" "}
              <code className="rounded-sm bg-surface px-1 py-0.5 font-mono text-[10px] text-bronze">
                AIzaSy...
              </code>
              ).
            </li>
            <li>Paste key di kolom bawah, lalu klik Simpan.</li>
          </ol>
          <p className="mt-2 text-[11px] text-inkmute">
            Gratis, tanpa kartu kredit. Kuota harian cukup untuk ratusan upload
            kalender. Model AI (Gemini Flash) sudah diatur otomatis — Anda tidak
            perlu memilih model.
          </p>
        </details>

        <label className="mb-1.5 block text-xs font-medium text-inksoft">
          API Key
        </label>
        <input
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setSaved(false);
          }}
          placeholder="AIzaSy..."
          className="mb-4 w-full rounded-sm border border-line bg-[#FFFCF5] px-3 py-2 text-sm text-ink placeholder:text-inkmute focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
        />

        {saved && (
          <p className="mb-3 text-xs font-medium text-good">
            Tersimpan. Key Anda akan dipakai untuk pemrosesan berikutnya.
          </p>
        )}
        {(localError || error) && (
          <p className="mb-3 text-xs font-medium text-warn">
            {localError ?? error}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-sm border border-line bg-white px-4 text-xs font-medium text-forest transition-colors hover:bg-surface2"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || value.trim() === currentKey}
            className="inline-flex h-9 items-center gap-2 rounded-sm bg-forest px-4 text-xs font-medium text-surface transition-[filter] hover:brightness-90 disabled:opacity-50"
          >
            {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
