// Edita aquí productos, precios, fotos y datos del negocio.
import vasos from "@/assets/vasos.jpg";
import camisas from "@/assets/camisas.jpg";
import dulceros from "@/assets/dulceros.jpg";
import globos from "@/assets/globos.jpg";
import vasoNombre from "@/assets/products/vaso-nombre.jpg";
import vasoFrase from "@/assets/products/vaso-frase.jpg";
import vasoIlustracion from "@/assets/products/vaso-ilustracion.jpg";
import vasoCumple from "@/assets/products/vaso-cumple.jpg";
import camisaNombre from "@/assets/products/camisa-nombre.jpg";
import camisaCaricatura from "@/assets/products/camisa-caricatura.jpg";
import camisaFrase from "@/assets/products/camisa-frase.jpg";
import camisaEvento from "@/assets/products/camisa-evento.jpg";
import cajaCumple from "@/assets/products/caja-cumple.jpg";
import dulceroNombre from "@/assets/products/dulcero-nombre.jpg";
import cajaInfantil from "@/assets/products/caja-infantil.jpg";
import cajaRecuerdo from "@/assets/products/caja-recuerdo.jpg";
import globoNombre from "@/assets/products/globo-nombre.jpg";
import arregloCumple from "@/assets/products/arreglo-cumple.jpg";
import globoBurbuja from "@/assets/products/globo-burbuja.jpg";
import setGlobos from "@/assets/products/set-globos.jpg";

export const BUSINESS = {
  name: "Sueña y Crea",
  tagline: "Papelería Creativa",
  location: "Ojo de Agua de los Sauces, Asientos, Aguascalientes, México",
  phone: "449 199 70 77",
  whatsapp: "524491997077",
  email: "montoyapaola@gmail.com",
};

export type CategoryId = "vasos" | "camisas" | "dulceros" | "globos";

export interface Product {
  id: string;
  category: CategoryId;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const CATEGORIES: { id: CategoryId; name: string; image: string; tone: string }[] = [
  { id: "vasos", name: "Vasos", image: vasos, tone: "bg-pink-soft" },
  { id: "camisas", name: "Camisas", image: camisas, tone: "bg-blue-soft" },
  { id: "dulceros", name: "Dulceros y cajas de dulces", image: dulceros, tone: "bg-green-soft" },
  { id: "globos", name: "Globos", image: globos, tone: "bg-lilac-soft" },
];

export const PRODUCTS: Product[] = [
  { id: "vaso-nombre", category: "vasos", name: "Vaso con nombre 600 ml", description: "Vaso de 600 ml con popote y nombre en vinil del color que elijas.", price: 120, image: vasoNombre },
  { id: "vaso-frase", category: "vasos", name: "Vaso con frase", description: "Tu frase favorita en vinil permanente, ideal para regalar.", price: 130, image: vasoFrase },
  { id: "vaso-ilustracion", category: "vasos", name: "Vaso con ilustración", description: "Ilustración personalizada a color con acabado brillante.", price: 160, image: vasoIlustracion },
  { id: "vaso-cumple", category: "vasos", name: "Vaso para cumpleaños", description: "Diseño temático con nombre y edad del festejado.", price: 140, image: vasoCumple },

  { id: "camisa-nombre", category: "camisas", name: "Camisa con nombre", description: "Playera de algodón con nombre estampado en vinil textil.", price: 220, image: camisaNombre },
  { id: "camisa-caricatura", category: "camisas", name: "Camisa con caricatura", description: "Diseño de caricatura a todo color, suave al tacto.", price: 260, image: camisaCaricatura },
  { id: "camisa-frase", category: "camisas", name: "Camisa con frase", description: "Frase personalizada con la tipografía que más te guste.", price: 230, image: camisaFrase },
  { id: "camisa-evento", category: "camisas", name: "Camisa temática para eventos", description: "Perfecta para fiestas, graduaciones o viajes en grupo.", price: 250, image: camisaEvento },

  { id: "caja-cumple", category: "dulceros", name: "Caja de dulces de cumpleaños", description: "Caja decorada con dulces surtidos y nombre del festejado.", price: 85, image: cajaCumple },
  { id: "dulcero-nombre", category: "dulceros", name: "Dulcero con nombre", description: "Bolsita dulcera con moño y etiqueta personalizada.", price: 60, image: dulceroNombre },
  { id: "caja-infantil", category: "dulceros", name: "Caja temática infantil", description: "Personajes y colores a elección para fiestas infantiles.", price: 90, image: cajaInfantil },
  { id: "caja-recuerdo", category: "dulceros", name: "Caja para recuerdos", description: "Caja elegante para bodas, bautizos y XV años.", price: 75, image: cajaRecuerdo },

  { id: "globo-nombre", category: "globos", name: "Globo con nombre", description: "Globo burbuja con nombre en vinil del color que prefieras.", price: 180, image: globoNombre },
  { id: "arreglo-cumple", category: "globos", name: "Arreglo de cumpleaños", description: "Arreglo de globos en tonos pastel con número o nombre.", price: 450, image: arregloCumple },
  { id: "globo-burbuja", category: "globos", name: "Globo burbuja decorado", description: "Globo burbuja con mini globos dentro, moño y listones.", price: 320, image: globoBurbuja },
  { id: "set-globos", category: "globos", name: "Conjunto para celebraciones", description: "Set de globos coordinados para decorar tu evento.", price: 550, image: setGlobos },
];

export const mxn = (n: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(n);

export const waLink = (text?: string) =>
  `https://wa.me/${BUSINESS.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
