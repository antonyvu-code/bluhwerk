# Blühwerk — 33 Image Prompts cho Leonardo AI

> Mở file này ra, copy từng prompt vào Leonardo. Mỗi prompt đã **tự chứa style** (không cần ghép thêm gì). Cột "Chỗ dùng" khớp với nhãn `data-img="IMG · Prompt N …"` trong code — generate xong đặt tên file theo gợi ý rồi thay placeholder.

---

## ⚙️ Cài đặt Leonardo (làm 1 lần)

| Mục | Giá trị nên chọn |
|---|---|
| **Model** | **Leonardo Phoenix 1.0** hoặc **Lucid Realism** (ảnh thật). Cảnh có người → **Leonardo Kino XL** (cinematic) |
| **Preset Style** | `Photography` hoặc `Cinematic` |
| **Alchemy** | Bật · **Contrast**: Medium |
| **Prompt Magic** | Bật (v3), Strength ~0.4 |
| **Photoreal** | Bật nếu model hỗ trợ |
| **Guidance Scale** | 6–8 (thấp = tự nhiên hơn) |

**Negative prompt (dán vào ô Negative — dùng chung cho gần hết):**
```
text, letters, watermark, logo, signature, oversaturated, HDR, harsh flash, neon colors,
plastic look, cartoon, 3d render, cgi, illustration, deformed leaves, duplicate stems,
extra petals, blurry, low-res, jpeg artifacts, cluttered messy background
```
*(Ảnh KHÔNG có người — thêm vào negative: `people, hands, face`. Ảnh CÓ người (18–21, 27) — bỏ 3 từ đó ra.)*

### 💡 3 mẹo giữ 33 ảnh trông "cùng một nhiếp ảnh gia"
1. **Cố định Seed** cho cả bộ (ví dụ nhập seed `2604`) → ánh sáng/tông đồng nhất.
2. **Sản phẩm (11, 13, và mọi ảnh cây):** chụp ảnh đẹp đầu tiên → dùng **Image Guidance → Style Reference** (weight ~0.5) cho các ảnh sau để đồng bộ nền cream + ánh sáng.
3. Sau khi tải về, chạy tất cả qua **một preset chỉnh màu** (giảm bão hoà ~8%, ám ấm nhẹ, thêm grain) — đây là bí quyết khiến web nặng ảnh mà vẫn cao cấp.

---

## 🎨 Style DNA (đã nhúng sẵn trong mỗi prompt)
> *editorial botanical photography, warm cream paper background, soft diffused north-window daylight from the left, long gentle shadows, muted warm green-and-ochre palette, fine 35mm film grain, natural true-to-life color, calm intimate mood, photorealistic, high detail.*

---

## A · Hero & khoảnh khắc chữ ký

**Prompt 1 — Hero bloom (nếu muốn thay hoa SVG bằng ảnh)** · AR **4:5** · `hero-bloom.jpg`
```
Extreme macro of a single blush-pink ranunculus flower in full bloom, layered translucent petals catching soft light, tiny dewdrops, centered on a warm cream paper background, generous empty space, editorial botanical photography, soft diffused north-window daylight from the left, long gentle shadows, muted warm green-and-ochre palette, fine 35mm film grain, natural color, calm intimate mood, photorealistic, high detail
```

**Prompt 2 — Hero fallback (rộng)** · AR **16:9** · `hero-wide.jpg`
```
One blush-pink ranunculus in full bloom, dewy layered petals, macro, on warm cream paper background, large empty negative space on the upper-left for text, editorial botanical photography, soft diffused daylight from the left, muted warm palette, fine film grain, natural color, photorealistic
```

**Prompt 3 — Lá tiền cảnh (parallax, tách nền)** · AR **1:1** · `leaf-foreground.png`
```
A single monstera leaf edge, slightly out of focus, isolated on a plain white background for easy cut-out, soft daylight, muted green, botanical, photorealistic, high detail
```
*(Sau khi tạo, dùng Leonardo **Background Removal** để ra PNG trong suốt.)*

