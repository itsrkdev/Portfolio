import { useEffect, useState, useRef } from 'react';
import './Hero.css';
import Typed from 'typed.js';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export default function Hero() {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const typedElement = useRef(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/home`)
      .then(res => {
        setHero(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && hero?.roles && typedElement.current) {
      const typed = new Typed(typedElement.current, {
        strings: hero.roles,
        typeSpeed: 60,
        backSpeed: 30,
        loop: true,
      });
      return () => typed.destroy();
    }
  }, [loading, hero]);

  return (
    <section className="hero-modern-section" id="home">
      {/* Left vertical meta strip */}
      {/* <div className="hero-meta-strip">
        <span className="meta-line"></span>
        <span className="meta-text">FULL STACK DEVELOPER</span>
      </div> */}

      {loading ? (
        <div className="hero-container">
          <div className="hero-content">
            <div className="skeleton skeleton-badge"></div>
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-subtitle"></div>
            <div className="skeleton skeleton-btn"></div>
          </div>
          <div className="hero-visual">
            <div className="skeleton skeleton-img"></div>
          </div>
        </div>
      ) : hero ? (
        <div className="hero-poster">
          <div className="hero-photo-cutout">
            <img
              src={
                hero.image?.startsWith('http')
                  ? hero.image
                  : `${BASE_URL}${hero.image?.startsWith('/') ? '' : '/'}${hero.image?.replace(/([^:]\/)\/+/g, "$1")}`
              }
              alt={hero.name}
              className="hero-img-3d"
              loading="eager"
              onError={(e) => { e.target.src = "https://via.placeholder.com/500?text=Developer+Photo"; }}
            />
            <div className="floating-card">
              <span className="dot"></span>{hero.experience}
            </div>
          </div>

          <div className="hero-info">
            <span className="hero-badge">
              <span className="hero-badge-dot"></span>
              Available for Projects
            </span>

            <h1 className="hero-title">
              Hi, I'm <span className="accent-text">{hero.name}</span>
            </h1>

            <div className="typed-container">
              <span ref={typedElement} className="typed-text"></span>
            </div>

            <p className="hero-subtitle">{hero.subtitle}</p>

            <div className="hero-actions">
              <a href="https://forms.gle/8ck5s1SCwDcwWyhZA" target="_blank" rel="noreferrer">
                <button className="btn-primary">Get In Touch</button>
              </a>

              <div className="hero-socials">
                <a href={hero.social?.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <i className="fa-brands fa-github"></i>
                </a>
                {/* <a href={hero.social?.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                  <i className="fa-brands fa-instagram"></i>
                </a> */}
                <a href={hero.social?.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="hero-error">Failed to load profile.</p>
      )}
    </section>
  );
}