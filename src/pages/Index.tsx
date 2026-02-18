import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
} from "lucide-react";
import docWorker from "@/assets/doc-worker.jpg";
import docStack from "@/assets/doc-stack.jpg";

// ─── Navbar ────────────────────────────────────────────────────────────────
const Navbar = () => (
  <motion.nav
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.1 }}
    className="fixed top-0 left-0 right-0 z-40 border-b border-border/50 backdrop-blur-xl bg-background/60"
  >
    <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
      <span className="text-sm font-semibold tracking-tight text-foreground">
        Brief<span className="text-muted-foreground">Insights</span>
      </span>
      <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
        <a href="#problem" className="hover:text-foreground transition-colors">Problem</a>
        <a href="#product" className="hover:text-foreground transition-colors">Product</a>
        <a href="#before-after" className="hover:text-foreground transition-colors">Results</a>
        <a href="#about" className="hover:text-foreground transition-colors">About</a>
      </div>
      <button className="text-sm font-medium text-primary-foreground bg-primary px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity">
        Request Demo
      </button>
    </div>
  </motion.nav>
);

// ─── Hero ───────────────────────────────────────────────────────────────────
const Hero = () => (
  <section className="pt-32 pb-16 px-6">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs text-muted-foreground mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-glow animate-pulse" />
          Pilot live with Caritas Nexus · Munich, Germany
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6"
      >
        Stop drowning
        <br />
        in paperwork.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
      >
        BriefXtract uses Generative AI to automate document processing for debt counselors —
        cutting case prep from 8 hours to 15 minutes.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="flex items-center justify-center gap-4"
      >
        <button className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground bg-primary px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
          Request a Demo
          <ArrowRight className="h-4 w-4" />
        </button>
        <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-6 py-2.5">
          Read the Case Study
        </button>
      </motion.div>
    </div>
  </section>
);

// ─── Stats Bar ──────────────────────────────────────────────────────────────
const stats = [
  { value: "90%", label: "Time saved per case" },
  { value: "~15 min", label: "Down from 8 hours" },
  { value: "4,000+", label: "Counselors in Germany" },
  { value: "120", label: "Pilot users at Caritas" },
];

const StatsBar = () => (
  <section className="px-6 pb-16">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-border/40 rounded-xl overflow-hidden border border-border/40"
    >
      {stats.map((s, i) => (
        <div key={i} className="bg-surface-1 px-8 py-7 flex flex-col gap-1">
          <span className="text-3xl font-bold text-foreground tracking-tight">{s.value}</span>
          <span className="text-sm text-muted-foreground">{s.label}</span>
        </div>
      ))}
    </motion.div>
  </section>
);

