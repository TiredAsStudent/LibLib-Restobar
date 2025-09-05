export function buildQuery(params = {}) {
  const qs = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    qs.append(key, value);
  });

  const queryString = qs.toString();
  return queryString ? `?${queryString}` : "";
}
