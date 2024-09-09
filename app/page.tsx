import About from "./Components/About/About";
import ContactUs from "./Components/ContactUs/ContactUs";
import Footer from "./Components/Footer/Footer";
import Hero from "./Components/Hero/Hero";
import Navbar from "./Components/Navbar/Navbar";
import OurCapabilities from "./Components/OurCapabilities/OurCapabilities";
import WhyChoosingUs from "./Components/WhyChoosingUs/WhyChoosingUs";

export default function Home() {
  return (
    <main >
      <Navbar />
      <Hero />
      <About />
      <OurCapabilities />
      <WhyChoosingUs />
      <ContactUs />
      <Footer />
    </main>
  );
}
