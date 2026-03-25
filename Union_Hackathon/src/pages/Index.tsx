
import { useEffect } from 'react';
import Navbar from 'src/components/Navbar';
import Hero from 'src/components/Hero';
import Features from 'src/components/Features';
import HowItWorks from 'src/components/HowItWorks';
import Testimonials from 'src/components/Testimonials';
import Pricing from 'src/components/Pricing';
import FAQ from 'src/components/FAQ';
import CTA from 'src/components/CTA';
import Footer from 'src/components/Footer';
import ScrollToTop from 'src/components/ScrollToTop';
import ChatBot from 'src/components/ChatBot';
import ThreeBackground from 'src/components/ThreeBackground';
import useScrollAnimation from 'src/utils/useScrollAnimation';

const Index = () => {
  // Initialize scroll animations
  useScrollAnimation();

  // Set page title
  useEffect(() => {
    document.title = "FundFlow Trace | Internal fund flow tracking for fraud detection (PS3)";
  }, []);
  
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-crypto-blue dark:via-[#0d1117] dark:to-crypto-blue transition-colors duration-300">
      <ThreeBackground variant="particles" />
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
      <ScrollToTop />
      <ChatBot />
    </div>
  );
};

export default Index;
