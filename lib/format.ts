export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(isoDate));
}

export function formatDateRange(startIso: string, endIso: string): string {
  if (startIso === endIso) return formatDate(startIso);
  return `${formatDate(startIso)} — ${formatDate(endIso)}`;
}
