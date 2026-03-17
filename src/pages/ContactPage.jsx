import Contact from '../components/Contact';
import { useEffect } from 'react';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 min-h-[80vh] flex flex-col justify-center">
      <Contact />
    </div>
  );
};

export default ContactPage;
