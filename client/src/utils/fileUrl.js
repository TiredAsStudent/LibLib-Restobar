export const serverUrl =
  import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

export function fileUrl(path) {
  if (!path) return "";

  // If it's already an absolute URL, return as is
  if (/^https?:\/\//i.test(path)) return path;

  // Ensure no double slashes (//) in the final URL
  return `${serverUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
