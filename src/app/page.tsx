import Header from "@/components/ui/Header";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Services />
    </main>
  );
}
