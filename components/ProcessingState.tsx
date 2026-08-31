import { AlertCircle, Loader2 } from "lucide-react";
import type { PlannerStatus } from "@/lib/types";

interface ProcessingStateProps {
  status: PlannerStatus;
  error: string | null;
  onReset: () => void;
}

/** Full-screen status view while the Cloud Function extracts the calendar. */
export default function ProcessingState({
  status,
  error,
  onReset,
}: ProcessingStateProps) {
  const isFailed = status === "failed";

  return (
    <section className="mx-auto max-w-md px-6 py-24 text-center lg:px-8">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-line bg-surface">
        {isFailed ? (
          <AlertCircle className="h-6 w-6 text-warn" />
        ) : (
          <Loader2 className="h-6 w-6 animate-spin text-forest" />
        )}
      </div>

      <h1 className="font-serif text-2xl font-medium tracking-tight text-ink">
        {isFailed ? "Pemrosesan Gagal" : "AI Sedang Membaca Kalender…"}
      </h1>
      <p className="mt-2 text-sm leading-6 text-inksoft">
        {isFailed
          ? (error ?? "Terjadi kesalahan saat memproses dokumen.")
          : "Cloud Functions sedang mengekstrak agenda akademik dan menyusun rencana pelatihan. Halaman ini akan diperbarui otomatis begitu selesai."}
      </p>

      {isFailed && (
        <button
          type="button"
          onClick={onReset}
          className="mt-8 inline-flex h-10 items-center rounded-sm border border-line bg-white px-5 text-sm font-medium text-forest transition-colors hover:bg-surface2"
        >
          Coba Lagi
        </button>
      )}
    </section>
  );
}
