import About from '../components/About';
import Certifications from '../components/Certifications';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import { useEffect } from 'react';

const ProfilePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-16">
      <About />
      <Certifications />
      <Skills />
      <Experience />
    </div>
  );
};

export default ProfilePage;
