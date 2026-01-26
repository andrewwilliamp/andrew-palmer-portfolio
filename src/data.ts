export interface Experience {
  company: string;
  title: string;
  period: string;
  location: string;
  description: string[];
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  graduationDate: string;
  location: string;
  coursework: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export const experiences: Experience[] = [
  {
    company: 'GDIT',
    title: 'Senior Software Engineer, Full Stack',
    period: 'Nov 2025 – Present',
    location: 'Hammond, LA',
    description: [
      'Lead feature development for a Medicare & Medicaid fraud-prevention platform with 1,000+ daily active users, utilizing Angular/TypeScript, Spring Boot (Java), and PostgreSQL',
      'Refactor and modernize Angular codebase, improving component reusability and reducing duplicated logic by 20%+',
      'Drove adoption of feature flagging as part of agile process improvements, enabling smaller PRs, faster feedback cycles, and more predictable releases',
      'Improve stability of Angular/Spring Boot application, continuously reduce and prevent production defects through proactive code reviews & testing',
      'Mentor junior developers, lead process experiments, run agile development meetings, and set documentation standards',
    ],
  },
  {
    company: 'GDIT',
    title: 'Software Engineer, Full Stack',
    period: 'July 2024 – Nov 2025',
    location: 'Hammond, LA',
    description: [
      'Developed and maintained Angular and Spring Boot applications supporting Medicare and Medicaid fraud prevention efforts',
      'Delivered 500+ code contributions this year, implementing new features, performance enhancements, and production fixes',
      'Optimized PostgreSQL queries and database performance to improve application efficiency and data retrieval speed',
      'Integrated and managed Camunda workflows, resolved 1,000+ broken claims through targeted process fixes',
      'Collaborated with Agile teams to deliver secure, production-ready features through CI/CD pipelines',
    ],
  },
  {
    company: 'JBS',
    title: 'Software Engineer, Data',
    period: 'Sept 2023 – May 2024',
    location: 'Greeley, CO',
    description: [
      'Connected SAP data sources to various applications, enabling visibility into manufacturing KPIs, inventory, and production performance',
      'Integrated SAP manufacturing and operations data to support process analytics and decision-making across plants',
      'Led major system changes, driving cross-departmental data transitions and process enhancements to improve manufacturing efficiency',
      'Enhanced applications with incremental data loads, performance tuning, and production issue resolutions',
      'Documented application design, workflows, and development decisions',
    ],
  },
  {
    company: 'JBS',
    title: 'Product System Administrator II',
    period: 'July 2022 – Sept 2023',
    location: 'Greeley, CO',
    description: [
      'Configured and deployed 8 project management models for the R&D department, improving product development tracking and visibility',
      'Connected SAP PLM, MM, and production modules to Qlik for comprehensive analytics on product lifecycle, materials, and production performance',
      'Tested and authored SAP/PLM documents, workflows, and user administration protocols',
      'Collaborated with manufacturing and operations teams to identify data-driven solutions that enhanced production quality and efficiency',
    ],
  },
];

export const education: Education[] = [
  {
    school: 'Rio Salado College',
    degree: 'Associate of Science',
    field: 'Programming and Systems Analysis',
    graduationDate: 'August 2024',
    location: 'Online',
    coursework: [
      'MySQL Database',
      'Python Programming',
      'Java Programming I & II (Spring)',
      'JavaScript',
      'C#',
      'Linux OS',
      'Web Development',
      'Object Oriented Programming',
      'Microsoft Office',
      'Networking',
    ],
  },
  {
    school: 'University of Louisiana at Lafayette',
    degree: 'Master of Science',
    field: 'Systems Technology',
    graduationDate: 'May 2022',
    location: 'Lafayette, LA',
    coursework: [
      'iOS Application Software Requirements',
      'Project Management',
      'Lean Manufacturing',
      'Life Cycle Analysis',
      'Risk Analysis',
      'Materials Technology & Applications',
      'Solar Energy System Design',
    ],
  },
  {
    school: 'University of Louisiana at Lafayette',
    degree: 'Bachelor of Science',
    field: 'Engineering and Technology Management, Minor in Business',
    graduationDate: 'December 2020',
    location: 'Lafayette, LA',
    coursework: [
      'Integrated Systems and Advanced Instrumentation',
      'Analog/Digital Electronic Systems',
      'AutoCAD/Inventor',
      'SolidWorks',
      'Fluid Power Systems',
      'Industrial Operations Systems',
    ],
  },
];

export const skills: SkillCategory[] = [
  {
    name: 'Languages',
    skills: ['Java', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Python', 'SQL', 'C#'],
  },
  {
    name: 'Frontend',
    skills: ['Angular', 'React', 'HTML5', 'CSS3', 'Responsive Design'],
  },
  {
    name: 'Backend',
    skills: ['Spring Boot', 'Express.js', 'Node.js', 'Java', 'PostgreSQL', 'MySQL'],
  },
  {
    name: 'Tools & Platforms',
    skills: [
      'Git',
      'Docker',
      'Jenkins',
      'Linux',
      'PostgreSQL',
      'MySQL',
      'Snowflake',
      'Dataiku',
      'SAP',
      'Camunda',
    ],
  },
  {
    name: 'Specializations',
    skills: ['Full Stack Development', 'Data Integration', 'Process Optimization', 'Cloud Architecture'],
  },
];

export const contact = {
  email: 'andrewwilliamp3@gmail.com',
  phone: '(985) 237-8200',
  location: 'Hammond, LA',
  clearance: 'Public Trust',
};
