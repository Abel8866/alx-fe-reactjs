function buildUrl(url, params) {
  if (!params) return url;

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    searchParams.set(key, String(value));
  }

  const query = searchParams.toString();
  return query ? `${url}?${query}` : url;
}

export async function getJson(url, { params } = {}) {
  const response = await fetch(buildUrl(url, params));

  if (!response.ok) {
    let details = "";
    try {
      const data = await response.json();
      details = data?.status_message || JSON.stringify(data);
    } catch {
      try {
        details = await response.text();
      } catch {
        details = "";
      }
    }
    throw new Error(`Request failed (${response.status}). ${details}`.trim());
  }

  return response.json();
}
