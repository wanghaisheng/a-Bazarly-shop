import BannerSection from "./BannerSection";
import CategoriesSection from "./Categories/CategoriesSection";
import FeaturedFacilities from "./FeaturedProducts/FeaturedProducts";
import Footer from "./Footer/Footer";
import HowItWorksSection from "./HowItWorks/HowItWorksSection";
import PartnersSection from "./PartnersSection/PartnersSection";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
  return (
    <div>
      {/* banner section */}
      <BannerSection />
      {/* categories */}
      <CategoriesSection />
      {/* featured facilities */}
      <FeaturedFacilities />
      {/* How it works */}
      <HowItWorksSection />
      {/* Testimonial */}
      <Testimonial />
      {/* Our Partners */}
      <PartnersSection />
      {/* Footer section */}
      <Footer />
    </div>
  );
};

export default Home;
