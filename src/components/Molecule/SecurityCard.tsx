import React from "react";
import { motion } from "framer-motion";

function SecurityCard({ cred, i }) {
  return (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: i * 0.07,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="bento-card bento-card-frosted rounded-xl p-6 flex flex-col gap-3"
    >
      <div className="flex h-55 w-55 items-center justify-center rounded-lg bg-primary/10">
        <cred.icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="text-sm font-semibold text-foreground leading-snug">
        {cred.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {cred.desc}
      </p>
    </motion.div>
  );
}

export default SecurityCard;