// ─── Problem Visual ─────────────────────────────────────────────────────────
const ProblemVisual = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97]);

  return (
    <section id="problem" ref={ref} className="px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Hero image — parallax */}
        <motion.div
          style={{ scale }}
          className="relative rounded-2xl overflow-hidden border border-border/40 mb-6"
        >
          <motion.img
            style={{ y, height: "480px", objectPosition: "center top" }}
            src={docWorker}
            alt="Debt counselor overwhelmed by paper documents"
            className="w-full object-cover"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

          {/* Text overlaid on image */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3"
            >
              The Problem
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl leading-tight"
            >
              Every client arrives with a box of chaos.
            </motion.h2>
          </div>
        </motion.div>

        {/* Two-column caption row */}
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bento-card rounded-xl p-6 flex gap-4 items-start"
          >
            <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">1–8 hours per client</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Debt counselors in Germany manually sort and transcribe chaotic paper mail —
                letters, court orders, invoices — before any actual counseling can begin.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative rounded-xl overflow-hidden border border-border/40"
            style={{ minHeight: "140px" }}
          >
            <img
              src={docStack}
              alt="Stack of German debt collection letters and invoices"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
            <div className="relative z-10 p-6">
              <h4 className="text-sm font-semibold text-foreground mb-1">9% of Germany in debt</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                1,400 counseling centers, 4,000+ counselors — all overwhelmed by the
                sheer volume of unsorted paper correspondence from creditors.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── Features ───────────────────────────────────────────────────────────────
const Features = () => (
  <section id="product" className="px-6 pb-24">
    <div className="max-w-6xl mx-auto mb-10">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3"
      >
        BriefXtract Platform
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold tracking-tight text-foreground"
      >
        Everything a counselor needs.
        <br />
        <span className="text-muted-foreground">Nothing extra.</span>
      </motion.h2>
    </div>

    <BentoGrid>
      {/* Intelligent Extraction — 2 col */}
      <BentoCard
        title="Intelligent Extraction"
        description="LLMs via Amazon Bedrock extract creditor name, file number, amount, and date from mixed PDFs — letters, court orders, invoices — in one pass."
        icon={ScanText}
        colSpan={2}
      >
        <div className="h-32 rounded-lg bg-surface-3/50 border border-border/50 p-4 font-mono text-xs text-muted-foreground space-y-2 overflow-hidden">
          {[
            { label: "Creditor", value: "Vodafone GmbH", conf: "99%" },
            { label: "Amount", value: "€ 847.30", conf: "98%" },
            { label: "File No.", value: "RIV-2024-88412", conf: "97%" },
            { label: "Due Date", value: "15 Jan 2025", conf: "96%" },
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between"
            >
              <span className="text-muted-foreground/60 w-20">{row.label}</span>
              <span className="text-foreground flex-1">{row.value}</span>
              <span className="text-status-online">{row.conf}</span>
            </motion.div>
          ))}
        </div>
      </BentoCard>

      <BentoCard
        title="Zero Retention GDPR"
        description="Client data never trains AI models. Hosted on AWS Frankfurt (eu-central-1) with church data protection law compliance built in."
        icon={ShieldCheck}
      />

      <BentoCard
        title="Urgency Flagging"
        description="Eviction notices, court deadlines, and enforcement orders are automatically detected and surfaced with visual priority alerts."
        icon={FileWarning}
      />

      <BentoCard
        title="Master Debt Case Engine"
        description="Automatically links disparate documents — e.g., a Vodafone invoice and a Riverty collection letter — into a single unified debt case record."
        icon={Workflow}
        colSpan={2}
      >
        <div className="h-20 rounded-lg bg-surface-3/50 border border-border/50 flex items-center px-4 gap-3 flex-wrap">
          {[
            { label: "Vodafone Invoice", linked: true },
            { label: "Riverty Letter", linked: true },
            { label: "Court Order #3", linked: false },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface-2 border border-border/50 text-xs text-muted-foreground"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${item.linked ? "bg-status-online" : "bg-glow"}`} />
              {item.label}
            </div>
          ))}
          <div className="text-xs text-muted-foreground/50 ml-auto">→ Master Case #MC-00441</div>
        </div>
      </BentoCard>

      <BentoCard
        title="90% Faster Processing"
        description="What used to take 1–8 hours per client now takes 15 minutes. Counselors reclaim capacity for the people, not the paperwork."
        icon={Zap}
      />

      <BentoCard
        title="Vivendi Integration"
        description="Export to Excel or connect via API directly to Vivendi, the legacy case management system used across Caritas centers."
        icon={Plug}
      />
    </BentoGrid>
  </section>
);

// ─── Before / After ─────────────────────────────────────────────────────────
const beforeItems = [
  "Manually sort 30–80 letters per client",
  "Type data into Vivendi by hand",
  "No way to flag urgent notices",
  "1–8 hours lost before counseling starts",
  "Bottleneck limits how many clients are seen",
];

const afterItems = [
  "Upload a PDF — AI handles the rest",
  "Data auto-populated into structured cases",
  "Eviction notices flagged instantly",
  "Case ready in ~15 minutes",
  "Counselors focus entirely on clients",
];

const BeforeAfter = () => (
  <section id="before-after" className="px-6 pb-24">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          The Transformation
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          What changes with BriefXtract.
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
        {/* Before */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bento-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <span className="h-2 w-2 rounded-full bg-destructive" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Before</span>
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
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-3 border border-border/50">
            <MoveRight className="h-4 w-4 text-foreground" />
          </div>
        </motion.div>

        {/* After */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="bento-card rounded-xl p-6 border-status-online/20"
        >
          <div className="flex items-center gap-2 mb-5">
            <span className="h-2 w-2 rounded-full bg-status-online animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">After BriefXtract</span>
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
        className="mt-6 bento-card rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground font-mono">Time per client case</span>
          <span className="text-xs font-semibold text-status-online">90% reduction</span>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Manual (avg. 4 hrs)</span>
              <span>480 min</span>
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
              <span>With BriefXtract</span>
              <span>15 min</span>
            </div>
            <div className="h-2 w-full rounded-full bg-surface-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "3.1%" }}
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

// ─── Footer ──────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="border-t border-border/50 px-6 py-10">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div>
        <span className="text-sm font-semibold tracking-tight text-foreground">
          Brief<span className="text-muted-foreground">Insights</span>
        </span>
        <p className="text-xs text-muted-foreground mt-1">
          Empowering social workers by automating administrative burdens.
        </p>
        <p className="text-xs text-muted-foreground mt-1">Munich · Germany</p>
      </div>
      <div className="flex flex-col gap-1 text-xs text-muted-foreground text-right">
        <span>GDPR Compliant · AWS eu-central-1</span>
        <span>Zero Data Retention Policy</span>
        <span className="mt-2">© 2026 BriefInsights. All rights reserved.</span>
      </div>
    </div>
  </footer>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const Index = () => (
  <div className="grain-overlay min-h-screen bg-background">
    <Navbar />
    <Hero />
    <StatsBar />
    <ProblemVisual />
    <Features />
    <BeforeAfter />
    <Footer />
  </div>
);

export default Index;
