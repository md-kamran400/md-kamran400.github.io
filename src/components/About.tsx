import {
  User,
  Briefcase,
  Award,
  Target,
  MapPin,
  Calendar,
  Download,
} from "lucide-react";
import { useEffect, useState } from "react";
import img from "../types/profile_pic_Linkedin.png";
import cvFile from "../types/Md_Kamran_Resume.pdf";

interface AboutProps {
  isDark: boolean;
}

const About = ({ isDark }: AboutProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  const stats = [
    { icon: Briefcase, label: "Years Experience", value: "2+", suffix: "" },
    { icon: Award, label: "Projects Completed", value: "10", suffix: "+" },
    { icon: Target, label: "Technologies", value: "2", suffix: "" },
  ];

  const personalInfo = [
    { icon: MapPin, label: "Location", value: "India" },
    { icon: Calendar, label: "Experience", value: "2+ Years" },
    { icon: User, label: "Status", value: "Available" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValue((prev) => (prev + 1) % 360);
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      className={`py-24 relative overflow-hidden min-h-screen ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-800"
          : "bg-gradient-to-br from-white via-gray-50 to-gray-100"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float ${
              isDark ? "bg-green-500/10" : "bg-green-400/20"
            }`}
            style={{
              width: Math.random() * 15 + 5,
              height: Math.random() * 15 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 15 + 10}s`,
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <div
          className={`absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl animate-pulse-slow ${
            isDark ? "bg-green-500/10" : "bg-green-400/15"
          }`}
        ></div>
        <div
          className={`absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl animate-pulse-slow ${
            isDark ? "bg-emerald-500/10" : "bg-emerald-400/10"
          }`}
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div
              className={`w-12 h-0.5 rounded-full ${
                isDark ? "bg-green-400" : "bg-green-600"
              }`}
            ></div>
            <span
              className={`text-sm font-semibold tracking-wider ${
                isDark ? "text-green-400" : "text-green-600"
              }`}
            >
              ABOUT ME
            </span>
            <div
              className={`w-12 h-0.5 rounded-full ${
                isDark ? "bg-green-400" : "bg-green-600"
              }`}
            ></div>
          </div>

          <h2
            className={`text-5xl md:text-6xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Creative{" "}
            <span className={isDark ? "text-green-400" : "text-green-600"}>
              Developer
            </span>
          </h2>

          <p
            className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Crafting digital experiences with modern technologies and innovative
            solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Content Section */}
          <div className="space-y-8">
            {/* Personal Info Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {personalInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-xl text-center backdrop-blur-sm border transform transition-all duration-300 hover:scale-105 ${
                      isDark
                        ? "bg-green-500/10 border-green-500/20 hover:bg-green-500/20"
                        : "bg-green-50 border-green-200 hover:bg-green-100"
                    }`}
                  >
                    <Icon
                      size={20}
                      className={`mx-auto mb-2 ${
                        isDark ? "text-green-400" : "text-green-600"
                      }`}
                    />
                    <div
                      className={`text-xs ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {info.label}
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {info.value}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Main Content */}
            <div
              className={`p-8 rounded-2xl backdrop-blur-sm border ${
                isDark
                  ? "bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 border-green-500/20"
                  : "bg-gradient-to-br from-green-50 via-white to-emerald-50 border-green-200"
              }`}
            >
              <h3
                className={`text-3xl font-bold mb-6 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Full Stack{" "}
                <span className={isDark ? "text-green-400" : "text-green-600"}>
                  Developer
                </span>
              </h3>

              <div className="space-y-4">
                <p
                  className={`text-lg leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  I'm a passionate Full Stack Developer with over 2 years of
                  experience crafting digital solutions that blend innovative
                  design with robust functionality.
                </p>

                <p
                  className={`text-lg leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  My expertise spans modern frontend frameworks, scalable
                  backend architectures, and cloud technologies. I thrive on
                  transforming complex challenges into seamless user
                  experiences.
                </p>
              </div>

              {/* Skills Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  "React & Next.js",
                  "Node.js & Express",
                  "TypeScript",
                  "Cloud Platforms",
                  "Database Design",
                  "UI/UX Principles",
                ].map((skill, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isDark ? "bg-green-400" : "bg-green-600"
                      } group-hover:scale-150 transition-transform duration-300`}
                    />
                    <span
                      className={`font-medium ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      } group-hover:text-green-500 transition-colors duration-300`}
                    >
                      {skill}
                    </span>
                  </div>
                ))}
              </div>

              {/* Download CV Button */}
              <a
                href={cvFile}
                download="Md_Kamran_Resume.pdf"
                className={`mt-8 px-8 py-3 rounded-full font-semibold transition-all duration-300 inline-flex items-center gap-3 group mx-auto ${
                  isDark
                    ? "bg-green-500 text-black hover:bg-green-400 hover:shadow-2xl hover:shadow-green-500/50"
                    : "bg-green-600 text-white hover:bg-green-700 hover:shadow-2xl hover:shadow-green-600/30"
                }`}
                style={{ width: "auto" }}
              >
                <Download size={20} />
                Download CV
                <div
                  className={`w-0 group-hover:w-4 h-0.5 rounded-full transition-all duration-300 ${
                    isDark ? "bg-black" : "bg-white"
                  }`}
                />
              </a>
            </div>
          </div>

          {/* Profile Image Section */}
          <div className="flex justify-center lg:justify-end relative">
            <div className="relative group">
              {/* Animated Border Rings */}
              {[...Array(3)].map((_, ringIndex) => (
                <div
                  key={ringIndex}
                  className={`absolute inset-0 rounded-full border-2 animate-spin ${
                    isDark ? "border-green-400/30" : "border-green-600/30"
                  }`}
                  style={{
                    top: `${(ringIndex + 1) * -12}px`,
                    left: `${(ringIndex + 1) * -12}px`,
                    right: `${(ringIndex + 1) * -12}px`,
                    bottom: `${(ringIndex + 1) * -12}px`,
                    animationDuration: `${15 + ringIndex * 5}s`,
                    animationDirection:
                      ringIndex % 2 === 0 ? "normal" : "reverse",
                  }}
                />
              ))}

              {/* Main Profile Container */}
              <div className="relative">
                {/* Rotating Gradient Border */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-75"
                  style={{
                    background: `conic-gradient(from ${animatedValue}deg, #10b981, #059669, #047857, #10b981)`,
                    filter: "blur(10px)",
                  }}
                />

                <div
                  className={`relative w-96 h-96 rounded-2xl overflow-hidden border-4 backdrop-blur-sm ${
                    isDark ? "border-green-500/50" : "border-green-600/50"
                  }`}
                >
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${
                        isDark
                          ? "from-green-500 via-emerald-500 to-teal-500"
                          : "from-green-400 via-emerald-400 to-teal-400"
                      }`}
                      style={{
                        animation: "pulse 4s ease-in-out infinite",
                      }}
                    />
                  </div>

                  {/* Profile Image */}
                  <img
                    src={img}
                    alt="Md Kamran"
                    className="w-full h-full object-cover relative z-10 transform group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay Effects */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      isDark
                        ? "from-black/50 via-transparent to-black/30"
                        : "from-white/30 via-transparent to-white/20"
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Floating Elements */}
                  <div
                    className={`absolute top-4 right-4 w-6 h-6 rounded-full ${
                      isDark ? "bg-green-400" : "bg-green-600"
                    } animate-bounce`}
                    style={{ animationDelay: "0.5s" }}
                  />
                  <div
                    className={`absolute bottom-4 left-4 w-4 h-4 rounded-full ${
                      isDark ? "bg-emerald-400" : "bg-emerald-600"
                    } animate-bounce`}
                    style={{ animationDelay: "1s" }}
                  />
                </div>

                {/* Status Badge */}
                <div
                  className={`absolute -bottom-4 -right-4 px-4 py-2 rounded-full backdrop-blur-md border ${
                    isDark
                      ? "bg-green-500/20 text-green-400 border-green-500/40"
                      : "bg-green-100 text-green-700 border-green-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full animate-pulse ${
                        isDark ? "bg-green-400" : "bg-green-600"
                      }`}
                    />
                    <span className="text-sm font-semibold">Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`p-8 rounded-2xl text-center transform transition-all duration-500 hover:scale-105 group backdrop-blur-sm border ${
                  isDark
                    ? "bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20 hover:bg-green-500/20"
                    : "bg-gradient-to-br from-green-50 to-transparent border-green-200 hover:bg-green-100"
                }`}
              >
                <div
                  className={`inline-flex p-4 rounded-2xl mb-4 transition-all duration-300 group-hover:scale-110 ${
                    isDark
                      ? "bg-green-500/20 text-green-400 group-hover:bg-green-500/30"
                      : "bg-green-100 text-green-600 group-hover:bg-green-200"
                  }`}
                >
                  <Icon size={32} />
                </div>

                <div
                  className={`text-5xl font-bold mb-2 bg-gradient-to-r ${
                    isDark
                      ? "from-green-400 to-emerald-400"
                      : "from-green-600 to-emerald-600"
                  } bg-clip-text text-transparent`}
                >
                  {stat.value}
                  <span className="text-3xl">{stat.suffix}</span>
                </div>

                <div
                  className={`text-lg font-semibold ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        .animate-float {
          animation: float infinite ease-in-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default About;
