// AIChat.tsx
import { useState, useRef, useEffect } from "react";
import {
  Send,
  Briefcase,
  X,
  MessageCircle,
  Sparkles,
  Code2,
  Database,
  Zap,
  Cpu,
  Bot,
  Circle,
  ChevronDown,
  Maximize2,
  Minimize2,
  Terminal,
  Command,
  Cctv,
} from "lucide-react";
import cvFile from "../types/Md_Kamran_Resume.pdf";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  type?: "text" | "experience" | "skills" | "command" | "detailed-response";
  timestamp: Date;
  data?: any;
}

interface AIChatProps {
  isDark: boolean;
}

const skillsData = {
  frontend: {
    name: "Frontend Development",
    icon: Code2,
    color: "from-green-400 to-green-600",
    skills: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
      "Framer Motion",
      "Responsive Design",
    ],
  },
  backend: {
    name: "Backend Development",
    icon: Database,
    color: "from-green-400 to-green-600",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Authentication",
      "Database Design",
      "Workflow Automation",
    ],
  },
  database: {
    name: "Databases",
    icon: Database,
    color: "from-green-400 to-green-600",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Query Optimization"],
  },
  tools: {
    name: "Tools & Practices",
    icon: Zap,
    color: "from-green-400 to-green-600",
    skills: [
      "Git & GitHub",
      "Code Reviews",
      "Problem Solving",
      "System Design",
      "SAP Integration",
    ],
  },
};

const experienceData = [
  {
    title: "Full Stack Developer",
    company: "Raisematters Pvt. Ltd.",
    period: "June 2024 - Present",
    description:
      "Working mainly on backend development for real-time manufacturing and enterprise applications, building scalable APIs, workflow automation, and third-party integrations.",
    keywords: [
      "manufacturing",
      "backend",
      "apis",
      "scalable",
      "enterprise",
      "production",
      "workflow",
      "adani",
      "sap",
      "authentication",
    ],
    achievements: [
      "Worked closely with frontend developers, backend teams, and business stakeholders to build and deliver new features while improving application quality through code reviews and collaboration",
      "Built and managed backend services for real-time manufacturing and production management applications, handling production orders, machine planning, operator assignments, and workflow execution",
      "Developed a complete manufacturing workflow system including raw material management, parts creation, production order allocation, machine scheduling, auto scheduling, and urgent rescheduling based on business priorities",
      "Integrated third-party SAP APIs to automate production order and parts synchronization, reducing manual work and improving operational efficiency",
      "Built secure authentication and authorization systems including OTP-based login verification, user access management, and backend security implementations",
      "Designed and optimized REST APIs and database operations to handle high-volume production data efficiently and improve scalability",
      "Currently contributing to an ongoing enterprise project for Adani Group",
    ],
    technologies: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "REST APIs",
      "SAP",
    ],
    highlights: [
      "🏭 Real-time manufacturing systems",
      "⚡ Scalable APIs for production management",
      "🔐 Enterprise-grade authentication",
      "📊 Complex workflow automation",
    ],
  },
  {
    title: "MERN Stack Developer Intern",
    company: "Masai School",
    period: "May 2023 - June 2024",
    description:
      "Worked on full-stack web application development while mentoring students and supporting technical learning processes.",
    keywords: [
      "mern",
      "fullstack",
      "learning",
      "mentoring",
      "interviews",
      "frontend",
      "react",
      "mongodb",
    ],
    achievements: [
      "Built and maintained web applications using React, Redux, Node.js, Express.js, and MongoDB",
      "Developed secure authentication systems and product management workflows while handling feature enhancements and bug fixes",
      "Reviewed student assignments and projects, helping them improve code quality and practical understanding",
      "Conducted technical interviews for Full Stack Developer candidates and evaluated frontend, backend, and database skills",
      "Solved technical queries and guided students in debugging and implementing full-stack development concepts",
    ],
    technologies: ["React", "Redux", "Node.js", "Express.js", "MongoDB"],
    highlights: [
      "👥 Mentored junior developers",
      "🔍 Conducted technical interviews",
      "🚀 Built full-stack applications",
      "📚 Code review & quality improvement",
    ],
  },
];

