import React from "react";
import "./Project.css";
import axios from "axios";
import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_API_URL;

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/projects`)
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="modern-projects-section">
      <div className="project-container">

        <header className="project-header">
          <span className="project-badge">
            <span className="project-badge-dot"></span>
            Recent Work
          </span>
          <h1 className="section-title">Latest <span>Works</span></h1>
          <p className="section-subtitle">A collection of my recent development projects</p>
        </header>

        <div className="projects-grid">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map((item) => (
              <div className="project-item skeleton-active" key={item}>
                <div className="project-image-box skeleton-image"></div>
              </div>
            ))
          ) : (
            projects.map((project, idx) => (
              <div className="project-item" key={idx}>

                <div className="project-image-box">
                  <img
                    src={
                      project.image?.startsWith('http')
                        ? project.image
                        : `${BASE_URL}${project.image?.startsWith('/') ? '' : '/'}${project.image}`.replace(/([^:]\/)\/+/g, "$1")
                    }
                    alt={project.title}
                    className="project-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x250?text=Project+Preview";
                    }}
                  />

                  <div className="project-overlay">
                    <span className="project-tag">{project.tag || "Development"}</span>
                    <h3 className="project-card-title">{project.title}</h3>

                    <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                      View Project <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}