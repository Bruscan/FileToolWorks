# Tool Page Templates

Templates för att snabbt skapa nya verktygs-sidor.

## Snabbstart

### 1. Skapa ny verktygs-mapp
```bash
mkdir -p app/[tool-slug]
```

### 2. Kopiera templates
```bash
cp templates/tool-page-template.tsx app/[tool-slug]/page.tsx
cp templates/tool-layout-template.tsx app/[tool-slug]/layout.tsx
```

### 3. Ersätt placeholders

#### I `page.tsx`:
- `[TOOL_NAME]` → "HEIC to JPG Converter"
- `[TOOL_ID]` → "heic-to-jpg" (från lib/tools.ts)
- `[DESCRIPTION]` → Din beskrivning
- Anpassa FAQ-frågor
- Implementera conversion-logiken

#### I `layout.tsx`:
- `[TOOL_NAME]` → "HEIC to JPG Converter"
- `[SHORT_DESCRIPTION]` → "Convert HEIC to JPG instantly."
- `[tool-slug]` → "/heic-to-jpg"

### 4. Lägg till verktyget i `lib/tools.ts`
```typescript
{
  id: "heic-to-jpg",
  name: "HEIC to JPG",
  href: "/heic-to-jpg",
  description: "Convert iPhone photos to JPG format",
  category: "image",
  iconColor: "text-green-600",
}
```

### 5. Testa
```bash
npm run dev
```

Gå till `http://localhost:3000/[tool-slug]`

## Vad ingår i templaten?

✅ Hero-sektion med rating
✅ Fil-upload med drag & drop
✅ Collapsible options
✅ "How It Works"-sektion
✅ 6 FAQ-frågor
✅ Automatiska Related Tools
✅ SEO-optimerad metadata
✅ Mobilanpassad design

## Tips

- Använd samma struktur för alla verktyg (konsekvent UX)
- Anpassa FAQ-frågor för varje verktyg
- Håll beskrivningar korta och tydliga (50-150 ord)
- Testa på mobil och desktop
- Kolla att Related Tools funkar (visar rätt kategori)

## Exempel

Se `/app/image-to-pdf/` för ett komplett exempel.
