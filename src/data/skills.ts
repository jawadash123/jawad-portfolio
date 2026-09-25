export interface SkillCategory {
  id: string
  label: string
  icon: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    label: 'Programming',
    icon: '01',
    skills: ['Python', 'C', 'C++', 'JavaScript'],
  },
  {
    id: 'ml',
    label: 'Machine Learning',
    icon: '02',
    skills: ['Scikit-learn', 'Classification', 'Prediction', 'Feature Engineering', 'Model Evaluation'],
  },
  {
    id: 'dl',
    label: 'Deep Learning',
    icon: '03',
    skills: ['TensorFlow', 'Keras', 'PyTorch', 'CNN'],
  },
  {
    id: 'cv',
    label: 'Computer Vision',
    icon: '04',
    skills: ['OpenCV', 'YOLO', 'Object Detection', 'Facial Recognition', 'ByteTrack', 'Kalman Filtering'],
  },
  {
    id: 'web',
    label: 'Web Development',
    icon: '05',
    skills: ['HTML', 'CSS', 'JavaScript', 'Next.js', 'FastAPI'],
  },
  {
    id: 'db',
    label: 'Databases',
    icon: '06',
    skills: ['MySQL', 'SQL Server', 'PostgreSQL', 'Firebase Firestore'],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    icon: '07',
    skills: ['Kotlin', 'XML'],
  },
  {
    id: 'devops',
    label: 'DevOps / Tools',
    icon: '08',
    skills: ['Git', 'Bitbucket', 'Docker', 'Nginx', 'Linux', 'Jira', 'Jupyter'],
  },
  {
    id: 'networks',
    label: 'Computer Networks',
    icon: '09',
    skills: [
      'Cisco Packet Tracer',
      'VLANs',
      'DHCP',
      'Router Subinterfaces',
      'Port Security',
      'Wireless Access',
      'Dynamic Routing',
    ],
  },
]

/** Orbits shown around the central core in the Skills section. */
export const orbitRings = ['Python', 'PyTorch', 'OpenCV', 'FastAPI', 'Next.js', 'PostgreSQL', 'Docker', 'YOLO']

export interface PipelineNode {
  id: string
  label: string
  tech: string
  detail: string
}

export const pipeline: PipelineNode[] = [
  {
    id: 'idea',
    label: 'Idea',
    tech: 'Problem framing',
    detail: 'Scope the real problem first \u2014 what decision or automation actually needs to exist.',
  },
  {
    id: 'data',
    label: 'Data',
    tech: 'Python \u00b7 cleaning \u00b7 feature engineering',
    detail: 'Collect, clean and engineer features. Most model quality is decided here.',
  },
  {
    id: 'model',
    label: 'Model',
    tech: 'PyTorch \u00b7 TensorFlow \u00b7 scikit-learn',
    detail: 'Train and evaluate \u2014 YOLO for detection, CNNs for classification, honest validation metrics.',
  },
  {
    id: 'api',
    label: 'API',
    tech: 'FastAPI',
    detail: 'Serve the model behind typed, documented endpoints that the product layer can trust.',
  },
  {
    id: 'app',
    label: 'Application',
    tech: 'Next.js \u00b7 PostgreSQL',
    detail: 'Product surface and persistence \u2014 real UI, real data, multi-tenant where needed.',
  },
  {
    id: 'deploy',
    label: 'Deployment',
    tech: 'Docker \u00b7 Nginx \u00b7 Linux',
    detail: 'Containerize, proxy and ship to Linux servers \u2014 production, not demos.',
  },
]
