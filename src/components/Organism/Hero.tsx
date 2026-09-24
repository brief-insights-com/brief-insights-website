import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import heroVideo from "@/assets/Video_Generation_for_Counselor_Paperwork.mp4";
import { motion } from "framer-motion";
import AnimatedWords from "../Atoms/AnimatedWords";
import OrangeButton from "../Atoms/OrangeButton";
import DemoModal from "../DemoModal";

function Hero() {
  const { t } = useTranslation();
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Full-bleed background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover dark:grayscale dark:contrast-125 transition-all duration-700"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Cinematic dark/light overlay fading from left */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-black/95 dark:via-black/90 dark:to-black/50 w-full transition-colors duration-700" />

        {/* Subtle vignette — darkens edges for focus */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20 md:pt-32 flex flex-col items-start text-left">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xs font-semibold uppercase tracking-widest text-foreground/70 dark:text-white/50 mb-8"
            >
              Intelligent Document Processing · Berlin, Germany
            </motion.p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              <AnimatedWords
                text={t("hero.title1")}
                className="block text-foreground dark:text-white"
                delay={0.25}
                animate
              />
              <AnimatedWords
                text={t("hero.title2")}
                className="block font-serif italic font-normal tracking-normal text-primary"
                delay={0.45}
                animate
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="text-lg md:text-xl text-foreground/80 dark:text-white/70 max-w-2xl mb-10"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="flex items-center justify-start gap-4"
            >
              <OrangeButton onRequestDemo={() => setDemoOpen(true)} />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/40 uppercase tracking-widest">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </section>
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
    </>
  );
}

export default Hero;
