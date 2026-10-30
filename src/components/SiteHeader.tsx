import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BUSINESS } from "@/data/catalog";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/productos", label: "Productos" },
  { to: "/personalizacion", label: "Personalización" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="Sueña y Crea, inicio">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-pink-soft text-2xl shadow-soft">✿</span>
      <span className="leading-tight">
        <span className="block font-display text-xl font-semibold text-primary">{BUSINESS.name}</span>
        <span className="block text-xs font-semibold tracking-wide text-lilac">{BUSINESS.tagline}</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Logo />
        <nav className="hidden gap-1 md:flex" aria-label="Principal">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }}
              className="rounded-full px-4 py-2 font-display font-medium text-foreground/80 transition hover:bg-pink-soft hover:text-primary"
              activeProps={{ className: "bg-pink-soft text-primary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <button className="rounded-full p-2 md:hidden" aria-label="Abrir menú" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 px-4 pb-4 md:hidden" aria-label="Móvil">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-2 font-display hover:bg-pink-soft">{n.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t bg-pink-soft/50 py-8 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} {BUSINESS.name} – {BUSINESS.tagline} · Hecho con ♡ en Aguascalientes
    </footer>
  );
}
