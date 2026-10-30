import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const btn = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition duration-300 hover:-translate-y-0.5 hover:shadow-lift disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        olive: "bg-olive text-olive-foreground",
        pink: "bg-pink text-primary-foreground",
        lilac: "bg-lilac text-primary-foreground",
        whatsapp: "bg-whatsapp text-primary-foreground",
        soft: "bg-secondary text-secondary-foreground",
      },
      size: { md: "px-6 py-3", sm: "px-4 py-2 text-sm", lg: "px-8 py-4 text-lg" },
    },
    defaultVariants: { variant: "pink", size: "md" },
  },
);

export type BtnProps = VariantProps<typeof btn>;
export const btnCls = (p: BtnProps & { className?: string }) => cn(btn(p), p.className);
