import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DemoModal from "@/components/DemoModal";
import { smoothScrollToId } from "@/lib/scrollToHash";
import ProblemPage from "@/components/Templates/ProblemPage";
import Header from "@/components/Organism/Header";
import Footer from "@/components/Organism/Footer";
import Hero from "@/components/Organism/Hero";
import StatsBar from "@/components/Organism/StatsBar";
import ROISection from "@/components/Organism/ROISection";
import BeforeAfter from "@/components/Organism/BeforeAfter";

const Index = () => {
  const [demoOpen, setDemoOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    // small delay lets images/video/motion elements settle their layout
    // before we measure the target position, avoiding a jumpy scroll
    const timeout = setTimeout(() => smoothScrollToId(id), 120);
    return () => clearTimeout(timeout);
  }, [location.hash]);

  return (
    <div className="grain-overlay min-h-screen bg-background">
      <Header />
      <Hero />
      <StatsBar />
      <ProblemPage />
      <BeforeAfter />
      <ROISection />
      <Footer />
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
};

export default Index;