/* ==========================================================================
   data.js: ALL site content lives here. Edit text, links and projects in
   this one file; main.js renders everything from it.
   ========================================================================== */

window.PORTFOLIO_DATA = {
  /* ---- Basic info ---------------------------------------------------- */
  site: {
    name: "Emebet Atsbaha",
    title: "Full-Stack Software Engineer",
    tagline:
      "Building enterprise web applications with Next.js, React, TypeScript and Node.js",
    footerTagline: "Full-Stack Software Engineer based in Addis Ababa",
    availability: "Available for work",
    location: "Addis Ababa, Ethiopia",
    cvPath: "assets/Emebet_Atsbaha_CV.pdf",
    cvFileName: "Emebet_Atsbaha_CV.pdf",
  },

  /* ---- Navbar links (id must match a section id in index.html) ------- */
  nav: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ],

  /* ---- Social links (icon: github | linkedin | gitlab) ---------------
     The label is shown next to the icon. Links with an empty url are hidden. */
  socials: [
    { label: "GitHub", icon: "github", url: "https://github.com/ricaim16" },
    {
      label: "LinkedIn",
     
      icon: "linkedin",
      url: "https://www.linkedin.com/in/emebet-welay-769246201/",
    },
    // TODO: add your GitLab profile URL to show this link
    { label: "GitLab", icon: "gitlab", url: "" },
  ],

  /* ---- About --------------------------------------------------------- */
  about: {
    paragraphs: [
      "Software engineer who has delivered enterprise web platforms for the Ethiopian Postal Service (Ethiopost). Focused on clean architecture, secure systems, and maintainable code.",
      "BSc in Software Engineering, Jigjiga University (GPA 3.66/4.00). ALX Backend Specialization graduate. Based in Addis Ababa, Ethiopia.",
    ],
    // url is optional: when set, the card links to the certificate
    certifications: [
      {
        title: "ALX Software Engineering, Backend Specialization",
        issuer: "ALX",
        year: "2025",
        url: "https://savanna.alxafrica.com/certificates/MBf7JsR2pH",
      },
      {
        title: "MERN Stack Certificate",
        issuer: "Omishtu-Joy Tech Solutions",
        year: "2024",
        url: "",
      },
    ],
  },

  /* ---- Skills (icon: code | layout | server | database | wrench) ----- */
  skills: [
    {
      group: "Languages",
      icon: "code",
      items: ["JavaScript", "TypeScript"],
    },
    {
      group: "Frontend",
      icon: "layout",
      items: ["Next.js", "React", "Tailwind CSS", "Bootstrap"],
    },
    {
      group: "Backend",
      icon: "server",
      items: ["Node.js", "Express.js", "REST APIs"],
    },
    {
      group: "Databases",
      icon: "database",
      items: ["PostgreSQL", "MySQL", "MongoDB", "Drizzle ORM", "Prisma"],
    },
    {
      group: "Tools",
      icon: "wrench",
      items: ["Git", "GitHub", "GitLab", "Agile/Scrum"],
    },
  ],

  /* ---- Experience (newest first) ------------------------------------- */
  experience: [
    {
      role: "Software Engineer",
      company: "eTech S.C., Addis Ababa",
      period: "Feb 2026 – Present",
      bullets: [
        "Delivered two enterprise platforms for Ethiopost: a CRM and a Legal Automation system",
        "Built scalable modules with Next.js, React, TypeScript and Node.js using clean architecture",
        "Designed REST APIs and contributed to PostgreSQL schema design and optimization",
      ],
    },
    {
      role: "Software Developer (Paid Intern)",
      company: "Muyalogy Technology",
      period: "Dec 2025 – Feb 2026",
      bullets: [
        "Built features and fixed frontend/backend bugs in a Job Management app (Next.js, TypeScript, Drizzle ORM)",
      ],
    },
    {
      role: "Data Center Intern",
      company: "Jigjiga University",
      period: "May 2025 – June 2025",
      bullets: [
        "Digitized administrative records and supported network and storage infrastructure",
      ],
    },
    {
      role: "Web Development Intern",
      company: "Omishtu-Joy Tech Solutions",
      period: "Sept 2024 – Oct 2024",
      bullets: ["Built responsive websites with React and Tailwind CSS"],
    },
    {
      role: "Software Development Engineering Intern",
      company: "Dulcian IT Services & Consulting",
      period: "Apr 2024 – Aug 2024",
      bullets: [
        "Built a face recognition access control system with Java Spring Boot and DeepLearning4J",
      ],
    },
  ],

  /* ---- Projects ------------------------------------------------------
     Fields: title, description,
     tech[], images[], githubUrl, liveUrl ("" hides the button),
     isPrivate, privateNote, featured.
     Featured projects are shown first and larger.
     To add more screenshots, drop files in the project folder and list
     them in images[].
  ------------------------------------------------------------------------ */
  projects: [
    {
      title: "Ethiopost CRM",
      description:
        "CRM for customer and service management, built for the Ethiopian Postal Service (Ethiopost). Full-time work as a full-stack developer at eTech S.C.",
      tech: ["React", "Node.js", "PostgreSQL"],
      images: ["assets/projects/ethiopost-crm/crm.png"],
      githubUrl: "",
      liveUrl: "",
      isPrivate: true,
      privateNote:
        "Source code and live system are private. Screenshots shared with sensitive data removed.",
      featured: true,
    },
    {
      title: "Ethiopost Legal Automation",
      description:
        "Legal Automation system for case and document workflows, built for the legal department of the Ethiopian Postal Service (Ethiopost). Built from scratch with my team at eTech S.C. as full-time work.",
      tech: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
      images: ["assets/projects/ethiopost-legal/legal.png"],
      githubUrl: "",
      liveUrl: "",
      isPrivate: true,
      privateNote:
        "Source code and live system are private. Screenshots shared with sensitive data removed.",
      featured: true,
    },
    {
      title: "Flora Skincare",
      description:
        "Website for a skincare clinic in Addis Ababa with treatments, consultations and appointment booking. Built for a private client.",
      tech: ["Next.js", "React", "Vercel"],
      images: ["assets/projects/flora-skincare/flora.png"],
      githubUrl: "",
      liveUrl: "https://flora-skincare.vercel.app/",
      isPrivate: false,
      privateNote: "",
      featured: false,
    },
    {
      title: "Pharmacy Inventory Management System",
      description:
        "Full-stack web app to manage pharmacy stock levels, sales, and expiry tracking with role-based access.",
      tech: ["PostgreSQL", "Express", "React", "Node.js"],
      images: ["assets/projects/pharmacy/pharmacy.png"],
      // TODO: add the repository URL to show the GitHub button
      githubUrl: "",
      liveUrl: "",
      isPrivate: false,
      privateNote: "",
      featured: false,
    },
  ],

  /* ---- Contact ------------------------------------------------------- */
  contact: {
    heading: "Get in touch",
    line: "Open to full-time, remote and freelance opportunities.",
    // Vercel function that emails the message to the site owner
    // (see api/contact.js and the README for setup)
    endpoint: "/api/contact",
  },
};
