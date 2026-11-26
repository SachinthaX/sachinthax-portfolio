export const SHOW_CV = false;

export interface NavLink {
  label: string;
  href: `#${string}`;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface Identity {
  name: string;
  handle: string;
  role: string;
  descriptor: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  siteUrl: string;
  availability: string;
}

export interface SiteMeta {
  title: string;
  description: string;
  canonical: string;
  siteName: string;
  ogImage: string;
  ogImageAlt: string;
  favicon: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface ProjectItem {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  repoUrl?: string;
  demoUrl?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
}

export interface EducationItem {
  degree: string;
  period: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}

export const identity: Identity = {
  name: 'Nipuna Sachintha',
  handle: 'SachinthaX',
  role: 'Full-Stack Developer',
  descriptor: 'IT graduate',
  location: 'Gampaha, Sri Lanka',
  email: 'nipunasachintha77@gmail.com',
  github: 'https://github.com/SachinthaX',
  linkedin: 'https://www.linkedin.com/in/h-n-sachintha/',
  siteUrl: 'https://www.sachinthax.live/',
  availability:
    'Open to entry-level IT and software roles, freelance work, and collaboration',
};

export const siteMeta: SiteMeta = {
  title: 'Nipuna Sachintha | Full-Stack Developer',
  description:
    'Portfolio of Nipuna Sachintha, an IT graduate and full-stack developer from Sri Lanka. Web applications, deployment, CI/CD, and cloud basics.',
  canonical: 'https://www.sachinthax.live/',
  siteName: 'Nipuna Sachintha',
  ogImage: '/og-image.png',
  ogImageAlt: 'Nipuna Sachintha — Full-Stack Developer',
  favicon: '/favicon.svg',
};

export const navigation: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  eyebrow: 'Full-Stack Developer',
  headline: "Hi, I'm Nipuna Sachintha. I build and deploy web applications.",
  subheading:
    'IT graduate from Sri Lanka. I enjoy turning ideas into reliable products, from writing the code to deploying and maintaining it.',
  primaryCta: {
    label: 'View Projects',
    href: '#projects',
  } satisfies CtaLink,
  cvCta: {
    label: 'Download CV',
    href: '/Nipuna-Sachintha-CV.pdf',
  } satisfies CtaLink,
  quickFacts: [
    'Full-Stack Development',
    'CI/CD and Deployment',
    'Cloud and Networking Basics',
  ],
};

export const about = {
  eyebrow: 'About',
  heading: 'About me',
  paragraphs: [
    "I'm an Information Technology graduate based in Sri Lanka. I enjoy building web applications and solving technical problems, from writing the code to deploying and maintaining it.",
    'My work covers full-stack development with modern tools such as Next.js, React, Node.js, FastAPI, and Spring Boot. I have also set up production environments, built CI/CD pipelines, and fixed issues in live applications.',
    "I'm looking to grow through real-world projects and experienced teams, and I'm always exploring new tools across development, cloud, and networking. Open to collaboration and new opportunities.",
  ],
  languages: [
    { name: 'English', level: 'Professional proficiency' },
    { name: 'Sinhala', level: 'Native proficiency' },
  ] satisfies LanguageItem[],
};

export const experience: ExperienceItem[] = [
  {
    role: 'Frontend Developer (Part-Time)',
    company: 'NoLoopTech',
    period: 'Oct 2026 to Nov 2026',
    bullets: [
      'Built public event landing pages from scratch using Next.js (App Router, SSR), React, TypeScript, and Tailwind CSS.',
      'Integrated the Google Maps API and English/French localization.',
      'Implemented type-safe REST API data mapping, server-side caching and revalidation, and session token synchronization for reliable registrations.',
      'Diagnosed and fixed live production defects, including routing errors and broken registration states, and worked through GitHub pull request reviews.',
    ],
  },
  {
    role: 'Freelance Software and Deployment Developer (Team Project)',
    company: 'RV Pool Shop',
    period: 'May 2026 to Jul 2026',
    bullets: [
      "Configured and deployed a low-cost production environment for a full-stack web application using cPanel's Node.js and PostgreSQL hosting.",
      'Built CI/CD workflows with GitHub Actions and Render to automate testing and staging deployments.',
      'Diagnosed and fixed bugs across the Next.js frontend and NestJS backend while testing in an Agile team.',
    ],
  },
];

export const projects: ProjectItem[] = [
  {
    title: 'Mushroom Cultivation App',
    subtitle: 'Smart environment monitoring',
    description:
      'Real-time environmental monitoring with machine-learning forecasts for temperature and humidity, plus an AI-driven recommendation flow that suggests corrective actions.',
    tech: [
      'FastAPI',
      'PostgreSQL',
      'React Native',
      'Scikit-Learn',
      'TensorFlow',
      'Groq API',
    ],
  },
  {
    title: 'RV Pool Shop',
    subtitle: 'Venue management platform',
    description:
      'Full-stack venue management application with automated CI/CD and a low-cost production deployment, built in an Agile team.',
    tech: [
      'Next.js',
      'NestJS',
      'PostgreSQL',
      'Drizzle ORM',
      'Tailwind CSS',
      'GitHub Actions',
      'Render',
      'cPanel',
    ],
  },
  {
    title: 'EventEase',
    subtitle: 'Event management platform',
    description:
      'Full-stack event platform with a complete account lifecycle: JWT security, email verification, password recovery, and Google OAuth.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'OAuth2'],
  },
  {
    title: 'CookMate',
    subtitle: 'Culinary learning platform',
    description:
      'Learning platform with step-by-step plans and a clean MVC REST API, supporting both local JWT sign-up and OAuth2 social login.',
    tech: ['Java Spring Boot', 'MongoDB', 'React.js', 'JWT', 'OAuth2'],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'Java', 'PHP', 'C'],
  },
  {
    title: 'Frameworks and Libraries',
    items: [
      'React',
      'Next.js',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'NestJS',
      'FastAPI',
      'Spring Boot',
    ],
  },
  {
    title: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB'],
  },
  {
    title: 'Cloud, DevOps and Tools',
    items: [
      'AWS',
      'Azure',
      'Docker',
      'Linux',
      'Git',
      'GitHub Actions',
      'Postman',
      'Figma',
    ],
  },
];

export const certifications: CertificationItem[] = [
  {
    title: 'AWS Academy Graduate: Cloud Web Application Builder',
    issuer: 'AWS Academy',
    date: 'Oct 2025',
  },
  {
    title: 'AWS Cloud Fundamentals (14 modules)',
    issuer: 'AWS Training',
    date: '2025',
  },
  {
    title: 'Microsoft Azure Fundamentals (8 modules)',
    issuer: 'Microsoft Learn',
    date: '2025',
  },
  {
    title: 'CCNAv7: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    date: 'Oct 2023',
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: 'Sep 2023',
  },
];

export const education: EducationItem[] = [
  {
    degree: 'BSc (Hons) in Information Technology',
    period: '2022 to 2026 (completed)',
  },
  {
    degree: 'G.C.E. Advanced Level (Physical Science, Mathematics)',
    period: '2020',
  },
];

export const contact = {
  eyebrow: 'Contact',
  heading: "Let's work together",
  text: "I'm open to entry-level IT and software roles, freelance projects, and collaboration. Send me a message and I'll get back to you.",
};
