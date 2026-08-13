export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  link: string;
  images: string[];
  year: string;
  icon: string;
}

export const projects: Project[] = [
  {
    slug: "emotibear",
    title: "Emotibear",
    description: "An interactive toy that lets users express and track emotions through playful, tactile interactions. Winner of the MISTI MIT Arab World People's Choice Award.",
    longDescription: "Emotibear is an interactive toy designed to help users express and track their emotions through playful, tactile interactions. It won the MISTI MIT Arab World People's Choice Award, recognised for its innovation in user engagement and emotional awareness. The project combined hardware design with thoughtful UX to make emotional check-ins feel natural rather than clinical.",
    tags: ["Hardware", "UX Design", "Award Winner"],
    link: "",
    images: [],
    year: "2025",
    icon: "🧸",
  },
  {
    slug: "polaris",
    title: "Polaris — Safety App",
    description: "A full-stack Flutter mobile app for passive personal safety monitoring — real-time GPS tracking, emergency escalation, and live location sharing across iOS and Android. 25+ screens, Firebase Auth, Firestore, Google Maps SDK.",
    longDescription: "Polaris is a full-stack Flutter mobile application for passive personal safety monitoring, featuring real-time GPS tracking, emergency escalation, and live Safety Circle location sharing across iOS and Android. It's architected across 25+ screens with Firebase Auth, Firestore, and the Google Maps SDK, powering real-time data streams for live location updates and circle member status. The app includes a complete UI design system built from scratch, background location services, silent SOS triggers, and a 5-stage smart escalation engine for passive threat detection.",
    tags: ["Flutter", "Firebase", "Google Maps SDK"],
    link: "",
    images: [],
    year: "2026",
    icon: "🛡️",
  },
  {
    slug: "the-internet-adventure",
    title: "The Internet Adventure",
    description: "A 7-level gamified website promoting Arabic domain names and email addresses, with continent-themed quizzes, XP systems, and a GPT-4-powered chatbot, summariser, and translator. Deployed on a live .bh domain.",
    longDescription: "The Internet Adventure is a 7-level gamified website promoting global adoption of Arabic domain names and email addresses, featuring continent-themed quizzes, XP systems, and achievement badges. It integrates the OpenAI GPT-4 API to power a chatbot, document summariser, translator, and interactive document explorer. Deployed on a live .bh domain with Arabic/Unicode email validation, newsletter subscription, and automatic domain linkification.",
    tags: ["OpenAI API", "Gamification", "Arabic Unicode"],
    link: "",
    images: [],
    year: "2025",
    icon: "🌐",
  },
  {
    slug: "byte-current",
    title: "Byte-Current",
    description: "A web app helping users detect and understand harmful algae blooms through interactive resources and real-time environmental data.",
    longDescription: "Byte-Current helps users detect and understand harmful algae blooms through interactive resources and environmental impact insights. Built with a React and CSS frontend and Python/JavaScript backend logic, it integrates real-time data to drive actionable environmental awareness.",
    tags: ["React", "Python", "Environmental Data"],
    link: "",
    images: [],
    year: "2025",
    icon: "🌊",
  },
];