import React from "react";
import { motion } from "framer-motion";

function AnimatedWords({
  text,
  className,
  delay = 0,
  animate: useAnimateMode = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  animate?: boolean;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => {
        const sharedProps = {
          initial: { opacity: 0, y: 20, x: i % 2 === 0 ? -15 : 15 },
          transition: {
            duration: 0.6,
            delay: delay + i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          },
          className: "inline-block mr-[0.25em]",
        };
        if (useAnimateMode) {
          return (
            <motion.span
              key={i}
              {...sharedProps}
              animate={{ opacity: 1, y: 0, x: 0 }}
            >
              {word}
            </motion.span>
          );
        }
        return (
          <motion.span
            key={i}
            {...sharedProps}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true }}
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}

export default AnimatedWords;
