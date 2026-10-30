import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { MapPin, Phone, Mail } from "lucide-react";
import { BUSINESS, waLink } from "@/data/catalog";
import { btnCls } from "@/components/Btn";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | Sueña y Crea – Papelería Creativa" },
      { name: "description", content: "Platícanos tu idea por WhatsApp, teléfono o correo. Respondemos en menos de 24 horas." },
      { property: "og:title", content: "Contacto – Sueña y Crea" },
      { property: "og:description", content: "Platícanos tu idea, la hacemos realidad." },
    ],
  }),
  component: Contacto,
});

const schema = z.object({
  nombre: z.string().trim().min(2, "Escribe tu nombre completo").max(100),
  telefono: z.string().trim().regex(/^[\d\s+()-]{10,15}$/, "Escribe un teléfono válido de 10 dígitos"),
  correo: z.string().trim().email("Escribe un correo válido").max(255),
  necesidad: z.string().min(1, "Elige una opción"),
  mensaje: z.string().trim().min(10, "Cuéntanos un poco más (mínimo 10 caracteres)").max(1000),
});
type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const field = "mt-1 w-full rounded-xl border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring";

function Contacto() {
  const [errors, setErrors] = useState<Errors>({});
  const [ready, setReady] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Errors = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as keyof Errors] ??= i.message; });
      setErrors(errs); setReady(false); return;
    }
    setErrors({});
    const d = r.data;
    // TODO: conectar a un servicio de correo para envío directo.
    const body = `Nombre: ${d.nombre}\nTeléfono: ${d.telefono}\nCorreo: ${d.correo}\nNecesito: ${d.necesidad}\n\n${d.mensaje}`;
    window.location.href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(`Solicitud de ${d.nombre} – ${d.necesidad}`)}&body=${encodeURIComponent(body)}`;
    setReady(true);
  };

  const Err = ({ k }: { k: keyof Errors }) => errors[k] ? <span role="alert" className="mt-1 block text-xs text-destructive">{errors[k]}</span> : null;

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2">
      <div>
        <h1 className="text-4xl font-bold text-primary">Contacto</h1>
        <p className="mt-3 text-lg text-muted-foreground">Platícanos tu idea, la hacemos realidad. Te responderemos con una propuesta personalizada en menos de 24 horas.</p>
        <ul className="mt-8 space-y-5">
          {[
            { I: MapPin, t: BUSINESS.location },
            { I: Phone, t: BUSINESS.phone, href: `tel:+52${BUSINESS.phone.replace(/\s/g, "")}` },
            { I: Mail, t: BUSINESS.email, href: `mailto:${BUSINESS.email}` },
          ].map(({ I, t, href }) => (
            <li key={t} className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-pink-soft text-primary"><I className="h-5 w-5" /></span>
              {href ? <a href={href} className="pt-2 hover:text-primary">{t}</a> : <span className="pt-2">{t}</span>}
            </li>
          ))}
          <li className="flex items-center gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-whatsapp text-primary-foreground"><WhatsAppIcon /></span>
            <a href={waLink("¡Hola! Me gustaría información sobre sus productos personalizados.")} target="_blank" rel="noopener noreferrer" className={btnCls({ variant: "whatsapp", size: "sm" })}>
              Escríbenos por WhatsApp
            </a>
          </li>
        </ul>
      </div>

      <form noValidate onSubmit={onSubmit} className="space-y-4 rounded-3xl border-2 border-pink-soft bg-card p-6 shadow-soft">
        <label className="block text-sm font-semibold">Nombre completo<input name="nombre" className={field} autoComplete="name" /><Err k="nombre" /></label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold">Teléfono<input name="telefono" type="tel" className={field} autoComplete="tel" /><Err k="telefono" /></label>
          <label className="block text-sm font-semibold">Correo electrónico<input name="correo" type="email" className={field} autoComplete="email" /><Err k="correo" /></label>
        </div>
        <label className="block text-sm font-semibold">¿Qué necesitas?
          <select name="necesidad" defaultValue="" className={field}>
            <option value="" disabled>Selecciona una opción</option>
            <option>Vasos</option><option>Camisas</option><option>Dulceros y cajas de dulces</option><option>Globos</option><option>Otro</option>
          </select><Err k="necesidad" />
        </label>
        <label className="block text-sm font-semibold">Mensaje<textarea name="mensaje" rows={5} className={field} placeholder="Cuéntanos tu idea…" /><Err k="mensaje" /></label>
        <button type="submit" className={btnCls({ variant: "pink", className: "w-full" })}>Enviar mensaje</button>
        {ready && (
          <p role="status" className="rounded-xl bg-green-soft p-3 text-sm">
            Abrimos tu aplicación de correo con el mensaje listo. Presiona “Enviar” ahí para que nos llegue. Si no se abrió, escríbenos por WhatsApp.
          </p>
        )}
      </form>
    </section>
  );
}
