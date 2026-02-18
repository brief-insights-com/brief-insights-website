import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BentoGrid } from "@/components/BentoGrid";
import { BentoCard } from "@/components/BentoCard";
import {
  ScanText,
  ShieldCheck,
  Zap,
  Workflow,
  FileWarning,
  Plug,
  ArrowRight,
  Clock,
  CheckCheck,
  MoveRight,
  Menu,
  Mail,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import DemoModal from "@/components/DemoModal";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import overwork from "@/assets/Gemini_Generated_Overwork.png";
import paperworkBurden from "@/assets/Gemini_Generated_Paperwork_Burden.png";
import manualProcess from "@/assets/Gemini_Generated_Manual_Process.png";
import digitalSolution from "@/assets/Gemini_Generated_Digital_Solution.png";
import logoImg from "@/assets/Brief_Insights_name_color.png";
import heroVideo from "@/assets/Video_Generation_for_Counselor_Paperwork.mp4";

// ─── AnimatedWords ────────────────────────────────────────────────────────────
const AnimatedWords = ({
  text,
  className,
  delay = 0,
  animate: useAnimateMode = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  animate?: boolean;
}) => {
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
            <motion.span key={i} {...sharedProps} animate={{ opacity: 1, y: 0, x: 0 }}>
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
};

// ─── Navbar ────────────────────────────────────────────────────────────────
const Navbar = ({ onRequestDemo }: { onRequestDemo: () => void }) => {
  const { t } = useTranslation();

  const navLinks = [
    { href: "#problem", label: t("nav.problem") },
    { href: "#product", label: t("nav.product") },
    { href: "#before-after", label: t("nav.results") },
    { href: "#about", label: t("nav.about") },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b border-foreground/5"
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center shrink-0">
          <img
            src={logoImg}
            alt="BriefInsights"
            className="h-8 w-auto object-contain dark:brightness-[1.15]"
          />
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Desktop CTA */}
          <button
            onClick={onRequestDemo}
            className="hidden md:inline-flex text-sm font-medium text-primary-foreground bg-primary px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity ml-2"
          >
            {t("nav.requestDemo")}
          </button>

          {/* Mobile hamburger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-9 w-9 ml-1">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 flex flex-col gap-6 pt-12">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <button
                onClick={onRequestDemo}
                className="text-sm font-medium text-primary-foreground bg-primary px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-center"
              >
                {t("nav.requestDemo")}
              </button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

// ─── Hero ───────────────────────────────────────────────────────────────────
const Hero = ({ onRequestDemo }: { onRequestDemo: () => void }) => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-bleed background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Cinematic dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Subtle vignette — darkens edges for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 pt-14">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-8"
        >
          AI Document Processing · Munich, Germany
        </motion.p>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          <AnimatedWords
            text={t("hero.title1")}
            className="block text-white"
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
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex items-center justify-center gap-4"
        >
          <button
            onClick={onRequestDemo}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground bg-primary px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/40"
          >
            {t("hero.cta")}
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" })}
            className="text-sm font-medium text-white/60 hover:text-white transition-colors px-6 py-2.5 border border-white/20 rounded-lg hover:border-white/40"
          >
            {t("hero.secondary")}
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
};

// ─── Stats Bar ──────────────────────────────────────────────────────────────
const StatsBar = () => {
  const { t } = useTranslation();

  const stats = [
    { value: "90%", label: t("stats.timeSaved") },
    { value: "~15 min", label: t("stats.downFrom") },
    { value: "4,000+", label: t("stats.counselors") },
    { value: "120", label: t("stats.pilotUsers") },
  ];

  return (
    <section className="bg-section-orange px-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/10 rounded-xl overflow-hidden border border-foreground/10"
      >
        {stats.map((s, i) => (
          <div key={i} className="bg-background/80 px-8 py-7 flex flex-col gap-1">
            <span className="text-3xl font-bold text-primary tracking-tight">{s.value}</span>
            <span className="text-sm text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

// ─── Problem Visual ─────────────────────────────────────────────────────────
const ProblemVisual = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97]);

  return (
    <section id="problem" ref={ref} className="bg-background px-6 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Main parallax image — the emotional peak: exhausted counselor working late */}
        <motion.div
          style={{ scale }}
          className="relative rounded-2xl overflow-hidden border border-border/40 mb-6"
        >
          <motion.img
            style={{ y, height: "480px", objectPosition: "center 30%" }}
            src={overwork}
            alt="Debt counselor exhausted, asleep on stacks of paper late at night"
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3"
            >
              {t("problem.label")}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl leading-tight"
            >
              {t("problem.title")}
            </motion.h2>
          </div>
        </motion.div>

        {/* Two-column caption row */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Left card — manual review image: close-up of magnifying glass on documents */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-xl overflow-hidden border border-border/40"
            style={{ minHeight: "160px" }}
          >
            <img
              src={manualProcess}
              alt="Close-up of manual document review with magnifying glass"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/40" />
            <div className="relative z-10 p-6 flex gap-4 items-start">
              <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{t("problem.hoursTitle")}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("problem.hoursDesc")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right card — paperwork burden: stressed counselor with stacks of binders */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative rounded-xl overflow-hidden border border-border/40"
            style={{ minHeight: "160px" }}
          >
            <img
              src={paperworkBurden}
              alt="Counselor overwhelmed by stacks of binders and paper files"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/40" />
            <div className="relative z-10 p-6">
              <h4 className="text-sm font-semibold text-foreground mb-1">{t("problem.debtTitle")}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("problem.debtDesc")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── Features ───────────────────────────────────────────────────────────────
const Features = () => {
  const { t } = useTranslation();

  const extractionRows = [
    { label: t("bentoMock.creditor"), value: "Vodafone GmbH", conf: "99%" },
    { label: t("bentoMock.amount"), value: "€ 847.30", conf: "98%" },
    { label: t("bentoMock.fileNo"), value: "RIV-2024-88412", conf: "97%" },
    { label: t("bentoMock.dueDate"), value: "15 Jan 2025", conf: "96%" },
  ];

  const caseDocuments = [
    { label: t("bentoMock.doc1"), linked: true },
    { label: t("bentoMock.doc2"), linked: true },
    { label: t("bentoMock.doc3"), linked: false },
  ];

  return (
    <section id="product" className="bg-section-blue px-6 py-24">
      <div className="max-w-6xl mx-auto mb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-4"
        >
          {t("features.label")}
        </motion.p>
        <h2 className="font-serif italic text-5xl md:text-6xl text-foreground leading-tight">
          <AnimatedWords text={t("features.title1")} className="block" delay={0.1} />
          <AnimatedWords text={t("features.title2")} className="block text-foreground/50" delay={0.3} />
        </h2>
      </div>

      <BentoGrid>
        <BentoCard
          title={t("features.extraction")}
          description={t("features.extractionDesc")}
          icon={ScanText}
          colSpan={2}
          className="bento-card-frosted"
        >
          <div className="h-32 rounded-lg bg-surface-3/50 border border-border/50 p-4 font-mono text-xs text-muted-foreground space-y-2 overflow-hidden">
            {extractionRows.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between"
              >
                <span className="text-muted-foreground/60 w-24 shrink-0">{row.label}</span>
                <span className="text-foreground flex-1">{row.value}</span>
                <span className="text-status-online">{row.conf}</span>
              </motion.div>
            ))}
          </div>
        </BentoCard>

        <BentoCard
          title={t("features.gdpr")}
          description={t("features.gdprDesc")}
          icon={ShieldCheck}
          className="bento-card-frosted"
        />

        <BentoCard
          title={t("features.urgency")}
          description={t("features.urgencyDesc")}
          icon={FileWarning}
          className="bento-card-frosted"
        />

        <BentoCard
          title={t("features.caseEngine")}
          description={t("features.caseEngineDesc")}
          icon={Workflow}
          colSpan={2}
          className="bento-card-frosted"
        >
          <div className="h-20 rounded-lg bg-surface-3/50 border border-border/50 flex items-center px-4 gap-3 flex-wrap">
            {caseDocuments.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface-2 border border-border/50 text-xs text-muted-foreground"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${item.linked ? "bg-status-online" : "bg-primary"}`} />
                {item.label}
              </div>
            ))}
            <div className="text-xs text-muted-foreground/50 ml-auto">{t("bentoMock.masterCase")}</div>
          </div>
        </BentoCard>

        <BentoCard
          title={t("features.faster")}
          description={t("features.fasterDesc")}
          icon={Zap}
          className="bento-card-frosted"
        />

        <BentoCard
          title={t("features.vivendi")}
          description={t("features.vivendiDesc")}
          icon={Plug}
          className="bento-card-frosted"
        />
      </BentoGrid>
    </section>
  );
};