---

## B · Kategorien (4 ảnh vuông)

**Prompt 4 — Pflanzen** · AR **3:4** · `cat-pflanzen.jpg` · *(data-img Prompt 4)*
```
A healthy potted Monstera deliciosa in a natural terracotta pot, three-quarter view, on warm cream paper background, editorial botanical photography, soft diffused north-window daylight from the left, long gentle shadows, muted warm green-and-ochre palette, fine film grain, natural color, photorealistic, high detail
```

**Prompt 5 — Blumen** · AR **3:4** · `cat-blumen.jpg`
```
A loosely tied seasonal bouquet of tulips and eucalyptus lying on warm cream paper, natural stems, editorial botanical still life, soft daylight from the left, muted warm palette, fine film grain, natural color, photorealistic
```

**Prompt 6 — Töpfe** · AR **3:4** · `cat-toepfe.jpg`
```
A still life of handmade ceramic plant pots in earthy terracotta and sage tones grouped on a cream surface, matte glaze, soft shadows, editorial product photography, diffused daylight from the left, muted warm palette, fine film grain, photorealistic, high detail
```

**Prompt 7 — Geschenke** · AR **3:4** · `cat-geschenke.jpg`
```
A small potted plant gift wrapped in unbleached kraft paper with natural twine and a blank handwritten card, on cream paper, editorial still life, soft daylight from the left, muted warm palette, fine film grain, photorealistic
```

---

## C · Cây theo điều kiện

**Prompt 8 — ZZ Pflanze (góc tối)** · AR **4:5** · `plant-zz.jpg` · *(Prompt 8)*
```
A glossy ZZ plant (Zamioculcas) in a simple pot standing in a dim cozy apartment corner near a shaded window, moody low light, warm shadows, editorial interior photography, muted green-and-ochre palette, fine film grain, natural color, photorealistic, high detail
```

**Prompt 9 — Geigenfeige (nhiều nắng)** · AR **4:5** · `plant-ficus.jpg` · *(Prompt 9)*
```
A fiddle-leaf fig (Ficus lyrata) glowing in a bright sunlit window, warm rim light on the leaves, large sculptural silhouette, editorial interior photography, soft daylight, muted warm palette, fine film grain, photorealistic, high detail
```

**Prompt 10 — Bogenhanf** · AR **4:5** · `plant-sansevieria.jpg` · *(Prompt 10)*
```
A resilient snake plant (Sansevieria) in a terracotta pot on a wooden shelf, minimal styling, on warm cream tones, editorial botanical photography, soft daylight from the left, muted green palette, fine film grain, natural color, photorealistic, high detail
```

---

## D · Sản phẩm (studio — giữ ánh sáng/nền y hệt cho đồng bộ)

**Prompt 11 — Monstera studio** · AR **4:5** · `product-monstera.jpg` · *(Prompt 11, PDP + bestseller)*
```
Studio product shot of a Monstera deliciosa in a natural terracotta pot, centered on seamless warm cream paper, honest true scale, soft window light from the left, long gentle shadow, catalog-clean, editorial botanical photography, muted warm palette, fine film grain, photorealistic, high detail
```

**Prompt 12 — Chi tiết rễ/đất** · AR **1:1** · `detail-soil.jpg` · *(Prompt 12)*
```
Extreme close-up of the soil surface and base of a plant stem, moss and bark texture, a few dewdrops, warm cream background bokeh, macro editorial photography, soft daylight, muted earthy palette, fine film grain, photorealistic, high detail
```

**Prompt 13 — Cây trong phòng (lifestyle)** · AR **3:2** · `room-monstera.jpg` · *(Prompt 13)*
```
A Monstera styled in a bright Berlin Altbau living room, oak parquet floor, linen sofa, morning sun casting soft shadows, cozy lived-in atmosphere, editorial interior lifestyle photography, muted warm palette, fine film grain, natural color, photorealistic, high detail
```

