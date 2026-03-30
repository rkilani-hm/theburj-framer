import Header from "@/components/alhamra/Header";
import LegacySection from "@/components/alhamra/LegacySection";
import Footer from "@/components/alhamra/Footer";

const Legacy = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-20">
        <LegacySection />
      </main>
      <Footer />
    </div>
  );
};

export default Legacy;
