// api/mein-endpunkt.js
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Nur GET erlaubt" });
  }

  try {
    const target = "https://www.kongregate.com";
    const response = await fetch(target, {
      headers: { "User-Agent": "MeinWebServer/1.0" },
    });

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await response.json();
      res.status(200).json({ ok: true, type: "json", data });
    } else {
      const text = await response.text();
      res.status(200).json({
        ok: true,
        type: "html",
        length: text.length,
        snippet: text.slice(0, 300),
      });
    }
  } catch (err) {
    console.error("Fehler:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
}
