import Hero from '../components/Hero';
import TimelineSection from '../components/TimeLineSection';
import About from '../components/About';
import ExperienceSection from '../components/ExperienceSection';
import SkillsSection from '../components/SkillsSections';
import ShowcaseSection from '../components/ShowcaseSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
function Home() {
  return (
    <>
      <Hero />
      <About id="about"/>
      <SkillsSection />
      <TimelineSection />
      <ExperienceSection />
      <ShowcaseSection />
      <ContactSection />
      <Footer/>
    </>
  );
}
export default Home;
