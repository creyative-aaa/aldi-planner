"use client";

import { useCallback, useRef, useState } from "react";
import { FileText, Image, Loader2, Upload } from "lucide-react";

interface UploadZoneProps {
  /** Called with the selected file when the user confirms a real upload. */
  onUpload: (file: File) => void;
  /** Called to skip upload and load local demo data. */
  onUseDemo: () => void;
  /** True while the file is being uploaded to Storage. */
  isUploading?: boolean;
}

export default function UploadZone({
  onUpload,
  onUseDemo,
  isUploading = false,
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  }, []);

  return (
    <section className="mx-auto max-w-2xl px-6 py-16 lg:px-8">
      <div className="mb-10 text-center">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-bronze">
          Langkah 1
        </p>
        <h1 className="font-serif text-3xl font-medium tracking-tight text-ink">
          Unggah Kalender Akademik
        </h1>
        <p className="mt-2 text-sm text-inksoft">
          Unggah dokumen kalender akademik (PDF atau gambar). Sistem akan
          mengekstrak agenda inti dan menyusun rencana pelatihan secara
          otomatis.
        </p>
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed bg-surface px-6 py-14 text-center transition-colors ${
          isDragging
            ? "border-copper bg-copper/10"
            : "border-line hover:border-copper"
        }`}
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-sm border border-line bg-surface2">
          <Upload className="h-5 w-5 text-forest" />
        </div>

        {selectedFile ? (
          <p className="text-sm font-medium text-ink">
            {selectedFile.name}
          </p>
        ) : (
          <>
            <p className="text-sm font-medium text-ink">
              Tarik &amp; letakkan file di sini, atau klik untuk memilih
            </p>
            <p className="mt-1 font-mono text-xs text-inkmute">
              PDF, PNG, atau JPG — maks. 10 MB
            </p>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,image/png,image/jpeg"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          disabled={!selectedFile || isUploading}
          onClick={() => selectedFile && onUpload(selectedFile)}
          className="inline-flex h-10 items-center gap-2 rounded-sm bg-forest px-5 text-sm font-medium text-surface transition-[filter] hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <FileText className="h-4 w-4" />
          )}
          {isUploading ? "Mengunggah…" : "Proses Kalender"}
        </button>
        <button
          type="button"
          disabled={isUploading}
          onClick={onUseDemo}
          className="inline-flex h-10 items-center gap-2 rounded-sm border border-line bg-white px-5 text-sm font-medium text-forest transition-colors hover:bg-surface2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Image className="h-4 w-4 text-copper" />
          Gunakan Data Demo
        </button>
      </div>
    </section>
  );
}
