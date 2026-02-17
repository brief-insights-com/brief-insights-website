import { motion } from "framer-motion";
import { BentoGrid } from "@/components/BentoGrid";
import { BentoCard } from "@/components/BentoCard";
import { Zap, Shield, BarChart3, CloudCog, ArrowRight } from "lucide-react";

const Navbar = () => (
  <motion.nav
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.1 }}
    className="fixed top-0 left-0 right-0 z-40 border-b border-border/50 backdrop-blur-xl bg-background/60"
  >
    <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
      <span className="text-sm font-semibold tracking-tight text-foreground">
        Nexus<span className="text-muted-foreground">.ai</span>
      </span>
      <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
        <a href="#" className="hover:text-foreground transition-colors">Product</a>
        <a href="#" className="hover:text-foreground transition-colors">Docs</a>
        <a href="#" className="hover:text-foreground transition-colors">Pricing</a>
        <a href="#" className="hover:text-foreground transition-colors">Company</a>
      </div>
      <button className="text-sm font-medium text-primary-foreground bg-primary px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity">
        Get Started
      </button>
    </div>
  </motion.nav>
);

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
          Now in public beta
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6"
      >
        Automate your
        <br />
        workflow with AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
      >
        The next generation of computer vision. Build, train, and deploy
        models at scale with unprecedented accuracy.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="flex items-center justify-center gap-4"
      >
        <button className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground bg-primary px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
          Start Building
          <ArrowRight className="h-4 w-4" />
        </button>
        <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-6 py-2.5">
          View Documentation
        </button>
      </motion.div>
    </div>
  </section>
);

const Features = () => (
  <section className="px-6 pb-24">
    <BentoGrid>
      <BentoCard
        title="Real-time Processing"
        description="Process millions of images per second with our distributed GPU pipeline. Low latency inference at any scale."
        icon={Zap}
        colSpan={2}
      >
        <div className="h-32 rounded-lg bg-surface-3/50 border border-border/50 flex items-center justify-center">
          <div className="flex gap-1 items-end h-16">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 50].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="w-2 rounded-sm bg-glow/30"
              />
            ))}
          </div>
        </div>
      </BentoCard>

      <BentoCard
        title="Security"
        description="Enterprise-grade encryption with SOC2 compliance. Your data stays safe."
        icon={Shield}
      />

      <BentoCard
        title="Analytics"
        description="Deep insights into model performance with real-time dashboards and alerting."
        icon={BarChart3}
      />

      <BentoCard
        title="Cloud Sync"
        description="Seamlessly sync your models and datasets across teams. Real-time collaboration with version control built in."
        icon={CloudCog}
        colSpan={2}
      >
        <div className="h-20 rounded-lg bg-surface-3/50 border border-border/50 flex items-center px-4 gap-3">
          {["Model v2.1", "Dataset A", "Pipeline #4"].map((label) => (
            <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface-2 border border-border/50 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-status-online" />
              {label}
            </div>
          ))}
        </div>
      </BentoCard>
    </BentoGrid>
  </section>
);

const Index = () => {
  return (
    <div className="grain-overlay min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
};

export default Index;