---

## E · Saison-Kollektion (gallery ngang, 4 mùa)

**Prompt 14 — Frühling** · AR **3:4** · `saison-fruehling.jpg`
```
Spring arrangement of tulips, ranunculus and blossom branches, blush-pink and fresh green palette, on warm cream paper, editorial botanical still life, soft daylight from the left, fine film grain, natural color, photorealistic
```

**Prompt 15 — Sommer** · AR **3:4** · `saison-sommer.jpg` · *(Prompt 15)*
```
Summer arrangement of sunlit dahlias and ornamental grasses, golden warm tones, on cream paper, editorial botanical still life, soft daylight, fine film grain, natural color, photorealistic, high detail
```

**Prompt 16 — Herbst** · AR **3:4** · `saison-herbst.jpg`
```
Autumn arrangement of dried grasses, seed pods and terracotta chrysanthemums, ochre and rust palette, on cream paper, editorial botanical still life, soft daylight, fine film grain, natural color, photorealistic
```

**Prompt 17 — Winter** · AR **3:4** · `saison-winter.jpg`
```
Winter arrangement of evergreen branches, eucalyptus and pale hellebore, cool sage-blue palette, on cream paper, editorial botanical still life, soft muted daylight, fine film grain, natural color, photorealistic
```

---

## F · Aus der Gärtnerei (có người — bỏ `people,hands` khỏi negative)

**Prompt 18 — Bàn tay thay chậu** · AR **3:2** · `hands-repotting.jpg` · *(Prompt 18)*
```
Close-up of two weathered hands gently repotting a young plant, soil on the fingers, tender careful gesture, on a wooden workbench, editorial documentary photography, soft north-window daylight from the left, muted warm palette, fine 35mm film grain, natural color, photorealistic, high detail
```

**Prompt 19 — Gói cây trong giấy kraft** · AR **3:2** · `hands-wrapping.jpg` · *(Prompt 19)*
```
Hands wrapping a potted plant in unbleached kraft paper on a workbench, a spool of natural string nearby, warm intimate mood, editorial documentary photography, soft daylight from the left, muted warm palette, fine film grain, photorealistic, high detail
```

**Prompt 20 — Xịt lá** · AR **3:2** · `hands-misting.jpg` · *(Prompt 20)*
```
A gardener misting plant leaves with a brass sprayer in a sunlit greenhouse, backlit water droplets floating in the air, warm haze, editorial documentary photography, golden soft light, muted green palette, fine film grain, photorealistic, high detail
```

**Prompt 21 — Bê khay cây con** · AR **16:9** · `greenhouse-tray.jpg`
```
A person carrying a tray of seedlings through a greenhouse aisle, soft morning haze, rows of green on both sides, editorial documentary photography, warm diffused light, muted palette, fine film grain, natural color, photorealistic, high detail
```

---

## G · Abo · Journal · Über uns

**Prompt 22 — Wochenstrauß trên bàn** · AR **3:2** (dùng cả 4:3) · `abo-vase.jpg` · *(Prompt 22)*
```
A fresh weekly flower bouquet in a matte ceramic vase on a breakfast table with a cup of coffee, cozy morning light, editorial lifestyle photography, soft daylight from the left, muted warm palette, fine film grain, natural color, photorealistic, high detail
```

**Prompt 23 — Journal: kéo & sổ tay (flat-lay)** · AR **3:2** · `journal-scissors.jpg` · *(Prompt 23)*
```
Overhead flat-lay of pruning scissors, an open notebook and cut plant stems on cream linen, editorial still life, soft daylight from the left, muted warm palette, fine film grain, natural color, photorealistic, high detail
```

**Prompt 24 — Journal: lá dương xỉ non** · AR **3:2** · `journal-fern.jpg` · *(Prompt 24)*
```
Macro of a curling young fern frond unfurling, backlit, soft glow, warm cream bokeh background, editorial botanical macro photography, muted green palette, fine film grain, natural color, photorealistic, high detail
```

