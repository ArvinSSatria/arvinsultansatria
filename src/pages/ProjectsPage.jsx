import Projects from '../components/Projects';
import { useEffect } from 'react';

const ProjectsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      <Projects />
    </div>
  );
};

export default ProjectsPage;
