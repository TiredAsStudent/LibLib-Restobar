export function normalizeMenuPayload(body = {}) {
  const out = {};

  if (typeof body.name === "string") out.name = body.name.trim();
  if (typeof body.category === "string") out.category = body.category.trim();

  if (body.basePrice !== undefined) {
    const price = Number(body.basePrice);
    if (!Number.isNaN(price) && price >= 0) out.basePrice = price;
  }

  if (body.availability !== undefined) {
    out.availability =
      body.availability === true || body.availability === "true";
  }

  if (body.variants !== undefined) {
    try {
      out.variants =
        typeof body.variants === "string"
          ? JSON.parse(body.variants || "[]")
          : Array.isArray(body.variants)
          ? body.variants
          : [];
    } catch {
      out.variants = [];
    }
  }

  return out;
}
