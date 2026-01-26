import { Header } from './Header';
import { Hero } from './Hero';
import { About } from './About';
import { Experience } from './Experience';
import { Education } from './Education';
import { Skills } from './Skills';
import { Footer } from './Footer';

export const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
      </main>
      <Footer />
    </div>
  );
};
