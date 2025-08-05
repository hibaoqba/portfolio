import Hero from '../components/Hero';
import TimelineSection from '../components/TimeLineSection';
import About from '../components/About';
import ExperienceSection from '../components/ExperienceSection';

function Home() {
  return (
    <>
      <Hero />
      <About id="about"/>
      <TimelineSection />
      <ExperienceSection />
    </>
  );
}
export default Home;
