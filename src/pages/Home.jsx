import Hero from '../components/Hero';
import TimelineSection from '../components/TimeLineSection';
import About from '../components/About';
import ExperienceSection from '../components/ExperienceSection';
import SkillsSection from '../components/SkillsSections';
import ShowcaseSection from '../components/ShowcaseSection';
function Home() {
  return (
    <>
      <Hero />
      <About id="about"/>
      <SkillsSection />
      <TimelineSection />
      <ExperienceSection />
      <ShowcaseSection />
    </>
  );
}
export default Home;
