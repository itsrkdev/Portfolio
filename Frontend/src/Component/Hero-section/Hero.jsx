import { useEffect, useState, useRef } from 'react'; // useRef add kiya
import './Hero.css';
import Typed from 'typed.js';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export default function Hero() {
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(true);
    const typedElement = useRef(null); // Ref use karna Typed.js ke liye safest hai

    useEffect(() => {
        axios.get(`${BASE_URL}/api/hero`)
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
        // Sirf tabhi chale jab loading khatam ho jaye aur hero data ho
        if (!loading && hero?.roles && typedElement.current) {
            const typed = new Typed(typedElement.current, {
                strings: hero.roles,
                typeSpeed: 60,
                backSpeed: 30,
                loop: true,
            });
            return () => typed.destroy();
        }
    }, [loading, hero]); // loading ko dependency mein dala

    return (
        <section className="hero-modern-section" id="home">
            <div className="hero-container">
                {loading ? (
                    // Skeleton UI (Ab section ke andar render hoga, pura return nahi)
                    <>
                        <div className="hero-content">
                            <div className="skeleton skeleton-badge"></div>
                            <div className="skeleton skeleton-title"></div>
                            <div className="skeleton skeleton-subtitle"></div>
                            <div className="skeleton skeleton-btn"></div>
                        </div>
                        <div className="hero-visual">
                            <div className="skeleton skeleton-img"></div>
                        </div>
                    </>
                ) : hero ? (
                    // Asli Content
                    <>
                        <div className="hero-content">
                            <span className="hero-badge">Available for Projects</span>
                            <h1 className="hero-title">
                                Hi, I'm <span className="coral-text">{hero.name}</span>
                            </h1>

                            <div className="typed-container">
                                {/* ID ki jagah Ref use karein */}
                                <span ref={typedElement}></span>
                            </div>

                            <p className="hero-subtitle">{hero.subtitle}</p>

                            <div className="hero-actions">
                             {/* Download CV Button */}
                                {/* <a href="/Resume.pdf"
                                 download="My_Resume.pdf" // Isse click karte hi file download hogi
                               target="_blank"
                              rel="noreferrer"
                              >
                            <button className="btn-primary">Download CV</button>
                        </a> */}
                                <a href="https://forms.gle/8ck5s1SCwDcwWyhZA" target="_blank" rel="noreferrer">
                                    <button className="btn-primary">Get In Touch</button>
                                </a>

                                <div className="hero-socials">
                                    <a href={hero.social?.github} target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></a>
                                    {/* <a href={hero.social?.facebook} target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook-f"></i></a> */}
                                    <a href={hero.social?.instagram} target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
                                    <a href={hero.social?.linkedin} target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin-in"></i></a>
                                </div>
                            </div>
                        </div>

                        <div className="hero-visual">
                            <div className="image-wrapper">
                                <div className="glow-ring"></div>
                                <img
                                    src={
                                        hero.image?.startsWith('http')
                                            ? hero.image
                                            : `${BASE_URL}${hero.image?.startsWith('/') ? '' : '/'}${hero.image}`.replace(/([^:]\/)\/+/g, "$1")
                                    }
                                    alt={hero.name}
                                    className="hero-img-3d"
                                    loading="eager"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/500?text=Developer+Photo";
                                    }}
                                />
                                <div className="floating-card">
                                    <span className="dot"></span>{hero.experience}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Failed to load profile.</p>
                )}
            </div>
        </section>
    );
}


































