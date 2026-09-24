import React from "react";
import { motion } from "framer-motion";

function ExtractionCard( { row, i }: { row: { label: string; value: string; conf: string }; i: number }) {
  return (
    <motion.div
      key={i}
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className="flex items-center justify-between"
    >
      <span className="text-muted-foreground/60 w-24 shrink-0">
        {row.label}
      </span>
      <span className="text-foreground flex-1">{row.value}</span>
      <span className="text-status-online">{row.conf}</span>
    </motion.div>
  );
}

export default ExtractionCard;
