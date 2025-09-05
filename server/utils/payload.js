export function normalizeMenuPayload(body = {}) {
  const payload = {};

  //Menu item name
  if (typeof body.name === "string") {
    payload.name = body.name.trim();
  }

  //Category
  if (typeof body.category === "string") {
    payload.category = body.category.trim();
  }

  //Base Price
  if (body.basePrice !== undefined) {
    const parsedPrice = Number(body.basePrice);
    if (!Number.isNaN(parsedPrice) && parsedPrice >= 0) {
      payload.basePrice = parsedPrice;
    }
  }

  //Availability
  if (body.availability !== undefined) {
    payload.availability =
      body.availability === true || body.availability === "true";
  }

  // Variants
  if (body.variants !== undefined) {
    try {
      if (typeof body.variants === "string") {
        payload.variants = JSON.parse(body.variants || "[]");
      } else if (Array.isArray(body.variants)) {
        payload.variants = body.variants;
      } else {
        payload.variants = [];
      }
    } catch {
      payload.variants = [];
    }
  }

  return payload;
}
