import { FaBrain, FaCode, FaServer, FaLaptopCode } from "react-icons/fa";

export const tracks = [
  {
    id: "aiml",
    name: "AI / ML",
    shortName: "AI/ML",
    description:
      "Master Artificial Intelligence and Machine Learning from fundamentals to deployment",
    Icon: FaBrain,
    color: "#818cf8",
    gradient: "from-indigo-500 to-purple-500",
    status: "active",
    badge: "AI",
    basePath: "/aiml",
    subtracks: null,
  },
  {
    id: "dsa",
    name: "Data Structures & Algorithms",
    shortName: "DSA",
    description:
      "Master problem-solving with essential data structures and algorithms for coding interviews and competitive programming",
    Icon: FaCode,
    color: "#34d399",
    gradient: "from-emerald-500 to-teal-500",
    status: "active",
    badge: "DS",
    basePath: "/dsa",
    subtracks: null,
  },
  {
    id: "system-design",
    name: "System Design",
    shortName: "System Design",
    description:
      "Learn to design scalable, reliable, and efficient software systems from architecture to implementation",
    Icon: FaServer,
    color: "#f59e0b",
    gradient: "from-amber-500 to-orange-500",
    status: "coming-soon",
    badge: "SD",
    basePath: "/track/system-design",
    subtracks: [
      {
        id: "hld",
        name: "High Level Design",
        shortName: "HLD",
        description:
          "Architecture patterns, scalability, and distributed systems",
        color: "#f59e0b",
        expectedTopics: [
          "Scaling Fundamentals",
          "Load Balancing",
          "Caching Strategies",
          "Database Design & Sharding",
          "Message Queues & Event-Driven",
          "Microservices Architecture",
          "API Design & Gateway",
          "CDN, DNS & Networking",
          "Consistency & Availability (CAP)",
          "Real-world System Designs",
        ],
      },
      {
        id: "lld",
        name: "Low Level Design",
        shortName: "LLD",
        description:
          "Design patterns, SOLID principles, and object-oriented design",
        color: "#fb923c",
        expectedTopics: [
          "SOLID Principles",
          "Creational Design Patterns",
          "Structural Design Patterns",
          "Behavioral Design Patterns",
          "UML & Class Diagrams",
          "Object-Oriented Design",
          "Real-world LLD Problems",
          "Clean Code & Refactoring",
        ],
      },
    ],
  },
  {
    id: "development",
    name: "Web Development",
    shortName: "Dev",
    description:
      "Master HTML5, CSS3, and JavaScript — build stunning, interactive websites from scratch",
    Icon: FaLaptopCode,
    color: "#a78bfa",
    gradient: "from-violet-500 to-fuchsia-500",
    status: "active",
    badge: "DEV",
    basePath: "/dev",
    subtracks: null,
  },
];

export const getTrackById = (trackId) => tracks.find((t) => t.id === trackId);

export const activeTrackData = tracks.find((t) => t.status === "active");
export const comingSoonTracks = tracks.filter(
  (t) => t.status === "coming-soon",
);
