import { 
  FaReact, FaJs, FaPython, FaGitAlt, FaFigma, FaHtml5, FaCss3Alt, 
  FaGithub, FaLinkedinIn, FaInstagram, FaCode, FaLaravel,
  FaGraduationCap, FaUsers, FaLaptopCode, FaNpm, FaTiktok
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
    { name: "TikTok", href: "https://www.tiktok.com/@arvinssatria", icon: FaTiktok },
    { name: "Threads", href: "https://www.threads.com/@arvinssatria", icon: SiThreads },
  ],

  stats: [
    { value: '4+', label: 'Years Learning' },
    { value: '16+', label: 'Projects Built' },
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
      id: 5,
      title: "Engagement Checker",
      subtitle: "Instagram & TikTok Analytics Tool",
      description: "A free tool for checking Instagram and TikTok Engagement Rates without scraper limits or API dependencies.",
      image: "/checker-website.png",
      link: "https://engagement-checker.arvinsultansatria.my.id/",
      preview: "https://engagement-checker.arvinsultansatria.my.id/",
      tags: ["Web", "Tools", "Scraper"],
    },
    {
      id: 1,
      title: "Legal Care Service",
      subtitle: "Modern Legal Platform",
      description: "A clean, responsive landing page for a legal digital agency focused on professional UX and conversion.",
      image: "/legal-care.png",
      link: "#",
      preview: "#",
      tags: ["Figma", "UI/UX", "Responsive"],
    },
    {
      id: 2,
      title: "Modern Landing Page",
      subtitle: "Camping Equipment Rental",
      description: "A clean, responsive landing page for a digital agency focused on beautiful UX and conversion.",
      image: "/camping-website.png",
      link: "https://www.figma.com/design/dUAfipsJYOyx4I62etFoMc/Website-Camping?node-id=0-1&t=hfqaNfDEpRPGl0U1-1",
      preview: "https://campingrental.freesite.online/",
      tags: ["Figma", "UI/UX", "Responsive"],
    },
    {
      id: 3,
      title: "FitDaily Mobile App",
      subtitle: "Fitness Tracking Prototype",
      description: "A complete UI/UX concept for a fitness app with workout tracking and social features.",
      image: "/mobile-app.png",
      link: "https://www.figma.com/design/yXFGm8yhY5zbnXNWvFkF3R/Prototype-FitDaily?node-id=0-1&t=FYxKeYMmy0WQAVtu-1",
      preview: "https://www.figma.com/proto/yXFGm8yhY5zbnXNWvFkF3R/Prototype-FitDaily?node-id=0-1&t=WbPKpEsc2klb6tx6-1",
      tags: ["Figma", "Mobile", "Prototype"],
    },
    {
      id: 4,
      title: "Agency Website",
      subtitle: "Business & Portfolio Platform",
      description: "Professional platform for building business websites and portfolio showcases.",
      image: "/agency-website.png",
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
      image: '/certificates/sertifikat_course_1.jpg',
      tags: ['Course', 'Bangkit Academy'],
    },
    {
      id: 3,
      title: 'Sertifikat Course Bangkit Academy',
      date: '2024',
      description: 'Successfully completed a course module in Bangkit Academy learning path.',
      image: '/certificates/sertifikat_course_2.jpg',
      tags: ['Course', 'Bangkit Academy'],
    },
    {
      id: 4,
      title: 'Sertifikat Course Bangkit Academy',
      date: '2024',
      description: 'Successfully completed a course module in Bangkit Academy learning path.',
      image: '/certificates/sertifikat_course_3.jpg',
      tags: ['Course', 'Bangkit Academy'],
    },
    {
      id: 5,
      title: 'Sertifikat Course Bangkit Academy',
      date: '2024',
      description: 'Successfully completed a course module in Bangkit Academy learning path.',
      image: '/certificates/sertifikat_course_4.jpg',
      tags: ['Course', 'Bangkit Academy'],
    },
    {
      id: 6,
      title: 'Sertifikat Course Bangkit Academy',
      date: '2024',
      description: 'Successfully completed a course module in Bangkit Academy learning path.',
      image: '/certificates/sertifikat_course_5.jpg',
      tags: ['Course', 'Bangkit Academy'],
    },
    {
      id: 7,
      title: 'Sertifikat Course Bangkit Academy',
      date: '2024',
      description: 'Successfully completed a course module in Bangkit Academy learning path.',
      image: '/certificates/sertifikat_course_6.jpg',
      tags: ['Course', 'Bangkit Academy'],
    },
    {
      id: 8,
      title: 'Sertifikat Course Bangkit Academy',
      date: '2024',
      description: 'Successfully completed a course module in Bangkit Academy learning path.',
      image: '/certificates/sertifikat_course_7.jpg',
      tags: ['Course', 'Bangkit Academy'],
    },
    {
      id: 9,
      title: 'Sertifikat Course Bangkit Academy',
      date: '2024',
      description: 'Successfully completed a course module in Bangkit Academy learning path.',
      image: '/certificates/sertifikat_course_8.jpg',
      tags: ['Course', 'Bangkit Academy'],
    },
    {
      id: 10,
      title: 'Sertifikat Course Bangkit Academy',
      date: '2024',
      description: 'Successfully completed a course module in Bangkit Academy learning path.',
      image: '/certificates/sertifikat_course_9.jpg',
      tags: ['Course', 'Bangkit Academy'],
    }
  ],

  photography: [
    {
      id: 1,
      url: "/img1.jpeg",
      caption: "Pantai Cangkring",
      location: "Yogyakarta",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      id: 2,
      url: "/img12.jpeg",
      caption: "Jalan Lubang Timah",
      location: "Kab. Ciamis",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: 3,
      url: "/img4.jpeg",
      caption: "Pantai Pandansari",
      location: "Yogyakarta",
      span: "md:col-span-1 md:row-span-2",
    },
    {
      id: 4,
      url: "/img11.jpeg",
      caption: "Gunung Papandayan",
      location: "Garut",
      span: "md:col-span-1 md:row-span-1",
    }
  ],
  music: {
    title: "Multo",
    artist: "Cup of Joe",
    cover: "/multo.webp",
    audioUrl: "/multo.mp3",
    lyrics: [
      { startTime: 0, original: "Tanging panalangin, lubayan na sana", translation: "Satu-satunya doaku, semoga kamu segera pergi" },
      { startTime: 8, original: "Dahil sa bawat tingin, mukha mo'y nakikita", translation: "Karena setiap kali melihat, wajahmu yang muncul" },
      { startTime: 18, original: "Kahit sa'n man mapunta ay anino mo'y kumakapit sa 'king kamay", translation: "Ke mana pun aku pergi, bayanganmu menggenggam tanganku" },
      { startTime: 27, original: "Ako ay dahan-dahang nililibing nang buhay pa", translation: "Aku perlahan dikubur hidup-hidup" },
      { startTime: 36, original: "Hindi na makalaya", translation: "Tidak bisa bebas lagi" },
      { startTime: 40.5, original: "Dinadalaw mo 'ko bawat gabi", translation: "Kamu mendatangiku setiap malam" },
      { startTime: 45, original: "Wala mang nakikita", translation: "Meski tidak ada wujudnya" },
      { startTime: 50, original: "Haplos mo'y ramdam pa rin sa dilim", translation: "Sentuhanmu masih terasa dalam gelap" },
      { startTime: 55, original: "Hindi na nananaginip", translation: "Ini bukan lagi mimpi" },
      { startTime: 59, original: "Hindi na ma-makagising", translation: "Tapi tidak bisa bangun" },
      { startTime: 63.5, original: "Pasindi na ng ilaw", translation: "Tolong nyalakan lampunya" },
      { startTime: 68, original: "Minumulto na 'ko ng damdamin ko", translation: "Aku dihantui oleh perasaanku sendiri" },
      { startTime: 71.5, original: "ng damdamin ko", translation: "perasaanku sendiri" },
      { startTime: 74, original: "Hindi mo ba ako lilisanin?", translation: "Tidakkah kamu akan meninggalkanku?" },
      { startTime: 78, original: "Hindi pa ba sapat pagpapahirap sa 'kin?", translation: "Belum cukupkah penderitaan ini bagiku?" },
      { startTime: 83, original: "Hindi na ba ma-mamamayapa?", translation: "Tidakkah akan pernah merasa damai?" },
      { startTime: 88, original: "Hindi na ba ma-mamamayapa?", translation: "Tidakkah akan pernah merasa tenang?" },
      { startTime: 92, original: "Hindi na ma-makalaya", translation: "Tidak bisa bebas lagi" },
      { startTime: 96, original: "Dina-dalaw mo 'ko bawat gabi", translation: "Kamu mendatangiku setiap malam" },
      { startTime: 101, original: "Wala mang nakikita", translation: "Meski tidak ada wujudnya" },
      { startTime: 105, original: "Haplos mo'y ramdam pa rin sa dilim", translation: "Sentuhanmu masih terasa dalam gelap" },
      { startTime: 109, original: "Hindi na nananaginip", translation: "Ini bukan lagi mimpi" },
      { startTime: 114, original: "Hindi na ma-makagising", translation: "Tapi tidak bisa bangun" },
      { startTime: 119, original: "Pasindi na ng ilaw", translation: "Tolong nyalakan lampunya" },
      { startTime: 125, original: "Minumulto na 'ko ng damdamin ko", translation: "Aku dihantui oleh perasaanku sendiri" },
      { startTime: 126, original: "ng damdamin ko", translation: "perasaanku sendiri" },
      { startTime: 128, original: ".....", translation: "....." },
    ]
  }
};
