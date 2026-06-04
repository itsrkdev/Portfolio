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
        
        {/* Classic Clean Header */}
        <header className="project-header">
          <h1 className="section-title">Latest <span>Works</span></h1>
          <p className="section-subtitle">A collection of my recent development projects</p>
          {/* <div className="header-underline"></div> */}
        </header>

        {/* Projects Grid */}
        <div className="projects-grid">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map((item) => (
              <div className="project-item skeleton-active" key={item}>
                <div className="project-image-box skeleton-image"></div>
                <div className="skeleton-text-box">
                  <div className="skeleton skeleton-tag"></div>
                  <div className="skeleton skeleton-title"></div>
                  <div className="skeleton skeleton-btn"></div>
                </div>
              </div>
            ))
          ) : (
            projects.map((project, idx) => (
              <div className="project-item" key={idx}>
                
                {/* Clean Image Container */}
                <div className="project-image-box">
                  <img
                    src={
                      project.image?.startsWith('http')
                        ? project.image
                        : `${BASE_URL}${project.image?.startsWith('/') ? '' : '/'}${project.image}`.replace(/([^:]\/)\/+/g, "$1")
                    }
                    alt={project.title}
                    className="project-img"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x250?text=Project+Preview";
                    }}
                  />
                </div>

                {/* Highly Readable Info Content */}
                <div className="project-info-content">
                  <div className="project-meta">
                    <span className="project-tag">{project.tag || "Development"}</span>
                  </div>
                  <h3 className="project-card-title">{project.title}</h3>
                  
                  {/* Premium Solid Action Button */}
                  <div className="project-action-box">
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

