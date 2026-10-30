import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/data/catalog";
import { btnCls } from "@/components/Btn";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sueña y Crea – Papelería Creativa | Detalles personalizados" },
      { name: "description", content: "Personalizamos vasos, camisas, dulceros y globos para cada celebración en Aguascalientes." },
      { property: "og:title", content: "Sueña y Crea – Papelería Creativa" },
      { property: "og:description", content: "¡Sueña, crea y sorprende! Detalles personalizados para cada ocasión." },
    ],
  }),
  component: Index,
});

function Index() {
  const [a, b, c, d] = CATEGORIES as [typeof CATEGORIES[number], typeof CATEGORIES[number], typeof CATEGORIES[number], typeof CATEGORIES[number]];
  return (
    <section className="dotted-bg relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 md:grid-cols-2 md:py-20">
        <div className="animate-in fade-in slide-in-from-left-4 duration-700">
          <span className="inline-block rounded-full bg-lilac-soft px-4 py-1 text-sm font-semibold text-secondary-foreground">✦ Papelería creativa</span>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-primary md:text-6xl">¡Sueña, crea y sorprende!</h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Personalizamos cada detalle para convertir tus ideas en algo especial. Desde vasos y camisas estampadas hasta cajas de dulces y decoración con globos, creamos piezas únicas para celebrar, regalar y llenar de alegría cada ocasión.
          </p>
        </div>
        <div className="grid grid-cols-6 grid-rows-6 gap-3 aspect-square">
          {[
            { c: a, cls: "col-span-4 row-span-3 -rotate-2" },
            { c: b, cls: "col-span-2 row-span-3 translate-y-6 rotate-3" },
            { c: c, cls: "col-span-3 row-span-3 rotate-2" },
            { c: d, cls: "col-span-3 row-span-3 -rotate-1 translate-y-2" },
          ].map(({ c, cls }, i) => (
            <figure key={c.id} className={`${cls} overflow-hidden rounded-3xl border-4 border-background shadow-soft transition duration-500 hover:z-10 hover:rotate-0 hover:scale-105`}>
              <img src={c.image} alt={c.name} width={1024} height={1024} loading={i ? "lazy" : "eager"} className="h-full w-full object-cover" />
            </figure>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 pb-16">
        <Link to="/productos" className={btnCls({ variant: "olive", size: "lg" })}>Ver productos</Link>
        <Link to="/personalizacion" className={btnCls({ variant: "lilac", size: "lg" })}>Personalizar</Link>
      </div>
    </section>
  );
}
