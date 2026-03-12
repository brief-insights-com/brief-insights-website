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
  Server,
  Trash2,
  Lock,
  Building2,
  Landmark,
  TrendingUp,
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
import bagChaos from "@/assets/Gemini_Generated_bag_chaos.png";
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
    { href: "#security", label: t("nav.security") },
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
          <div className="overflow-hidden h-9 w-auto flex items-start">
            <img
              src={logoImg}
              alt="BriefInsights"
              className="h-16 w-auto object-contain dark:brightness-[1.15]"
              style={{ transform: "translateY(-14px) scale(1.25)", transformOrigin: "top center" }}
            />
          </div>
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
            <button
              onClick={onRequestDemo}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground bg-primary px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/40"
            >
              {t("hero.cta")}
              <ArrowRight className="h-4 w-4" />
            </button>
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
  ];

  return (
    <section className="bg-section-orange px-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto grid grid-cols-3 gap-px bg-foreground/10 rounded-xl overflow-hidden border border-foreground/10"
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
            style={{ y, height: "480px", objectPosition: "center 40%" }}
            src={bagChaos}
            alt="Client arriving with a bag full of chaotic paper documents"
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
            <div className="flex h-15 w-15 items-center justify-center rounded-full bg-background/60 border border-foreground/10">
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

  return (
    <section id="about" className="bg-section-orange px-6 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
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

        {/* Mission + contact row */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Left — Digital Solution image + mission text */}
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

          {/* Right — Company facts + contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bento-card bento-card-frosted rounded-xl p-8 flex flex-col justify-between gap-6"
          >
            <div className="divide-y divide-foreground/10">
              {[
                { label: t("about.stat1Label"), value: t("about.stat1Value") },
                { label: t("about.stat2Label"), value: t("about.stat2Value") },
                { label: t("about.stat3Label"), value: t("about.stat3Value") },
                { label: t("about.stat4Label"), value: t("about.stat4Value") },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                  <span className="text-sm text-muted-foreground">{row.label}</span>
                  <span className="text-sm font-semibold text-foreground text-right">{row.value}</span>
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

// ─── Security ────────────────────────────────────────────────────────────────
const Security = () => {
  const { t } = useTranslation();

  const credentials = [
    { icon: ShieldCheck, title: t("security.gdprTitle"), desc: t("security.gdprDesc") },
    { icon: Server, title: t("security.hostingTitle"), desc: t("security.hostingDesc") },
    { icon: Trash2, title: t("security.retentionTitle"), desc: t("security.retentionDesc") },
    { icon: Landmark, title: t("security.churchTitle"), desc: t("security.churchDesc") },
    { icon: Lock, title: t("security.encryptionTitle"), desc: t("security.encryptionDesc") },
    { icon: Building2, title: t("security.infraTitle"), desc: t("security.infraDesc") },
  ];

  const badges = ["GDPR / DSGVO", "AWS · EU Hosted", "KDG", "DSG-EKD", "Zero Retention", t("security.tlsBadge")];

  return (
    <section id="security" className="bg-section-blue px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-4">
            {t("security.label")}
          </p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-foreground leading-tight mb-4 max-w-2xl">
            <AnimatedWords text={t("security.title")} delay={0.1} />
          </h2>
          <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
            {t("security.subtitle")}
          </p>
        </motion.div>

        {/* Trust badge strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {badges.map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-foreground/15 bg-background/60 backdrop-blur-sm text-xs font-medium text-foreground/70"
            >
              <CheckCheck className="h-3 w-3 text-status-online shrink-0" />
              {badge}
            </div>
          ))}
        </motion.div>

        {/* Credential grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {credentials.map((cred, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bento-card bento-card-frosted rounded-xl p-6 flex flex-col gap-3"
            >
              <div className="flex h-55 w-55 items-center justify-center rounded-lg bg-primary/10">
                <cred.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground leading-snug">{cred.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{cred.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── ROI Section ─────────────────────────────────────────────────────────────
const ROISection = ({ onRequestDemo }: { onRequestDemo: () => void }) => {
  const { t } = useTranslation();
  const [counselors, setCounselors] = useState(10);
  const [clientsPerWeek, setClientsPerWeek] = useState(8);
  const [hourlyRate, setHourlyRate] = useState(20);

  const HOURS_SAVED_PER_CASE = 3.75; // 4h manual − 0.25h with BriefXtract
  const WEEKS_PER_YEAR = 48;

  const hoursSavedPerWeek = Math.round(counselors * clientsPerWeek * HOURS_SAVED_PER_CASE);
  const hoursSavedPerYear = hoursSavedPerWeek * WEEKS_PER_YEAR;
  const eurosSaved = hoursSavedPerYear * hourlyRate;

  const fmt = (n: number) => n.toLocaleString("de-DE");
  const fmtEur = (n: number) =>
    new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  const sliders = [
    {
      label: t("roi.calc_counselors"),
      value: counselors,
      min: 1, max: 50, step: 1,
      display: String(counselors),
      onChange: (v: number) => setCounselors(v),
      minLabel: "1", maxLabel: "50",
    },
    {
      label: t("roi.calc_clients"),
      value: clientsPerWeek,
      min: 1, max: 20, step: 1,
      display: String(clientsPerWeek),
      onChange: (v: number) => setClientsPerWeek(v),
      minLabel: "1", maxLabel: "20",
    },
    {
      label: t("roi.calc_hourly"),
      value: hourlyRate,
      min: 15, max: 50, step: 1,
      display: `€${hourlyRate}`,
      onChange: (v: number) => setHourlyRate(v),
      minLabel: "€15", maxLabel: "€50",
    },
  ];

  const outputs = [
    { label: t("roi.calc_hours_week"), value: fmt(hoursSavedPerWeek), unit: "h", highlight: false },
    { label: t("roi.calc_hours_year"), value: fmt(hoursSavedPerYear), unit: "h / yr", highlight: false },
    { label: t("roi.calc_savings"), value: fmtEur(eurosSaved), unit: "", highlight: true },
  ];

  return (
    <section className="bg-background px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-4">
            {t("roi.label")}
          </p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-foreground leading-tight mb-4">
            <AnimatedWords text={t("roi.title")} delay={0.1} />
          </h2>
          <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
            {t("roi.subtitle")}
          </p>
        </motion.div>

        {/* Calculator card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="bento-card bento-card-frosted rounded-2xl p-8 mb-5"
        >
          <div className="grid md:grid-cols-2 gap-10 items-start">

            {/* Left — sliders */}
            <div className="flex flex-col gap-8">
              {sliders.map((s) => (
                <div key={s.label}>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">{s.label}</label>
                    <span className="text-lg font-bold text-primary tabular-nums">{s.display}</span>
                  </div>
                  <input
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    value={s.value}
                    onChange={(e) => s.onChange(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground/50 mt-1.5">
                    <span>{s.minLabel}</span>
                    <span>{s.maxLabel}</span>
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground/50 leading-relaxed">
                {t("roi.calc_assumption")}
              </p>
            </div>

            {/* Right — output metrics */}
            <div className="flex flex-col gap-4">
              {outputs.map((o) => (
                <div
                  key={o.label}
                  className={`rounded-xl p-5 border ${o.highlight
                    ? "bg-primary/10 border-primary/20"
                    : "bg-surface-1/60 border-foreground/10"
                    }`}
                >
                  <p className="text-xs text-muted-foreground mb-1.5">{o.label}</p>
                  <p className={`text-4xl font-bold tabular-nums ${o.highlight ? "text-primary" : "text-foreground"}`}>
                    {o.value}
                  </p>
                  {o.unit && (
                    <p className="text-xs text-muted-foreground/50 mt-1">{o.unit}</p>
                  )}
                </div>
              ))}
            </div>

          </div>
        </motion.div>

        {/* Disclaimer + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-6 bento-card bento-card-frosted rounded-xl"
        >
          <p className="text-xs text-muted-foreground/60 leading-relaxed max-w-lg">
            {t("roi.disclaimer")}
          </p>
          <button
            onClick={onRequestDemo}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground bg-primary px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/40 shrink-0"
          >
            {t("roi.ctaDemo")}
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Footer ──────────────────────────────────────────────────────────────────
const Footer = () => {
  const { t } = useTranslation();

  const productLinks = [
    { href: "#problem", label: t("footer.link_problem") },
    { href: "#product", label: t("footer.link_product") },
    { href: "#security", label: t("footer.link_security") },
    { href: "#before-after", label: t("footer.link_results") },
  ];

  const companyLinks = [
    { href: "#about", label: t("footer.link_about") },
    { href: `mailto:${t("about.contactEmail")}`, label: t("footer.link_contact") },
    { href: "#", label: t("footer.link_privacy") },
    { href: "#", label: t("footer.link_terms") },
  ];

  const complianceBadges = [
    t("footer.gdpr"),
    t("footer.zeroData"),
    "AWS · EU Hosted",
    "KDG · DSG-EKD",
  ];

  return (
    <footer className="bg-section-orange px-6 pt-20 pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 pb-16 border-b border-foreground/10"
        >
          <h2 className="font-serif italic text-6xl md:text-8xl text-foreground leading-none mb-6">
            <AnimatedWords text={t("footer.cta")} delay={0} />
          </h2>
          <a
            href="mailto:info@brief-insights.com"
            className="text-lg text-foreground/60 hover:text-primary transition-colors underline underline-offset-4 decoration-foreground/20 hover:decoration-primary/60"
          >
            info@brief-insights.com
          </a>
        </motion.div>

        {/* Navigation grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14 items-start"
        >
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="overflow-hidden max-w-[160px] mb-4">
              <img
                src={logoImg}
                alt="BriefInsights"
                className="w-full h-auto object-contain dark:brightness-[1.15]"
                style={{ transform: "scale(1.35)", transformOrigin: "center" }}
              />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Platform */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-4">
              {t("footer.productTitle")}
            </p>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-4">
              {t("footer.companyTitle")}
            </p>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-4">
              Compliance
            </p>
            <div className="space-y-2.5">
              {complianceBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CheckCheck className="h-3.5 w-3.5 text-status-online shrink-0" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-foreground/40">
          <span>{t("footer.copyright")}</span>
          <span>{t("footer.location")}</span>
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
      <Security />
      <BeforeAfter />
      <ROISection onRequestDemo={() => setDemoOpen(true)} />
      <About onRequestDemo={() => setDemoOpen(true)} />
      <Footer />
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
};

export default Index;
