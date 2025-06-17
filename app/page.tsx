import BentoGrid from "@/components/common/BentoGrid";
import Demo from "@/components/common/Demo";
import Footer from "@/components/common/Footer";
import Hero from "@/components/common/Hero";
import Navbar from "@/components/common/Navbar";
import Pricing from "@/components/common/Pricing";

export default function Home() {
  return (
    <div className="flex items-center w-full flex-col gap-4 px-3">
      <Navbar />

      <Hero />

      <Demo />

      <BentoGrid />
      <Pricing />

      <Footer />
    </div>
  );
}
