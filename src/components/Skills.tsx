import { Code, Database, Globe, Server, Smartphone, Zap, Cpu, Cloud, GitBranch, Palette, Terminal, Smartphone as Mobile } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SkillsProps {
  isDark: boolean;
}

interface SkillBubble {
  id: number;
  name: string;
  icon: any;
  category: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
}

const Skills = ({ isDark }: SkillsProps) => {
  const [bubbles, setBubbles] = useState<SkillBubble[]>([]);

  const skillData = [
    {
      category: 'Frontend Development',
      icon: Code,
      color: 'from-green-400 to-emerald-500',
      skills: [
        { name: 'React', icon: Code },
        { name: 'TypeScript', icon: Cpu },
        { name: 'Next.js', icon: Globe },
        { name: 'Tailwind CSS', icon: Palette },
        { name: 'Redux', icon: GitBranch },
        { name: 'Vue.js', icon: Code }
      ]
    },
    {
      category: 'Backend Development',
      icon: Server,
      color: 'from-emerald-400 to-teal-500',
      skills: [
        { name: 'Node.js', icon: Server },
        { name: 'Express', icon: Terminal },
        // { name: 'Python', icon: Cpu },
        // { name: 'Django', icon: Server },
        { name: 'REST APIs', icon: Globe },
        { name: 'GraphQL', icon: GitBranch }
      ]
    },
    {
      category: 'Database & Tools',
      icon: Database,
      color: 'from-teal-400 to-cyan-500',
      skills: [
        { name: 'MySql', icon: Database },
        { name: 'MongoDB', icon: Database },
        // { name: 'Redis', icon: Database },
        { name: 'Supabase', icon: Cloud },
        // { name: 'Docker', icon: Terminal },
        { name: 'Git', icon: GitBranch }
      ]
    },
    {
      category: 'Web Technologies',
      icon: Globe,
      color: 'from-cyan-400 to-sky-500',
      skills: [
        { name: 'HTML5', icon: Globe },
        { name: 'CSS3', icon: Palette },
        { name: 'JavaScript', icon: Cpu },
        { name: 'Webpack', icon: Terminal },
        { name: 'Vite', icon: Zap },
        { name: 'PWA', icon: Mobile }
      ]
    },
    {
      category: 'Mobile & Responsive',
      icon: Smartphone,
      color: 'from-sky-400 to-blue-500',
      skills: [
        { name: 'React Native', icon: Mobile },
        { name: 'Responsive Design', icon: Palette },
        { name: 'Mobile-First', icon: Smartphone },
        { name: 'PWA', icon: Globe },
        // { name: 'Ionic', icon: Mobile },
        // { name: 'Flutter', icon: Smartphone }
      ]
    },
    {
      category: 'DevOps & Cloud',
      icon: Zap,
      color: 'from-blue-400 to-indigo-500',
      skills: [
        { name: 'AWS', icon: Cloud },
        { name: 'Vercel', icon: Cloud },
        { name: 'Netlify', icon: Cloud },
        // { name: 'CI/CD', icon: GitBranch },
        { name: 'GitHub Actions', icon: GitBranch },
        // { name: 'Linux', icon: Terminal }
      ]
    },
  ];

  useEffect(() => {
    // Initialize bubbles
    const initialBubbles: SkillBubble[] = [];
    let id = 0;

    skillData.forEach(category => {
      category.skills.forEach(skill => {
        initialBubbles.push({
          id: id++,
          name: skill.name,
          icon: skill.icon,
          category: category.category,
          x: Math.random() * 80 + 10, // 10-90%
          y: Math.random() * 80 + 10, // 10-90%
          size: Math.random() * 20 + 30, // 30-50px
          speed: Math.random() * 0.5 + 0.2, // 0.2-0.7
          delay: Math.random() * 5 // 0-5s
        });
      });
    });

    setBubbles(initialBubbles);
  }, []);

  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...skillData.map(cat => cat.category)];

  const filteredBubbles = activeCategory === 'All' 
    ? bubbles 
    : bubbles.filter(bubble => bubble.category === activeCategory);

  return (
    <section
      id="skills"
      className={`py-24 relative overflow-hidden min-h-screen ${
        isDark ? 'bg-black' : 'bg-white'
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float ${
              isDark ? 'bg-green-500/20' : 'bg-green-400/30'
            }`}
            style={{
              width: Math.random() * 20 + 5,
              height: Math.random() * 20 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <div className={`absolute top-1/4 -left-20 w-72 h-72 rounded-full blur-3xl animate-pulse-slow ${
          isDark ? 'bg-green-500/20' : 'bg-green-400/20'
        }`}></div>
        <div className={`absolute bottom-1/4 -right-20 w-72 h-72 rounded-full blur-3xl animate-pulse-slow ${
          isDark ? 'bg-emerald-500/15' : 'bg-emerald-400/15'
        }`} 
        style={{ animationDelay: '2s' }}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse-slow ${
          isDark ? 'bg-teal-500/10' : 'bg-teal-400/10'
        }`} 
        style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Technical <span className={isDark ? 'text-green-400' : 'text-green-600'}>Skills</span>
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${
            isDark ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-green-600 to-green-500'
          }`}></div>
          <p className={`mt-6 text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Interactive visualization of my technical expertise
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-sm border ${
                activeCategory === category
                  ? isDark
                    ? 'bg-green-500 text-black shadow-lg shadow-green-500/50 border-green-500'
                    : 'bg-green-600 text-white shadow-lg shadow-green-600/30 border-green-600'
                  : isDark
                  ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20 border-green-500/30'
                  : 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Bubble Container */}
        <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden border-2 backdrop-blur-xl"
          style={{
            background: isDark 
              ? 'radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle at center, rgba(16, 185, 129, 0.05) 0%, transparent 70%)',
            borderColor: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.3)'
          }}>
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(${isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.2)'} 1px, transparent 1px),
                               linear-gradient(90deg, ${isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.2)'} 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }}
          />

          {/* Skill Bubbles */}
          {filteredBubbles.map((bubble) => {
            const IconComponent = bubble.icon;
            return (
              <div
                key={bubble.id}
                className={`absolute rounded-full flex items-center justify-center cursor-pointer transform transition-all duration-1000 animate-float ${
                  isDark
                    ? 'bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 hover:border-green-400'
                    : 'bg-gradient-to-br from-green-100 to-emerald-100 border border-green-300 hover:border-green-400'
                } backdrop-blur-sm hover:scale-110 hover:shadow-2xl`}
                style={{
                  left: `${bubble.x}%`,
                  top: `${bubble.y}%`,
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                  animationDelay: `${bubble.delay}s`,
                  animationDuration: `${bubble.speed * 10 + 10}s`,
                  transform: 'translate(-50%, -50%)'
                }}
                title={bubble.name}
              >
                <div className="text-center">
                  <IconComponent 
                    size={bubble.size * 0.4} 
                    className={`mx-auto ${
                      isDark ? 'text-green-400' : 'text-green-600'
                    }`} 
                  />
                  <span className={`text-xs font-semibold mt-1 block ${
                    isDark ? 'text-green-300' : 'text-green-700'
                  }`}>
                    {bubble.name}
                  </span>
                </div>
                
                {/* Pulsing ring effect */}
                <div className={`absolute inset-0 rounded-full border-2 animate-ping ${
                  isDark ? 'border-green-400' : 'border-green-500'
                }`} 
                style={{ animationDelay: `${bubble.delay * 0.5}s` }} />
              </div>
            );
          })}
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-w-7xl mx-auto">
          {skillData.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className={`group relative p-6 rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden ${
                  isDark
                    ? 'bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 hover:border-green-500/40'
                    : 'bg-gradient-to-br from-green-50 to-transparent border border-green-200 hover:border-green-300'
                }`}
              >
                {/* Animated background */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${category.color} blur-xl`}></div>
                </div>

                <div className="relative">
                  <div className={`inline-flex p-3 rounded-xl mb-4 transition-all duration-300 group-hover:scale-110 ${
                    isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                  }`}>
                    <Icon size={28} />
                  </div>

                  <h3 className={`text-xl font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {category.category}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => {
                      const SkillIcon = skill.icon;
                      return (
                        <span
                          key={skillIndex}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 flex items-center gap-2 ${
                            isDark
                              ? 'bg-green-500/10 text-green-300 hover:bg-green-500/20 border border-green-500/30'
                              : 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-200'
                          }`}
                        >
                          <SkillIcon size={14} />
                          {skill.name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Glow effect */}
                <div className={`absolute top-2 right-2 w-20 h-20 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl ${
                  isDark ? 'bg-green-400' : 'bg-green-500'
                }`}></div>
              </div>
            );
          })}
        </div>

        {/* Learning Banner */}
        <div className={`mt-16 p-8 rounded-2xl max-w-4xl mx-auto text-center relative overflow-hidden ${
          isDark
            ? 'bg-gradient-to-r from-green-500/10 via-green-400/5 to-green-500/10 border border-green-500/20'
            : 'bg-gradient-to-r from-green-50 via-white to-green-50 border border-green-200'
        }`}>
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className={`absolute -inset-10 bg-gradient-to-r from-transparent via-green-500/5 to-transparent animate-shimmer`}></div>
          </div>
          
          <div className="relative">
            <h3 className={`text-2xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Always Learning & Evolving
            </h3>
            <p className={`text-lg ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Continuously exploring AI/ML integration, Web3 technologies, and advanced 
              cloud architectures to stay at the forefront of innovation.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
          33% { transform: translate(-50%, -50%) translateY(-20px) rotate(120deg); }
          66% { transform: translate(-50%, -50%) translateY(10px) rotate(240deg); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-float {
          animation: float infinite ease-in-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;




// import { motion } from "framer-motion";
// import {
//   Code,
//   Database,
//   Globe,
//   Server,
//   Smartphone,
//   Zap,
//   Terminal,
//   GitBranch,
//   Cloud,
//   Settings,
//   Layers,
// } from "lucide-react";

// import React from "react";

// interface SkillsProps {
//   isDark: boolean;
// }

// const floatingAnimation = {
//   y: [0, -15, 0],
//   transition: {
//     duration: 4,
//     repeat: Infinity,
//     ease: [0.42, 0, 0.58, 1], // equivalent to easeInOut
//   } as any,
// };

// const bubbleAnimation = {
//   scale: [1, 1.2, 1],
//   opacity: [0.7, 1, 0.7],
//   transition: {
//     duration: 6,
//     repeat: Infinity,
//     ease: [0.42, 0, 0.58, 1],
//   } as any,
// };

// const Skills: React.FC<SkillsProps> = ({ isDark }) => {
//   const skillCategories = [
//     {
//       icon: Code,
//       title: "Frontend Development",
//       skills: [
//         { icon: Code, name: "React" },
//         { icon: Layers, name: "Next.js" },
//         { icon: Terminal, name: "TypeScript" },
//         { icon: Code, name: "Tailwind" },
//         { icon: GitBranch, name: "Redux" },
//       ],

//       color: "from-green-400 to-emerald-500",
//     },
//     {
//       icon: Server,
//       title: "Backend Development",
//       skills: [
//         { icon: Terminal, name: "Node.js" },
//         { icon: Code, name: "Express" },
//         { icon: Settings, name: "Django" },
//         { icon: Database, name: "REST APIs" },
//         { icon: Globe, name: "GraphQL" },
//       ],
//       color: "from-emerald-400 to-teal-500",
//     },
//     {
//       icon: Database,
//       title: "Database & Tools",
//       skills: [
//         { icon: Database, name: "PostgreSQL" },
//         { icon: Database, name: "MongoDB" },
//         { icon: Database, name: "Redis" },
//         { icon: GitBranch, name: "Git" },
//         { icon: Cloud, name: "Docker" },
//       ],
//       color: "from-teal-400 to-cyan-500",
//     },
//     {
//       icon: Globe,
//       title: "Web Technologies",
//       skills: [
//         { icon: Globe, name: "HTML5" },
//         { icon: Globe, name: "CSS3" },
//         { icon: Terminal, name: "JavaScript" },
//         { icon: Code, name: "PWA" },
//         { icon: Layers, name: "Vite" },
//       ],
//       color: "from-cyan-400 to-sky-500",
//     },
//     {
//       icon: Smartphone,
//       title: "Mobile & Responsive",
//       skills: [
//         { icon: Smartphone, name: "React Native" },
//         { icon: Smartphone, name: "Responsive" },
//         { icon: Globe, name: "PWA" },
//         { icon: Layers, name: "Ionic" },
//         { icon: Smartphone, name: "Flutter" },
//       ],
//       color: "from-sky-400 to-blue-500",
//     },
//     {
//       icon: Zap,
//       title: "DevOps & Cloud",
//       skills: [
//         { icon: Cloud, name: "AWS" },
//         { icon: Cloud, name: "Vercel" },
//         { icon: Cloud, name: "Netlify" },
//         { icon: GitBranch, name: "CI/CD" },
//         { icon: Settings, name: "Linux" },
//       ],
//       color: "from-blue-400 to-indigo-500",
//     },
//   ];

//   return (
//     <section
//       id="skills"
//       className={`py-24 relative overflow-hidden ${
//         isDark ? "bg-black" : "bg-white"
//       }`}
//     >
//       {/* Floating gradient bubbles background */}
//       <motion.div
//         className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl bg-gradient-to-br from-green-400 to-emerald-500 opacity-20"
//         animate={bubbleAnimation}
//       />
//       <motion.div
//         className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full blur-3xl bg-gradient-to-br from-green-300 to-teal-400 opacity-20"
//         animate={bubbleAnimation}
//         transition={{ duration: 8, delay: 2, repeat: Infinity }}
//       />

//       <div className="container mx-auto px-6 relative z-10">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2
//             className={`text-4xl md:text-5xl font-extrabold mb-4 ${
//               isDark ? "text-white" : "text-gray-900"
//             }`}
//           >
//             Technical{" "}
//             <span className={isDark ? "text-green-400" : "text-green-600"}>
//               Skills
//             </span>
//           </h2>
//           <div
//             className={`w-24 h-1 mx-auto rounded-full ${
//               isDark
//                 ? "bg-gradient-to-r from-green-500 to-green-400"
//                 : "bg-gradient-to-r from-green-600 to-green-500"
//             }`}
//           ></div>
//           <p
//             className={`mt-6 text-lg max-w-2xl mx-auto ${
//               isDark ? "text-gray-400" : "text-gray-600"
//             }`}
//           >
//             A modern tech stack with continuously evolving expertise.
//           </p>
//         </div>

//         {/* Skill Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//           {skillCategories.map((category, index) => {
//             const Icon = category.icon;
//             return (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.15 }}
//                 whileHover={{ scale: 1.05 }}
//                 className={`group relative p-6 rounded-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-2xl border ${
//                   isDark
//                     ? "bg-white/5 border-green-500/20 hover:border-green-500/40"
//                     : "bg-white/70 border-green-200 hover:border-green-300"
//                 }`}
//               >
//                 <motion.div
//                   animate={floatingAnimation}
//                   className={`inline-flex p-4 rounded-full mb-4 ${
//                     isDark
//                       ? "bg-green-500/20 text-green-400"
//                       : "bg-green-100 text-green-600"
//                   }`}
//                 >
//                   <Icon size={32} />
//                 </motion.div>

//                 <h3
//                   className={`text-xl font-bold mb-4 ${
//                     isDark ? "text-white" : "text-gray-900"
//                   }`}
//                 >
//                   {category.title}
//                 </h3>

//                 <div className="flex flex-wrap gap-2">
//                   {category.skills.map((skill, skillIndex) => {
//                     const SkillIcon = skill.icon;
//                     return (
//                       <motion.span
//                         key={skillIndex}
//                         whileHover={{ scale: 1.1, rotate: 2 }}
//                         className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
//                           isDark
//                             ? "bg-green-500/10 text-green-300 border-green-500/30 hover:bg-green-500/20"
//                             : "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
//                         }`}
//                       >
//                         <SkillIcon size={14} />
//                         {skill.name}
//                       </motion.span>
//                     );
//                   })}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Footer */}
//         <motion.div
//           className={`mt-20 p-10 rounded-3xl max-w-4xl mx-auto text-center backdrop-blur-xl ${
//             isDark
//               ? "bg-white/5 border border-green-500/20"
//               : "bg-white/70 border border-green-200"
//           }`}
//           animate={floatingAnimation}
//         >
//           <h3
//             className={`text-2xl font-bold mb-4 ${
//               isDark ? "text-white" : "text-gray-900"
//             }`}
//           >
//             Always Evolving 🚀
//           </h3>
//           <p className={isDark ? "text-gray-300" : "text-gray-700"}>
//             Currently diving deeper into AI/ML integrations, Web3 technologies,
//             and next-gen cloud architectures to stay ahead of the curve.
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Skills;
