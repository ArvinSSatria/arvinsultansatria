import { 
  FaReact, FaJs, FaPython, FaGitAlt, FaFigma, FaHtml5, FaCss3Alt, 
  FaGithub, FaLinkedinIn, FaInstagram, FaCode, FaLaravel,
  FaGraduationCap, FaUsers, FaLaptopCode, FaNpm
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiVite, SiFramer, SiCanva, SiMysql, 
  SiNextdotjs, SiPostgresql, SiThreads 
} from 'react-icons/si';

export const portfolioData = {
  personal: {
    name: "Arvin Sultan Satria",
    roles: ["Frontend Developer", "UI/UX Enthusiast", "Creative Coder", "Tech Explorer"],
    email: "arvinsultansatria@gmail.com",
    whatsapp: "6281220774826",
    location: "Tasikmalaya, Indonesia",
    education: "Universitas Ahmad Dahlan",
    major: "Informatics Engineering",
    gpa: "3.87 / 4.00",
    hobbies: "Reading & Photography",
    cvPath: "/cv-arvin.pdf",
    profileImage: "/profile.jpg",
  },
  
  socials: [
    { name: "GitHub", href: "https://github.com/ArvinSSatria", icon: FaGithub },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/arvin-sultan-satria/", icon: FaLinkedinIn },
    { name: "Instagram", href: "https://www.instagram.com/arvinssatria/", icon: FaInstagram },
    { name: "Threads", href: "https://www.threads.com/@arvinssatria", icon: SiThreads },
  ],

  stats: [
    { value: '2+', label: 'Years Learning' },
    { value: '10+', label: 'Projects Built' },
    { value: '3+', label: 'Design Tools' },
    { value: '∞', label: 'Curiosity' },
  ],

  about: {
    title: "Building digital things",
    subtitle: "that matter.",
    description: [
      "Hey! I'm Arvin Sultan Satria, an Informatics student at Universitas Ahmad Dahlan. I'm passionate about building beautiful, functional websites and applications that solve real problems.",
      "My journey in tech started with curiosity about how websites work, and it has evolved into a deep interest in frontend development, UI/UX design, and creating seamless user experiences. I love the intersection of design and code.",
      "When I'm not coding, you'll find me reading, exploring photography, or experimenting with new technologies and design tools."
    ]
  },

  skills: [
    {
      title: 'Frontend',
      items: [
        { name: 'HTML5', icon: FaHtml5 },
        { name: 'CSS3', icon: FaCss3Alt },
        { name: 'JavaScript', icon: FaJs },
        { name: 'React', icon: FaReact },
        { name: 'Tailwind CSS', icon: SiTailwindcss },
        { name: 'Next.js', icon: SiNextdotjs },
      ]
    },
    {
      title: 'Tools & Workflow',
      items: [
        { name: 'Git', icon: FaGitAlt },
        { name: 'GitHub', icon: FaGithub },
        { name: 'VS Code', icon: FaCode },
        { name: 'Vite', icon: SiVite },
        { name: 'npm', icon: FaNpm },
        { name: 'Framer Motion', icon: SiFramer },
      ]
    },
    {
      title: 'Design & Backend',
      items: [
        { name: 'Figma', icon: FaFigma },
        { name: 'Canva', icon: SiCanva },
        { name: 'Laravel', icon: FaLaravel },
        { name: 'Python', icon: FaPython },
        { name: 'MySQL', icon: SiMysql },
        { name: 'PostgreSQL', icon: SiPostgresql },
      ]
    },
  ],

  experience: [
    {
      year: '2022 — Now',
      icon: FaGraduationCap,
      title: 'Informatics Engineering',
      org: 'Universitas Ahmad Dahlan',
      desc: 'Studying informatics with focus on web development, software engineering, database systems, and UI/UX design.',
      tags: ['Web Dev', 'Software Engineering', 'Database'],
    },
    {
      year: '2023 — 2024',
      icon: FaUsers,
      title: 'Active Student Organization Member',
      org: 'Campus Organization',
      desc: 'Participated in campus tech communities, seminars, and workshops. Developed teamwork and leadership skills.',
      tags: ['Leadership', 'Teamwork', 'Events'],
    },
    {
      year: '2023 — Now',
      icon: FaLaptopCode,
      title: 'Freelance & Personal Projects',
      org: 'Self-Employed',
      desc: 'Building various web projects including landing pages, portfolio websites, and UI/UX designs for clients and personal learning.',
      tags: ['React', 'Figma', 'Freelance'],
    },
  ],

  projects: [
    {
      id: 1,
      title: "Modern Landing Page",
      subtitle: "Camping Equipment Rental",
      description: "A clean, responsive landing page for a digital agency focused on beautiful UX and conversion.",
      image: "/web1.png",
      link: "https://www.figma.com/design/dUAfipsJYOyx4I62etFoMc/Website-Camping?node-id=0-1&t=hfqaNfDEpRPGl0U1-1",
      preview: "https://campingrental.freesite.online/",
      tags: ["Figma", "UI/UX", "Responsive"],
    },
    {
      id: 2,
      title: "FitDaily Mobile App",
      subtitle: "Fitness Tracking Prototype",
      description: "A complete UI/UX concept for a fitness app with workout tracking and social features.",
      image: "/app2.png",
      link: "https://www.figma.com/design/yXFGm8yhY5zbnXNWvFkF3R/Prototype-FitDaily?node-id=0-1&t=FYxKeYMmy0WQAVtu-1",
      preview: "https://www.figma.com/proto/yXFGm8yhY5zbnXNWvFkF3R/Prototype-FitDaily?node-id=0-1&t=WbPKpEsc2klb6tx6-1",
      tags: ["Figma", "Mobile", "Prototype"],
    },
    {
      id: 3,
      title: "Agency Website",
      subtitle: "Business & Portfolio Platform",
      description: "Professional platform for building business websites and portfolio showcases.",
      image: "/web2.png",
      link: "#",
      preview: "#",
      tags: ["Web", "Business", "Portfolio"],
    }
  ],

  certificates: [
    {
      id: 1,
      title: 'Certificate Bangkit Academy',
      date: 'July 2024',
      description: 'Successfully completed the Bangkit Academy 2024 program.',
      image: '/certificates/[Bangkit 2024 Batch 2] Certificate.jpg',
      tags: ['Team Leadership', 'Capstone Project'],
    },
    {
      id: 2,
      title: 'Sertifikat Course Bangkit Academy',
      date: '2024',
      description: 'Successfully completed a course module in Bangkit Academy learning path.',
      image: '/certificates/sertifikat_course_kedua.jpg',
      tags: ['Course', 'Bangkit Academy'],
    },
    {
      id: 3,
      title: 'Sertifikat Course Bangkit Academy',
      date: '2024',
      description: 'Successfully completed a course module in Bangkit Academy learning path.',
      image: '/certificates/sertifikat_course_ketiga.jpg',
      tags: ['Course', 'Bangkit Academy'],
    },
    {
      id: 4,
      title: 'Sertifikat Course Bangkit Academy',
      date: '2024',
      description: 'Successfully completed a course module in Bangkit Academy learning path.',
      image: '/certificates/sertifikat_course_keempat.jpg',
      tags: ['Course', 'Bangkit Academy'],
    },
    {
      id: 5,
      title: 'Sertifikat Course Bangkit Academy',
      date: '2024',
      description: 'Successfully completed a course module in Bangkit Academy learning path.',
      image: '/certificates/sertifikat_course_kelima.jpg',
      tags: ['Course', 'Bangkit Academy'],
    },
    {
      id: 6,
      title: 'Sertifikat Course Bangkit Academy',
      date: '2024',
      description: 'Successfully completed a course module in Bangkit Academy learning path.',
      image: '/certificates/sertifikat_course_keenam.jpg',
      tags: ['Course', 'Bangkit Academy'],
    },
  ]
};
