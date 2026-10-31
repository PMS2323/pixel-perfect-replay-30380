import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { CATEGORIES, PRODUCTS, mxn, type CategoryId, type Product } from "@/data/catalog";
import { btnCls } from "@/components/Btn";
import { cn } from "@/lib/utils";

const search = z.object({ cat: z.enum(["vasos", "camisas", "dulceros", "globos"]).optional() });

export const Route = createFileRoute("/productos")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Productos | Sueña y Crea – Papelería Creativa" },
      { name: "description", content: "Catálogo de vasos, camisas, dulceros y globos personalizados con precios en MXN." },
      { property: "og:title", content: "Catálogo – Sueña y Crea" },
      { property: "og:description", content: "Explora nuestros productos personalizados por categoría." },
    ],
  }),
  component: Productos,
});

export function ProductCard({ p }: { p: Product }) {
  return (
    <article className="lift group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-soft">
      <div className="aspect-square overflow-hidden bg-muted">
        <img src={p.image} alt={p.name} width={1024} height={1024} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold">{p.name}</h3>
        <p className="mt-1 flex-1 text-sm text-muted-foreground">{p.description}</p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="font-display text-xl font-bold text-primary">{mxn(p.price)}</span>
          <Link to="/personalizacion" search={{ producto: p.id }} className={btnCls({ variant: "lilac", size: "sm" })} aria-label={`Personalizar ${p.name}`}>
            Personalizar
          </Link>
        </div>
      </div>
    </article>
  );
}

function Productos() {
  const { cat } = Route.useSearch();
  const active: CategoryId = cat ?? "vasos";
  const current = CATEGORIES.find((c) => c.id === active)!;
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-center text-4xl font-bold text-primary">Nuestros productos</h1>
      <p className="mt-2 text-center text-muted-foreground">Elige una categoría para ver sus productos.</p>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4" role="group" aria-label="Categorías">
        {CATEGORIES.map((c) => (
          <Link key={c.id} to="/productos" search={{ cat: c.id }} resetScroll={false}
            aria-pressed={c.id === active}
            className={cn("lift rounded-full border-2 px-4 py-3 text-center font-display font-semibold", c.tone, c.id === active ? "border-primary text-primary shadow-lift" : "border-transparent text-foreground/80")}>
            {c.name}
          </Link>
        ))}
      </div>
      <h2 className="mt-14 text-2xl font-semibold">{current.name}</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.filter((p) => p.category === active).map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}
