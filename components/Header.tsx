import { KeyRound, LogOut } from "lucide-react";

interface HeaderProps {
  userName?: string | null;
  userEmail?: string | null;
  userPhoto?: string | null;
  onLogout?: () => void;
  onOpenSettings?: () => void;
}

function initials(name?: string | null, email?: string | null): string {
  if (name) {
    return name
      .split(" ")
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");
  }
  return (email?.[0] ?? "A").toUpperCase();
}

export default function Header({
  userName,
  userEmail,
  userPhoto,
  onLogout,
  onOpenSettings,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-surface shadow-[inset_0_-3px_0_rgba(0,0,0,0.2)]">
            <span className="font-serif text-lg font-bold">A</span>
          </div>
          <div>
            <span className="font-serif text-xl font-semibold tracking-tight text-ink">
              Aldi Planner
            </span>
            <p className="text-[10px] uppercase tracking-wider text-inkmute">
              Multi-Kampus · Pengingat Email
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {userName || userEmail ? (
            <>
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-ink">
                  {userName ?? userEmail}
                </p>
                <p className="text-xs text-inkmute">Account Manager</p>
              </div>
              {userPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={userPhoto}
                  alt={userName ?? "Profil"}
                  referrerPolicy="no-referrer"
                  className="h-9 w-9 rounded-full border border-line"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface2 text-xs font-semibold text-ink">
                  {initials(userName, userEmail)}
                </div>
              )}
              {onOpenSettings && (
                <button
                  type="button"
                  onClick={onOpenSettings}
                  title="Gemini API Key"
                  className="flex h-9 w-9 items-center justify-center rounded-sm border border-line bg-white text-inksoft transition-colors hover:bg-surface2 hover:text-ink"
                >
                  <KeyRound className="h-4 w-4" />
                </button>
              )}
              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  title="Keluar"
                  className="flex h-9 w-9 items-center justify-center rounded-sm border border-line bg-white text-inksoft transition-colors hover:bg-surface2 hover:text-ink"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              )}
            </>
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface2 text-xs font-semibold text-ink">
              AP
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
