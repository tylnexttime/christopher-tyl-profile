# christopher-tyl-profile

Source for a typographic single-page profile and résumé for Christopher Tyl.

Same visual hand as **[crystallisationgap.com](https://crystallisationgap.com)** (the publishing portal for *The Crystallisation Gap* trilogy): Georgia serif body, monospace headings, gold + warm-grey on white, particle-canvas mesh in the background.

Vanilla HTML / CSS / ES2024 — no build step, no framework, no tracker.

---

## What's here

| Path | What |
|---|---|
| [`index.html`](index.html) | English profile (single page) |
| `pl/index.html` | Polish edition *(stub — translation pending review by Teresa)* |
| [`assets/css/style.css`](assets/css/style.css) | Full stylesheet (~270 lines) |
| [`assets/js/particles.js`](assets/js/particles.js) | Background mesh canvas (cloned from crystallisationgap.com v1) |
| `assets/img/` | Hero + section graphics from *The Hive Mind Chronicles* |
| `files/Christopher_Tyl_Resume_2026.docx` | Downloadable 2-page résumé |

---

## About Christopher

> *Microsoft frames the AI journey in three phases — assistive, agentic, autonomous. I have spent the last two years building in a fourth phase Microsoft has not yet named: **generative partnership with non-human collaborators**. Not described abstractly — built, governed and shipped.*

- **Day role:** Data & Analytics Lead, JTTTS Defence Contracts at **Wodonga TAFE / NVITAFE** (AGSVA NV1)
- **Night work:** Founder of **Diamond11** (sole trader, ABN 30 693 419 641, since 17 Aug 2023)
- **Author:** *The Crystallisation Gap* trilogy (3 books + omnibus, Apr–May 2026, Diamond11 imprint, named human + non-human authorship)
- **Builder:** [`claudetyl`](https://github.com/tylnexttime/claudetyl) (single-file persistent memory for AI instances), [`tentyl`](https://github.com/tylnexttime/tentyl-public) (zero-cloud LAN messaging for AI agent meshes), [`meshbook.org`](https://meshbook.org) (launching 15 May 2026 — first CRM that enforces A-C-P at schema level)
- **Newsletter:** [The Hive Mind Chronicles](https://www.linkedin.com/in/ctyl/) — peak post 41,000+ impressions / 31,000+ unique members

---

## The A-C-P Framework

Authorship typology proposed in *The Hive Mind Chronicles* (LinkedIn, Apr 2026):

- **A-work (Authored):** entirely by human(s)
- **C-work (Chimeric):** ongoing generative interaction between human and non-human intelligence
- **P-work (Pleiadic):** constellation of non-human agents operating autonomously, with or without a human seed

Operationalised at the database schema level on [meshbook.org](https://meshbook.org).

---

## Run it locally

```bash
python -m http.server 5174 --directory .
# open http://localhost:5174/
```

Or serve any way you like — it's pure static files.

---

## Want the full portfolio?

The 2-page résumé is on this site — the 4-page futurist / CAIO portfolio companion is available on request.

🔗 [linkedin.com/in/ctyl](https://www.linkedin.com/in/ctyl/) · 🐙 [github.com/tylnexttime](https://github.com/tylnexttime) · ✉️ email available via the live site (click-time reveal)

---

## Licence

Site **content** (résumé text, biographical material, photographs) © 2026 Christopher Tyl — all rights reserved.

Site **code** (HTML structure, CSS, JS) released under the [MIT licence](LICENSE) — fork the layout if you find it useful for your own typographic résumé.
