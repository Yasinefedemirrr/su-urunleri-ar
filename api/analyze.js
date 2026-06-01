export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { base64, mediaType } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + process.env.OPENAI_KEY
    },
    body: JSON.stringify({
      model: "gpt-4o",
      max_tokens: 600,
      messages: [{
        role: "user",
        content: [
          { type: "image_url", image_url: { url: `data:${mediaType};base64,${base64}` } },
          { type: "text", text: "Bu fotoğraftaki balık veya su ürününü tanımla. Türkçe olarak şunları söyle: 1) Türün adı 2) Yaşadığı bölge/habitat 3) Ortalama boyu 4) Beslenme şekli 5) İlginç bir özelliği. Eğer balık göremiyorsan bunu belirt." }
        ]
      }]
    })
  });

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || "Sonuç alınamadı.";
  res.status(200).json({ result: text });
}