import {
  ExternalLink,
  Github,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

// project 1
import project1Img1 from "../types/1_project_images/Screenshot 2025-06-29 152757.png";
import project1Img2 from "../types/1_project_images/Screenshot 2025-06-29 152815.png";
import project1Img3 from "../types/1_project_images/Screenshot 2025-06-29 152913.png";

// project 2
import project1Img4 from "../types/2_project_images/Screenshot 2025-10-14 212143.png";
import project1Img5 from "../types/2_project_images/Screenshot 2025-10-14 212253.png";
import project1Img6 from "../types/2_project_images/Screenshot 2025-10-14 212329.png";

// project 3
import project1Img7 from "../types/3_project_images/Screenshot 2025-10-14 212439.png";
import project1Img8 from "../types/3_project_images/Screenshot 2025-10-14 212506.png";
import project1Img9 from "../types/3_project_images/Screenshot 2025-10-14 212523.png";

interface PortfolioProps {
  isDark: boolean;
}

const Portfolio = ({ isDark }: PortfolioProps) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeImages, setActiveImages] = useState<{ [key: number]: number }>(
    {}
  );

  const filters = ["All", "E-Commerce", "Study Matarial"];

  const projects = [
    {
      title: "Ranter Store",
      category: "E-Commerce",
      description:
        "Full-featured e-commerce platform with payment integration, inventory management, and real-time analytics.",
      images: [project1Img1, project1Img2, project1Img3],
      tech: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/Md-abdul/Renter-Ecommerce",
      live: "https://www.ranterstore.in/",
    },
    {
      title: "OutFitter",
      category: "E-Commerce",
      description:
        "A full stack Eccomerce website where user can authenticate and purchase their clothes",
      images: [project1Img7, project1Img8, project1Img9],
      tech: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/md-kamran400/outfitter",
      live: "https://outfitter-frontend-xz3u.vercel.app/",
    },
    {
      title: "Study Buddy",
      category: "Study Matarial",
      description:
        " A Study related website where user can choose subject and find there solution with any specific book like physics and maths chemistry",
      images: [project1Img4, project1Img5, project1Img6],
      tech: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/md-kamran400/numero-jail-297",
      live: "https://quiet-dolphin-feaeb6.netlify.app/",
    },
  ];
  // Initialize active images
  useEffect(() => {
    const initialActiveImages: { [key: number]: number } = {};
    projects.forEach((_, index) => {
      initialActiveImages[index] = 0;
    });
    setActiveImages(initialActiveImages);
  }, []);

  // Auto slide function
  const autoSlide = useCallback(() => {
    setActiveImages((prev) => {
      const newActiveImages = { ...prev };
      Object.keys(newActiveImages).forEach((key) => {
        const projectIndex = parseInt(key);
        newActiveImages[projectIndex] =
          (newActiveImages[projectIndex] + 1) %
          projects[projectIndex].images.length;
      });
      return newActiveImages;
    });
  }, [projects.length]);

  // Set up auto-slide interval
  useEffect(() => {
    const interval = setInterval(autoSlide, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [autoSlide]);

  const goToSlide = (projectIndex: number, slideIndex: number) => {
    setActiveImages((prev) => ({
      ...prev,
      [projectIndex]: slideIndex,
    }));
  };

  const nextSlide = (projectIndex: number) => {
    setActiveImages((prev) => ({
      ...prev,
      [projectIndex]:
        (prev[projectIndex] + 1) % projects[projectIndex].images.length,
    }));
  };

  const prevSlide = (projectIndex: number) => {
    setActiveImages((prev) => ({
      ...prev,
      [projectIndex]:
        prev[projectIndex] === 0
          ? projects[projectIndex].images.length - 1
          : prev[projectIndex] - 1,
    }));
  };

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section
      id="portfolio"
      className={`py-24 relative overflow-hidden ${
        isDark
          ? "bg-gradient-to-b from-gray-900 to-black"
          : "bg-gradient-to-b from-gray-50 to-white"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div
          className={`absolute top-0 left-1/2 w-96 h-96 rounded-full blur-3xl ${
            isDark ? "bg-green-500" : "bg-green-400"
          }`}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            My{" "}
            <span className={isDark ? "text-green-400" : "text-green-600"}>
              Portfolio
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
            className={`mt-6 text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Showcasing my recent work and projects
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? isDark
                    ? "bg-green-500 text-black shadow-lg shadow-green-500/50"
                    : "bg-green-600 text-white shadow-lg shadow-green-600/30"
                  : isDark
                  ? "bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/30"
                  : "bg-green-100 text-green-700 hover:bg-green-200 border border-green-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className={`group relative rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                isDark
                  ? "bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 hover:border-green-500/40"
                  : "bg-gradient-to-br from-green-50 to-white border border-green-200 hover:border-green-300"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                {/* Image Carousel */}
                <div className="relative w-full h-full">
                  {project.images.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        activeImages[index] === imageIndex
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${project.title} - Image ${imageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Overlay with buttons */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
                    isDark ? "bg-green-500/20" : "bg-green-600/20"
                  }`}
                ></div>

                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.github}
                    className={`p-3 rounded-full backdrop-blur-sm transition-transform duration-300 hover:scale-110 ${
                      isDark
                        ? "bg-green-500/90 text-black hover:bg-green-400"
                        : "bg-green-600/90 text-white hover:bg-green-700"
                    }`}
                    aria-label="View GitHub"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={project.live}
                    className={`p-3 rounded-full backdrop-blur-sm transition-transform duration-300 hover:scale-110 ${
                      isDark
                        ? "bg-green-500/90 text-black hover:bg-green-400"
                        : "bg-green-600/90 text-white hover:bg-green-700"
                    }`}
                    aria-label="View Live"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide(index);
                  }}
                  className={`absolute left-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isDark
                      ? "bg-green-500/80 text-black hover:bg-green-400"
                      : "bg-green-600/80 text-white hover:bg-green-700"
                  }`}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide(index);
                  }}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isDark
                      ? "bg-green-500/80 text-black hover:bg-green-400"
                      : "bg-green-600/80 text-white hover:bg-green-700"
                  }`}
                  aria-label="Next image"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                  {project.images.map((_, dotIndex) => (
                    <button
                      key={dotIndex}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToSlide(index, dotIndex);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeImages[index] === dotIndex
                          ? isDark
                            ? "bg-green-400"
                            : "bg-green-600"
                          : isDark
                          ? "bg-green-400/40"
                          : "bg-green-600/40"
                      }`}
                      aria-label={`Go to image ${dotIndex + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Layers
                    size={16}
                    className={isDark ? "text-green-400" : "text-green-600"}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isDark ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    {project.category}
                  </span>
                </div>

                <h3
                  className={`text-xl font-bold mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {project.title}
                </h3>

                <p
                  className={`text-sm mb-4 line-clamp-2 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isDark
                          ? "bg-green-500/10 text-green-300 border border-green-500/30"
                          : "bg-green-100 text-green-700 border border-green-200"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
