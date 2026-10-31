import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { z } from "zod";
import { Minus, Plus, Upload, Trash2 } from "lucide-react";
import { CATEGORIES, PRODUCTS, mxn, waLink, type CategoryId } from "@/data/catalog";
import { btnCls } from "@/components/Btn";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/personalizacion")({
  validateSearch: z.object({ producto: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Personaliza tu detalle | Sueña y Crea" },
      { name: "description", content: "Sube tu diseño, elige colores, texto y cantidad para tu producto personalizado." },
      { property: "og:title", content: "Personalización – Sueña y Crea" },
      { property: "og:description", content: "Diseña tu vaso, camisa, dulcero o globo a tu gusto." },
    ],
  }),
  component: Personalizacion,
});

const VINYL = [
  { name: "Blanco", v: "oklch(1 0 0)" },
  { name: "Negro", v: "oklch(0.2 0 0)" },
  { name: "Rosa", v: "oklch(0.75 0.13 0)" },
  { name: "Azul", v: "oklch(0.72 0.1 235)" },
  { name: "Morado", v: "oklch(0.65 0.13 300)" },
  { name: "Verde", v: "oklch(0.72 0.12 150)" },
  { name: "Dorado", v: "oklch(0.78 0.12 85)" },
];
const TEMPLATES = [
  { name: "Flores", icon: "🌸" }, { name: "Corazones", icon: "💖" }, { name: "Estrellas", icon: "⭐" },
  { name: "Unicornio", icon: "🦄" }, { name: "Dinosaurio", icon: "🦖" }, { name: "Mariposa", icon: "🦋" },
];
const ICONS = ["🎂", "🎈", "🎀", "🌈", "👑", "🐻", "☁️", "✨"];

function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-3xl border bg-card p-6 shadow-soft">
      <legend className="sr-only">{title}</legend>
      <h2 className="mb-4 flex items-center gap-3 text-xl font-semibold">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-pink-soft text-primary">{n}</span>{title}
      </h2>
      {children}
    </fieldset>
  );
}

