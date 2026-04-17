import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import StatsSlider from "@/components/landing/StatsSlider";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import DashboardPreview from "@/components/landing/DashboardPreview";
import AICoach from "@/components/landing/AICoach";
import TestimonialSlider from "@/components/landing/TestimonialSlider";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <Hero />
    <StatsSlider />
    <Features />
    <HowItWorks />
    <DashboardPreview />
    <AICoach />
    <TestimonialSlider />
    <Pricing />
    <Footer />
  </div>
);

export default Index;
