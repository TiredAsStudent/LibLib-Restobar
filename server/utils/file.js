import path from "path";

export function toAbsUploadPath(webPath) {
  if (!webPath) return null;
  const safeRelative = webPath.replace(/^\/+/, "");
  return path.join(process.cwd(), safeRelative);
}
