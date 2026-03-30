import Header from "@/components/alhamra/Header";
import TowerTabbedDashboard from "@/components/alhamra/TowerTabbedDashboard";

import AwardsSection from "@/components/alhamra/AwardsSection";
import Footer from "@/components/alhamra/Footer";

const Tower = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      
      <main className="pt-24 pb-24">
        {/* Tabbed Dashboard Hero */}
        <TowerTabbedDashboard />
        
        {/* Awards & Recognition */}
        <AwardsSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Tower;