function Personalizacion() {
  const { producto } = Route.useSearch();
  const navigate = useNavigate({ from: "/personalizacion" });
  const product = PRODUCTS.find((p) => p.id === producto) ?? PRODUCTS[0]!;
  const [cat, setCat] = useState<CategoryId>(product.category);
  useEffect(() => setCat(product.category), [product.category]);

  const [customer, setCustomer] = useState("");
  const [touched, setTouched] = useState(false);
  const [upload, setUpload] = useState<{ url: string; name: string } | null>(null);
  const [template, setTemplate] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [textColor, setTextColor] = useState("#d9668f");
  const [vinyl, setVinyl] = useState(VINYL[2]!);
  const [icons, setIcons] = useState<string[]>([]);
  const [qty, setQty] = useState(1);

  const pick = (id: string) => navigate({ search: { producto: id }, resetScroll: false });
  const onFile = (f?: File) => {
    if (!f) return;
    if (upload) URL.revokeObjectURL(upload.url);
    setUpload({ url: URL.createObjectURL(f), name: f.name });
    setTemplate(null);
  };
  const tpl = TEMPLATES.find((t) => t.name === template);

  const message = [
    `¡Hola! Quiero personalizar un producto de Sueña y Crea:`,
    `• Producto: ${product.name} (${CATEGORIES.find((c) => c.id === product.category)!.name})`,
    `• Diseño: ${upload ? `imagen propia (${upload.name}) – te la envío por aquí` : tpl ? `plantilla ${tpl.name}` : "sin imagen"}`,
    text && `• Texto: "${text}" (color ${textColor})`,
    `• Color de vinil: ${vinyl.name}`,
    icons.length ? `• Decoraciones: ${icons.join(" ")}` : "",
    `• Cantidad: ${qty}`,
    `• Subtotal estimado: ${mxn(product.price * qty)}`,
  ].filter(Boolean).join("\n");

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-center text-4xl font-bold text-primary">Personaliza tu detalle</h1>
      <p className="mt-2 text-center text-muted-foreground">Cuéntanos cómo lo imaginas y nosotros lo hacemos realidad.</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <Step n="A" title="Selecciona tu producto">
            <div className="flex flex-col gap-4 sm:flex-row">
              <img src={product.image} alt={product.name} width={1024} height={1024} className="h-32 w-32 rounded-2xl object-cover" />
              <div className="flex-1 space-y-3">
                <p className="font-display text-lg font-semibold">{product.name}</p>
                <label className="block text-sm font-semibold">Categoría
                  <select value={cat} onChange={(e) => { const c = e.target.value as CategoryId; setCat(c); pick(PRODUCTS.find((p) => p.category === c)!.id); }}
                    className="mt-1 w-full rounded-xl border bg-background px-3 py-2">
                    {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </label>
                <label className="block text-sm font-semibold">Producto
                  <select value={product.id} onChange={(e) => pick(e.target.value)} className="mt-1 w-full rounded-xl border bg-background px-3 py-2">
                    {PRODUCTS.filter((p) => p.category === cat).map((p) => <option key={p.id} value={p.id}>{p.name} – {mxn(p.price)}</option>)}
                  </select>
                </label>
              </div>
            </div>
          </Step>

          <Step n="B" title="Sube tu diseño o elige una plantilla">
            <div className="flex flex-wrap items-center gap-3">
              <label className={btnCls({ variant: "soft", size: "sm", className: "cursor-pointer" })}>
                <Upload className="h-4 w-4" /> Subir imagen
                <input type="file" accept="image/*" className="sr-only" onChange={(e) => { onFile(e.target.files?.[0]); e.target.value = ""; }} />
              </label>
              {(upload || template) && (
                <button type="button" onClick={() => { if (upload) URL.revokeObjectURL(upload.url); setUpload(null); setTemplate(null); }}
                  className={btnCls({ variant: "soft", size: "sm" })}><Trash2 className="h-4 w-4" /> Quitar imagen</button>
              )}
              <span className="text-xs text-muted-foreground">PNG, JPG o SVG para stickers, vinil o estampado.</span>
            </div>
            <p className="mt-5 mb-2 text-sm font-semibold">O elige una plantilla:</p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {TEMPLATES.map((t) => (
                <button key={t.name} type="button" aria-pressed={template === t.name}
                  onClick={() => { setTemplate(t.name); if (upload) URL.revokeObjectURL(upload.url); setUpload(null); }}
                  className={cn("lift rounded-2xl border-2 bg-lilac-soft p-3 text-center", template === t.name ? "border-primary" : "border-transparent")}>
                  <span className="block text-3xl">{t.icon}</span><span className="text-xs font-semibold">{t.name}</span>
                </button>
              ))}
            </div>
          </Step>

          <Step n="C" title="Personaliza tu diseño">
            <label className="block text-sm font-semibold">Escribe el texto que deseas incluir
              <input value={text} onChange={(e) => setText(e.target.value)} maxLength={40} placeholder="Ej. Sofía 8 años"
                className="mt-1 w-full rounded-xl border bg-background px-3 py-2" />
            </label>
            <label className="mt-4 flex items-center gap-3 text-sm font-semibold">Color del texto
              <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="h-9 w-14 cursor-pointer rounded-lg border" />
            </label>
            <p className="mt-4 mb-2 text-sm font-semibold">Color del vinil: <span className="font-normal">{vinyl.name}</span></p>
            <div className="flex flex-wrap gap-2">
              {VINYL.map((v) => (
                <button key={v.name} type="button" aria-label={`Vinil ${v.name}`} aria-pressed={vinyl.name === v.name} onClick={() => setVinyl(v)}
                  style={{ background: v.v }}
                  className={cn("h-10 w-10 rounded-full border-2 shadow-soft transition hover:scale-110", vinyl.name === v.name ? "border-primary ring-2 ring-ring ring-offset-2" : "border-border")} />
              ))}
            </div>
            <p className="mt-4 mb-2 text-sm font-semibold">Iconos decorativos</p>
            <div className="flex flex-wrap gap-2">
              {ICONS.map((i) => (
                <button key={i} type="button" aria-pressed={icons.includes(i)} onClick={() => setIcons((s) => s.includes(i) ? s.filter((x) => x !== i) : [...s, i])}
                  className={cn("h-11 w-11 rounded-xl border-2 bg-green-soft text-xl transition hover:scale-110", icons.includes(i) ? "border-primary" : "border-transparent")}>{i}</button>
              ))}
            </div>
          </Step>

          <Step n="D" title="Cantidad de productos">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <button type="button" aria-label="Disminuir cantidad" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-10 w-10 place-items-center rounded-full bg-secondary"><Minus className="h-4 w-4" /></button>
                <input aria-label="Cantidad" type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))} className="w-20 rounded-xl border bg-background px-3 py-2 text-center" />
                <button type="button" aria-label="Aumentar cantidad" onClick={() => setQty((q) => q + 1)} className="grid h-10 w-10 place-items-center rounded-full bg-secondary"><Plus className="h-4 w-4" /></button>
              </div>
              <p className="text-sm">Precio unitario: <b>{mxn(product.price)}</b></p>
              <p className="text-sm">Subtotal estimado: <b className="text-primary">{mxn(product.price * qty)}</b></p>
            </div>
          </Step>

          <Step n="E" title="Indicaciones del pedido">
            <p className="rounded-2xl bg-pink-soft p-4 font-semibold text-accent-foreground">
              Recuerda: después de personalizar tu detalle, contáctanos para recibir las indicaciones del pago y confirmar la fecha de entrega.
            </p>
            <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className={btnCls({ variant: "whatsapp", className: "mt-4" })}>
              <WhatsAppIcon /> Enviar solicitud por WhatsApp
            </a>
            {upload && <p className="mt-2 text-xs text-muted-foreground">Al abrir WhatsApp, adjunta tu imagen en la conversación.</p>}
          </Step>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit rounded-3xl border bg-card p-6 shadow-soft">
          <h2 className="text-xl font-semibold">Vista previa</h2>
          <div className="relative mt-4 aspect-square overflow-hidden rounded-2xl bg-muted">
            <img src={product.image} alt="" width={1024} height={1024} className="h-full w-full object-cover opacity-40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
              {upload && <img src={upload.url} alt="Tu diseño" className="max-h-32 max-w-[70%] rounded-xl object-contain" />}
              {tpl && <span className="text-6xl">{tpl.icon}</span>}
              {text && <span className="font-display text-3xl font-bold break-words" style={{ color: textColor }}>{text}</span>}
              {icons.length > 0 && <span className="text-2xl">{icons.join(" ")}</span>}
              {!upload && !tpl && !text && !icons.length && <span className="text-sm text-muted-foreground">Tu diseño aparecerá aquí</span>}
            </div>
            <span className="absolute bottom-3 right-3 h-6 w-6 rounded-full border-2 border-background" style={{ background: vinyl.v }} title={`Vinil ${vinyl.name}`} />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Vista previa aproximada; afinamos los detalles contigo.</p>
        </aside>
      </div>
    </section>
  );
}