const AIChat = ({ isDark }: AIChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "> SYSTEM_BOOT_SEQUENCE_INITIATED\n> NEURAL_INTERFACE_ACTIVE\n> PORTFOLIO_AI_v2.0_ONLINE\n\n**ACCESS GRANTED.**\n\nI am your robotic portfolio interface. I can analyze and retrieve professional data with high precision.\n\n**AVAILABLE_COMMANDS:**\n├─ show experience  → View career history\n├─ show skills      → Technical competency matrix\n├─ download resume  → Retrieve CV document\n├─ portfolio overview → Profile summary\n└─ tell me about [topic] → Search expertise\n\n**READY_FOR_INPUT.**",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const suggestedCommands = [
    { label: ">_ DOWNLOAD_RESUME", command: "download resume" },
    { label: ">_ SHOW_EXPERIENCE", command: "show experience" },
    { label: ">_ SHOW_SKILLS", command: "show skills" },
    { label: ">_ PORTFOLIO_OVERVIEW", command: "portfolio overview" },
  ];

  const findRelevantExperience = (query: string): any[] => {
    const queryLower = query.toLowerCase();
    return experienceData.filter((exp) =>
      exp.keywords.some((keyword) => queryLower.includes(keyword))
    );
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = cvFile;
    link.download = "Md_Kamran_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setMessages((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        text: "> TRANSFER_COMPLETE.\n✅ **RESUME_DOWNLOADED.**\n\nPDF document contains comprehensive professional data including experience logs, technical competencies, and project archives.",
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
  };

  const handleShowAllExperience = () => {
    const newMessage: Message = {
      id: String(messages.length + 1),
      text: "> ACCESSING_CAREER_DATABASE...\n**COMPLETE_EXPERIENCE_LOG:**",
      sender: "ai",
      type: "experience",
      timestamp: new Date(),
      data: experienceData,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleShowFilteredExperience = (query: string) => {
    const relevant = findRelevantExperience(query);

    if (relevant.length === 0) {
      setMessages((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          text: `> SEARCH_QUERY: "${query}"\n**STATUS:** NO_DIRECT_MATCHES.\n\nDisplaying full experience database:`,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
      handleShowAllExperience();
    } else {
      const newMessage: Message = {
        id: String(messages.length + 1),
        text: `> SEARCH_QUERY: "${query}"\n**${relevant.length} RESULT(S)_FOUND.**\nRelevant experience data retrieved:`,
        sender: "ai",
        type: "experience",
        timestamp: new Date(),
        data: relevant,
      };
      setMessages((prev) => [...prev, newMessage]);
    }
  };

  const handleShowSkills = () => {
    const newMessage: Message = {
      id: String(messages.length + 1),
      text: "> ACCESSING_SKILL_DATABASE...\n**TECHNICAL_COMPETENCY_MATRIX:**",
      sender: "ai",
      type: "skills",
      timestamp: new Date(),
      data: skillsData,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handlePortfolioOverview = () => {
    const overview = `> SYSTEM_PROFILE_SCAN //\n\n**PROFESSIONAL_DESIGNATION:** Full Stack Developer\n**EXPERIENCE:** 2+ years\n**CURRENT_STATUS:** ACTIVE - Raisematters Pvt. Ltd.\n\n**CORE_COMPETENCIES:**\n├─ Real-time manufacturing systems\n├─ Scalable API architecture\n├─ Enterprise authentication protocols\n├─ SAP integration framework\n└─ Full-stack development (MERN)\n\n**PROJECT_DOMAINS:**\n• Manufacturing execution systems\n• Production workflow automation\n• Enterprise resource planning\n• Third-party API orchestration\n\n**CURRENT_FOCUS:** Building scalable backend services for Adani Group enterprise solutions.\n\n> Additional data available via specific queries.`;

    setMessages((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        text: overview,
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
  };

  const processCommand = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes("download") && lowerInput.includes("resume")) {
      handleDownloadResume();
    } else if (
      lowerInput.includes("experience") ||
      lowerInput.includes("tell") ||
      lowerInput.includes("about")
    ) {
      const hasSpecificKeyword = lowerInput.match(
        /about\s+(\w+)|(backend|frontend|manufacturing|api|authentication|workflow|mern|masai|raisematters)/i
      );

      if (hasSpecificKeyword) {
        const keyword = hasSpecificKeyword[1] || hasSpecificKeyword[2];
        handleShowFilteredExperience(keyword);
      } else {
        handleShowAllExperience();
      }
    } else if (lowerInput.includes("skill") || lowerInput.includes("technolog")) {
      handleShowSkills();
    } else if (
      lowerInput.includes("overview") ||
      lowerInput.includes("about me") ||
      lowerInput.includes("profile")
    ) {
      handlePortfolioOverview();
    } else {
      setMessages((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          text: "> COMMAND_NOT_RECOGNIZED.\n\n**AVAILABLE_COMMANDS:**\n• show experience → Professional history\n• show skills → Technical abilities\n• download resume → Retrieve CV\n• portfolio overview → Profile summary\n• tell me about [topic] → Search expertise\n\n**PLEASE_REPHRASE_YOUR_QUERY.**",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: String(messages.length + 1),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      processCommand(input);
      setIsLoading(false);
    }, 500);
  };

  const handleSuggestedCommand = (command: string) => {
    const userMessage: Message = {
      id: String(messages.length + 1),
      text: command,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      processCommand(command);
      setIsLoading(false);
    }, 500);
  };

  const getSizeClass = () => {
    if (isExpanded) {
      return "w-[1000px] h-[80vh]";
    }
    return "w-[500px] h-[620px]";
  };

  return (
    <>
      {/* Chat Trigger Button - Green/Black Robotic Style */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 group transition-all duration-300 hover:scale-105"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative bg-black border-2 border-green-500 rounded-full p-3 shadow-xl shadow-green-500/20">
              <Cctv className="w-6 h-6 text-green-500" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            </div>
          </div>
          <span className="absolute bottom-16 right-0 px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-green-500 text-green-500 shadow-lg">
            [AI_TERMINAL]
          </span>
        </button>
      )}

      {/* Chat Window - Professional Green/Black Theme */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 ${getSizeClass()} rounded-lg shadow-2xl overflow-hidden flex flex-col transition-all duration-300 bg-black border-2 border-green-500 shadow-green-500/20`}
        >
          {/* Header - Terminal Style */}
          <div className="px-4 py-3 flex items-center justify-between bg-black border-b border-green-500">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Terminal className="w-5 h-5 text-green-500" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              </div>
              <div>
                <h3 className="font-mono text-sm font-bold tracking-tight text-green-500">
                  PORTFOLIO_AI
                </h3>
                <p className="text-[10px] font-mono text-green-500/60">
                  SYSTEM_READY
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded transition-colors hover:bg-green-500/10 text-green-500/70 hover:text-green-500"
              >
                {isExpanded ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded transition-colors hover:bg-green-500/10 text-green-500/70 hover:text-green-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area - Black Background with Green Text */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-sm bg-black">
            {messages.map((message) => (
              <div key={message.id}>
                {message.type === "experience" ? (
                  <div className="rounded border border-green-500/30 overflow-hidden bg-black">
                    <div className="px-4 py-2 border-b border-green-500/30 flex items-center gap-2 bg-green-500/5">
                      <Briefcase className="w-4 h-4 text-green-500" />
                      <span className="text-xs font-bold text-green-500">
                         {message.text.split("\n")[0]}
                      </span>
                    </div>
                    <div className="p-4 space-y-4 text-xs">
                      {message.data.map((exp: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-3 rounded border border-green-500/20 bg-black/80"
                        >
                          <div className="mb-2">
                            <h4 className="font-bold text-green-500">
                              {exp.title}
                            </h4>
                            <p className="text-green-500/70">
                              {exp.company} | {exp.period}
                            </p>
                          </div>
                          <p className="mb-2 text-green-500/60 text-[11px]">
                            {exp.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {exp.technologies.map((tech: string, i: number) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded text-[10px] font-mono bg-green-500/10 text-green-500 border border-green-500/30"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="space-y-1">
                            {exp.achievements.slice(0, 3).map((ach: string, i: number) => (
                              <div key={i} className="flex gap-2 text-green-500/50">
                                <span className="text-green-500">❯</span>
                                <span className="text-[10px]">{ach.substring(0, 100)}...</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : message.type === "skills" ? (
                  <div className="rounded border border-green-500/30 overflow-hidden bg-black">
                    <div className="px-4 py-2 border-b border-green-500/30 flex items-center gap-2 bg-green-500/5">
                      <Code2 className="w-4 h-4 text-green-500" />
                      <span className="text-xs font-bold text-green-500">
                        {message.text.split("\n")[0]}
                      </span>
                    </div>
                    <div className="p-4 grid grid-cols-2 gap-3">
                      {Object.entries(message.data).map(([key, category]: any) => (
                        <div
                          key={key}
                          className="p-2 rounded border border-green-500/20 bg-black/80"
                        >
                          <h5
                            className="text-xs font-bold mb-2 flex items-center gap-1 text-green-500"
                          >
                            {category.icon && <category.icon className="w-3 h-3" />}
                            {category.name}
                          </h5>
                          <div className="flex flex-wrap gap-1">
                            {category.skills.map((skill: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-1.5 py-0.5 rounded text-[10px] bg-green-500/10 text-green-500/80 border border-green-500/20"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded whitespace-pre-wrap text-xs ${
                        message.sender === "user"
                          ? "bg-green-500/20 text-green-500 border border-green-500/50"
                          : "bg-green-500/5 text-green-500/80 border border-green-500/30"
                      }`}
                    >
                      <p className="leading-relaxed font-mono">{message.text}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded bg-green-500/5 border border-green-500/30">
                  <div className="flex gap-1">
                    <Circle className="w-2 h-2 fill-green-500 text-green-500 animate-pulse" />
                    <Circle className="w-2 h-2 fill-green-500 text-green-500 animate-pulse delay-100" />
                    <Circle className="w-2 h-2 fill-green-500 text-green-500 animate-pulse delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Commands - Terminal HUD */}
          <div className="px-4 py-2 border-t border-green-500/30 bg-black">
            <p className="text-[10px] font-mono mb-2 flex items-center gap-2 text-green-500/60">
              <ChevronDown className="w-3 h-3" /> QUICK_ACCESS
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedCommands.map((cmd, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestedCommand(cmd.command)}
                  className="px-2 py-1 text-[10px] font-mono rounded transition-colors bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/30"
                >
                  {cmd.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area - Command Line Style */}
          <form
            onSubmit={handleSendMessage}
            className="px-4 py-3 flex gap-2 border-t border-green-500/30 bg-black"
          >
            <div className="flex-1 flex items-center gap-2 px-2 py-1 rounded border border-green-500/30 bg-black focus-within:border-green-500">
              <span className="text-xs font-mono text-green-500">{">"}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter command..."
                className="flex-1 bg-transparent outline-none text-xs font-mono text-green-500 placeholder-green-500/40"
              />
            </div>
            <button
              type="submit"
              className="px-3 py-1 rounded text-xs font-mono transition-colors bg-green-500 hover:bg-green-600 text-black"
            >
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChat;