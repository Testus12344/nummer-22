// api/mein-endpunkt.js
export default async function handler(req, res) {
  try {
    // Zieladresse – du kannst sie später ändern, falls nötig
    const target = "https://www.kongregate.com";

    // Anfrage an die Zielseite schicken
    const response = await fetch(target, {
      headers: { "User-Agent": "MeinWebServer/1.0" },
    });

    // Inhalt der Antwort lesen
    const contentType = response.headers.get("content-type") || "";
    let data;

    if (contentType.includes("application/json")) {
      data = await response.json();
      res.status(200).json({ ok: true, source: data });
    } else {
      const text = await response.text();
      res
        .status(200)
        .send(text.slice(0, 5000)); // nur die ersten 5000 Zeichen anzeigen
    }
  } catch (err) {
    console.error("Fehler:", err);
    res
      .status(500)
      .json({ ok: false, error: "Fehler beim Abrufen der Zielseite" });
  }
}
