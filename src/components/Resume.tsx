import {
  Briefcase,
  GraduationCap,
  Download,
  Award,
  Calendar,
} from "lucide-react";
import cvFile from "../types/Md_Kamran_Resume.pdf";

interface ResumeProps {
  isDark: boolean;
}

const Resume = ({ isDark }: ResumeProps) => {
const experience = [
  {
    title: "Full Stack Developer",
    company: "Raisematters Pvt. Ltd.",
    period: "June 2024 - Present",
    description:
      "Working mainly on backend development for real-time manufacturing and enterprise applications, building scalable APIs, workflow automation, and third-party integrations.",
    achievements: [
      "Worked closely with frontend developers, backend teams, and business stakeholders to build and deliver new features while improving application quality through code reviews and collaboration",
      "Built and managed backend services for real-time manufacturing and production management applications, handling production orders, machine planning, operator assignments, and workflow execution",
      "Developed a complete manufacturing workflow system including raw material management, parts creation, production order allocation, machine scheduling, auto scheduling, and urgent rescheduling based on business priorities",
      "Integrated third-party SAP APIs to automate production order and parts synchronization, reducing manual work and improving operational efficiency",
      "Built secure authentication and authorization systems including OTP-based login verification, user access management, and backend security implementations",
      "Designed and optimized REST APIs and database operations to handle high-volume production data efficiently and improve scalability",
      "Currently contributing to an ongoing enterprise project for Adani Group",
    ],
  },
  {
    title: "MERN Stack Developer Intern",
    company: "Masai School",
    period: "May 2023 - June 2024",
    description:
      "Worked on full-stack web application development while mentoring students and supporting technical learning processes.",
    achievements: [
      "Built and maintained web applications using React, Redux, Node.js, Express.js, and MongoDB",
      "Developed secure authentication systems and product management workflows while handling feature enhancements and bug fixes",
      "Reviewed student assignments and projects, helping them improve code quality and practical understanding",
      "Conducted technical interviews for Full Stack Developer candidates and evaluated frontend, backend, and database skills",
      "Solved technical queries and guided students in debugging and implementing full-stack development concepts",
    ],
  },
  {
    title: "Freelance Full Stack Developer",
    company: "Client Projects",
    period: "Project Based",
    description:
      "Built client-based e-commerce and management systems using the MERN stack with full admin and user-side functionality.",
    achievements: [
      "Developed an e-commerce platform for men, women, and kids clothing with complete product and order management",
      "Built admin panel for managing orders, products, users, and purchase workflows",
      "Integrated PhonePe payment gateway for real-time payments and implemented Cash on Delivery functionality",
      "Integrated Xpressbees delivery APIs for shipment handling and order tracking",
      "Built purchase history and order tracking systems for users",
    ],
  },
];

const education = [
  {
    degree: "Bachelor of Science in Information Technology (B.Sc IT)",
    institution: "Marwari College, Ranchi",
    period: "2023 - 2026 (Pursuing)",
    description:
      "Currently pursuing graduation in Information Technology while working on full-stack development and enterprise applications",
  },
  {
    degree: "Full Stack Web Development Certification",
    institution: "Masai School",
    period: "November 2022 - June 2023",
    description:
      "Completed intensive full-stack web development training focused on MERN stack, data structures, and modern development practices",
  },
  {
    degree: "Higher Secondary (12th) - Science",
    institution: "Gomia High School",
    period: "March 2020 - March 2022",
    description:
      "Completed higher secondary education with Science stream",
  },
];

  const certifications = [
    "Masai Completion Certificate",
    "MongoDB Certified Developer",
    "React Advanced Patterns",
    "Node.js Application Development",
  ];

  return (
    <section
      id="resume"
      className={`py-24 relative overflow-hidden ${
        isDark
          ? "bg-gradient-to-b from-black to-gray-900"
          : "bg-gradient-to-b from-white to-gray-50"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl ${
            isDark ? "bg-green-500" : "bg-green-400"
          }`}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            My{" "}
            <span className={isDark ? "text-green-400" : "text-green-600"}>
              Resume
            </span>
          </h2>
          <div
            className={`w-24 h-1 mx-auto rounded-full ${
              isDark
                ? "bg-gradient-to-r from-green-500 to-green-400"
                : "bg-gradient-to-r from-green-600 to-green-500"
            }`}
          ></div>
          <p
            className={`mt-6 mb-5 text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            A summary of my professional journey and qualifications
          </p>

          <a
            href={cvFile}
            download="Md_Kamran_Resume.pdf"
            className={`mt-8 px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center gap-2 hover:scale-105 hover:shadow-xl ${
              isDark
                ? "bg-green-500 text-black hover:bg-green-400 shadow-lg shadow-green-500/50"
                : "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/30"
            }`}
            style={{
              width: "fit-content",
              margin: "0 auto", // centers horizontally
            }}
          >
            <Download size={20} />
            Download Resume
          </a>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div
                className={`p-3 rounded-lg ${
                  isDark
                    ? "bg-green-500/20 text-green-400"
                    : "bg-green-100 text-green-600"
                }`}
              >
                <Briefcase size={28} />
              </div>
              <h3
                className={`text-3xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Work Experience
              </h3>
            </div>

            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                    isDark
                      ? "bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 hover:border-green-500/40"
                      : "bg-gradient-to-br from-green-50 to-white border border-green-200 hover:border-green-300"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h4
                        className={`text-xl font-bold mb-1 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {exp.title}
                      </h4>
                      <p
                        className={`text-lg font-medium ${
                          isDark ? "text-green-400" : "text-green-600"
                        }`}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-2 mt-2 md:mt-0 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <Calendar size={16} />
                      <span className="text-sm font-medium">{exp.period}</span>
                    </div>
                  </div>

                  <p
                    className={`mb-4 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {exp.description}
                  </p>

                  <div className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            isDark ? "bg-green-400" : "bg-green-600"
                          }`}
                        ></div>
                        <p
                          className={`text-sm ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div
                className={`p-3 rounded-lg ${
                  isDark
                    ? "bg-green-500/20 text-green-400"
                    : "bg-green-100 text-green-600"
                }`}
              >
                <GraduationCap size={28} />
              </div>
              <h3
                className={`text-3xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Education
              </h3>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                    isDark
                      ? "bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 hover:border-green-500/40"
                      : "bg-gradient-to-br from-green-50 to-white border border-green-200 hover:border-green-300"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4
                      className={`text-xl font-bold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {edu.degree}
                    </h4>
                    <div
                      className={`flex items-center gap-2 mt-2 md:mt-0 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <Calendar size={16} />
                      <span className="text-sm font-medium">{edu.period}</span>
                    </div>
                  </div>
                  <p
                    className={`text-lg font-medium mb-2 ${
                      isDark ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    {edu.institution}
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* <div>
            <div className="flex items-center gap-3 mb-8">
              <div
                className={`p-3 rounded-lg ${
                  isDark
                    ? "bg-green-500/20 text-green-400"
                    : "bg-green-100 text-green-600"
                }`}
              >
                <Award size={28} />
              </div>
              <h3
                className={`text-3xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Certifications
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-3 ${
                    isDark
                      ? "bg-green-500/10 border border-green-500/20 hover:bg-green-500/20"
                      : "bg-green-50 border border-green-200 hover:bg-green-100"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isDark ? "bg-green-400" : "bg-green-600"
                    }`}
                  ></div>
                  <span
                    className={`font-medium ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {cert}
                  </span>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Resume;
