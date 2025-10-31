// api/mein-endpunkt.js
export default async function handler(req, res) {
  try {
    const target = "https://www.kongregate.com";
    const response = await fetch(target, {
      headers: { "User-Agent": "MeinWebServer/1.0" },
    });

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      // Wenn die Seite JSON ist → direkt zurückgeben
      const data = await response.json();
      res.status(200).json({ ok: true, type: "json", data });
    } else {
      // Wenn die Seite HTML/Text ist → in JSON „einbetten“
      const text = await response.text();
      res.status(200).json({
        ok: true,
        type: "html",
        length: text.length,
        snippet: text.slice(0, 300), // erste 300 Zeichen
      });
    }
  } catch (err) {
    console.error("Fehler:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
}