// ─── Before / After ─────────────────────────────────────────────────────────
const BeforeAfter = () => {
  const { t } = useTranslation();

  const beforeItems = [
    t("beforeAfter.before1"),
    t("beforeAfter.before2"),
    t("beforeAfter.before3"),
    t("beforeAfter.before4"),
    t("beforeAfter.before5"),
  ];

  const afterItems = [
    t("beforeAfter.after1"),
    t("beforeAfter.after2"),
    t("beforeAfter.after3"),
    t("beforeAfter.after4"),
    t("beforeAfter.after5"),
  ];

  return (
    <section id="before-after" className="bg-section-blue px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-4">
            {t("beforeAfter.label")}
          </p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-foreground leading-tight">
            <AnimatedWords text={t("beforeAfter.title")} delay={0.1} />
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bento-card bento-card-frosted rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="h-2 w-2 rounded-full bg-destructive" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("beforeAfter.beforeLabel")}</span>
            </div>
            <ul className="space-y-4">
              {beforeItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <Clock className="h-4 w-4 shrink-0 mt-0.5 text-destructive/60" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center pt-14"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background/60 border border-foreground/10">
              <MoveRight className="h-4 w-4 text-foreground" />
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bento-card bento-card-frosted rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="h-2 w-2 rounded-full bg-status-online animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("beforeAfter.afterLabel")}</span>
            </div>
            <ul className="space-y-4">
              {afterItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.2 }}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <CheckCheck className="h-4 w-4 shrink-0 mt-0.5 text-status-online" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Animated time bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-6 bento-card bento-card-frosted rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground font-mono">{t("beforeAfter.timePerCase")}</span>
            <span className="text-xs font-semibold text-status-online">{t("beforeAfter.reduction")}</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>{t("beforeAfter.manualAvg")}</span>
                <span>{t("beforeAfter.manualMin")}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-surface-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                  className="h-full rounded-full bg-destructive/50"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>{t("beforeAfter.withBriefXtract")}</span>
                <span>{t("beforeAfter.fifteenMin")}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-surface-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "10%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                  className="h-full rounded-full bg-status-online"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── About ──────────────────────────────────────────────────────────────────
const About = ({ onRequestDemo }: { onRequestDemo: () => void }) => {
  const { t } = useTranslation();

  const stats = [
    { label: t("about.stat1Label"), value: t("about.stat1Value") },
    { label: t("about.stat2Label"), value: t("about.stat2Value") },
    { label: t("about.stat3Label"), value: t("about.stat3Value") },
  ];

  return (
    <section id="about" className="bg-section-orange px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-4">
            {t("about.label")}
          </p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-foreground leading-tight">
            <AnimatedWords text={t("about.title")} delay={0.1} />
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left card — Digital Solution image header + mission text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bento-card bento-card-frosted rounded-xl overflow-hidden flex flex-col"
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={digitalSolution}
                alt="Counselor smiling, efficiently using BriefXtract on a tablet"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            <div className="p-8 flex flex-col gap-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{t("about.mission")}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("about.team")}</p>
            </div>
          </motion.div>

          {/* Right card — stats + contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bento-card bento-card-frosted rounded-xl p-8 flex flex-col justify-between gap-6"
          >
            <div className="space-y-4">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between border-b border-foreground/10 pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-semibold text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onRequestDemo}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-primary-foreground bg-primary px-5 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-md shadow-primary/25"
              >
                {t("about.contact")}
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={`mailto:${t("about.contactEmail")}`}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-foreground/60 border border-foreground/20 px-5 py-2 rounded-lg hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                <Mail className="h-4 w-4" />
                {t("about.contactEmail")}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── Footer ──────────────────────────────────────────────────────────────────
const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-section-orange px-6 pt-20 pb-16">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="font-serif italic text-6xl md:text-8xl text-foreground leading-none mb-6">
            <AnimatedWords text={t("footer.cta")} delay={0} />
          </h2>
          <a
            href="mailto:hello@briefinsights.de"
            className="text-lg text-foreground/60 hover:text-primary transition-colors underline underline-offset-4 decoration-foreground/20 hover:decoration-primary/60"
          >
            hello@briefinsights.de
          </a>
        </motion.div>

        <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/50">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Brief<span className="text-primary">Insights</span>
          </span>
          <div className="flex flex-col items-center gap-1">
            <span>{t("footer.gdpr")}</span>
            <span>{t("footer.zeroData")}</span>
          </div>
          <span>{t("footer.copyright")}</span>
        </div>
      </div>
    </footer>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const Index = () => {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="grain-overlay min-h-screen bg-background">
      <Navbar onRequestDemo={() => setDemoOpen(true)} />
      <Hero onRequestDemo={() => setDemoOpen(true)} />
      <StatsBar />
      <ProblemVisual />
      <Features />
      <BeforeAfter />
      <About onRequestDemo={() => setDemoOpen(true)} />
      <Footer />
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
};

export default Index;
