/**
 * Portfolio Data for DHARSHINI T
 * Verified MERN Stack Developer & MCA Graduate
 * Sourced directly from resume records.
 */

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Dharshini T',
    shortName: 'DT',
    role: 'MERN Stack Developer',
    subRole: 'Full Stack Web Developer & MCA Graduate',
    headline: 'Architecting Scalable, Secure & Modern Web Applications.',
    introQuote: 'Transforming real-world challenges into elegant full-stack solutions.',
    introDescription:
      'MCA graduate and aspiring MERN Stack Developer with a strong foundation in full-stack web development. Proficient in building responsive and user-friendly web applications using React.js, Node.js, Express.js, and MongoDB. Skilled in REST API development, authentication, CRUD operations, protected routes, role-based access control, and modern web development practices.',
    careerObjective:
      'To contribute as a dedicated MERN Stack Developer utilizing modern technologies (React.js, Node.js, Express.js, MongoDB) to design, develop, and deploy scalable, responsive, and performance-optimized digital applications that solve real-world problems with robust security and seamless user experiences.',
    profileImage: '/assets/dharshini.jpg',
    resumePdf: '/Dharshini-Resume.pdf',
    interests: [
      {
        title: 'Full-Stack Web Engineering',
        desc: 'Designing end-to-end web architectures, RESTful API pipelines, stateful React components, and secure tokenized authentication.',
        icon: 'Layers',
      },
      {
        title: 'Machine Learning & AI',
        desc: 'Developing predictive neural network models, clinical severity analytics, and computer vision classification algorithms.',
        icon: 'Brain',
      },
      {
        title: 'UI/UX & Responsive Systems',
        desc: 'Crafting accessible, intuitive interfaces with React Router, Bootstrap, and modern CSS for fluid cross-device experiences.',
        icon: 'Palette',
      },
      {
        title: 'Open Source & Continuous Learning',
        desc: 'Actively building, documenting, and sharing modular repositories on GitHub while adopting cutting-edge engineering standards.',
        icon: 'Code2',
      },
    ],
    contactInfo: {
      email: 'dharshinithirumurugan2424@gmail.com',
      phone: '+91 9360084723',
      location: 'Dindigul, Tamil Nadu, India',
      github: 'https://github.com/dharshini201',
      linkedin: 'https://linkedin.com/in/dharshini2003',
    },
  },

  skills: {
    frontend: [
      { name: 'HTML5', level: 95, icon: 'Code', desc: 'Semantic markup, accessibility (a11y), clean document hierarchy' },
      { name: 'CSS3', level: 92, icon: 'Palette', desc: 'Responsive layouts, Flexbox, Grid, transitions, modern styling' },
      { name: 'JavaScript (ES6+)', level: 90, icon: 'Cpu', desc: 'Async/await, closures, promises, DOM manipulation, ES modules' },
      { name: 'React.js', level: 92, icon: 'Atom', desc: 'Component architecture, custom hooks, virtual DOM, state management' },
      { name: 'React Router', level: 90, icon: 'Compass', desc: 'Client-side routing, protected routes, dynamic route parameters' },
      { name: 'Bootstrap', level: 88, icon: 'Layout', desc: 'Mobile-first grid system, responsive breakpoints, UI components' },
    ],
    backend: [
      { name: 'Node.js', level: 88, icon: 'Server', desc: 'Event-driven asynchronous server runtime & non-blocking I/O' },
      { name: 'Express.js', level: 88, icon: 'Boxes', desc: 'Modular endpoint routing, middleware pipelines, MVC pattern' },
      { name: 'REST API', level: 92, icon: 'Network', desc: 'Stateless HTTP endpoints, JSON protocols, error handling & CRUD operations' },
    ],
    database: [
      { name: 'MongoDB', level: 90, icon: 'Database', desc: 'NoSQL document database, collections, BSON modeling, aggregation' },
      { name: 'Mongoose', level: 88, icon: 'FileSpreadsheet', desc: 'Strict schema modeling, validations, middleware, query optimization' },
    ],
    authentication: [
      { name: 'JWT (JSON Web Tokens)', level: 90, icon: 'ShieldCheck', desc: 'Stateless token generation, header verification, secure auth sessions' },
      { name: 'bcryptjs', level: 88, icon: 'Lock', desc: 'Cryptographic password hashing, salting, and secure credential storage' },
      { name: 'Protected Routes', level: 90, icon: 'Shield', desc: 'Client & server route guards, authenticated view authorization' },
      { name: 'Role-Based Access Control', level: 88, icon: 'Users', desc: 'Granular multi-role permissions for users, mechanics, and admins' },
    ],
    tools: [
      { name: 'Git', level: 90, icon: 'GitBranch', desc: 'Distributed version control, branching, committing, merging' },
      { name: 'GitHub', level: 90, icon: 'Github', desc: 'Repository management, open-source collaboration, version history' },
      { name: 'VS Code', level: 95, icon: 'Terminal', desc: 'Primary IDE, debugging, terminal integration, development extensions' },
      { name: 'Postman', level: 90, icon: 'Send', desc: 'REST endpoint testing, payload inspection, auth header validation' },
    ],
  },

  projects: [
    {
      id: 'car-service-mechanic-hub',
      title: 'Car Service and Mechanic Hub',
      subtitle: 'Full Stack MERN Web Application',
      badge: 'Flagship MERN Project',
      period: 'July 2026 – September 2026',
      description:
        'A comprehensive full-stack web application developed to connect vehicle owners with trusted car service centers and certified mechanics.',
      detailedOverview:
        'Engineered an end-to-end commercial automotive service platform built using the MERN stack (React.js, Node.js, Express.js, MongoDB). Features secure user authentication with JWT and bcryptjs, interactive service appointment booking, comprehensive vehicle maintenance history, real-time service tracking, and role-based dashboards tailored for vehicle owners, mechanics, and system administrators.',
      stack: [
        'React.js',
        'React Router',
        'Bootstrap',
        'CSS',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Mongoose',
        'REST API',
        'JWT',
        'bcryptjs',
      ],
      features: [
        'Developed full-stack web application connecting vehicle owners with certified mechanics',
        'Implemented secure user authentication with encrypted passwords via bcryptjs & JWT',
        'Service booking system with scheduling, vehicle history, and real-time service tracking',
        'Role-based dashboards customized for users, mechanics, and system administrators',
        'Built RESTful APIs using Node.js & Express.js for authentication, bookings, vehicles, services, and admin operations',
        'Designed and implemented a responsive, user-friendly frontend using React.js, React Router, Bootstrap, and CSS',
        'Integrated MongoDB with Mongoose for efficient relational data storage and optimized schema management',
      ],
      previewImage: '/assets/dharshini.svg',
      galleryImages: [],
      liveUrl: 'https://github.com/dharshini201',
      githubUrl: 'https://github.com/dharshini201',
      stats: [
        { label: 'Architecture', value: 'MERN Stack' },
        { label: 'Security', value: 'JWT + bcryptjs' },
        { label: 'Access Control', value: '3-Tier RBAC' },
        { label: 'Database', value: 'MongoDB' },
      ],
    },
    {
      id: 'parkinson-disease-detection',
      title: 'Parkinson Disease Detection Using Severity Analysis',
      subtitle: 'Machine Learning & Deep Learning',
      badge: 'Healthcare AI Analytics',
      period: 'January 2026 – April 2026',
      description:
        'A predictive intelligence model developed to detect Parkinson’s disease and analyze its severity using machine learning and deep learning techniques.',
      detailedOverview:
        'Designed and trained an advanced healthcare diagnostic model utilizing clinical datasets to predict Parkinson’s disease onset and quantify progressive severity. Implemented robust data preprocessing, feature extraction pipelines, and high-accuracy classification algorithms including Convolutional Neural Networks (CNN) and Random Forest classifiers. Prediction analytics and patient severity distributions are visualized interactively via Streamlit.',
      stack: [
        'Python',
        'Machine Learning',
        'Deep Learning',
        'CNN',
        'Random Forest',
        'TensorFlow',
        'PyTorch',
        'Streamlit',
      ],
      features: [
        'Developed predictive model to detect Parkinson’s disease and analyze clinical severity',
        'Implemented end-to-end data preprocessing, noise filtration, and feature extraction',
        'Trained and evaluated classification models including CNN and Random Forest',
        'Severity analysis predicting clinical stage progression and risk indicators',
        'Visualized prediction metrics and diagnostic results using Python, TensorFlow/PyTorch, and Streamlit',
      ],
      previewImage: '/assets/dharshini.svg',
      galleryImages: [],
      liveUrl: 'https://github.com/dharshini201',
      githubUrl: 'https://github.com/dharshini201',
      stats: [
        { label: 'Frameworks', value: 'TensorFlow/PyTorch' },
        { label: 'Models', value: 'CNN + Random Forest' },
        { label: 'Analytics', value: 'Severity Analysis' },
        { label: 'UI Dashboard', value: 'Streamlit' },
      ],
    },
  ],

  experience: [
    {
      id: 'car-service-project-exp',
      company: 'Car Service and Mechanic Hub',
      role: 'Full Stack MERN Developer',
      period: 'July 2026 – September 2026',
      badge: 'Full Stack Web Application',
      location: 'Dindigul, Tamil Nadu',
      highlights: [
        'Developed a full-stack web application connecting vehicle owners with trusted car service centers and mechanics.',
        'Implemented secure user authentication, service booking, vehicle history, service tracking, and role-based dashboards for users, mechanics, and administrators.',
        'Built RESTful APIs using Node.js and Express.js for authentication, bookings, vehicles, services, users, and administrative operations.',
        'Designed and implemented a responsive, user-friendly frontend using React.js, React Router, Bootstrap, and CSS.',
        'Integrated MongoDB with Mongoose for efficient data storage and management, using JWT and bcryptjs for authentication and password security.',
      ],
      certificateUrl: '',
      technologies: ['React.js', 'React Router', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Bootstrap', 'JWT', 'bcryptjs', 'REST API'],
    },
    {
      id: 'parkinson-project-exp',
      company: 'Parkinson Disease Detection Project',
      role: 'Machine Learning & Deep Learning Developer',
      period: 'January 2026 – April 2026',
      badge: 'Machine Learning & Deep Learning',
      location: 'Dindigul, Tamil Nadu',
      highlights: [
        'Developed a predictive model to detect Parkinson’s disease and analyze its severity using machine learning and deep learning techniques.',
        'Implemented data preprocessing, feature extraction, and classification models such as CNN and Random Forest.',
        'Visualized prediction results and diagnostic metrics using Python, TensorFlow/PyTorch, and Streamlit.',
      ],
      certificateUrl: '',
      technologies: ['Python', 'Machine Learning', 'Deep Learning', 'CNN', 'Random Forest', 'TensorFlow', 'PyTorch', 'Streamlit'],
    },
    {
      id: 'fullstack-training-exp',
      company: 'Full Stack Web Development Training',
      role: 'MERN Stack Trainee',
      period: '2025 – 2026',
      badge: 'Industry Technical Training',
      location: 'Tamil Nadu, India',
      highlights: [
        'Underwent comprehensive hands-on training in building full-stack web architectures with React.js, Node.js, Express.js, and MongoDB.',
        'Mastered CRUD operations, asynchronous API integration, tokenized JWT authentication, and protected client routes.',
        'Collaborated on real-world web applications and implemented responsive design standards with Bootstrap and modern CSS.',
      ],
      certificateUrl: '',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Postman', 'Git', 'GitHub'],
    },
  ],

  certifications: [
    {
      id: 'full-stack-web-training',
      title: 'Full Stack Web Development Training',
      issuer: 'Technical Training Academy',
      date: '2026',
      previewUrl: '',
      verifyUrl: '',
      icon: 'Layers',
      description: 'Comprehensive industry training in MERN stack architecture covering React.js, Node.js, Express.js, MongoDB, JWT authentication, and REST API development.',
      category: 'Full-Stack Engineering',
    },
    {
      id: 'cardiac-failure-ann-paper',
      title: 'Paper Presented: Cardiac Failure Detection using Artificial Neural Network',
      issuer: 'Academic Research Forum',
      date: '2026',
      previewUrl: '',
      verifyUrl: '',
      icon: 'Brain',
      description: 'Authored and presented a scientific research paper demonstrating early detection and diagnostic risk analysis of cardiac failure utilizing Artificial Neural Networks (ANN).',
      category: 'Research & AI',
    },
    {
      id: 'hindi-examination-certificates',
      title: 'Basic Hindi Examination Certificates (3 Levels)',
      issuer: 'Certified Hindi Examination Board',
      date: 'Completed 3 Levels',
      previewUrl: '',
      verifyUrl: '',
      icon: 'Award',
      description: 'Successfully passed and certified across 3 progressive levels of Hindi examinations, demonstrating dedicated linguistic discipline and multilingual capability.',
      category: 'Language Proficiency',
    },
  ],

  education: [
    {
      id: 'mca',
      institution: 'Gandhigram Rural Institute',
      location: 'Dindigul, Tamil Nadu',
      degree: 'MCA (Master of Computer Applications)',
      period: '2024 – 2026',
      score: 'Master’s Degree',
      status: 'Graduating Post-Graduate Degree',
      highlights: [
        'Advanced post-graduate coursework in Full-Stack Web Development, MERN Stack Architecture, and Distributed Systems.',
        'Practical implementations in Machine Learning, Deep Learning, Neural Networks, and Predictive Analytics.',
        'Software Engineering principles, REST API design, advanced database modeling, and cloud deployments.',
      ],
    },
    {
      id: 'bsc-cs',
      institution: 'Amman College of Arts and Science',
      location: 'Dindigul, Tamil Nadu',
      degree: 'B.Sc. Computer Science',
      period: '2020 – 2023',
      score: 'Bachelor’s Degree',
      status: 'Graduated',
      highlights: [
        'Comprehensive foundational curriculum in Data Structures, Database Management Systems (DBMS), OOP, and Algorithms.',
        'Practical capstones in web development, Java, C++, relational database design, and software lifecycle.',
        'Active participant in collegiate programming seminars, code challenges, and technical showcases.',
      ],
    },
  ],

  achievements: [
    {
      id: 'ach-1',
      title: 'Full-Stack MERN Platform: Car Service Hub',
      category: 'Technical Milestone',
      icon: 'Rocket',
      description:
        'Architected and implemented a full-stack web application connecting vehicle owners with service centers, featuring 3-tier role-based dashboards and JWT authentication.',
      year: '2026',
    },
    {
      id: 'ach-2',
      title: 'Research Paper Presentation: Cardiac Failure ANN',
      category: 'Research & AI',
      icon: 'Award',
      description:
        'Presented research paper on Cardiac Failure Detection using Artificial Neural Networks, showcasing early medical risk prediction capabilities.',
      year: '2026',
    },
    {
      id: 'ach-3',
      title: 'Predictive Healthcare AI: Parkinson Severity Model',
      category: 'Deep Learning',
      icon: 'Brain',
      description:
        'Developed end-to-end predictive diagnostic model for Parkinson’s disease using CNN and Random Forest classifiers with interactive Streamlit visualization.',
      year: '2026',
    },
    {
      id: 'ach-4',
      title: 'Certified Hindi Examination (3 Levels)',
      category: 'Multilingual Certification',
      icon: 'Sparkles',
      description:
        'Earned official certification across 3 progressive levels of Hindi examinations, demonstrating multilingual proficiency and dedication.',
      year: '3 Levels',
    },
    {
      id: 'ach-5',
      title: 'Academic Excellence: MCA & B.Sc. CS',
      category: 'Higher Education',
      icon: 'GraduationCap',
      description:
        'Master of Computer Applications from Gandhigram Rural Institute and Bachelor of Science in Computer Science from Amman College of Arts and Science.',
      year: '2020–2026',
    },
  ],
};
