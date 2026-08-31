# Aldi Planner

Automated academic calendar and training scheduler dashboard for EdTech Account Managers.

## Architecture

```
Upload PDF ──► Supabase Storage (calendars/{uid}/{campusId}/file)
                    │ invoke Edge Function
                    ▼
            Supabase Edge Function (Deno) ──► Gemini 1.5 Pro (extract events + training)
                    │
                    ▼
            Postgres planners/{campus_id}
            status: processing → completed | failed
                    │ Realtime (postgres_changes)
                    ▼
            Next.js dashboard (live update)
```

## Tech Stack

- **Frontend:** Next.js 14 (App Router) + React 18 + TypeScript, Tailwind CSS ("Neo Minimalist Clear"), lucide-react
- **Backend:** Supabase Edge Functions (Deno) + Gemini 1.5 Pro
- **Data:** Supabase Postgres + Storage + Realtime

## Getting Started

### Frontend

```bash
npm install
cp .env.local.example .env.local   # isi URL + anon key Supabase
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000). Klik **Gunakan Data Demo** untuk melihat dashboard tanpa backend, atau unggah PDF untuk alur AI penuh.

### Supabase Backend

1. Buat project baru di [supabase.com](https://supabase.com).
2. Jalankan SQL di **SQL Editor** — copy seluruh isi [`supabase/schema.sql`](supabase/schema.sql). Ini membuat tabel `campuses`, `planners`, dan `user_settings`, serta RLS policies, storage bucket `calendars`, dan trigger. Jika Anda menggunakan fitur BYOK untuk menyimpan API key per user, juga bisa menjalankan [`supabase/byok.sql`](supabase/byok.sql); isinya serupa dan aman untuk di-apply ulang.
3. Deploy Edge Function:

   ```bash
   npm install -g supabase        # butuh Supabase CLI
   supabase login
   supabase link --project-ref <PROJECT_REF>
   supabase functions deploy process-calendar
   supabase secrets set GEMINI_API_KEY=<your-gemini-key>
   ```

4. Aktifkan Google OAuth: **Authentication → Providers → Google** — isi Client ID + Secret dari Google Cloud Console. Tambahkan URL callback Supabase ke authorized redirect URIs.

5. Isi `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://<PROJECT_REF>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-public-key>
   ```

### Deploy Otomatis (CI)

Setiap push ke `main` yang mengubah folder `supabase/` akan otomatis men-deploy
Edge Function dan menerapkan SQL schema via GitHub Actions
([.github/workflows/deploy-supabase.yml](.github/workflows/deploy-supabase.yml)).
Set secret berikut di **GitHub → Settings → Secrets → Actions**:

| Secret | Sumber |
| --- | --- |
| `SUPABASE_ACCESS_TOKEN` | [supabase.com/dashboard/account/tokens](https://supabase.com/dashboard/account/tokens) |
| `SUPABASE_PROJECT_REF` | Project Settings → General → Reference ID |
| `SUPABASE_DB_PASSWORD` | Password database yang dibuat saat project dibuat |

Deploy manual tetap bisa dengan `supabase functions deploy process-calendar`.

## Structure

| Path | Description |
| --- | --- |
| [app/page.tsx](app/page.tsx) | Root page — upload → processing → dashboard |
| [components/UploadZone.tsx](components/UploadZone.tsx) | Drag-and-drop upload Kalender Akademik |
| [components/ProcessingState.tsx](components/ProcessingState.tsx) | Status AI processing / failed |
| [components/AcademicTimeline.tsx](components/AcademicTimeline.tsx) | Vertical timeline agenda akademik |
| [components/TrainingPlan.tsx](components/TrainingPlan.tsx) | Kartu pelatihan Core (dot biru) / Support (dot abu) |
| [lib/supabase.ts](lib/supabase.ts) | Supabase client init + `isSupabaseConfigured` guard |
| [lib/useAuth.ts](lib/useAuth.ts) | Hook: Google OAuth via `signInWithOAuth` + `onAuthStateChange` |
| [lib/useCampuses.ts](lib/useCampuses.ts) | Hook: CRUD kampus + Realtime channel |
| [lib/usePlanner.ts](lib/usePlanner.ts) | Hook: upload ke Storage + invoke Edge Function + Realtime listen |
| [lib/types.ts](lib/types.ts) | Shared types (`AcademicEvent`, `TrainingModule`, `PlannerStatus`) |
| [lib/mockData.ts](lib/mockData.ts) | Data demo lokal |
| [supabase/schema.sql](supabase/schema.sql) | DDL: tabel, RLS, storage bucket, trigger |
| [supabase/functions/process-calendar/index.ts](supabase/functions/process-calendar/index.ts) | Edge Function: download file → Gemini → update `planners` |
| [supabase/functions/process-calendar/prompts.ts](supabase/functions/process-calendar/prompts.ts) | `AI_SYSTEM_PROMPT` untuk ekstraksi kalender |

## Logic

- **Core Modules** (PMB, Keuangan, KRS, Operasional Perkuliahan) — time-sensitive, dijadwalkan **sebelum** event akademik terkait.
- **Support Modules** (SPMI, OBE, CBT, Karirlink, Kepegawaian, Kemahasiswaan, Akreditasi, Litabmas, Simkerma) — dijadwalkan di *quiet gaps* antar agenda akademik.

