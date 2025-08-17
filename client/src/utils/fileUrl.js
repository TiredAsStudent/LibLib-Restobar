export const serverUrl =
  import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

export function fileUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  // remove extra slashes
  return `${serverUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
