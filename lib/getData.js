export async function getData(endpoint) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/api/${endpoint}`, {
      cache: "no-store",
    });

    const data = await response.json();

    // Check if endpoint is for a single item
    const isSingleItem = endpoint.includes("slug") || endpoint.includes("product/") || endpoint.includes("category/") || ndpoint.includes("market/");

    if (isSingleItem) {
      return data ?? null; // return object or null
    } else {
      return Array.isArray(data) ? data : []; // return array or empty array
    }
  } catch (error) {
    console.error("Error in getData:", error);
    const isSingleItem = endpoint.includes("slug") || endpoint.includes("product/") || endpoint.includes("category/");
    return isSingleItem ? null : [];
  }
}
