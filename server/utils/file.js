import path from "path";

export function toAbsUploadPath(webPath) {
  if (!webPath) return null;

  // Remove any leading slashes to avoid issues with path.join
  const safeRelativePath = webPath.replace(/^\/+/, "");

  // Join with project root (process.cwd points to current working dir)
  return path.join(process.cwd(), safeRelativePath);
}
