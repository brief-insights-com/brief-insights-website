import { motion } from "framer-motion";
import { BentoGrid } from "@/components/BentoGrid";
import { BentoCard } from "@/components/BentoCard";
import {
  ScanText,
  ShieldCheck,
  Zap,
  Workflow,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  Building2,
  FileWarning,
  Plug,
} from "lucide-react";

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
        <a href="#product" className="hover:text-foreground transition-colors">Product</a>
        <a href="#market" className="hover:text-foreground transition-colors">Market</a>
        <a href="#roadmap" className="hover:text-foreground transition-colors">Roadmap</a>
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

      {/* GDPR Compliance — 1 col */}
      <BentoCard
        title="Zero Retention GDPR"
        description="Client data never trains AI models. Hosted on AWS Frankfurt (eu-central-1) with church data protection law compliance built in."
        icon={ShieldCheck}
      />

      {/* Priority Alerts — 1 col */}
      <BentoCard
        title="Urgency Flagging"
        description="Eviction notices, court deadlines, and enforcement orders are automatically detected and surfaced with visual priority alerts."
        icon={FileWarning}
      />

      {/* Master Debt Case — 2 col */}
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
              <span
                className={`h-1.5 w-1.5 rounded-full ${item.linked ? "bg-status-online" : "bg-glow"}`}
              />
              {item.label}
            </div>
          ))}
          <div className="text-xs text-muted-foreground/50 ml-auto">→ Master Case #MC-00441</div>
        </div>
      </BentoCard>

      {/* Speed — 1 col */}
      <BentoCard
        title="90% Faster Processing"
        description="What used to take 1–8 hours per client now takes 15 minutes. Counselors reclaim capacity for the people, not the paperwork."
        icon={Zap}
      />

      {/* Vivendi Integration — 1 col */}
      <BentoCard
        title="Vivendi Integration"
        description="Export to Excel or connect via API directly to Vivendi, the legacy case management system used across Caritas centers."
        icon={Plug}
      />
    </BentoGrid>
  </section>
);

// ─── Market Section ──────────────────────────────────────────────────────────
const marketPoints = [
  "~9% of Germany's population is in serious debt — centers are overwhelmed.",
  "1,400 debt counseling centers with 4,000+ counselors nationwide.",
  "Counselors spend 1–8 hours per client on manual data entry.",
  "Expansion path: legal aid, government social services, insolvency administrators.",
];

const Market = () => (
  <section id="market" className="px-6 pb-24">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Market Opportunity
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
          A crisis waiting
          <br />
          for a solution.
        </h2>
        <ul className="space-y-4">
          {marketPoints.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 text-sm text-muted-foreground"
            >
              <CheckCircle2 className="h-4 w-4 text-status-online mt-0.5 shrink-0" />
              {point}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="grid grid-cols-2 gap-4"
      >
        {[
          { icon: Users, title: "Primary Segment", body: "Non-profit debt counseling centers: Caritas, Diakonie, Red Cross" },
          { icon: Building2, title: "Pilot Partner", body: "Caritas Nexus Munich/Upper Bavaria — 120 counselors, phased rollout" },
          { icon: BarChart3, title: "Revenue Model", body: "Tiered SaaS: per-counselor monthly license + volume-based document fee" },
          { icon: Clock, title: "Go-to-Market", body: "Leverage Caritas success story to expand to Diakonie and municipalities" },
        ].map(({ icon: Icon, title, body }, i) => (
          <div key={i} className="bento-card rounded-xl p-5">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-surface-3">
              <Icon className="h-4 w-4 text-foreground" />
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1">{title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

// ─── Roadmap ─────────────────────────────────────────────────────────────────
const roadmap = [
  {
    quarter: "Q1 2026",
    status: "active",
    title: "Pilot Launch",
    items: ["Finalize MVP", "Incorporate BriefInsights GmbH", "Deploy to 30 Caritas users"],
  },
  {
    quarter: "Q2 2026",
    status: "upcoming",
    title: "Pilot Expansion",
    items: ["Scale to 120 users", "Refine AI accuracy (<5% error)", "Apply for EXIST grant"],
  },
  {
    quarter: "Q3 2026",
    status: "upcoming",
    title: "Commercial Launch",
    items: ["API integration with Vivendi", "Expand to Diakonie & Red Cross", "Seed fundraise"],
  },
  {
    quarter: "Q4 2026",
    status: "upcoming",
    title: "Client Portal",
    items: ["Direct document upload by end-users", "Multi-tenant architecture", "Government contracts"],
  },
];

const Roadmap = () => (
  <section id="roadmap" className="px-6 pb-24">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Product Roadmap
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          2026 milestones.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {roadmap.map((phase, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`bento-card rounded-xl p-6 ${
              phase.status === "active" ? "border-glow/30" : ""
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  phase.status === "active" ? "bg-status-online animate-pulse" : "bg-border"
                }`}
              />
              <span className="text-xs font-mono text-muted-foreground">{phase.quarter}</span>
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-3">{phase.title}</h4>
            <ul className="space-y-2">
              {phase.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/40 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
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
const Index = () => {
  return (
    <div className="grain-overlay min-h-screen bg-background">
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <Market />
      <Roadmap />
      <Footer />
    </div>
  );
};

export default Index;
