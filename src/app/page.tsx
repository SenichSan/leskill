import Header from "@/components/ui/Header";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Spotlight from "@/components/home/Spotlight";
import ArchiveTeaser from "@/components/home/ArchiveTeaser";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Services />
      <Spotlight />
      <ArchiveTeaser />
      <Footer />
    </main>
  );
}
