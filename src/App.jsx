import Footer from "./components/Footer";
import ContextSection from "./components/ContextSection";
import DisciplinesSection from "./components/DisciplinesSection";
import GallerySection from "./components/GallerySection";
import HeroSection from "./components/HeroSection";
import HistorySection from "./components/HistorySection";
import MetricsSection from "./components/MetricsSection";
import ModelViewerSection from "./components/ModelViewerSection";
import { siteContent } from "./data/siteContent";

export default function App() {
  return (
    <div className="bg-[#f6f3ee] text-stone-950 antialiased">
      <HeroSection {...siteContent.hero} />
      <main>
        <DisciplinesSection intro={siteContent.intro} disciplines={siteContent.disciplines} />
        <HistorySection content={siteContent.history} />
        <ModelViewerSection content={siteContent.modelViewer} />
        <MetricsSection intro={siteContent.metricsIntro} metrics={siteContent.metrics} />
        <GallerySection intro={siteContent.visualIntro} items={siteContent.gallery} />
        <ContextSection content={siteContent.context} />
      </main>
      <Footer content={siteContent.footer} />
    </div>
  );
}
