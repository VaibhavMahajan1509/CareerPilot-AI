import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import AITools from "../components/AITools";
import DashboardPreview from "../components/DashboardPreview";
import Pricing from "../components/Pricing";
import About from "../components/About";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <AITools />
      <DashboardPreview />
      <Pricing />
      <About />
      <Footer />
    </>
  );
};

export default Landing;