**Prompt 25 — Journal: bệ cửa sổ giờ vàng** · AR **3:2** · `journal-windowsill.jpg` · *(Prompt 25)*
```
A windowsill lined with small potted plants at golden hour, warm dust in the light, soft glow, editorial lifestyle photography, muted warm palette, fine film grain, natural color, photorealistic, high detail
```

**Prompt 26 — Über uns: nhà kính** · AR **16:9** · `about-greenhouse.jpg`
```
Wide interior of a warm plant nursery greenhouse, long rows of green plants, sunbeams streaming through the glass roof, soft haze, editorial photography, warm diffused light, muted green-and-ochre palette, fine film grain, photorealistic, high detail
```

**Prompt 27 — Chân dung team** · AR **4:5** · `about-portrait.jpg`
```
Candid portrait of a gardener in a linen apron smiling softly among plants, natural window light, warm intimate mood, editorial documentary portrait, muted palette, fine film grain, natural skin tones, photorealistic, high detail
```

---

## H · Pflege-Hub & Pflanzendoktor

**Prompt 28 — Care hub flat-lay** · AR **16:9** · `care-flatlay.jpg`
```
Overhead flat-lay of a watering can, a moisture meter, pruning shears and a single leaf arranged on warm cream paper, editorial still life, soft daylight from the left, muted warm palette, fine film grain, natural color, photorealistic, high detail
```

**Prompt 29 — Chẩn đoán: lá vàng** · AR **1:1** (dùng 16:10) · `doktor-yellow.jpg` · *(Prompt 29)*
```
Macro of a plant leaf with yellowing edges, honest documentary detail, on cream background, editorial botanical macro, soft daylight, muted palette, fine film grain, natural color, photorealistic, high detail
```

**Prompt 30 — Chẩn đoán: lá khoẻ / mặt dưới lá** · AR **1:1** · `doktor-healthy.jpg` · *(Prompt 30)*
```
Macro of a vibrant healthy green leaf with visible veins and a single water droplet, cream background, editorial botanical macro, soft daylight, muted green palette, fine film grain, natural color, photorealistic, high detail
```

---

## I · Icon (KHÔNG dùng Leonardo — nên vẽ SVG)

**Prompt 31 — Bộ icon dòng nét** · *(để mình vẽ SVG khi cần — sắc nét mọi kích thước, không nên tạo bằng AI)*
> Licht · Wasser · Schwierigkeit · Verpackung · Garantie — hand-drawn fine single-stroke line icons. **Khi cần cứ nhắn mình, mình code SVG.**

---

## J · 404 & K · Social

**Prompt 32 — 404: cây hơi héo** · AR **16:9** · `404-plant.jpg`
```
A single potted plant with one gently drooping leaf, endearing not sad, lots of empty warm cream space around it, editorial botanical photography, soft daylight from the left, muted palette, fine film grain, natural color, photorealistic, high detail
```

**Prompt 33 — OG / social share** · AR **16:9** (crop 1200×630) · `og-image.jpg` · `og-image`
```
Brand key visual: one blooming blush-pink flower on warm cream paper with generous empty negative space for a logo, centered composition, editorial botanical photography, soft daylight, muted warm palette, fine film grain, natural color, photorealistic, high detail
```

---

## ✅ Checklist cho ngày mai
- [ ] Set model Phoenix/Lucid + negative prompt + seed cố định
- [ ] Làm trước nhóm **D (11–13)** để lấy 1 ảnh style-reference chuẩn
- [ ] Generate lần lượt 4→33, tải về, đặt tên theo gợi ý
- [ ] Chỉnh màu đồng bộ 1 preset → bỏ vào `E:\Claude\bluhwerk\public\images\`
- [ ] Nhắn mình để thay placeholder `data-img` bằng ảnh thật (mình sẽ nối `next/image`)

*Nghỉ ngơi cho khoẻ nhé — mai làm tiếp nhẹ nhàng. 🌿*
