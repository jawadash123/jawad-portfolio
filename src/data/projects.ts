/** Structured project data — add future projects here, the UI adapts. */

export type ProjectVisual = 'aegis' | 'drs' | 'plate' | 'emotion' | 'bot'

export interface Project {
  id: string
  index: string
  title: string
  short: string
  badge: string
  role?: string
  date: string
  status?: string
  timeline?: string
  summary: string
  overview: string
  problem: string
  solution: string
  architecture: string[]
  technologies: string[]
  features: string[]
  metrics?: { value: string; label: string; note?: string }[]
  disclaimer?: string
  github?: string
  demo?: string
  visual: ProjectVisual
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'aegis',
    index: '01',
    title: 'Aegis',
    short: 'Multi-Tenant AI Agent Platform',
    badge: 'SaaS / AI / Full Stack',
    role: 'Project Owner',
    date: '',
    summary:
      'Multi-tenant SaaS platform delivering AI-powered customer support across web, Facebook, Instagram, WhatsApp and email.',
    overview:
      'Aegis is a multi-tenant SaaS platform for AI-powered customer support. Organizations onboard into isolated workspaces and connect their channels — web chat, Facebook, Instagram, WhatsApp and email — while a RAG-backed AI agent answers from their own knowledge base.',
    problem:
      'Support teams drown in repetitive questions spread across disconnected channels. Smaller organizations cannot justify per-channel support tooling, let alone staffing each one.',
    solution:
      'One platform, many tenants: a retrieval-augmented agent grounds every reply in the organization\u2019s own documents, and Meta\u2019s messaging APIs unify Facebook, Instagram and WhatsApp into the same conversation pipeline as web chat and email.',
    architecture: [
      'Next.js application layer for the tenant-facing product and chat surfaces',
      'FastAPI service layer handling multi-tenant routing and agent orchestration',
      'RAG knowledge retrieval scoped strictly per tenant',
      'PostgreSQL for tenant, conversation and knowledge data',
      'Meta Graph API integrations for Facebook, Instagram and WhatsApp',
      'Docker + Nginx deployment with tenant isolation on Linux servers',
    ],
    technologies: ['FastAPI', 'PostgreSQL', 'Next.js', 'RAG', 'Meta APIs', 'Docker', 'Nginx', 'Linux'],
    features: [
      'Multi-tenant architecture with per-organization isolation',
      'AI-powered customer support agent',
      'Knowledge retrieval grounded in tenant documents',
      'Meta integrations: Facebook, Instagram, WhatsApp',
      'Data security architecture across tenants',
      'Production deployment with Docker and Nginx',
    ],
    visual: 'aegis',
    featured: true,
  },
  {
    id: 'drs',
    index: '02',
    title: 'AI-Powered Decision Review System',
    short: 'Decision Review System for Local Cricket',
    badge: 'Final Year Project',
    status: 'In Progress',
    timeline: 'September 2025 \u2013 Present',
    date: 'September 2025 \u2013 Present',
    summary:
      'A low-cost AI-based DRS for local and grassroots cricket: ball detection, tracking, trajectory prediction and LBW/edge decision support from broadcast footage.',
    overview:
      'A research implementation of an AI Decision Review System aimed at local and grassroots cricket, where professional DRS infrastructure is out of reach. The system analyses broadcast-style footage to detect and track the ball, predict its trajectory and support LBW and edge decisions.',
    problem:
      'Professional DRS technology is priced far beyond local cricket. Umpiring errors at the grassroots level go unreviewed because there is no affordable alternative.',
    solution:
      'An end-to-end computer-vision pipeline built on YOLO11 detection, ByteTrack multi-object tracking and Kalman-filter smoothing, predicting the ball\u2019s 3D path and rendering decision-support visualizations from standard broadcast footage.',
    architecture: [
      'YOLO11 ball detection on broadcast frames',
      'ByteTrack multi-object tracking to maintain ball identity',
      'Kalman filtering to smooth noisy detections',
      'OpenCV frame processing and trajectory visualization',
      'PyTorch inference backend; prototyped in Jupyter',
    ],
    technologies: ['Python', 'YOLO11', 'ByteTrack', 'Kalman Filtering', 'OpenCV', 'PyTorch', 'Jupyter'],
    features: [
      'Ball detection on broadcast footage',
      'Multi-frame ball tracking',
      'Trajectory prediction',
      'LBW decision support',
      'Edge decision support',
      'Works from standard broadcast footage',
    ],
    metrics: [
      {
        value: '94%',
        label: 'Validation accuracy',
        note: 'As stated on the resume \u2014 validation-stage accuracy of the detection/tracking pipeline, not a claim of professional DRS equivalence.',
      },
    ],
    disclaimer:
      'Presented as a low-cost AI-based alternative and research implementation for local and grassroots cricket \u2014 not professional-grade DRS.',
    visual: 'drs',
  },
  {
    id: 'plate',
    index: '03',
    title: 'Automated Car Number Plate Detection',
    short: 'License plate detection & OCR',
    badge: 'Computer Vision',
    date: 'January 2025',
    summary:
      'YOLOv8-based vehicle and license plate detection with EasyOCR text extraction across image and video inputs.',
    overview:
      'A computer-vision pipeline that detects vehicles and their license plates in images and video, crops the plate region and extracts the plate number with OCR.',
    problem:
      'Manually logging vehicle plates from footage is slow and error-prone; automated plate extraction needs both reliable detection and robust text reading.',
    solution:
      'YOLOv8 locates vehicles and plates, OpenCV handles image processing, and EasyOCR reads the cropped plate region \u2014 supporting both single images and video streams.',
    architecture: [
      'YOLOv8 vehicle & license-plate detection',
      'OpenCV image and video processing',
      'Plate-region cropping and normalization',
      'EasyOCR text extraction',
    ],
    technologies: ['Python', 'OpenCV', 'YOLOv8', 'EasyOCR'],
    features: [
      'Vehicle & license plate detection',
      'Image processing pipeline',
      'Video processing support',
      'OCR-based plate number extraction',
    ],
    visual: 'plate',
  },
  {
    id: 'emotion',
    index: '04',
    title: 'Human Facial Emotion Detection',
    short: 'Real-time facial expression recognition',
    badge: 'Deep Learning',
    date: 'March 2025',
    summary:
      'CNN-based real-time facial expression recognition across seven emotion categories with live visual feedback.',
    overview:
      'A deep-learning system that reads a live webcam stream, detects faces and classifies facial expressions into seven emotion categories with on-screen visual feedback.',
    problem:
      'Reading human emotional state from video is a classic CV problem; a from-scratch CNN implementation demonstrates the full path from raw pixels to classified expression in real time.',
    solution:
      'A convolutional neural network built with Keras/TensorFlow classifies detected faces live from the webcam, drawing emotion feedback over each frame.',
    architecture: [
      'OpenCV face capture and preprocessing',
      'CNN classifier trained in Keras / TensorFlow',
      'Real-time webcam inference loop',
      'Seven emotion categories with visual feedback',
    ],
    technologies: ['Python', 'OpenCV', 'Keras', 'TensorFlow', 'CNN'],
    features: [
      'Real-time webcam input',
      'Facial expression recognition',
      'Seven emotion categories',
      'Live visual feedback overlay',
    ],
    visual: 'emotion',
  },
  {
    id: 'bot',
    index: '05',
    title: 'Intelligent Event Reminder Bot',
    short: 'Rule-driven reminder automation',
    badge: 'Automation',
    date: 'March 2025',
    summary:
      'Event storage and rule-driven, time-based notification triggers built on Firebase Firestore.',
    overview:
      'A focused automation tool: events are stored in Firebase Firestore and a rule engine evaluates time-based triggers to fire notifications at the right moment.',
    problem:
      'Remembering and reliably firing time-based event reminders by hand does not scale; the logic needs to be declarative and dependable.',
    solution:
      'Events live in Firestore; rule-driven triggers evaluate datetime conditions and dispatch notifications automatically.',
    architecture: [
      'Firebase Firestore event storage',
      'Rule-driven time-based trigger engine',
      'Firebase Admin SDK notification dispatch',
    ],
    technologies: ['Python', 'Firebase Firestore', 'Firebase Admin SDK', 'Datetime'],
    features: ['Event storage', 'Rule-driven time-based triggers', 'Automatic notifications'],
    visual: 'bot',
  },
]
