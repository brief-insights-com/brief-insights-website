import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children?: ReactNode;
  className?: string;
  colSpan?: 1 | 2;
}

export const BentoCard = ({
  title,
  description,
  icon: Icon,
  children,
  className,
  colSpan = 1,
}: BentoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "bento-card rounded-xl p-6 md:p-8 overflow-hidden",
        colSpan === 2 && "md:col-span-2",
        className
      )}
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-surface-3">
          <Icon className="h-5 w-5 text-foreground" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-foreground mb-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        {children && <div className="mt-6 flex-1">{children}</div>}
      </div>
    </motion.div>
  );
};
