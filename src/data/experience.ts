export interface Experience {
  id: string
  org: string
  role: string
  period: string
  duration: string
  location?: string
  summary: string
  points: string[]
  tags: string[]
}

export const experience: Experience[] = [
  {
    id: 'hubble42-aiml',
    org: 'Hubble42',
    role: 'AI/ML Engineer',
    period: 'July 2026 \u2013 Present',
    duration: 'Ongoing',
    location: 'Lahore, Pakistan',
    summary: 'Real-world AI/ML engineering and client coding tasks.',
    points: [
      'Developing and debugging Python-based solutions',
      'Using AI-assisted development tools, including Claude, Cursor, OpenCode and GLM',
      'Testing, debugging and validating solutions through structured evaluation workflows',
      'Working within software development and quality-control processes',
    ],
    tags: [
      'Python',
      'Machine Learning',
      'AI-Assisted Development',
      'Debugging',
      'Software Testing',
      'Quality Assurance',
    ],
  },
  {
    id: 'invisica-fullstack-ai',
    org: 'Invisica Tech (Pvt) Ltd',
    role: 'Full Stack AI Development Intern',
    period: 'January 2026 \u2013 June 2026',
    duration: '6 mos',
    location: 'Lahore, Pakistan',
    summary: 'Full-stack development with machine learning models built and integrated into web applications.',
    points: [
      'Developed AI-powered web applications across frontend, backend and ML integration',
      'Built and connected REST APIs between ML models and the application',
    ],
    tags: [
      'Full Stack Development',
      'Artificial Intelligence',
      'Machine Learning',
      'Python',
      'REST APIs',
    ],
  },
  {
    id: 'nexskill-ds',
    org: 'NexSkill',
    role: 'Data Science Intern',
    period: 'May 2024 \u2013 October 2024',
    duration: '6 mos',
    summary: 'End-to-end machine learning workflows on real customer datasets.',
    points: [
      'Built end-to-end machine learning workflows',
      'Data cleaning and feature engineering',
      'Model development and performance evaluation',
      'Customer churn analysis with Logistic Regression and Decision Tree models',
    ],
    tags: ['Machine Learning', 'Logistic Regression', 'Decision Tree', 'Feature Engineering'],
  },
  {
    id: 'nexskill-fe',
    org: 'NexSkill',
    role: 'Front End Developer',
    period: 'March 2023 \u2013 November 2023',
    duration: '9 mos',
    summary: 'Interactive web UI, including a Spotify-like interface with dynamic 3D lighting.',
    points: [
      'Built interactive user interfaces with HTML, CSS and JavaScript',
      'Developed a Spotify-like music interface',
      'Implemented dynamic 3D lighting effects in the browser',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Interactive UI', '3D Effects'],
  },
]

export interface Education {
  id: string
  degree: string
  institution: string
  year: string
  result: string
  resultLabel: string
  current?: boolean
}

export const education: Education[] = [
  {
    id: 'bscs',
    degree: 'BSCS \u2014 Bachelor of Science in Computer Science',
    institution: 'University of Management and Technology (UMT), Lahore',
    year: '2026',
    result: '3.00',
    resultLabel: 'CGPA',
    current: true,
  },
  {
    id: 'ics',
    degree: 'I.Cs. \u2014 Computer Science',
    institution: 'Punjab Group of Colleges (PGC), Lahore',
    year: '2019',
    result: '660/1100',
    resultLabel: '60.90%',
  },
  {
    id: 'matric',
    degree: 'Matriculation',
    institution: 'Government Muslim High School, Lahore',
    year: '2017',
    result: '880/1100',
    resultLabel: '80.0%',
  },
]

export const coursework = [
  'Databases',
  'Programming',
  'Algorithms',
  'Operating Systems',
  'Artificial Intelligence',
  'Machine Learning',
  'Deep Learning',
  'Computer Vision',
]
