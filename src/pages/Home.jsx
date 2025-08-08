import Hero from '../components/Hero';
import TimelineSection from '../components/TimeLineSection';
import About from '../components/About';
import ExperienceSection from '../components/ExperienceSection';
import SkillsSection from '../components/SkillsSections';
import ShowcaseSection from '../components/ShowcaseSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ThemeToggle from '../components/ThemeToggle';
function Home() {
  return (
    <>
      <Hero />

      <div className="dark:bg-gradient-to-b dark:from-[#070F2B] dark:to-[#1B1A55]">
        <About id="about" />
        <SkillsSection />
        <TimelineSection />
        <ExperienceSection />
        <ShowcaseSection />
        <ContactSection />
        <Footer />
      </div>

      <ThemeToggle />
    </>
  );
}

export default Home;
